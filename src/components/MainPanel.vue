<script>

  import PlusMinusButtons from '@/components/PlusMinusButtons.vue';
  import CreateDeleteButtons from '@/components/CreateDeleteButtons.vue';
  import { audios } from '@/js/References.js';
  import { Track, MIDITrack, MasterTrack } from '@/js/TrackClasses.js';

  const AudioContext = window.AudioContext || window.webkitAudioContext;

  export default {
    name: 'MainPanel',
    components: {
      PlusMinusButtons,
      CreateDeleteButtons,
    },
    data() {
      return {
        // references
        audioContext: new AudioContext(),
        audioReferences: audios,
        // resources
        tracks: [new MasterTrack(-1)],
        audioElements: {},
        // state information
        selectedTrack: 0,
        selectedPattern: 0,
      };
    },
    methods: {
      tryChange(mode, v, x) {
        switch (mode) {
          case 'track':
            if (this[v] + x < 0 || this[v] + x >= this.tracks.length) {
              return false;
            }
            break;
          case 'pattern':
            try {
              if (
                this[v] + x < 0 ||
                this[v] + x >= this.tracks[this.selectedTrack].patterns.length
              ) {
                return false;
              }
            } catch (e) {
              return false;
            }
            break;
          default:
            break;
        }
        this[v] += x;
        return true;
      },
      tryCreate(mode) {
        let out = false;
        switch (mode) {
          case 'track':
            out = this.tracks.push(new MIDITrack(this.tracks.length));
            out = true;
            break;
          case 'pattern':
            try {
              out = this.tracks[this.selectedTrack].patterns.push('nice');
              out = true;
            } catch (e) {
              out = false;
            }
            break;
          default:
            break;
        }
        return out;
      },
      tryDelete(mode) {
        let out = false;
        switch (mode) {
          case 'track':
            if (this.tracks.length > 1) {
              this.tracks.splice(this.selectedTrack,1);
              out = true;
            }
            break;
          case 'pattern':
            try {
              if (this.tracks[this.selectedTrack].patterns.length > 1) {
                this.tracks[this.selectedTrack].patterns.splice(this.selectedPattern,1);
                out = true;
              }
            } catch (e) {
              out = false;
            }
            break;
          default:
            break;
        }
        return out;
      },
    },
  };

</script>

<template>

  <div class="container">
    <div class="panel">
      <div class="column w25" id="info">
        <div class="box arrows"
             id="trackNum"
             style="float: left; margin-left: 0.75em;">
          <h3 style="left: -1.35em;">TRACK</h3>
          <input type="number"
                 class="number"
                 v-model.lazy.number="selectedTrack">
          <PlusMinusButtons var="selectedTrack" mode="track" />
          <CreateDeleteButtons mode="track" />
        </div>
        <div class="box arrows"
             id="patternNum"
             style="float: right; margin-right: 0.75em;">
          <h3 style="right: -1.35em;">PATTERN</h3>
          <input v-if="this.tracks[this.selectedTrack].patterns.length > 0"
                 type="number"
                 class="number"
                 v-model.lazy.number="selectedPattern">
          <PlusMinusButtons var="selectedPattern" mode="pattern" />
          <CreateDeleteButtons mode="pattern" />
        </div>
      </div>
      <div class="column w50">
        THE PREVIEW WILL GO <br> HERE
      </div>
      <div class="column w25">
        BUDDY
      </div>
    </div>
  </div>

</template>

<style scoped>

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

  .number {
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 1.75em;
    font-family: 'Share Tech Mono', monospace;
    font-size: 2.5em;
    overflow: hidden;
    color: rgb(136, 136, 136);
    box-shadow: 0 0 0.5em;
    text-shadow: 0 0 0.25em black;
  }

  .container {
    height: max-content;
    max-width: 50em;
    margin: auto;
    padding: 1em;
  }

  .panel {
    width: 100%;
    height: 100%;
    padding: 1em 0.5em;
    background-color: rgb(48, 48, 48);
  }

  .panel:after {
    content: '';
    display: table;
    clear: both;
  }

  .column {
    float: left;
    position: relative;
    background-color: rgb(136, 136, 136);
    box-shadow: 0 0 0.5em 2px rgb(159, 159, 159) inset;
  }

  .column.w25 {
    width: calc(25% - 1em);
    margin: 0 0.5em;
  }

  .column.w50 {
    width: calc(50% - 1em);
    margin: 0 0.5em;
  }

  .box {
    position: relative;
    width: 4.25em;
    height: 4.25em;
    margin: 0.5em 0;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1em 2px rgba(120, 120, 120, 0.8) inset;
  }

  .box.arrows {
    margin-bottom: 1.75em;
  }

</style>
