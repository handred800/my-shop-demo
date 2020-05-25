<template>
  <div class="p-4" :class="{'is-loading': isLoading}">
    <div class="form-wizard">
      <div class="form-wizard-step">1.確認購物車</div>
      <div class="form-wizard-step">2.填寫訂單資訊</div>
      <div class="form-wizard-step active">3.完成購買</div>
    </div>
    <loading :active.sync="isLoading" :is-full-page="false"></loading>
    <div v-if="!orderData.is_paid">
      <div class="row flex-column-reverse flex-md-row" v-if="orderData.total">
        <!-- 資料表單 -->
        <div class="col-md-7">
          <h2 class="section-title">訂單資訊</h2>
          <ul class="list-group">
            <li class="list-group-item">
              <small>購買人姓名</small>
              <p>{{orderData.user.name}}</p>
            </li>
            <li class="list-group-item">
              <small>Email</small>
              <p>{{orderData.user.email}}</p>
            </li>
            <li class="list-group-item">
              <small>連絡電話</small>
              <p>{{orderData.user.tel}}</p>
            </li>
            <li class="list-group-item">
              <small>收件地址</small>
              <p>{{orderData.user.address}}</p>
            </li>
            <li class="list-group-item">
              <small>備註</small>
              <p>{{orderData.message}}</p>
            </li>
            <li class="list-group-item">
              <small>付款狀態</small>
              <p v-if="orderData.is_paid" class="text-primary">已付款</p>
              <p v-else class="text-danger">尚未付款</p>
            </li>
            <li class="list-group-item text-right">
              <button type="button" class="btn btn-primary" @click="payOrder">
                <font-awesome-icon icon="wallet" />確認付款
              </button>
            </li>
          </ul>
        </div>

        <!-- 購物車 -->
        <div class="col-md-5">
          <div class="sticky-top">
            <h2 class="section-title">商品明細</h2>
            <ul class="list-unstyled list-group mb-3">
              <li
                class="list-group-item d-flex justify-content-between align-items-center"
                v-for="item in orderData.products"
                :key="item.id"
              >
                <div class="flex-shrink-1">
                  <h5 class="font-weight-bold mb-0">{{item.product.title}}</h5>
                  <div class="text-secondary" v-if="item.coupon">{{item.coupon.title}}</div>
                  <small class="text-muted">{{item.product.price | moneyFilter}} X {{item.qty}}</small>
                </div>
                <div class="text-nowrap">
                  <strong
                    class="mr-3"
                    :class="{'text-primary':item.coupon}"
                  >${{item.final_total | moneyFilter}}</strong>
                </div>
              </li>
              <li class="list-group-item text-right">
                <strong>總計：${{orderData.total | moneyFilter}}</strong>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <div class="col-md-8">
        <img src="@/assets/images/checkout.png" class="img-fluid mb-3" alt />
      </div>
      <div class="col-md-4 d-flex justify-content-center align-items-center">
        <div class="text-center pr-md-5 mr-md-5">
          <h2 class="section-title">付款成功</h2>
          <p class="lead">開始暢玩你的遊戲吧！</p>
          <p>或是...</p>
          <router-link to="/games" class="btn btn-lg btn-secondary">買更多遊戲！</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      orderId: '',
      orderData: {},
    };
  },
  methods: {
    getOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order/${this.orderId}`;
      const vm = this;
      this.$http.get(api).then((res) => {
        vm.orderData = res.data.order;
        vm.isLoading = false;
      });
    },
    payOrder() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/pay/${this.orderId}`;
      const vm = this;
      this.$http.post(api).then((res) => {
        if (res.data.success) {
          vm.isLoading = false;
          vm.$bus.$emit('message:push', res.data.message, 'success');
          vm.getOrder();
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger');
        }
      });
    },
    clearTempCart() {
      this.$bus.$emit('cart:updateCart');
      sessionStorage.setItem('cart', JSON.stringify([]));
    },
  },
  created() {
    this.clearTempCart();
    this.orderId = this.$route.params.orderId;
    this.getOrder();
  },
};
</script>
<style lang="scss" scoped>
.list-group p {
  margin-bottom: 0;
}
</style>
