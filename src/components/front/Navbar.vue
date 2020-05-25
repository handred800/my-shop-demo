<template>
  <nav id="navbar" class="navbar navbar-expand-md navbar-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <h1>
          <font-awesome-icon icon="atom" />核心玩家
        </h1>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#menu"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="menu">
        <ul class="navbar-nav ml-auto mr-3">
          <li class="nav-item">
            <router-link to="/column" class="nav-link">評測專欄</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/games" class="nav-link">遊戲商城</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/login" class="nav-link">管理員登入</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {};
  },
  methods: {
    collapseNav() {
      $('#menu').collapse('hide');
    },
  },
  mounted() {
    this.collapseNav();
    const vm = this;
    vm.$bus.$on('navbar:hide', () => {
      vm.collapseNav();
    });
  },
};
</script>
