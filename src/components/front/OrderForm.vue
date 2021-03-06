<template>
  <div class="p-4">
    <div class="form-wizard">
      <div class="form-wizard-step">1.確認購物車</div>
      <div class="form-wizard-step active">2.填寫訂單資訊</div>
      <div class="form-wizard-step">3.完成購買</div>
    </div>
    <div class="row flex-column-reverse flex-md-row" :class="{'is-loading': isLoading}">
      <!-- 資料表單 -->
      <loading :active.sync="isLoading" :is-full-page="false"></loading>
      <div class="col-md-7">
        <h2 class="section-title">訂單資訊</h2>
        <div class="card">
          <form class="card-body" action @submit.prevent="createOrder">
            <div class="form-group">
              <label for="name">購買人姓名</label>
              <input
                type="text"
                id="name"
                class="form-control"
                :class="{'is-invalid': errors.has('name')}"
                name="name"
                v-model="form.user.name"
                v-validate="'required'"
              />
              <small class="invalid-feedback">請填寫姓名</small>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="mail"
                id="email"
                class="form-control"
                :class="{'is-invalid': errors.has('email')}"
                v-model="form.user.email"
                name="email"
                v-validate="'required|email'"
              />
              <small class="invalid-feedback">{{errors.first('email')}}</small>
            </div>
            <div class="form-group">
              <label for="tel">連絡電話</label>
              <input
                type="text"
                id="tel"
                class="form-control"
                :class="{'is-invalid': errors.has('phone')}"
                name="phone"
                v-model="form.user.tel"
                v-validate="'required'"
              />
              <small class="invalid-feedback">請填寫連絡電話</small>
            </div>
            <div class="form-group">
              <label for="adress">聯絡地址</label>
              <input
                type="text"
                id="adress"
                class="form-control"
                :class="{'is-invalid': errors.has('address')}"
                name="address"
                v-model="form.user.address"
                v-validate="'required'"
              />
              <small class="invalid-feedback">請填寫地址</small>
            </div>
            <div class="form-group">
              <label for="message">
                備註
                <small class="text-primary">此欄位非必填</small>
              </label>
              <textarea id="message" class="form-control" v-model="form.message" cols="30" rows="6"></textarea>
            </div>
            <div class="text-right">
              <button type="submit" class="btn btn-primary">送出訂單</button>
            </div>
          </form>
        </div>
      </div>

      <!-- 購物車 -->
      <div class="col-md-5">
        <div class="sticky-top">
          <h2 class="section-title">商品明細</h2>
          <ul class="list-unstyled list-group mb-3">
            <li
              class="list-group-item d-flex justify-content-between align-items-center"
              v-for="item in cartData.carts"
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
            <li class="list-group-item">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="coupon_code"
                  placeholder="winter30"
                />
                <div class="input-group-append">
                  <button type="button" class="btn btn-secondary" @click="applyCoupon">使用招待券</button>
                </div>
              </div>
            </li>
            <li class="list-group-item text-right">
              <strong>總計：${{cartData.total | moneyFilter}}</strong>
            </li>
            <li v-if="cartData.total !== cartData.final_total" class="list-group-item text-right">
              <strong class="text-primary">優惠價：${{cartData.final_total | moneyFilter}}</strong>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartData: {},
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      coupon_code: '',
      isLoading: false,
    };
  },
  methods: {
    getCart() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        vm.cartData = res.data.data;
        vm.isLoading = false;
      });
    },
    applyCoupon() {
      const vm = this;
      const code = {
        code: this.coupon_code,
      };
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/coupon`;
      vm.isLoading = true;
      this.$http
        .post(api, {
          data: code,
        })
        .then((res) => {
          if (res.data.success) {
            vm.$bus.$emit('message:push', res.data.message, 'success');
          } else {
            vm.$bus.$emit('message:push', res.data.message, 'danger');
          }
          vm.coupon_code = '';
          vm.getCart();
          vm.isLoading = false;
        });
    },
    createOrder() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order`;
      vm.$validator.validate().then((isValid) => {
        if (isValid) {
          vm.isLoading = true;
          vm.$http
            .post(api, {
              data: vm.form,
            })
            .then((res) => {
              if (res.data.success) {
                vm.$bus.$emit('message:push', res.data.message, 'success');
                vm.$router.push(`/order_detail/${res.data.orderId}`);
              } else {
                vm.$bus.$emit('message:push', res.data.message, 'danger');
              }
              vm.$bus.$emit('cart:updateCart');
              vm.isLoading = false;
            });
        }
      });
    },
    clearCartFromServer(callback) {
      const vm = this;
      vm.isLoading = true;
      vm.$http
        .all(
          vm.cartData.carts.map((item) => {
            const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${item.id}`;
            return vm.$http.delete(api);
          }),
        )
        .then(() => {
          vm.isLoading = false;
          callback();
        });
    },
  },
  beforeRouteLeave(to, from, next) {
    this.clearCartFromServer(next);
  },
  created() {
    this.getCart();
  },
};
</script>
