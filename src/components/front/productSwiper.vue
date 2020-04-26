<template>
    <div class="position-relative" :class="{'loading-holder': isLoading}">
        <loading :active.sync="isLoading" :is-full-page="false"></loading>
        <swiper :options="swiperOption" class="product-carousel py-3" v-if="allData.length > 0">
            <swiper-slide v-for="item in allData" :key="item.id">
                <div class="product-wrapper" :style="`backgroundImage:url(${item.image})`" @click.prevent="routerToProduct(item.id)">
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
                            <button type="button" class="btn btn-outline-primary">
                                <font-awesome-icon icon="shopping-cart"/>
                            </button>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>        
        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
 
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props:['filter'],
  data(){
      return{
        allData: [],
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
        },
        isLoading: false,
      }
  },
  methods: {
    getProducts(){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      let vm = this;
      this.isLoading = true;
      this.$http.get(api)
      .then((res)=>{
        let products = res.data.products;
        console.log(vm.filter)
        if(vm.filter === undefined){
            vm.allData = products;
        }else{
            vm.allData = products.filter(item=>{
                return (item.category === vm.filter.category && item.title !== vm.filter.title)
            })
        }
        console.log(vm.allData)
        vm.isLoading = false;
      })
    },
    routerToProduct(id){
        console.log(id)
        this.$router.push(`/games/${id}`);
    }, 
  },
  watch: {
      filter(){
          this.getProducts();
      }
  },
  created() {
    this.getProducts();
  },
}
</script>