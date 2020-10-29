<script>

  export default {
    name: 'CreateDeleteButtons',
    props: {
      var: String,
      mode: String,
    },
    computed: {},
    methods: {
      create() {
        this.$parent.tryCreate(this.mode);
      },
      del() {
        this.$parent.tryDelete(this.mode);
      },
    },
  };

</script>

<template>

  <div class="btn-holder">
    <div class="btn"
         style="float: left; margin-left:0.25em;"
         v-on:click="del">
      &#x2715;
    </div>
    <div class="btn"
         style="float: right; margin-right:0.25em;"
         v-on:click="create">
      &#x2739;
    </div>
  </div>

</template>

<style scoped>

  .btn-holder {
    position: relative;
  }

  .btn {
    position: relative;
    width: 0.75em;
    height: 0.75em;
    margin: 0.375em 0;
    font-size: 1em;
    line-height: 0.75em;
  }

</style>
