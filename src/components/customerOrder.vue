<template>
    <div>
      <loading :active.sync="isLoading"></loading>
      <div class="form-row">
        <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
          <div class="card shadow-sm">
            <div class="card-img-wrapper" :style="`backgroundImage:url(${item.image})`">
              <span class="badge badge-warning card-img-tag">{{item.category}}</span>
            </div>
            <!-- <img :src="item.image" class="card-img-top" alt="..."> -->
            <div class="card-body">
              <h3 class="card-title font-weight-bold">{{item.title}}</h3>
              <p class="card-text card-text-mask">{{item.description | textSummary}}</p>
              <h4 class="d-flex justify-content-between align-items-center mb-3">
                <small v-if="item.price != 0" class="text-muted"><s>{{item.origin_price | moneyFilter}} TWD</s></small>
                <strong v-if="item.price != 0" class="text-danger">{{item.price | moneyFilter}} <small>TWD</small></strong>
                <strong v-else class="ml-auto">{{item.origin_price | moneyFilter}} <small>TWD</small></strong>
              </h4>
              <div class="btn-group w-100">
                <button class="btn btn-sm btn-outline-primary" @click="openModal(item.id)">看更多</button>
                <button type="button" class="btn btn-sm btn-primary" @click="addToCart(item.id)">加入購物車</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 商品彈窗 -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
              <div class="modal-content">
                  <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLabel">商品詳情</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
                  <form action="" @submit.prevent="addToCart(product.id,product.qty)">
                      <div class="modal-body">
                          <h4 class="font-weight-bold">{{product.title}} <span class="badge badge-warning">{{product.category}}</span></h4>
                          <img :src="product.image" class="w-100 mb-4" alt="">
                          <p>{{product.description}}</p>
                      </div>
                      <div class="modal-footer">
                        <div class="d-flex flex-column flex-md-row align-items-end">
                          <div class="form-inline">
                            <div class="form-group">
                              <strong v-if="product.price != 0" class="text-danger">{{product.price | moneyFilter}} </strong>
                              <strong v-else>{{product.origin_price | moneyFilter}} </strong>
                              <div class="mx-3">X</div>
                              <input type="number" min="1" max="10" class="form-control" v-model="product.qty">
                              <div class="mx-3">
                                = 
                                <strong v-if="product.price != 0" class="text-danger">{{product.price*product.qty | moneyFilter}} <small>TWD</small></strong>
                                <strong v-else>{{product.origin_price*product.qty | moneyFilter}} <small>TWD</small></strong>                              
                              </div>
                            </div>
                          </div>                        
                          <button type="submit" class="btn btn-primary">加入購物車</button>
                        </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      <pagination :pagination="pagination" @page-switch="getProducts"></pagination>

      <h4>購物車</h4>
      <ul class="list-unstyled list-group">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in cartData.carts" :key="item.id">
          <div>
            <h5 class="mb-0">{{item.product.title}}</h5>
            <small class="text-muted">{{item.product.price}}<sup>TWD</sup> X {{item.qty}}</small>  
          </div>
          <div>
            <strong class="mr-3">{{item.final_total}}</strong>
            <button class="btn btn-danger" @click="delFormCart(item.id)">刪除</button>
          </div>
        </li>
      </ul>
      <hr>
      <div class="text-right">總計 </div>
    </div>
</template>

<script>
import $ from "jquery";
import Pagination from '@/components/pagination.vue';

export default {
  data() {
    return {
      product: {},
      pagination: {},
      products: [],
      cartData: {},
      isLoading: false
    }
  },
  components:{Pagination},
  methods: {
    getProducts(page = this.pagination.current_page){
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
    openModal(id){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/product/${id}`;
      let vm = this;
      this.$http.get(api)
      .then((res)=>{
        vm.product = Object.assign({qty: 1},res.data.product);
        $('#productModal').modal('show');
      })
    },
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
        console.log(res);
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
        console.log(res.data);
        vm.cartData = res.data.data;
        vm.isLoading = false; 

      })
    }
  },
  filters:{
    textSummary(text){
      return text.substring(0,60) + '...';
    }
  },
  created() {
    this.getProducts(1);
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