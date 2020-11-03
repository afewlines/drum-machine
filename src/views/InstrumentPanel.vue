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
    },
    computed: {
      activeTrack() {
        // current track object
        return this.$parent.track;
      },
      activeSource(){
        return this.audioResources[this.selectedSource]
      },
      activeKit(){
        return this.activeSource[this.selectedKit]
      },
      activeSample(){
        return this.activeKit[this.selectedSample]
      },
    },
    methods: {
      // functions go here
      tryLoadInstrument() {
        if (this.selectedSource =="" || this.selectedKit == "" || this.selectedSample == "") {
          return false;
        }
        console.log(this.audioResources[this.selectedSource][this.selectedKit]);
        switch (this.activeTrack.type) {
          case this.trackTypes.MASTER:
            console.log('Hello master');
            return true;
          case this.trackTypes.MIDI:
            console.log('Hello set MIDI');
            this.activeTrack.setInstrument(this.activeSample);
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
      <!-- INSTRUMENT PANEL -->
      <div id="instrument" class="column w50">
        <!-- ELEMENTS -->
        <div class="row-div">
            <select class="row-el"
                    v-model="selectedSource">
                   <option v-for="source in Object.keys(audioResources)"
                   :key="source">{{source}}</option>
            </select>
            <select v-if="selectedSource!=''"
                    class="row-el"
                    v-model="selectedKit">
                   <option v-for="kit in Object.keys(audioResources[selectedSource])"
                   :key="kit">{{kit}}</option>
            </select>
            <select v-if="selectedKit!=''"
                    class="row-el"
                    v-model="selectedSample">
                   <option v-for="(sample, index) in audioResources[selectedSource][selectedKit]"
                   :key="sample.id"
                   :value="index">{{sample.name}}</option>
            </select>

        </div>
        <div class="row-div">
          <div class="btn-holder">
            <!-- THIS IS THE BUTTON!!!!!!!!!!!!!! -->
            <div class="btn" v-on:click="tryLoadInstrument">
              Assign
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
