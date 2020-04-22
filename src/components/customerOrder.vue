<template>
  <div v-if="orderData.total" class="form-row mt-5">
    <loading :active.sync="isLoading"></loading>
    <!-- 資料表單 -->
    <div class="col-md-7">
      <h4>訂單資訊</h4>
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <label for="">收件人姓名</label>
            <p>{{orderData.user.name}}</p>
          </div>
          <div class="form-group">
            <label for="">Email</label>
            <p>{{orderData.user.email}}</p>
          </div>
          <div class="form-group">
            <label for="">連絡電話</label>
            <p>{{orderData.user.tel}}</p>
          </div>
          <div class="form-group">
            <label for="">收件地址</label>
            <p>{{orderData.user.address}}</p>
          </div>
          <div class="form-group">
            <label for="">備註</label>
            <p>{{orderData.message}}</p>
          </div>
          <div class="form-group">
            <label for="">備註</label>
            <p>
              <span v-if="orderData.is_paid" class="text-primary">已付款</span>
              <span v-else class="text-danger">尚未付款</span>
            </p>
          </div>          
          <div class="text-right">
            <button type="button" class="btn btn-primary" @click="payOrder">確認付款</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 購物車 -->
    <div class="col-md-5">
      <h4>購買明細</h4>
      <ul class="list-unstyled list-group mb-3">
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in orderData.products" :key="item.id">
          <div class="flex-shrink-1">
            <h5 class="font-weight-bold mb-0">{{item.product.title}}</h5>
            <div class="text-primary" v-if="item.coupon">{{item.coupon.title}}</div>
            <small class="text-muted">{{item.product.price | moneyFilter}} X {{item.qty}}</small>
          </div>
          <div class="text-nowrap"> 
            <strong class="mr-3" :class="{'text-primary': item.coupon}">{{item.final_total | moneyFilter}} <small>TWD</small></strong>
          </div>          
        </li>
        <li class="list-group-item text-right">
          <strong>總計：{{orderData.total | moneyFilter}} <small>TWD</small></strong>
        </li>
        <!-- <li v-if="orderData.total !== orderData.final_total" class="list-group-item text-right">
          <strong class="text-primary">優惠價：{{orderData.final_total | moneyFilter}} <small>TWD</small></strong>
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import $ from "jquery";
import Pagination from '@/components/pagination.vue';

export default {
  data() {
    return {
      isLoading: false,
      orderId: '',
      orderData: {}
    }
  },
  methods: {
    getOrder(){
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order/${this.orderId}`;
      let vm = this;
      this.$http.get(api)
      .then((res)=>{
        vm.orderData = res.data.order;
      })
    },
    payOrder(){
      this.isLoading = true;
      let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/pay/${this.orderId}`;
      let vm = this;
      this.$http.post(api)
      .then((res)=>{
        if(res.data.success){
          console.log(res.data)
          vm.isLoading = false;
          vm.$bus.$emit('message:push',res.data.message,'success');
          vm.getOrder();
        }else{
          vm.$bus.$emit('message:push',res.data.message,'danger');
        }
      })
    }
  },
  created() {
    this.orderId = this.$route.params.orderId;
    this.getOrder()
  },
}
</script>