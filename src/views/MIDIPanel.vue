<script>
// import ui components
  //import PlusMinusButtons from '@/components/PlusMinusButtons.vue';

  // import our classes
  import { TrackTypes } from '@/js/TrackClasses.js';

  export default {
    name: 'MIDIPanel',
    components: {
      //PlusMinusButtons,
    },
    data() {
      // variables go here
      return {
        trackTypes: TrackTypes,
        recording: false,
        overdub: false,
      };
    },
    mounted() {
      // attempt to start midi
      if ( navigator.requestMIDIAccess == undefined ) {
        console.warn( "Browser does not support Web MIDI API" );
      } else {
        this.midi.start( navigator.requestMIDIAccess(), window.prompt );
      }

    },
    computed: {
      masterBPM: {
        get: function () {
          //return this.$parent.bpm;
          return this.$parent.masterPattern.bpm;
        },
        set: function ( x ) {
          if ( x > 0 ) {
            this.$parent.masterPattern.bpm = x;
          }
        },
      },
      patternSel: {
        get: function () {
          // get index of selected pattern
          return this.$parent.selectedPattern;
        },
        set: function ( x ) {
          // try to set index of selected pattern
          this.$emit( 'try-set', { mode: 'pattern', value: x } );
        },
      },
      activeTrack() {
        // current track object
        return this.$parent.track;
      },
      activeTrackHasPattern() {
        // if active track has pattern
        return this.activeTrack.activePattern >= 0;
      },
      activePattern() {
        //current patterns
        return this.activeTrack.pattern;
      },
      activePatternType() {
        //current patterns
        return this.activeTrack.pattern.type;
      },
      validSwap() {
        return this.activeTrack.patterns.length > 0 && [ 'midi', 'graphical' ].includes( this.activePattern.type );
      },
      validPattern() {
        return this.activeTrack.patterns.length > 0 && this.activePattern.type == 'midi'
      },
      midi() {
        return this.$parent.midi;
      },
    },
    methods: {
      record( mode ) {
        // mode: true turns off, false turns on
        if ( mode ) {
          this.recording = false;
          this.stopRecording();
        } else {
          this.recording = true;
          this.startRecording();
        }
      },
      startRecording() {
        this.$parent.transport.start( () => this.record( true ) );
        this.midi.midiRecv = this.activePattern.newRecording( this.$parent.transportLoopDuration, this.overdub );
      },
      stopRecording() {
        this.$parent.transport.callback = null;
        this.midi.midiRecv = null;
      },
      getActivePatternType() {
        return this.activePattern.type;
      },
      // functions go here
      tryChange( mode, inc ) {
        switch ( mode ) {
        case 'bpm':
          this.masterBPM += inc;
          return true;
        default:
          break;
        }
        return false;
      },
    },
  };
</script>

<template>
<div class="container">
    <div class="panel">
      <!-- LEFT, INFO COLUMN -->
      <div id="info"
           class="column w25">
        <div class="box">
          <div class="btn"
               v-if="validSwap"
               @click="activeTrack.swapActivePatternType()">
            {{`MIDI ${validPattern?'Enabled':'Disabled'}`}}
          </div>
        </div>
      </div>
      <!-- RIGHT, RECORD AND PREVIEW -->
      <div id="preview"
           class="column w75">
        <div class="box">
          <div class="btn"
               @click="record(recording)"
               v-if="validPattern">
            {{recording?"Stop":"Record"}}
          </div>
          <div class="btn"
               style="flex-grow:0.25; font-size: 0.75em;"
               @click="()=>overdub = !overdub"
               v-if="validPattern">
            {{overdub?"Overdub":"Overwrite"}}
          </div>
        </div>
        <div class="box"
             style="flex-grow:1;">
          <div class="preview"
               v-if="validPattern">
            {{recording?"RECORDING":`Length: ${activePattern.timedTriggers.length}`}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
    /* height: 15em; */
    max-width: 25em;
    margin: auto;
    padding: 1em;
  }

  .panel {
    width: 100%;
    height: 100%;
    padding: 1em 0.5em;
    background-color: rgb(48, 48, 48);
    z-index: -1;

    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .panel:after {
    content: '';
    display: table;
    clear: both;
  }

  .column {
    /* float: left; */
    position: relative;
    background-color: rgb(136, 136, 136);
    box-shadow: 0 0 0.5em 2px rgb(159, 159, 159) inset;
    z-index: 0;
    margin: 0 0.5em;

    display: flex;
    justify-content: center;
  }

  .column.w25 {
    flex-grow: 1;
  }

  .column.w75 {
    flex-grow: 25;
  }

  .box {
    position: relative;
    width: 4.5em;
    height: 4.5em;
    margin: 0.25em;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1em 2px rgba(120, 120, 120, 0.8) inset;
    display: flex;
    flex-direction: column;
  }

  .w25 .box {
    flex-grow: 1;
  }

  .w25 .btn {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
  }

  .w75 .btn {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
  }

  .preview {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;

    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 0.25em 2px rgba(120, 120, 120, 0.8) inset;
    color: rgb(136, 136, 136);
    overflow: hidden;
  }

  /* INFO FORMATTING */

  h3 {
    height: 100%;
    margin: 0;
    padding: 0;
    position: absolute;
    writing-mode: vertical-rl;
    text-orientation: upright;
    text-align: center;
    font-size: 0.5em;
  }


  /* PREVIEW TABLE FORMATTING */
</style>
