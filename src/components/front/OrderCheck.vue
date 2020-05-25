<template>
  <div class="p-4">
    <div class="form-wizard">
      <div class="form-wizard-step active">1.確認購物車</div>
      <div class="form-wizard-step">2.填寫訂單資訊</div>
      <div class="form-wizard-step">3.送出訂單</div>
    </div>
    <div class="row flex-column-reverse flex-md-row">
      <div class="col-md-8">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>
        <div class="table-responsive" v-if="tempCart.length > 0">
          <h2 class="section-title">購物車</h2>
          <table class="table bg-white">
            <thead class="bg-light">
              <tr>
                <th>商品</th>
                <th width="200"></th>
                <th width="150">小計</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tempCart" :key="item.product.id">
                <td>
                  <div class="media">
                    <img
                      class="mr-3"
                      :src="item.product.image"
                      :alt="item.product.title"
                      style="max-width:150px"
                    />
                    <div class="media-body">
                      <router-link
                        :to="`/games/${item.product.id}`"
                        class="h5 font-weight-bold mb-0 d-block"
                      >{{item.product.title}}</router-link>
                      <div class="text-secondary" v-if="item.coupon">{{item.coupon.title}}</div>
                      <small class="text-muted">${{item.product.price | moneyFilter}}</small>
                    </div>
                  </div>
                </td>
                <td>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <button
                        class="btn btn-light"
                        :disabled="item.qty <= 1"
                        type="btton"
                        @click="item.qty--"
                      >
                        <font-awesome-icon icon="minus" />
                      </button>
                    </div>
                    <input type="number" class="form-control" min="0" v-model.number="item.qty" />
                    <div class="input-group-append">
                      <button class="btn btn-light" type="button" @click="item.qty++">
                        <font-awesome-icon icon="plus" />
                      </button>
                    </div>
                  </div>
                </td>
                <td class="text-right">
                  <strong
                    class="mr-3"
                    :class="{'text-primary':item.coupon}"
                  >${{(item.product.price*item.qty) | moneyFilter}}</strong>
                  <a href="#" title="移除" class="text-muted" @click.prevent="delFormCart(index)">
                    <font-awesome-icon icon="times" />
                  </a>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td></td>
                <td></td>
                <td class="text-right">
                  <strong>總計：${{totalCart | moneyFilter}}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
          <div class="text-right px-2">
            <button type="button" class="btn btn-primary" @click="tempCartToServer">開始結帳</button>
          </div>
        </div>
        <div v-else>
          <h2 class="section-title">購物車</h2>
          <p>需要推薦遊戲給你嗎？</p>
          <router-link to="/column" class="btn btn-primary">好！</router-link>
        </div>
      </div>
      <div class="col-md-4">
        <div class="color-block color-block-secondary mb-4" @click="copyToClipboard">
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
      tempCart: [],
      isLoading: false,
    };
  },
  methods: {
    delFormCart(index) {
      this.tempCart.splice(index, 1);
      this.setCart();
    },
    setCart() {
      sessionStorage.setItem('cart', JSON.stringify(this.tempCart));
      this.$bus.$emit('cart:updateCart');
    },
    tempCartToServer() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      const vm = this;

      vm.$http
        .all(
          vm.tempCart.map((item) => {
            const cartItem = {
              product_id: item.product.id,
              qty: item.qty,
            };
            return vm.$http.post(api, { data: cartItem });
          }),
        )
        .then(() => {
          vm.$router.push('/order_form');
        });
    },
    getCart() {
      this.tempCart = JSON.parse(sessionStorage.getItem('cart')) || [];
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
  computed: {
    totalCart() {
      this.setCart();
      return this.tempCart.reduce(
        (total, item) => total + item.product.price * item.qty,
        0,
      );
    },
  },
  created() {
    this.getCart();
  },
};
</script>
