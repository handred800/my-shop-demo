import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ProductList from '../components/productList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '*',
    redirect: 'login'
  },
  {
    path: '/admin',
    name: 'Home',
    component: Home,
    children:[
      {
        path: 'productList',
        name: 'ProductList',
        component: ProductList,
        meta: { requiresAuth: true },
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
