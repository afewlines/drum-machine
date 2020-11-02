<script>

  // import components that do things
  import PlusMinusButtons from '@/components/PlusMinusButtons.vue';
  import CreateDeleteButtons from '@/components/CreateDeleteButtons.vue';
  import TransportButtons from '@/components/TransportButtons.vue';

  export default {
    name: 'MainPanel',
    components: {
      PlusMinusButtons,
      CreateDeleteButtons,
      TransportButtons,
    },
    data() {
      return {
        // not hooked up yet, might not hook up.
        // for pagination of high track #
        zoom: 5,
        offset: 0,
      };
    },
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
          return this.$parent.selectedPattern;
        },
        set: function(x) {
          // try to set index of selected pattern
          this.$emit('try-set', { mode: 'pattern', value: x });
        },
      },
      tracksCount() {
        // # of tracks
        return this.$parent.trackCount;
      },
      tracksAll() {
        // all the tracks!
        return this.$parent.tracks;
      },
      trackReal() {
        return this.$parent.track;
      },
      patternCount() {
        // # of patterns in track
        return this.trackReal.patternCount;
      },
      previewRows() {
        // all rows that can be displayed
        let out = [];
        for (let i = 0; i < this.tracksCount; i++) {
          if (i + this.offset < this.tracksCount) {
            if (this.tracksAll[i + this.offset].activePattern >= 0) {
              out.push(this.tracksAll[i + this.offset]);
            }
          }
        }
        return out;
      },
      phspot() {
        return this.$parent.stopped
          ? 0
          : (100 * this.$parent.transportLoopSpot) /
              this.$parent.transportLoopDuration;
      },
    },
    methods: {
      range(num){
        return Array.from(new Array(num), (x, i) => i);
      }
    },
  };

</script>

<template>

  <div class="container">
    <div class="panel">
      <!-- LEFT, INFORMATION/TRANSPORT COLUMN -->
      <div id="info" class="column w25">
        <div style="flex-flow: row; height: 6em;">
          <!-- TRACK -->
          <div class="box arrows" style="float: left; margin-left: 0.75em;">
            <h3 style="left: -1.35em;">TRACK</h3>
            <input type="number"
                   class="number"
                   style="font-size: 2.5em;"
                   v-model.lazy.number="trackSel">
            <PlusMinusButtons mode="track" />
            <CreateDeleteButtons mode="track" />
          </div>
          <!-- PATTERN -->
          <div class="box arrows" style="float: right; margin-right: 0.75em;">
            <h3 style="right: -1.35em;">PATTERN</h3>
            <input v-if="patternCount>0"
                   type="number"
                   class="number"
                   style="font-size: 2.5em;"
                   v-model.lazy.number="patternSel">
            <PlusMinusButtons mode="pattern" />
            <CreateDeleteButtons mode="pattern" />
          </div>
        </div>
        <!-- TRANSPORT -->
        <div class="box transport">
          <TransportButtons />
        </div>
      </div>
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
              <div v-for="iel in range(track.pattern.divisions)"
                   :key="iel+1"
                   :class="'row-block'+(track.pattern.triggers[iel]>0?' on':'')">
              </div>
            </transition-group>
          </div>
        </transition-group>
        <!-- PLAYHEAD -->
        <div class="playhead-area">
          <div class="playhead" :style="`left: ${this.phspot}%;`"> </div>
        </div>
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

  #info {
    flex-flow: column;
  }

  /* TRANSPORT FORMATTING */

  .box.transport {
    display: flex;
    position: static;
    flex-grow: 1;
    width: auto;
    height: auto;
    margin: 0.5em 0.5em;
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

  .details {
    display: flex;
    flex-grow: 0;
    order: -1;
    flex-direction: column;

    align-self: center;

    padding-left: 0.25em;
    padding-right: 0.125em;

    font-family: 'Share Tech Mono', monospace;
  }

  .detail-box {
    flex-grow: 2;
    font-size: 0.75em;
  }

  .detail-dot {
    font-size: 0.125em;
    flex-grow: 1;
    height: 1em;
    line-height: 1em;
  }

  /* THAT STUPID LINE TO TRACE ACROSS */
  .playhead-area {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 10em;
    padding-left: 1.5em;
    padding-right: 1.25em;
    /* box-shadow: 0 0 0.25em 1px rgba(71, 4, 4, 0.5); */
    /* background-color: rgb(71, 4, 4); */
  }

  .playhead {
    position: relative;
    top: 0;
    /* left: 100%; */
    width: 2px;
    height: 100%;
    /* box-shadow: 0 0 0.25em 2px rgba(48, 48, 48, 0.5); */
    background-color: rgb(48, 48, 48);
    z-index: -1;
  }

  /* EYECANDY FORMATTING */
  #eyecandy {
    height: 10em;
    line-height: 10em;
    text-align: center;
  }

</style>
