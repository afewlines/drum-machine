<script>

  export default {
    name: 'PlusMinusButtons',
    props: {},
    computed: {},
    methods: {
      start() {
        this.$parent.$emit('transport', 'start');
      },
      stop() {
        this.$parent.$emit('transport', 'stop');
      },
    },
  };

</script>

<template>

  <div class="btn-holder">
    <div class="btn" v-on:click="stop">
      &#x25a0;
    </div>
    <div class="btn" v-on:click="start">
      &#x29d0;
    </div>
  </div>

</template>

<style scoped>

  .btn-holder {
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
  }

  .btn {
    position: relative;
    width: 1em;
    height: 1em;
    margin: 1em;
    line-height: 1em;
    font-size: 1em;
    transform: scale(2);
  }

</style>
