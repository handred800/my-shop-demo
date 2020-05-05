<template>
  <div class="full-page">
    <div class="card form-signin shadow">
      <div class="card-body">
        <form @submit.prevent="siginIn">
          <h2 class="mb-3">後台管理</h2>
          <div class="form-group">
            <label for="inputEmail">電子郵件</label>
            <input type="email" v-model="user.username" class="form-control" placeholder="Email" required>
          </div>
          <div class="form-group">
            <label for="inputPassword">密碼</label>
            <input type="password" v-model="user.password" class="form-control" placeholder="Password" required>
          </div>
          <button class="btn btn-lg btn-primary btn-block" type="submit">登入</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    siginIn() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/admin/signin`;
      this.$http.post(api, vm.user)
        .then((res) => {
          if (res.data.success) {
            vm.$router.push('/admin/product_list');
            vm.$bus.$emit('message:push', res.data.message, 'success');
          } else {
            vm.$bus.$emit('message:push', res.data.message, 'danger');
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.full-page{
    height: 100vh;
    display: flex;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
}
.form-signin{
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
}
</style>
