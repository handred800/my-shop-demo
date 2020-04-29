<template>
  <div class="position-relative">
    <navbar></navbar>
    <main class="container-fluid position-relative">
      <div class="main-wrapper">
        <router-view></router-view>
      </div>
    </main>
    <footer-section></footer-section>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/front/navbar.vue'
import FooterSection from '@/components/front/footer.vue'

export default{
  components:{Navbar,FooterSection}
}
</script>
