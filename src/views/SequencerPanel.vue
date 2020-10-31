<script>

  // import components that do things
  import PlusMinusButtons from '@/components/PlusMinusButtons.vue';

  export default {
    name: 'SequencerPanel',
    components: {
      // PlusMinusButtons,
    },
    data() {
      return {
        // not hooked up yet, might not hook up.
        // for pagination of high track #
        zoom: 5,
        offset: 0,
      };
    },
    mounted() {},
    computed: {
      trackSel: {
        get: function() {
          // get index of selected track
          return this.$parent.selectedTrack;
        },
        set: function(x) {
          // try to set index of selected track
          this.$emit('try-set', { mode: 'track', value: x });
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
      trackReal() {
        // current track object
        return this.$parent.track;
      },
      previewRows() {
        // all rows that can be displayed
        let out = [];
        for (let i = 0; i < this.zoom; i++) {
          if (i + this.offset < this.tracksCount) {
            if (this.tracksAll[i + this.offset].activePattern >= 0) {
              out.push(this.tracksAll[i + this.offset]);
            }
          }
        }
        return out;
      },

    },
    methods: {},
  };

</script>

<template>

  <div class="container">
    <div class="panel">
      <!-- CENTER, PREVIEW COLUMN -->
      <div id="preview" class="column w50">
        <!-- ROWS -->
        <transition-group name="row-track"
                          tag="div"
                          class="preview-table">
          <div v-for="track in previewRows"
               :key="track.id"
               :class="'row-track-item'+((track.id==trackReal.id)?' highlighted':'')">
            <!-- ELEMENTS -->
            <div class="details">
              <div class="detail-box" style="top: 0;">{{track.activePattern}}</div>
              <div class="detail-dot">-</div>
              <div class="detail-box" style="bottom: 0; font-size: 0.5em;">{{track.patternCount-1}}</div>
            </div>
            <transition-group name="list-blocks"
                              tag="div"
                              class="row-block-div">
              <div v-for="(div, iel) in track.pattern.triggers"
                   :key="iel"
                   :class="'row-block'+(div>0?' on':'')">
              </div>
            </transition-group>
          </div>
        </transition-group>
        <!-- PLAYHEAD -->
        <div class="playhead-area" >
              <div class="playhead" :style="`left: ${this.phspot}%;`"> </div>
        </div>
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
    z-index: 0;
    width: calc(100% - 1em);
    margin: 0 0.5em;
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

  .box {
    position: relative;
    width: 4.25em;
    height: 4.25em;
    margin: 0.5em 0;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1em 2px rgba(120, 120, 120, 0.8) inset;
  }

  .number {
    position: absolute;
    height: min-content;
    width: 100%;
    top: 0;
    left: 0;

    overflow: hidden;
    box-shadow: 0 0 0.5em;

    font-family: 'Share Tech Mono', monospace;
    line-height: 1.75em;
    text-align: center;
    text-shadow: 0 0 0.25em black;
    color: rgb(136, 136, 136);
  }

  /* PREVIEW TABLE FORMATTING */

  .preview-table {
    width: 100%;
    height: 10em;
    padding: 0.5em;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  .row-track-item {
    box-shadow: 0 0 0em 0 rgba(64, 64, 64, 0.8) inset;
    transition: box-shadow 0.35s ease-in-out;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }

  .row-block-div {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }

  .row-block {
    background-clip: content-box;
    padding: 0.125em;
    background-color: rgba(36, 88, 233, 0.2);
    transition: all 0.25 ease-in-out;
    flex-grow: 1;
  }

  .row-block.on {
    background-color: rgba(36, 88, 233, 1);
  }

  .list-blocks-enter-active,
  .list-blocks-leave-active {
    transition: all 0.25s ease-in-out;
  }

  .list-blocks-enter,
  .list-blocks-leave-to {
    opacity: 0;
    transform: scaleX(0);
  }

  .list-blocks-move {
    transition: transform 1s;
  }

</style>
