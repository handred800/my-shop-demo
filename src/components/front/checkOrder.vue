<template>
    <div>
          <!-- 商品彈窗 -->
      <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered" role="document">
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
                        <div class="d-flex flex-column flex-sm-row align-items-end">
                          <div class="d-flex align-items-center">
                            <strong v-if="product.price != 0" class="text-danger">{{product.price | moneyFilter}} </strong>
                            <strong v-else>{{product.origin_price | moneyFilter}} </strong>
                            <div class="mx-3">X</div>
                            <input type="number" min="1" max="10" class="form-control" v-model="product.qty">
                            <div class="mx-3">=</div>
                            <strong v-if="product.price != 0" class="text-danger d-flex">{{product.price*product.qty | moneyFilter}} <small>TWD</small></strong>
                            <strong v-else>{{product.origin_price*product.qty | moneyFilter}} <small>TWD</small></strong>                               
                          </div>
                          <button type="submit" class="btn btn-primary ml-3 mt-3 mt-sm-0">加入購物車</button>
                        </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      <!-- <pagination :pagination="pagination" @page-switch="getProducts"></pagination> -->


      <!-- 訂單區塊 -->
      <div v-if="cartData.total" class="form-row mt-5">
        <!-- 資料表單 -->
        <div class="col-md-7">
          <h4>訂單資訊</h4>
          <div class="card">
            <form class="card-body" action="" @submit.prevent="createOrder">
              <div class="form-group">
                <label for="">收件人姓名</label>
                <input type="text" class="form-control" :class="{'is-invalid': errors.has('name')}" name="name" v-model="form.user.name" v-validate="'required'">
                <small class="invalid-feedback">請填寫姓名</small>
              </div>
              <div class="form-group">
                <label for="">Email</label>
                <input type="mail" class="form-control" :class="{'is-invalid': errors.has('email')}" v-model="form.user.email" name="email" v-validate="'required|email'">
                <small class="invalid-feedback">{{errors.first('email')}}</small>
              </div>
              <div class="form-group">
                <label for="">連絡電話</label>
                <input type="text" class="form-control" :class="{'is-invalid': errors.has('phone')}" name="phone" v-model="form.user.tel" v-validate="'required'">
                <small class="invalid-feedback">請填寫連絡電話</small>
              </div>
              <div class="form-group">
                <label for="">收件地址</label>
                <input type="text" class="form-control" :class="{'is-invalid': errors.has('address')}" name="address" v-model="form.user.address" v-validate="'required'">
                <small class="invalid-feedback">請填寫地址</small>
              </div>
              <div class="form-group">
                <label for="">備註</label>
                <textarea class="form-control" v-model="form.message" cols="30" rows="6"></textarea>
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-primary">送出訂單</button>
              </div>
            </form>
          </div>
        </div>

        <!-- 購物車 -->
        <div class="col-md-5">
          <h4>購物車</h4>
          <ul class="list-unstyled list-group mb-3">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="item in cartData.carts" :key="item.id">
              <div class="flex-shrink-1">
                <h5 class="font-weight-bold mb-0">{{item.product.title}}</h5>
                <div class="text-primary" v-if="item.coupon">{{item.coupon.title}}</div>
                <small class="text-muted">{{item.product.price | moneyFilter}} X {{item.qty}}</small>  
              </div>
              <div class="text-nowrap"> 
                <strong class="mr-3" :class="{'text-primary':item.coupon}">{{item.final_total | moneyFilter}} <small>TWD</small></strong>
                <button class="btn btn-danger" @click="delFormCart(item.id)">刪除</button>
              </div>
            </li>
            <li class="list-group-item">
              <form action="" @submit.prevent="applyCoupon">
                <div class="input-group">
                  <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠代碼">
                  <div class="input-group-append">
                    <button type="submit" class="btn btn-primary">套用</button>
                  </div>
                </div>
              </form>
            </li>
            <li class="list-group-item text-right">
              <strong>總計：{{cartData.total | moneyFilter}} <small>TWD</small></strong>
            </li>
            <li v-if="cartData.total !== cartData.final_total" class="list-group-item text-right">
              <strong class="text-primary">優惠價：{{cartData.final_total | moneyFilter}} <small>TWD</small></strong>
            </li>          
          </ul>
        </div>
      </div>    
    </div>
</template>

<script>
import $ from "jquery";

export default {
    data() {
        return {
            cartData: {},
            coupon_code: "",
            form: {
                user: {
                    name: "",
                    email: "",
                    tel: "",
                    address: ""
                },
                message: ""
            }
        }
    },
    methods: {
        addToCart(id, qty = 1) {
            let cart = {
                'product_id': id,
                qty
            }
            let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
            let vm = this;
            this.$http.post(api, {
                    data: cart
                })
                .then((res) => {
                    if (res.data.success) {
                        $('#productModal').modal('hide');
                        vm.$bus.$emit('message:push', res.data.message, 'success');
                    } else {
                        vm.$bus.$emit('message:push', res.data.message, 'danger');
                    }
                    vm.getCart();
                })
        },
        applyCoupon() {
            this.isLoading = true;
            let code = {
                "code": this.coupon_code
            }
            let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/coupon`;
            let vm = this;
            this.$http.post(api, {
                    data: code
                })
                .then((res) => {
                    if (res.data.success) {
                        $('#productModal').modal('hide');
                        vm.$bus.$emit('message:push', res.data.message, 'success');
                        vm.coupon_code = "";
                    } else {
                        vm.$bus.$emit('message:push', res.data.message, 'danger');
                    }
                    vm.getCart();
                    vm.isLoading = false;
                })
        },
        createOrder() {
            let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/order`;
            let vm = this;
            this.$validator.validate().then((is_valid) => {
                if (is_valid) {
                    this.isLoading = true;
                    this.$http.post(api, {
                            data: vm.form
                        })
                        .then((res) => {
                            console.log(res)
                            if (res.data.success) {
                                vm.$bus.$emit('message:push', res.data.message, 'success');
                                vm.$router.push(`/customer_order/${res.data.orderId}`);
                            } else {
                                vm.$bus.$emit('message:push', res.data.message, 'danger');
                            }
                            vm.getCart();
                            vm.isLoading = false;
                        })
                }
            })
        },
        delFormCart(id) {
            let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart/${id}`;
            let vm = this;
            this.$http.delete(api)
                .then((res) => {
                    vm.$bus.$emit('message:push', res.data.message, 'success');
                    vm.getCart();
                })
        },
        getCart() {
            this.isLoading = true;
            let api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_API_PATH}/cart`;
            let vm = this;
            this.$http.get(api)
                .then((res) => {
                    vm.cartData = res.data.data;
                    vm.isLoading = false;
                })
        },        
    },
}
</script>