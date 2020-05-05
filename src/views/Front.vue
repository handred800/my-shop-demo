<template>
  <div class="position-relative">
    <navbar></navbar>
    <main class="container-fluid position-relative">
      <div class="main-wrapper">
        <router-view></router-view>
      </div>
    </main>
    <footer-section></footer-section>
    <div class="fixed-bar">
      <cart></cart>
      <div class="btn btn-light btn-top" @click="scrollToTop"><font-awesome-icon icon="arrow-up"/></div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/front/Navbar.vue';
import FooterSection from '@/components/front/Footer.vue';
import Cart from '@/components/front/Cart.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    Navbar,
    FooterSection,
    Cart,
  },
  methods: {
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
  },
};
</script>
