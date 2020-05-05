<template>
    <div class="p-4">
        <div class="form-wizard">
            <div class="form-wizard--step active">1.確認購物車</div>
            <div class="form-wizard--step">2.填寫訂單資訊</div>
            <div class="form-wizard--step">3.送出訂單</div>
        </div>
        <div class="row">
            <div class="col-md-8">
            <loading :active.sync="isLoading" :is-full-page="false"></loading>
            <div class="table-responsive" v-if="cartData.carts.length > 0">
                <h2 class="section-title">購物車</h2>
                <table class="table bg-white">
                    <thead class="bg-light">
                        <tr>
                            <th>商品</th>
                            <th width="150">小計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in cartData.carts" :key="item.id">
                            <td>
                                <div class="media">
                                    <img class="mr-3" :src="item.product.image" :alt="item.product.title" style="max-width:150px">
                                    <div class="media-body">
                                        <router-link
                                        :to="`/games/${item.product.id}`"
                                        class="h5 font-weight-bold mb-0 d-block">{{item.product.title}}</router-link>
                                        <div class="text-secondary" v-if="item.coupon">{{item.coupon.title}}</div>
                                        <small class="text-muted">${{item.product.price | moneyFilter}} X {{item.qty}}</small>
                                    </div>
                                </div>
                            </td>
                            <td class="text-right">
                                <strong class="mr-3" :class="{'text-primary':item.coupon}">${{item.final_total | moneyFilter}}</strong>
                                <a href="#" title="移除" class="text-muted" @click.prevent="delFormCart(item.id)">
                                    <font-awesome-icon icon="times"/>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr v-if="cartData.total === cartData.final_total">
                            <td>
                                <div class="input-group">
                                <input type="text" class="form-control" v-model="coupon_code" placeholder="winter30">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-secondary" @click="applyCoupon">使用招待券</button>
                                </div>
                                </div>
                            </td>
                            <td class="text-right">
                                <strong>總計：${{cartData.total | moneyFilter}}</strong>
                            </td>
                        </tr>
                        <tr v-else>
                            <td>
                                <div class="input-group">
                                <input type="text" class="form-control" v-model="coupon_code" placeholder="winter30">
                                <div class="input-group-append">
                                    <button type="button" class="btn btn-secondary" @click="applyCoupon">使用招待券</button>
                                </div>
                                </div>
                            </td>
                            <td class="text-right">
                                <strong class="text-primary">優惠價：${{cartData.final_total | moneyFilter}}</strong>
                            </td>
                        </tr>
                    </tfoot>
                </table>
                <div class="text-right px-2">
                    <router-link to="/order_form" type="button" class="btn btn-primary">開始結帳</router-link>
                </div>
            </div>
            <div v-else>
                <h2 class="section-title">購物車</h2>
                <p>需要推薦遊戲給你嗎？</p>
                <router-link to="/column" class="btn btn-primary">好！</router-link>
            </div>
            </div>
            <div class="col-md-4">
            <div class="color-block color-block-secondary" @click="copyToClipboard">
                <div class="block-content text-right">
                  <h2 class="block-title">超級招待券</h2>
                  <span class="block-subtitle">點擊領取9折招待券</span>
                </div>
                <div class="block-backdrop">weekly discount</div>
            </div>
            </div>

        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      coupon_code: '',
      cartData: {
        carts: [],
        final_total: 0,
        total: 0,
      },
      isLoading: false,
    };
  },
  methods: {
    delFormCart(id) {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`;
      const vm = this;
      this.$http.delete(api)
        .then((res) => {
          vm.$bus.$emit('message:push', res.data.message, 'success');
          vm.getCart();
        });
    },
    applyCoupon() {
      this.isLoading = true;
      const code = {
        code: this.coupon_code,
      };
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/coupon`;
      const vm = this;
      this.$http.post(api, {
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
    getCart() {
      this.isLoading = true;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      const vm = this;
      this.$http.get(api)
        .then((res) => {
          vm.cartData = res.data.data;
          vm.isLoading = false;
        });
    },
    copyToClipboard() {
      const $copyInput = document.getElementById('copy');
      $copyInput.value = '90%awesome';
      $copyInput.select();
      document.execCommand('copy');
      $copyInput.value = '';
      $copyInput.blur();
      this.$bus.$emit('message:push', '已複製折扣碼！', 'success');
    },
  },
  created() {
    this.getCart();
  },
};
</script>
