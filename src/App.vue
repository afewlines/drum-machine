<script>

  // components needing to be imported
  import MainPanel from '@/components/MainPanel.vue';

  // paths to audio files
  import { audios } from '@/js/References.js';

  // classes and types from the track class file
  import { TrackTypes, MIDITrack, MasterTrack } from '@/js/TrackClasses.js';

  // classes and types from the sequencer class file
  import { GraphicalSequencer } from '@/js/SequencerClasses.js';

  // prepare audio context for cross-browser audio
  const AudioContext = window.AudioContext || window.webkitAudioContext;

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
        audioContext: new AudioContext(),
        audioReferences: audios,
        // resources
        tracks: [new MasterTrack()],
        tracksCreated: 0,
        audioElements: {},
        // state information
        selectedTrack: 0,
        // temp transport testing
        timeInfo: { bpm: 174, beats: 8 },
        transportLoopDuration: 0,
        transportLoopSpot: 0,
        last: 0,
        tick: 0,
      };
    },
    computed: {
      track() {
        // the currently selected track
        return this.tracks[this.selectedTrack];
      },
      selectedPattern() {
        // current track's active pattern
        return this.track.activePattern;
      },
    },
    methods: {
      transportPlay(data) {
        // this is the play loop, currently spits out delta times
        this.last = this.tick;
        this.tick = data;
        let delta = data - this.last;
        this.transportLoopSpot += delta;
        let reset = this.transportLoopSpot >= this.transportLoopDuration;
        for (let track of this.tracks) {
          track.playAt(this.transportLoopSpot, reset);
        }
        if (reset) {
          this.transportLoopSpot = 0;
        }
        requestAnimationFrame(this.transportPlay);
      },
      onResize() {
        // keep window in the right shape
        this.$refs.app.style = 'width: 100vw; height:100vh';
      },
      trySet(data) {
        // tries to set track or pattern selection
        switch (data.mode) {
          case 'track':
            if (data.value >= 0 && data.value < this.tracks.length) {
              this.selectedTrack = data.value;
              return true;
            }
            break;
          case 'pattern':
            if ((this.track.patternIndex = data.value)) {
              return true;
            }
            break;
          default:
            break;
        }
        return false;
      },
      tryChange(mode, x) {
        // moves up or down in tracks or patterns
        switch (mode) {
          case 'track':
            if (
              this.selectedTrack + x >= 0 &&
              this.selectedTrack + x < this.tracks.length
            ) {
              this.selectedTrack += x;
              return true;
            }
            break;
          case 'pattern':
            if ((this.track.patternRelative = x)) {
              return true;
            }
            break;
          default:
            break;
        }
        return false;
      },
      tryCreate(mode) {
        // attempt to make new track or pattern
        switch (mode) {
          case 'track':
            this.tracks.push(new MIDITrack(++this.tracksCreated));
            this.selectedTrack = this.tracks.length - 1;
            return true;
          case 'pattern':
            return this.track.newPattern();
          default:
            break;
        }
        return false;
      },
      tryDelete(mode) {
        // attempt to delete current track or pattern
        switch (mode) {
          case 'track':
            if (this.tracks[this.selectedTrack].type != TrackTypes.MASTER) {
              this.tracks.splice(this.selectedTrack, 1);
              if (!this.tryChange('track', 0)) {
                this.tryChange('track', -1);
              }
              return true;
            }
            break;
          case 'pattern':
            if (this.track.deletePattern()) {
              if (!this.tryChange('pattern', 0)) {
                this.tryChange('pattern', -1);
              }
              return true;
            }
            break;
          default:
            break;
        }
        return false;
      },
    },
    created() {
      // prepare some variables
      this.transportLoopDuration =
        (60000 / this.timeInfo.bpm) * this.timeInfo.beats;
    },
    mounted() {
      // register events programatically
      const EVENTS = [
        { name: 'try-inc', callback: v => this.tryChange(v, 1) },
        { name: 'try-dec', callback: v => this.tryChange(v, -1) },
        { name: 'try-create', callback: v => this.tryCreate(v) },
        { name: 'try-delete', callback: v => this.tryDelete(v) },
        { name: 'try-set', callback: v => this.trySet(v) },
      ];

      for (let e of EVENTS) {
        this.$refs.main.$on(e.name, e.callback);
      }
      // stanard event for resize, call once for good luck
      window.addEventListener('resize', this.onResize);
      this.onResize();
    },
  };

</script>

<template>

  <div id="app" ref="app">
    <MainPanel ref="main" />
    <div id="nav">
      [
      <router-link to="/">Instrument</router-link>] [
      <router-link to="/">Sequencer</router-link>] [
      <router-link to="/">Mixing</router-link>]
    </div>
    <router-view />
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
