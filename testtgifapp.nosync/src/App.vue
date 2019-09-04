<template>
  <div id="app">
    <appHeader />
  </div>
</template>

<script>
import appHeader from './components/layout/header.vue'

export default {
  name: 'app',
  components: {
    appHeader
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
