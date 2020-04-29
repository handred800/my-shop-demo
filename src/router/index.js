import Vue from 'vue'
import VueRouter from 'vue-router'

import Front from '../views/Front.vue'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
// front
import Home from '../components/front/home.vue'
import GameList from "../components/front/productList.vue";
import GameInfo from "../components/front/productInfo.vue";
import OrderCheck from "../components/front/orderCheck.vue";
import OrderForm from "../components/front/orderForm.vue";
import OrderDetail from "../components/front/orderDetail.vue";
import ColumnPage from "../components/front/columnPage.vue";

// admin
import ProductList from '../components/admin/productList.vue'
import OrderList from '../components/admin/orderList.vue'
import CouponList from "../components/admin/couponList.vue";


Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
      redirect: 'Home'
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
    name: 'Front',
    component: Front,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home,
      },
      {
        path: 'games',
        name: 'GameList',
        component: GameList,
      },
      {
        path: 'games/:gameId',
        name: 'GameInfo',
        component: GameInfo,
      },
      {
        path: 'order_check',
        name: 'OrderCheck',
        component: OrderCheck,
      },
      {
        path: 'order_form',
        name: 'OrderForm',
        component: OrderForm,
      },
      {
        path: 'order_detail/:orderId',
        name: 'OrderDetail',
        component: OrderDetail,
      },
      {
        path: 'column',
        name: 'ColumnPage',
        component: ColumnPage,
      },      
      

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
