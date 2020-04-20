import Vue from 'vue'
import VueRouter from 'vue-router'
import Admin from '../views/Admin.vue'
import Login from '../views/Login.vue'
import ProductList from '../components/productList.vue'
import OrderList from '../components/orderList.vue'
import CustomOrder from "../components/customerOrder.vue";

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    redirect: 'login'
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    children:[
      {
        path: 'productList',
        name: 'ProductList',
        component: ProductList,
        meta: { requiresAuth: true },
      },
      {
        path: 'orderList',
        name: 'OrderList',
        component: OrderList,
        meta: { requiresAuth: true },
      },
      {
        path: 'coponList',
        name: 'CoponList',
        component: OrderList,
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
        path: 'customOrder',
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
