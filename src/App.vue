<script>
// components needing to be imported
  import MainPanel from '@/components/MainPanel.vue';

  // paths to audio files
  import { audios } from '@/js/References.js';

  // classes and types from the track class file
  import { TrackTypes, MIDITrack, MasterTrack } from '@/js/TrackClasses.js';
  import { MIDIInterface } from '@/js/MIDIInterface.js';

  // classes and types from the sequencer class file
  import { GraphicalSequencer } from '@/js/SequencerClasses.js';

  // this export goes to vue, represents the div w id 'app'
  // is interpreted as a Vue Component
  // name: internal name for component
  // components: components used as part of this
  // data: the component's main variables. idk why it needs to be a function.
  // created: called upon this component's creation in code
  // mounted: called after component is fully loaded onto page
  // computed: used like variables, act like functions
  // methods: the functions of the component
  export default {
    name: 'App',
    components: {
      MainPanel,
    },
    data() {
      return {
        // references
        audioReferences: audios,
        audioContext: new( window.AudioContext || window.webkitAudioContext )(),
        midi: new MIDIInterface(),
        transport: {},
        // resources
        masterTrack: MasterTrack.init(),
        midiTracks: [],
        // tracks: [],
        tracksCreated: 0,
        audioElements: {},
        // state information
        selectedTrack: 0,
        // transport settings
        stopped: true,
        // transport vars
        transportLoopSpot: 0,
        last: 0,
        tick: 0,
      };
    },
    computed: {
      tracks() {
        // all tracks
        return [ this.masterTrack ].concat( this.midiTracks );
      },
      track() {
        // the currently selected track
        return this.tracks[ this.selectedTrack ];
      },
      trackCount() {
        return this.midiTracks.length + 1;
      },
      selectedPattern() {
        // current track's active pattern
        return this.track.activePattern;
      },
      masterPattern() {
        // current pattern of master track
        return this.masterTrack.patterns[ this.masterTrack.activePattern ];
      },
      transportLoopDuration() {
        // more efficent live bpm changes
        return ( 60000 / this.masterPattern.bpm ) * this.masterPattern.divisions;
      },
      spotNext() {
        // get 0-1 spot to play to
        return this.transportLoopSpot / this.transportLoopDuration;
      },
    },
    methods: {
      onResize() {
        // keep window in the right shape
        this.$refs.app.style = 'width: 100vw; height:100vh';
      },
      trySet( data ) {
        // tries to set track or pattern selection
        switch ( data.mode ) {
        case 'track':
          if ( data.value >= 0 && data.value < this.trackCount ) {
            this.selectedTrack = data.value;
            return true;
          }
          break;
        case 'pattern':
          if ( ( this.track.patternIndex = data.value ) ) {
            return true;
          }
          break;
        default:
          break;
        }
        return false;
      },
      tryChange( mode, x ) {
        // moves up or down in tracks or patterns
        switch ( mode ) {
        case 'track':
          if (
            this.selectedTrack + x >= 0 &&
            this.selectedTrack + x < this.trackCount
          ) {
            this.selectedTrack += x;
            return true;
          }
          break;
        case 'pattern':
          if ( this.track.patternRelative( x ) ) {
            return true;
          }
          break;
        default:
          break;
        }
        return false;
      },
      tryCreate( mode ) {
        // attempt to make new track or pattern
        switch ( mode ) {
        case 'track':
          this.midiTracks.push( new MIDITrack( ++this.tracksCreated ) );
          this.selectedTrack = this.trackCount - 1;
          return true;
        case 'pattern':
          if ( this.track.newPattern() ) {
            return true;
          }
          break;
        default:
          break;
        }
        return false;
      },
      tryDelete( mode ) {
        // attempt to delete current track or pattern
        switch ( mode ) {
        case 'track':
          if ( this.track.type != TrackTypes.MASTER ) {
            this.midiTracks.splice( this.selectedTrack - 1, 1 );
            if ( !this.tryChange( 'track', 0 ) ) {
              this.tryChange( 'track', -1 );
            }
            return true;
          }
          break;
        case 'pattern':
          if ( this.track.deletePattern() ) {
            if ( !this.tryChange( 'pattern', 0 ) ) {
              this.tryChange( 'pattern', -1 );
            }
            return true;
          }
          break;
        default:
          break;
        }
        return false;
      },
      startAudioContext() {
        if ( this.audioContext.state != 'running' ) {
          this.audioContext
            .resume()
            .then(
              () => console.log( 'Web Audio API: AudioContext Running' ),
              this.startAudioContext,
            );
        }
      },
    },
    created() {
      // register transport functions
      this.transport = {
        callback: null,
        play: function ( data = 0 ) {
          // THE LOOPING PLAY FUNCTION

          // if the stopped flag is on, reset and kill
          if ( this.stopped ) {
            this.transportLoopSpot = 0;
            this.last = 0;
            this.tick = 0;
            console.log( 'STOPPED' );
            return;
          }

          // update current ms in playback
          this.transportLoopSpot += data - this.tick;

          // play all tracks at current %s
          for ( let track of this.tracks ) {
            track.playAt( this.last, this.spotNext );
          }

          // if we're at/past the end, reset w overflow
          // else, store the current play-to %
          if ( this.spotNext >= 1 ) {
            this.transportLoopSpot -= this.transportLoopDuration;
            this.last = 0;
            console.log( 'NEW BAR' );
          } else {
            this.last = this.spotNext;
          }

          // store last tick for delta time
          this.tick = data;

          requestAnimationFrame( this.transport.play );
        }.bind( this ),
        enter: function ( data ) {
          // THE "START PLAYING" FUNCTION
          if ( this.stopped ) {
            this.stopped = false;
            this.tick = data;
            requestAnimationFrame( this.transport.play );
          }
        }.bind( this ),
        start: function ( cb = null ) {
          this.transport.stop()
          if ( cb != null ) {
            this.callback = cb;
          }
          this.transportLoopSpot = 0;
          this.last = 0;
          this.tick = 0;
          requestAnimationFrame( this.transport.enter )
        }.bind( this ),
        stop: function () {
          this.stopped = true;
          if ( this.callback != null ) {
            let cb = this.callback;
            this.callback = null;
            cb();
          }
        }.bind( this ),
      };
    },
    mounted() {
      // register events programatically
      const EVENTS = [
        { name: 'try-inc', callback: v => this.tryChange( v, 1 ) },
        { name: 'try-dec', callback: v => this.tryChange( v, -1 ) },
        { name: 'try-create', callback: v => this.tryCreate( v ) },
        { name: 'try-delete', callback: v => this.tryDelete( v ) },
        { name: 'try-set', callback: v => this.trySet( v ) },
        { name: 'transport', callback: v => this.transport[ v ]() },
      ];
      for ( let e of EVENTS ) {
        this.$refs.main.$on( e.name, e.callback );
      }

      // stanard event for resize, call once for good luck
      window.addEventListener( 'resize', this.onResize );
      this.onResize();

      // audio context waits for user interaction
      setTimeout( this.startAudioContext, 500 );

      // attempt to start midi
      if ( navigator.requestMIDIAccess == undefined ) {
        console.warn( "Browser does not support Web MIDI API" );
      } else {
        this.midi.start( navigator.requestMIDIAccess() );
      }
    },
  };
</script>

<template>
<div id="app"
       ref="app">
    <MainPanel ref="main" />
    <div id="nav">
      [
      <router-link to="/Instrument">Instrument</router-link>] [
      <router-link to="/Sequencer">Sequencer</router-link>] [
      <router-link to="/MIDI">MIDI</router-link>] [
      <router-link to="/Mixing">Mixing</router-link>]
    </div>
    <router-view />
    <div id="audio_bin">

    </div>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Share+Tech&family=Share+Tech+Mono&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  :not(input) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  input[type='number'] {
    appearance: none;
    -moz-appearance: textfield;

    background-color: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .btn {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 0.25em 2px rgba(120, 120, 120, 0.8) inset;
    color: rgb(136, 136, 136);
    transition: background-color 0.25s ease-out, box-shadow 0.125s ease-out;
    overflow: hidden, color 0.125s;
  }

  .btn:hover {
    background-color: rgba(127, 127, 127, 0.5);
    color: rgb(100, 100, 100);
  }

  .btn:active {
    box-shadow: 0 0 0.5em 5px rgba(48, 48, 48, 0.2) inset;
    color: rgb(48, 48, 48);
  }

  #app {
    font-family: 'Share Tech', sans-serif;
    text-align: center;
    overflow: hidden;
    font-size: 1.25em;

    color: rgb(48, 48, 48);
  }
</style>
