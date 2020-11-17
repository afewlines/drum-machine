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
      };
    },
    mounted() {
      // what happens when it loads goes here
    },
    computed: {

      masterBPM: {
        get: function() {
          //return this.$parent.bpm;
          return this.$parent.masterPattern.bpm;
        },
        set: function(x) {
          if (x > 0) {
            this.$parent.masterPattern.bpm = x;
          }
        },
      },
      patternSel: {
        get: function() {
          // get index of selected pattern
          return this.$parent.selectedPattern;
        },
        set: function(x) {
          // try to set index of selected pattern
          this.$emit('try-set', { mode: 'pattern', value: x });
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
    },
    methods: {
      // functions go here
      tryChange(mode, inc) {
        switch (mode) {
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
      <div id="info" class="column w25">

      </div>
      <!-- RIGHT, SEQUENCER COLUMN -->
      <div id="preview" class="column w75">

      </div>
    </div>
  </div>

</template>

<style scoped>

  .container {
    /* height: 15em; */
    max-width: 50em;
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
