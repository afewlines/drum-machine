<script>

  // @ is an alias to /src
  import MainPanel from '@/components/MainPanel.vue';

  export default {
    name: 'App',
    components: {
      MainPanel,
    },
    created() {},
    mounted() {
      window.addEventListener('resize', this.onResize);
      this.onResize(null);
    },
    methods: {
      onResize() {
        this.$refs.app.style = 'width: 100vw; height:100vh';
      },
    },
  };

</script>

<template>

  <div id="app" ref="app">
    <MainPanel />
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>

</template>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Share+Tech&family=Share+Tech+Mono&display=swap');

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
  }

  :not(input) {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  input[type='number'] {
    appearance: none;
    -moz-appearance: textfield;

    background-color: rgba(0, 0, 0, 0);
    outline: none;
    border: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .btn {
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 0.25em 2px rgba(120, 120, 120, 0.8) inset;
    color: rgb(136, 136, 136);
    transition: background-color 0.25s ease-out, box-shadow 0.125s ease-out;
    overflow: hidden, color 0.125s;
  }

  .btn:hover {
    background-color: rgba(127, 127, 127, 0.5);
    color: rgb(100, 100, 100);
  }

  .btn:active {
    box-shadow: 0 0 0.5em 5px rgba(48, 48, 48, 0.2) inset;
    color: rgb(48, 48, 48);
  }

  #app {
    font-family: 'Share Tech', sans-serif;
    text-align: center;
    overflow: hidden;
    /* font-size: 1.5em; */

    color: rgb(48, 48, 48);
  }

</style>
