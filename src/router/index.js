import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: 'Home',
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    children: [
      {
        path: 'product_list',
        name: 'ProductList',
        component: () => import('@/components/admin/ProductList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'order_list',
        name: 'OrderList',
        component: () => import('@/components/admin/OrderList.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'coupon_list',
        name: 'CouponList',
        component: () => import('@/components/admin/CouponList.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: '/',
    name: 'Front',
    component: () => import('@/views/Front.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/components/front/Home.vue'),
      },
      {
        path: 'games',
        name: 'GameList',
        component: () => import('@/components/front/ProductList.vue'),
      },
      {
        path: 'games/:gameId',
        name: 'GameInfo',
        component: () => import('@/components/front/ProductInfo.vue'),
      },
      {
        path: 'order_check',
        name: 'OrderCheck',
        component: () => import('@/components/front/OrderCheck.vue'),
      },
      {
        path: 'order_form',
        name: 'OrderForm',
        component: () => import('@/components/front/OrderForm.vue'),
      },
      {
        path: 'order_detail/:orderId',
        name: 'OrderDetail',
        component: () => import('@/components/front/OrderDetail.vue'),
      },
      {
        path: 'column',
        name: 'ColumnPage',
        component: () => import('@/components/front/ColumnPage.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
