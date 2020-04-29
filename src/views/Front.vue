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
// @ is an alias to /src
import Navbar from '@/components/front/navbar.vue'
import FooterSection from '@/components/front/footer.vue'
import Cart from "@/components/front/cart.vue";

export default{
  components:{Navbar,FooterSection,Cart},
  methods: {
    scrollToTop(){
      window.scrollTo({top: 0, behavior: 'smooth'});
    }
  },
}
</script>
