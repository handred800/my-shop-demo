<template>
  <div>
    <navbar></navbar>

    <div class="container-fluid">
      <div class="row">
        <sidebar></sidebar> 
        <main role="main" class="col-md-10 ml-sm-auto">
          <router-view></router-view>
        </main>

      </div>
    </div>   
  </div>
</template>

<script>
// @ is an alias to /src
import ProductList from '@/components/admin/productList.vue'
import Navbar from '@/components/admin/navbar.vue'
import Sidebar from '@/components/admin/sidebar.vue'


export default {
  name: 'Home',
  data() {
    return {

    }
  },
  components: {
    ProductList,Navbar,Sidebar
  },
}
</script>

<style lang="scss" scoped>
  main{
    padding: 80px 20px 20px;
  }
</style>
