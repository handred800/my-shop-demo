<template>
  <div class="position-relative" :class="{'loading-holder': isLoading}">
    <loading :active.sync="isLoading" :is-full-page="false"></loading>
    <swiper
      ref="productSwiper"
      :options="swiperOption"
      class="product-carousel py-3"
      v-if="allData.length > 0"
      @ready="bindSlideClick"
    >
      <swiper-slide v-for="item in allData" :key="item.id">
        <div class="product-wrapper" :style="`backgroundImage:url(${item.image})`">
          <span class="product-tag">{{item.category}}</span>
          <div class="product-content">
            <div>
              <h5 class="product-title">{{item.title}}</h5>
              <span v-if="item.price === item.origin_price">${{item.price | moneyFilter}}</span>
              <span v-else>
                <span class="text-primary mr-1">${{item.price | moneyFilter}}</span>
                <small>
                  <s class="text-muted">${{item.price | moneyFilter}}</s>
                </small>
              </span>
            </div>
          </div>
        </div>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev">
        <font-awesome-icon icon="angle-left" />
      </div>
      <div class="swiper-button-next" slot="button-next">
        <font-awesome-icon icon="angle-right" />
      </div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ['filter'],
  data() {
    return {
      allData: [],
      swiperOption: {
        loop: true,
        centeredSlides: true,
        breakpoints: {
          1366: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
          1024: {
            slidesPerView: 3.3,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 2.2,
            spaceBetween: 10,
          },
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      isLoading: false,
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      vm.isLoading = true;
      vm.$http.get(api).then((res) => {
        const { products } = res.data;
        if (vm.filter === undefined) {
          vm.allData = products.filter((item) => item.is_enabled);
        } else {
          vm.allData = products.filter(
            (item) => item.category === vm.filter.category
              && item.title !== vm.filter.title
              && item.is_enabled,
          );
        }
        vm.isLoading = false;
      });
    },
    productClick(id) {
      // 路由切換, 頁面往上滾動
      this.$router.push(`/games/${id}`);
      this.$emit('productSwiperClick');
    },
    bindSlideClick() {
      // vue-swiper 初始化完成時,綁定slide點擊事件
      const vm = this;
      const swiper = this.$refs.productSwiper.$swiper; // swiper 實例
      // 綁定路由切換方法
      swiper.on('tap', () => {
        const index = swiper.clickedSlide.getAttribute(
          'data-swiper-slide-index',
        );
        vm.productClick(vm.allData[index].id);
      });
    },
  },
  watch: {
    filter() {
      this.getProducts();
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
