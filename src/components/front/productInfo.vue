<template>
    <div>
        <section class="product-info-wrapper p-4 mb-3">
            <video class="product-bg-video" :src="product.content" muted autoplay loop></video>
            <loading :active.sync="isLoading" :is-full-page="false"></loading>
            <div class="product-info-panel">
                <h1>{{product.title}}</h1>
                <img :src="product.image" class="img-fluid" :alt="product.title">
                <p>{{product.description}}</p>
            </div>
        </section>
        
        <h2 class="section-title pl-4">相同類型</h2>
        <product-swiper :filter="product"></product-swiper>
    </div>
</template>
<script>
import ProductSwiper from "@/components/front/productSwiper";
    export default {
        data() {
            return {
                product:{},
                isLoading: false,
            }
        },
        components:{
            ProductSwiper
        },
        methods: {
            getProduct(id){
                let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${id}`;
                let vm = this;
                this.$http.get(api)
                .then((res)=>{
                    vm.product = res.data.product;
                })
            }
        },
        created(){
            this.getProduct(this.$route.params.gameId);
        }
    }
</script>