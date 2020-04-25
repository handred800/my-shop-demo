import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import ProductList from '../components/admin/productList.vue'
import OrderList from '../components/admin/orderList.vue'
import CouponList from "../components/admin/couponList.vue";
import CustomerCheckout from "../components/admin/customerCheckout.vue";
import CustomerOrder from "../components/admin/customerOrder.vue";

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
      redirect: 'Login'
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
    component: Home,
    children: [
      {
        path: 'games',
        name: 'CustomerCheckout',
        component: CustomerCheckout,
      },
      {
        path: 'customer_order/:orderId',
        name: 'CustomerOrder',
        component: CustomerOrder,
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
