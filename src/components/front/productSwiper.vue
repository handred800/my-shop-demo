<template>
    <swiper :options="swiperOption" class="py-3">
        <swiper-slide v-for="item in allData" :key="item.id">
            <div class="product-wrapper" :style="`backgroundImage:url(${item.image})`">
                <span class="product-tag">{{item.category}}</span>
                <div class="product-content">
                    <div>
                        <h5 class="product-title">{{item.title}}</h5>
                        <span v-if="item.price === item.origin_price">${{item.price | moneyFilter}}</span>
                        <span v-else>
                            <span class="text-primary mr-1">${{item.price | moneyFilter}}</span> 
                            <small><s class="text-muted">${{item.price | moneyFilter}}</s></small>
                        </span>
                    </div>
                    <div>
                        <a href="#" class="btn btn-sm btn-outline-primary">
                            <font-awesome-icon icon="shopping-cart"/>
                        </a>
                    </div>
                </div>
            </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>        
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
 
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props:['content'],
  data(){
      return{
        allData: this.content,
        swiperOption: {
            loop: true,
            centeredSlides: true,
            breakpoints:{
                1366:{
                    slidesPerView: 4,
                    spaceBetween: 15,
                },                
                1024:{
                    slidesPerView: 3.3,
                    spaceBetween: 15,
                },
                768: {
                    slidesPerView: 2.2,
                    spaceBetween: 10
                },                
                320: {
                    slidesPerView: 1.2,
                    spaceBetween: 10
                } 
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
        } 
      }
  },
  directives: {
    swiper: directive
  }
}
</script>