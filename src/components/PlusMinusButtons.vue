<script>

  export default {
    name: 'PlusMinusButtons',
    props: {
      mode: String,
      local: Boolean,
    },
    computed: {},
    methods: {
      inc() {
        if (this.local) {
          this.$emit('try-inc', this.mode);
        } else {
          this.$parent.$emit('try-inc', this.mode);
        }
      },
      dec() {
        if (this.local) {
          this.$emit('try-dec', this.mode);
        } else {
          this.$parent.$emit('try-dec', this.mode);
        }
      },
    },
  };

</script>

<template>

  <div class="btn-holder">
    <div class="btn"
         style="left: 0;"
         v-on:click="dec">
      -
    </div>
    <div class="btn"
         style="right: 0;"
         v-on:click="inc">
      +
    </div>
  </div>

</template>

<style scoped>

  .btn-holder {
    position: absolute;
    width: 100%;
    top: 100%;
  }

  .btn {
    position: absolute;
    width: 1em;
    height: 1em;
    margin: 0.25em 0;
    line-height: 1em;
  }

</style>
