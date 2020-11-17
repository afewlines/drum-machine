<script>
// import our classes
  import { TrackTypes } from '@/js/TrackClasses.js';

  // paths to audio files
  import { audios } from '@/js/References.js';

  export default {
    name: 'InstrumentPanel',
    data() {
      // variables go here
      return {
        trackTypes: TrackTypes,
        audioResources: audios,
        currentStep: 1,
        selectedSource: "",
        selectedKit: "",
        selectedSample: "",
      };
    },
    mounted() {
      // what happens when it loads goes here
      let persistentVars = [ 'selectedSource', 'selectedKit', 'selectedSample' ];
      for ( let varName of persistentVars ) {
        if ( !( localStorage[ varName ] ) ) {
          localStorage[ varName ] = "";
        }
        this[ varName ] = localStorage[ varName ];
      }
    },
    computed: {

      modelSource: {
        get: function () {
          return this.selectedSource;
        },
        set: function ( x ) {
          localStorage.modelSource = x;
          this.selectedSource = x;
        },
      },
      modelKit: {
        get: function () {
          return this.selectedKit;
        },
        set: function ( x ) {
          localStorage.modelKit = x;
          this.selectedKit = x;
        },
      },
      modelSample: {
        get: function () {
          return this.selectedSample;
        },
        set: function ( x ) {
          localStorage.modelSample = x;
          this.selectedSample = x;
        },
      },

      activeTrack() {
        // current track object
        return this.$parent.track;
      },
      activeSource() {
        return this.audioResources[ this.selectedSource ]
      },
      activeKit() {
        return this.activeSource[ this.selectedKit ]
      },
      activeSample() {
        return this.activeKit[ this.selectedSample ]
      },
    },
    methods: {
      // functions go here
      tryLoadInstrument() {
        if ( this.selectedSource == "" || this.selectedKit == "" || this.selectedSample == "" ) {
          console.log( 'fail' );
          return false;
        }

        switch ( this.activeTrack.type ) {
        case this.trackTypes.MASTER:
          console.log( 'Hello master' );
          return true;
        case this.trackTypes.MIDI:
          console.log( 'Hello set MIDI' );
          this.activeTrack.setInstrument( this.activeSample );
          return true;
        default:
          break;
        }
        return false;
      },
      loadRandom() {
        let target = Object.keys( this.audioResources );
        this.selectedSource = target[ Math.floor( Math.random() *
          Math.floor( target.length ) ) ];

        target = Object.keys( this.activeSource );
        this.selectedKit = target[ Math.floor( Math.random() *
          Math.floor( target.length ) ) ];

        target = Object.keys( this.activeKit );
        this.selectedSample = target[ Math.floor( Math.random() *
          Math.floor( target.length ) ) ];
        this.tryLoadInstrument();
      }
    },
  };
</script>

<template>
<div class="container">
    <div class="panel">
      <!-- INSTRUMENT PANEL -->
      <div id="instrument"
           class="column w50">
        <!-- ELEMENTS -->
        <div class="row-div">
          <select class="row-el"
                  id="source1"
                  v-model="modelSource">
            <option v-for="source in Object.keys(audioResources)"
                    :key="source">{{source}}</option>
          </select>
          <select v-if="modelSource!=''"
                  class="row-el"
                  id="source2"
                  v-model="modelKit">
            <option v-for="kit in Object.keys(audioResources[modelSource])"
                    :key="kit">{{kit}}</option>
          </select>
          <select v-if="modelKit!=''"
                  class="row-el"
                  id="source3"
                  v-model="modelSample">
            <option v-for="(sample, index) in audioResources[modelSource][modelKit]"
                    :key="sample.id"
                    :value="index">{{sample.name}}</option>
          </select>

        </div>
        <div class="row-div">
          <div class="btn-holder">
            <!-- THIS IS THE BUTTON!!!!!!!!!!!!!! -->
            <div class="btn"
                 v-on:click="tryLoadInstrument"
                 id="assignButton">
              Assign
            </div>
            <div class="btn"
                 v-on:click="loadRandom">
              Random
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
/* CSS */
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

  .column {
    /* float: left; */
    position: relative;
    background-color: rgb(136, 136, 136);
    box-shadow: 0 0 0.5em 2px rgb(159, 159, 159) inset;
    z-index: 0;
    margin: 0 0.5em;

    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .column.w50 {
    flex-grow: 1;
  }

  /* INFO FORMATTING */

  .btn-holder {
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
  }

  .btn {
    position: relative;
    width: 3em;
    height: 1.25em;
    margin: 0.25em;
    line-height: 1.25em;
    font-size: 1.5em;
  }

  /* PREVIEW TABLE FORMATTING */

  .row-div {
    padding: 0.25em;

    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }

  .row-el {
    background-clip: content-box;
    padding: 0.125em;
    background-color: rgba(36, 88, 233, 0.2);
    transition: all 0.25 ease-in-out;
    flex-grow: 1;
  }
</style>
