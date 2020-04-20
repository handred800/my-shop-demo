<template>
  <div id="app">
    <alert></alert>
    <router-view/>
  </div>
</template>

<script>
import Alert from '@/components/alert.vue'
export default {
  name: 'app',
  components:{Alert}
}
</script>

<style lang="scss">
  @import "./assets/all.scss"
</style>