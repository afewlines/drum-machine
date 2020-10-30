<script>

  // import components that do things
  import PlusMinusButtons from '@/components/PlusMinusButtons.vue';
  import CreateDeleteButtons from '@/components/CreateDeleteButtons.vue';

  export default {
    name: 'MainPanel',
    components: {
      PlusMinusButtons,
      CreateDeleteButtons,
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
        // THIS ONE GOES BOTH WAYS
        // isn't this cool????
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
        // another 2-way
        get: function() {
          // get index of selected pattern
          return this.$parent.selectedTrack;
        },
        set: function(x) {
          // try to set index of selected pattern
          this.$emit('try-set', { mode: 'pattern', value: x });
        },
      },
      tracksCount() {
        // # of tracks
        return this.tracksAll.length;
      },
      tracksAll() {
        // all the tracks!
        return this.$parent.tracks;
      },
      patternsCount() {
        // # of patterns in track
        return this.tracksAll[this.trackSel].patterns.length;
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
      <!-- LEFT, INFORMATION COLUMN -->
      <div id="info" class="column w25">
        <!-- TRACK -->
        <div class="box arrows" style="float: left; margin-left: 0.75em;">
          <h3 style="left: -1.35em;">TRACK</h3>
          <input type="number"
                 class="number"
                 v-model.lazy.number="trackSel">
          <PlusMinusButtons mode="track" />
          <CreateDeleteButtons mode="track" />
        </div>
        <!-- PATTERN -->
        <div class="box arrows" style="float: right; margin-right: 0.75em;">
          <h3 style="right: -1.35em;">PATTERN</h3>
          <input v-if="patternsCount>0"
                 type="number"
                 class="number"
                 v-model.lazy.number="patternSel">
          <PlusMinusButtons mode="pattern" />
          <CreateDeleteButtons mode="pattern" />
        </div>
      </div>
      <!-- CENTER, PREVIEW COLUMN -->
      <div id="preview" class="column w50">
        <!-- ROWS -->
        <transition-group name="row-track"
                          tag="div"
                          class="preview-table">
          <div v-for="(track, itrack) in previewRows"
               :key="track.id"
               :class="'row-track-item'+((itrack==trackSel)?' highlighted':'')">
            <!-- ELEMENTS -->
            <transition-group name="list-blocks"
                              tag="div"
                              class="row-block-div">
              <div v-for="(div, iel) in track.data"
                   :key="iel"
                   :class="'row-block'+(div>0?' on':'')">
              </div>
            </transition-group>
          </div>
        </transition-group>
      </div>
      <!-- RIGHT, EYECANDY COLUMN -->
      <div id="eyecandy" class="column w25">
        EYECANDY
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

  .box.arrows {
    margin-bottom: 1.75em;
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

  /* PREVIEW TABLE FORMATTING */

  .preview-table {
    width: 100%;
    height: 6.5em;
    padding: 0.5em;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .row-track-item {
    box-shadow: 0 0 0em 0 rgba(64, 64, 64, 0.8) inset;
    transition: box-shadow 0.35s ease-in-out;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }

  .row-track-item.highlighted {
    box-shadow: 0 0 2em 0 rgba(200, 200, 200, 0.8) inset;
  }

  .row-track-enter-active,
  .row-track-leave-active {
    transition: transform 1s ease-in-out, opacity 1s ease-in-out;
  }

  .row-track-enter,
  .row-track-leave-to {
    transform: scaleY(0);
    opacity: 0;
  }

  .row-block-div {
    flex-grow: 1;
    display: flex;
    flex-direction: row;
  }

  .row-block {
    background-clip: content-box;
    padding: 0.25em;
    background-color: rgba(36, 88, 233, 0.2);
    transition: background-color 0.25 ease-in-out;
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

  /* EYECANDY FORMATTING */
  #eyecandy {
    height: 6.5em;
    line-height: 6.5em;
    text-align: center;
  }

</style>
