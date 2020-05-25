<template>
  <div>
    <section class="p-4 mb-3">
      <div class="product-info-wrapper">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>
        <video
          class="product-bg-video"
          :src="product.content"
          :muted="!isWatching"
          :controls="isWatching"
          autoplay
          loop
        ></video>
        <!-- 產品資訊面板 -->
        <div class="product-info-panel" :class="{'is-watching':isWatching}">
          <div class="scroller-wrapper">
            <h1 class="section-title">{{product.title}}</h1>
            <img :src="product.image" class="img-fluid mb-3" :alt="product.title" />
            <p class="description-wrapper">{{product.description}}</p>
            <h3 v-if="product.price === product.origin_price">售價${{product.price | moneyFilter}}</h3>
            <h3 v-else>
              <span class="text-primary mr-1">優惠${{product.price | moneyFilter}}</span>
              <small>
                <s class="text-muted">${{product.origin_price | moneyFilter}}</s>
              </small>
            </h3>
            <div class="form-group">
              <label for>購買數量</label>
              <div class="input-group">
                <input type="number" class="form-control" v-model.number="qty" min="1" max="10" />
                <div class="input-group-append">
                  <button
                    class="btn btn-primary"
                    :class="{'disabled': btnLoading}"
                    @click="addToCart"
                  >
                    <font-awesome-icon v-if="btnLoading" icon="circle-notch" class="fa-spin" />加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!-- 展開按鈕 -->
          <div class="collapse-handler" title="收合" @click="isWatching = !isWatching"></div>
        </div>
      </div>
    </section>
    <h2 class="section-title pl-4">相同類型</h2>
    <product-swiper :filter="product" @productSwiperClick="getProduct"></product-swiper>
  </div>
</template>
<script>
import ProductSwiper from '@/components/front/ProductSwiper.vue';

export default {
  data() {
    return {
      product: {},
      isLoading: false,
      isWatching: false,
      btnLoading: false,
      qty: 1,
    };
  },
  components: {
    ProductSwiper,
  },
  methods: {
    getProduct() {
      this.isWatching = false;
      this.isLoading = true;
      const id = this.$route.params.gameId;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${id}`;
      const vm = this;
      vm.$http.get(api).then((res) => {
        vm.product = res.data.product;
        window.scrollTo({ top: 0, behavior: 'smooth' });
        vm.isLoading = false;
      });
    },
    addToCart() {
      this.$bus.$emit('cart:addToCart', this.product, this.qty);
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
