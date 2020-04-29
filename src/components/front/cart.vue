<template>
    <div>
        <button class="btn btn-primary btn-cart" @click="toggleModal">
            <font-awesome-icon icon="shopping-cart"/>
            <span class="badge-cart badge badge-pill badge-danger" v-if="cartData.carts.length > 0">{{cartData.carts.length}}</span>
        </button>

        <!-- 購物車彈窗 -->
        <div class="modal fade" id="cartModal" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-body">
                        <loading :active.sync="isLoading" :is-full-page="false"></loading>
                        <div v-if="cartData.carts.length > 0">
                            <h4>購物車</h4>
                            <table class="table">
                                <thead class="bg-light">
                                    <tr>
                                        <th>商品</th>
                                        <th width="120">小計</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in cartData.carts" :key="item.id">
                                        <td>
                                            <h5 class="font-weight-bold mb-0">{{item.product.title}}</h5>
                                            <div class="text-secondary" v-if="item.coupon">{{item.coupon.title}}</div>
                                            <small class="text-muted">${{item.product.price | moneyFilter}} X {{item.qty}}</small>                                             
                                        </td>
                                        <td class="text-right">
                                            <strong class="mr-3" :class="{'text-primary':item.coupon}">${{item.final_total | moneyFilter}}</strong>
                                            <a href="#" title="移除" class="text-muted" @click.prevent="delFormCart(item.id)">
                                                <font-awesome-icon icon="times"/>
                                            </a>                                            
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr v-if="cartData.total === cartData.final_total">
                                        <td colspan="3" class="text-right">
                                            <strong>總計：${{cartData.total | moneyFilter}}</strong>
                                        </td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="3" class="text-right">
                                            <strong class="text-primary">優惠價：${{cartData.final_total | moneyFilter}}</strong>
                                        </td>
                                    </tr>                                    
                                </tfoot>
                            </table>
                            <div class="text-right px-2">
                                <button type="button" class="btn btn-primary" @click="routerTo('/order_check')">
                                    <font-awesome-icon icon="shopping-cart"/> 前往結帳
                                </button>
                            </div>                             
                        </div>
                        <div v-else>
                            需要推薦遊戲給你嗎？
                            <button type="button" class="btn btn-primary" @click="routerTo('/column')">好！</button>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";

export default {
    data() {
        return {
            cartData: {
                carts:[],
                final_total: 0,
                total: 0,
            },
            isLoading: false
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
            this.$http.post(api, {data: cart})
            .then((res) => {
                if (res.data.success) {
                    vm.$bus.$emit('message:push', res.data.message, 'success');
                } else {
                    vm.$bus.$emit('message:push', res.data.message, 'danger');
                }
                vm.getCart();
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
                console.log(res.data.data)
                vm.cartData = res.data.data;
                vm.isLoading = false;
            })
        },
        toggleModal(){
            this.getCart();
            $('#cartModal').modal('toggle');
        },
        routerTo(path){
            this.toggleModal();
            this.$router.push(path);

        }
    },
    created() {
        let vm = this;
        console.log('註冊cart事件');
        console.log(vm.$bus);
        vm.$bus.$on('cart:addToCart', (productId, qty = 1) => {
            vm.addToCart(productId,qty);
        });
        this.getCart();
    },
}
</script>