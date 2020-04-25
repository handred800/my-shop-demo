<template>
  <div class="position-relative">
    <navbar></navbar>
    <main class="container-fluid position-relative">
      <div class="main-wrapper">
        <div class="p-3">
          <div class="row">
            <div class="col-md-8 mb-3">
              <swiper class="index-banner">
                  <swiper-slide v-for="banner in banners" :key="banner.title">
                    <a :href="banner.url" target="_blank" class="index-banner-item" :style="`backgroundImage:url(${banner.image})`">
                      <div class="banner-text">
                        <h3 class="banner-title">{{banner.title}}</h3>
                        <p class="banner-description">{{banner.description}}</p>
                      </div>
                    </a>
                  </swiper-slide>
                  <div class="swiper-pagination" slot="pagination"></div>
              </swiper>
            </div>
            <div class="col-md-4 mb-3">
              <div class="color-block-secondary">
                <h2 class="block-title text-right">週期性<br>折扣優惠</h2>
                <div class="block-backdrop">weekly discount</div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <h2 class="section-title pl-4">新品上市</h2>
          <product-swiper v-if="products.length" :content="products"></product-swiper>
        </section>
      </div>
    </main>   
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from '@/components/front/navbar.vue'
import Sidebar from '@/components/front/sidebar.vue'
import ProductSwiper from '@/components/front/productSwiper.vue'
import Pagination from '@/components/pagination.vue'

export default {
  name: 'Home',
  data() {
    return {
      banners:[
        {
          image: 'https://steamcdn-a.akamaihd.net/steam/bundles/7135/w80899u8dtlbb1x1/header_586x192.jpg',
          url: 'https://store.steampowered.com/bundle/7135/Not_a_Metroidvania/',
          title: 'Not a Metroidvania',
          description: "In these lovingly crafted 2D platformers, you'll explore and battle through unique non-linear worlds..."
        },
        {
          image: 'https://steamcdn-a.akamaihd.net/steam/bundles/983/rxdm4ez2bmiuzjii/header_586x192.jpg?t=1575947553',
          url: 'https://store.steampowered.com/bundle/983/Supergiant_Collection/',
          title: 'Supergiant Collection',
          description: 'Everyone who purchases Hades on Steam through January 2 will receive a complimentary...'
        }
      ],
      products: [],
      pagination: {}
    }
  },
  components: {
    Pagination,ProductSwiper,Navbar,Sidebar
  },
  methods: {
    getProducts(page = 1){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products?page=${page}`;
      let vm = this;
      this.isLoading = true;
      this.$http.get(api)
      .then((res)=>{
        vm.products = res.data.products;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      })
    },    
  },
  created() {
    this.getProducts();
  },
  
}
</script>

