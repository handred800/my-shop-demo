<template>
  <div>
    <button class="btn btn-primary btn-cart" @click="toggleModal" v-if="!disabledCart">
      <font-awesome-icon icon="shopping-cart" />
      <span class="badge-cart badge badge-pill badge-danger" v-if="tempCart.length > 0">{{cartQty}}</span>
    </button>
    <!-- 購物車彈窗 -->
    <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-body">
            <loading :active.sync="isLoading" :is-full-page="false"></loading>
            <div v-if="tempCart.length > 0">
              <h4>購物車</h4>
              <table class="table">
                <thead class="bg-light">
                  <tr>
                    <th>商品</th>
                    <th width="120">小計</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item,index) in tempCart" :key="item.id">
                    <td>
                      <h5 class="font-weight-bold mb-0">{{item.product.title}}</h5>
                      <small class="text-muted">${{item.product.price | moneyFilter}} X {{item.qty}}</small>
                    </td>
                    <td class="text-right">
                      <strong
                        class="mr-3"
                        :class="{'text-primary':item.coupon}"
                      >$ {{(item.product.price*item.qty) | moneyFilter}}</strong>
                      <a href="#" title="移除" class="text-muted" @click.prevent="delFormCart(index)">
                        <font-awesome-icon icon="times" />
                      </a>
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" class="text-right">
                      <strong>總計：${{totalCart | moneyFilter}}</strong>
                    </td>
                  </tr>
                </tfoot>
              </table>
              <div class="text-right px-2">
                <button type="button" class="btn btn-primary" @click="routerTo('/order_check')">
                  <font-awesome-icon icon="shopping-cart" />前往結帳
                </button>
              </div>
            </div>
            <div v-else>
              需要推薦遊戲給你嗎？
              <button
                type="button"
                class="btn btn-primary"
                @click="routerTo('/column')"
              >好！</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      tempCart: [],
      isLoading: false,
    };
  },
  methods: {
    addToCart(productData, qty = 1) {
      const cartItem = {
        product: productData,
        qty,
      };

      const sameIndex = this.tempCart.findIndex(
        (item) => item.product.id === productData.id,
      );
      // tempCart 中無相同項目直接推入，否則加總數量
      if (sameIndex === -1) {
        this.tempCart.push(cartItem);
      } else {
        this.tempCart[sameIndex].qty += qty;
      }

      this.setCart();
      this.$bus.$emit('message:push', '已加入購物車', 'success');
    },
    delFormCart(index) {
      this.tempCart.splice(index, 1);
      this.setCart();
    },
    setCart() {
      sessionStorage.setItem('cart', JSON.stringify(this.tempCart));
    },
    getCart() {
      this.tempCart = JSON.parse(sessionStorage.getItem('cart')) || [];
    },
    toggleModal() {
      this.getCart();
      $('#cartModal').modal('toggle');
    },
    routerTo(path) {
      this.toggleModal();
      this.$router.push(path);
    },
  },
  computed: {
    disabledCart() {
      return (
        this.$route.path === '/order_check' || this.$route.path === '/order_form'
      );
    },
    totalCart() {
      return this.tempCart.reduce(
        (total, item) => total + item.product.price * item.qty, 0,
      );
    },
    cartQty() {
      return this.tempCart.reduce((total, item) => total + item.qty, 0);
    },
  },
  created() {
    const vm = this;
    vm.$bus.$on('cart:addToCart', (productId, qty = 1) => {
      vm.addToCart(productId, qty);
    });
    vm.$bus.$on('cart:updateCart', vm.getCart);
    vm.getCart();
  },
};
</script>
