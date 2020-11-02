<script>

  // import ui components
  import PlusMinusButtons from '@/components/PlusMinusButtons.vue';

  export default {
    name: 'SequencerPanel',
    components: {
      PlusMinusButtons,
    },
    data() {
      // variables go here
      return {
      };
    },
    mounted() {
      // what happens when it loads goes here
    },
    computed: {
      // fake variables go here
      // TODO NOAH:
      // make 'active pattern' getter, will be pattern of current track
      // hint; see active track, parent component is 'App.vue'
      //
      // track/parent sel shouldn't really be used here i don't think
      // BUT you will need similar structure for:
      // the current track's current pattern's triggers
      //    (will have to verify that the track's active pattern is valid)
      // the current bpm
      //    (from master track's active pattern)
      //
      // that's all i can think of off the top o my head here
      // oh and to test/print, use console.log(). it'll be in your inspect>console
      // ADDENDUM: noticed there's an issue opening the vue tab in inspect
      //    while playing, so uh just don't.
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
      activeTrack() {
        // current track object
        return this.$parent.track;
      },
    },
    methods: {
      // functions go here
    },
  };

</script>

<template>

  <div class="container">
    <div class="panel">
      <!-- LEFT, INFO COLUMN -->
      <div id="info" class="column w25">
          <!-- TRACK -->
          <div class="box arrows">
            <h3 style="left: -1.35em;">HEY</h3>
            <input type="number"
                   class="number"
                   style="font-size: 2.5em;"
                   v-model.lazy.number="trackSel">
            <PlusMinusButtons mode="track" />
          </div>
          <!-- PATTERN -->
          <div class="box arrows">
            <h3 style="right: -1.35em;">NOAH</h3>
            <input v-if="activeTrack.patternCount>0"
                   type="number"
                   class="number"
                   style="font-size: 2.5em;"
                   v-model.lazy.number="patternSel">
            <PlusMinusButtons mode="pattern" />
          </div>
      </div>
      <!-- RIGHT, SEQUENCER COLUMN -->
      <div id="preview" class="column w75">
        <!-- ELEMENTS -->
        <transition-group name="list-blocks"
                          tag="div"
                          class="row-block-div">
          <div v-for="(div, iel) in activeTrack.pattern.triggers"
               :key="iel"
               :class="'row-block'+(div>0?' on':'')">
          </div>
        </transition-group>

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

  .column.w25{
    flex-grow:1;
  }

  .column.w75{
    flex-grow:25;
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

  .box.arrows{
    margin: 0.75em;
    margin-bottom: 1.75em;
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

  .row-block-div {
    padding: 0.25em;

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
