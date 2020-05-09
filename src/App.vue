<template>
  <div id="app">
    <alert></alert>
    <router-view/>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue';

export default {
  name: 'app',
  components: { Alert },
  data() {
    return {

    };
  },
  updated() {
    // 換頁時收合選單(mobile)
    this.$bus.$emit('navbar:hide');
  },
};
</script>

<style lang="scss">
  @import "./assets/sass/all.scss";
</style>
