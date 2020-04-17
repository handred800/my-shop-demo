<template>
  <div>
    <navbar></navbar>
    <alert></alert>
    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar> 
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4 pt-4">
          <router-view></router-view>
        </main>

      </div>
    </div>   
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/productList.vue'
import Navbar from '@/components/navbar.vue'
import Sidebar from '@/components/sidebar.vue'
import Alert from '@/components/alert.vue'

export default {
  name: 'Home',
  data() {
    return {

    }
  },
  components: {
    ProductList,Navbar,Sidebar,Alert
  },
}
</script>
