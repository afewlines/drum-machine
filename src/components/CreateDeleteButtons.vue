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
        this.$parent.$emit('try-create', this.mode);
      },
      del() {
        this.$parent.$emit('try-delete', this.mode);
      },
    },
  };

</script>

<template>

  <div class="btn-holder">
    <div class="btn"
         :id = "`del${mode}`"
         style="left: 0; margin-left:1.25em;"
         v-on:click="del">
      &#x2715;
    </div>
    <div class="btn"
         :id = "`create${mode}`"
         style="right: 0; margin-right:1.25em;"
         v-on:click="create">
      &#x2739;
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
    width: 0.75em;
    height: 0.75em;
    margin: 0.375em 0;
    font-size: 1em;
    line-height: 0.75em;
  }

</style>
