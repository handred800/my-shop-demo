<template>
    <div>
        <section class="p-4 mb-3">
            <div class="product-info-wrapper">
                <loading :active.sync="isLoading" :is-full-page="false"></loading>
                <video class="product-bg-video" :src="product.content" :muted="!isWatching" :controls="isWatching" autoplay loop></video>
                
                <!-- 產品資訊面板 -->
                <div class="product-info-panel" :class="{'is-watching':isWatching}">
                    <div class="scroller-wrapper">
                        <h1 class="font-weight-bold">{{product.title}}</h1>
                        <img :src="product.image" class="img-fluid mb-3" :alt="product.title">
                        <p class="description-wrapper">{{product.description}}</p>
                        <h3 v-if="product.price === product.origin_price">${{product.price | moneyFilter}}</h3>
                        <h3 v-else>
                            <span class="text-primary mr-1">優惠${{product.price | moneyFilter}}</span> 
                            <small><s class="text-muted">${{product.origin_price | moneyFilter}}</s></small>
                        </h3>
                        <div class="form-group">
                            <label for="">購買數量</label>
                            <div class="input-group">
                                <input type="number" class="form-control" v-model.number="qty" max="10">
                                <button class="btn btn-primary">加入購物車</button>
                            </div>
                        </div>
                    </div>
                    <!-- 展開按鈕 -->
                    <div class="collapse-icon" title="收合" @click="isWatching = !isWatching"></div>
                </div>
            </div>
        </section>
        
        <h2 class="section-title pl-4">相同類型</h2>
        <product-swiper :filter="product" @productSwiperClick="getProduct"></product-swiper>
    </div>
</template>
<script>
import ProductSwiper from "@/components/front/productSwiper";
    export default {
        data() {
            return {
                product:{},
                isLoading: false,
                isWatching: false,
                qty: 0,
            }
        },
        components:{
            ProductSwiper
        },
        methods: {
            getProduct(){
                this.isLoading = true;
                let id = this.$route.params.gameId;
                let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${id}`;
                let vm = this;
                this.$http.get(api)
                .then((res)=>{
                    console.log(res.data)
                    vm.product = res.data.product;
                    vm.isLoading = false;
                })
            }
        },
        created(){
            this.getProduct();
        }
    }
</script>