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
import Navbar from '@/components/admin/Navbar.vue';
import Sidebar from '@/components/admin/Sidebar.vue';

export default {
  data() {
    return {

    };
  },
  components: {
    Navbar,
    Sidebar,
  },
};
</script>

<style lang="scss" scoped>
  main{
    padding: 80px 20px 20px;
  }
</style>
