import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import ProductList from '../components/productList.vue'
import OrderList from '../components/orderList.vue'
import CouponList from "../components/couponList.vue";
import CustomCheckout from "../components/customerCheckout.vue";
import CustomOrder from "../components/customerOrder.vue";

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
      redirect: 'ProductList'
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children:[
      {
        path: 'product_list',
        name: 'ProductList',
        component: ProductList,
        meta: { requiresAuth: true },
      },
      {
        path: 'order_list',
        name: 'OrderList',
        component: OrderList,
        meta: { requiresAuth: true },
      },
      {
        path: 'coupon_list',
        name: 'CouponList',
        component: CouponList,
        meta: { requiresAuth: true },
      }      
    ]
  },
  {
    path: '/',
    name: 'customer',
    component: Admin,
    children: [
      {
        path: 'custom_checkout',
        name: 'CustomCheckout',
        component: CustomCheckout,
      },
      {
        path: 'custom_order/:id',
        name: 'CustomOrder',
        component: CustomOrder,
      }      
    ]
  },  
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
