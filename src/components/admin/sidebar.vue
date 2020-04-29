<template>
  <nav class="col-md-2 d-none d-md-block bg-light sidebar">
    <div class="sidebar-sticky">
      <h6 class="text-muted px-3 mt-3">管理員</h6>
      <ul class="nav flex-column">
        <!-- <li class="nav-item">
          <router-link to="/admin" class="nav-link">
            總覽
          </router-link>
        </li> -->
        <li class="nav-item">
          <router-link to="/admin/order_list" active-class="active" class="nav-link">
            訂單管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/product_list" active-class="active" class="nav-link">
            商品管理
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/admin/coupon_list" active-class="active" class="nav-link">
            優惠券管理
          </router-link>
        </li>
      </ul>     
    </div>
  </nav>
</template>

<script>
export default {
  name: 'sidebar',
}
</script>

<style lang="scss" scoped>
  .sidebar {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      padding: 56px 0 0;
  }
  .nav-link{
    font-size: 1.2rem;
  }
</style>