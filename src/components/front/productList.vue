<template>
    <div class="p-4">
      <div class="row">
        <div class="col-md-2">
          <div class="sticky-top py-3">
              <h4>條件搜尋</h4>
              <div class="form-group">
                <label for="">名稱</label>
                <input type="text" class="form-control" v-model="filter.title" placeholder="請輸入遊戲名稱">
              </div>
              <div class="form-group">
                <label for="">類型</label>
                <label class="form-check pl-0" :for="`category${index}`" v-for="(item,index) in categoryTag" :key="item">
                  <input type="checkbox" name="" :id="`category${index}`" :value="item" v-model="filter.category">{{item}}
                </label>
              </div>
          </div>
        </div>
        <div class="col-md-10">
            <div class="sticky-top p-3 bg-white">
              <div class="form-row">
                <div class="col-md-4 form-group">
                  <label for="">名稱</label>
                  <input type="text" class="form-control" v-model="filter.title" placeholder="請輸入遊戲名稱">
                </div>
                <div class="col-md-4 form-group">
                  <label for="">類型</label>
                  <div class="form-inline">
                    <label class="form-check mr-2" :for="`category${index}`" v-for="(item,index) in categoryTag" :key="item">
                      <input type="checkbox" name="" :id="`category${index}`" :value="item" v-model="filter.category">{{item}}
                    </label>
                  </div>
                </div>
              </div>
            </div>          
          <div class="product-list-wrapper form-row" :class="{'is-loading':isLoading}">
            <loading :active.sync="isLoading" :is-full-page="false"></loading>
            <div class="col-sm-6 col-lg-4 mb-3" v-for="item in products" :key="item.id">
              <div class="product-wrapper" :style="`backgroundImage:url(${item.image})`" @click="$router.push(`/games/${item.id}`)">
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
            </div>
          </div>
        </div>
      </div>


    </div>
</template>

<script>
// import Pagination from '@/components/pagination.vue';

export default {
  data() {
    return {
      categoryTag: [],
      product: {},
      // pagination: {},
      products: [],
      isLoading: false,
      filter:{
        title: "",
        category: [],
      },
    }
  },
  // components:{Pagination},
  methods: {
    getProducts(){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/products/all`;
      let vm = this;
      this.isLoading = true;
      this.$http.get(api)
      .then((res)=>{
        vm.products = res.data.products;
        // vm.pagination = res.data.pagination;

        // 重組分類陣列
        let categories = res.data.products.map(item=>{
          return item.category;
        })
        // 提取不重複的標籤
        vm.categoryTag = categories.filter((item,index,array)=>{
            return array.indexOf(item) === index
        })

        vm.isLoading = false;
      })
    },
    // openModal(id){
    //   let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${id}`;
    //   let vm = this;
    //   this.$http.get(api)
    //   .then((res)=>{
    //     vm.product = Object.assign({qty: 1},res.data.product);
    //     $('#productModal').modal('show');
    //   })
    // },
    addToCart(id,qty=1){
      let cart = {
        'product_id':id,
        qty
      }
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      let vm = this;
      this.$http.post(api,{data:cart})
      .then((res)=>{
        if(res.data.success){
          $('#productModal').modal('hide');
          vm.$bus.$emit('message:push',res.data.message,'success');
        }else{
          vm.$bus.$emit('message:push',res.data.message,'danger');
        }
        vm.getCart();
      })
      
    },
    delFormCart(id){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`;
      let vm = this;
      this.$http.delete(api)
      .then((res)=>{
        vm.$bus.$emit('message:push',res.data.message,'success');
        vm.getCart();
      })
    },
    getCart(){
      this.isLoading = true;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
      let vm = this;
      this.$http.get(api)
      .then((res)=>{
        vm.cartData = res.data.data;
        vm.isLoading = false; 
      })
    },
    applyCoupon(){
      this.isLoading = true;
      let code = {"code": this.coupon_code}
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/coupon`;
      let vm = this;
      this.$http.post(api,{data:code})
      .then((res)=>{
        if(res.data.success){
          $('#productModal').modal('hide');
          vm.$bus.$emit('message:push',res.data.message,'success');
          vm.coupon_code = "";
        }else{
          vm.$bus.$emit('message:push',res.data.message,'danger');
        }        
        vm.getCart();
        vm.isLoading = false; 
      })
    },
    createOrder(){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order`;
      let vm = this;
      this.$validator.validate().then((is_valid)=>{
        if(is_valid){
          this.isLoading = true;
          this.$http.post(api,{data: vm.form})
          .then((res)=>{
            console.log(res)
            if(res.data.success){
              vm.$bus.$emit('message:push',res.data.message,'success');
              vm.$router.push(`/customer_order/${res.data.orderId}`);
            }else{
              vm.$bus.$emit('message:push',res.data.message,'danger');
            }        
            vm.getCart();
            vm.isLoading = false; 
          })
        }
      })
    }
  },
  filters:{
    textSummary(text){
      return text.substring(0,60) + '...';
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  },
}
</script>
<style lang="scss" scoped>
  .card-img-wrapper{
    position: relative;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    padding-bottom: 46.5%;
  }
  .card-img-tag{
    position: absolute;
    right: .5rem;
    top: .5rem;
    font-size: 100%;
  }
  .card-text-mask{
    min-height: 96px;
  }

</style>