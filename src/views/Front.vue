<template>
  <div class="position-relative">
    <navbar></navbar>
    <main class="container-fluid position-relative">
      <div class="main-wrapper">
        <router-view></router-view>
      </div>
    </main>   
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/front/navbar.vue'

export default{
  components:{Navbar}
}
</script>
