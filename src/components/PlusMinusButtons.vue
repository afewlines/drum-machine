<script>

  export default {
    name: 'PlusMinusButtons',
    props: {
      var: String,
      mode: String,
    },
    computed: {},
    methods: {
      inc() {
        this.$parent.tryChange(this.mode, this.var, 1);
      },
      dec() {
        this.$parent.tryChange(this.mode, this.var, -1);
      },
    },
  };

</script>

<template>

  <div class="btn-holder">
    <div class="btn"
         style="float: left;"
         v-on:click="dec">
      -
    </div>
    <div class="btn"
         style="float: right;"
         v-on:click="inc">
      +
    </div>
  </div>

</template>

<style scoped>

  .btn-holder {
    position: relative;
  }

  .btn {
    position: relative;
    width: 1em;
    height: 1em;
    margin: 0.25em 0;
    line-height: 1em;
  }

</style>
