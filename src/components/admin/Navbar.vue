<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-dark">
    <a class="navbar-brand" href="#">後台管理中心</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarsExample04"
      aria-controls="navbarsExample04"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExample04">
      <ul class="navbar-nav ml-auto mr-3">
        <li class="nav-item active">
          <router-link to="/" class="nav-link">
            <font-awesome-icon icon="eye" />前台網站
          </router-link>
        </li>
      </ul>
      <button class="btn btn-outline-light" @click="logout">登出</button>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  methods: {
    logout() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/logout`;
      vm.$http.post(api).then((res) => {
        if (res.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
}
</style>
