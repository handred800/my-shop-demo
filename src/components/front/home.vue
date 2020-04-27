<template>
  <div>
    <div class="p-4">
      <div class="grid-home-top">
          <div class="grid-banner">
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
          <div class="color-block color-block-secondary">
            <h2 class="block-title text-right">本周<br>折扣</h2>
            <div class="block-backdrop">weekly discount</div>
          </div>
          <div class="color-block color-block-primary">
            <h2 class="block-title text-left">超級<br>招待券</h2>
            <div class="block-backdrop">awesome coupon</div>
          </div>          
      </div>
    </div>
    <section>
      <h2 class="section-title pl-4">新品上市</h2>
      <product-swiper></product-swiper>
    </section>  
  </div>
</template>

<script>
// @ is an alias to /src
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
    Pagination,ProductSwiper
  }
  
}
</script>

