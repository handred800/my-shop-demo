import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
import zhTwValid from 'vee-validate/dist/locale/zh_TW';
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


import App from './App.vue';
import router from './router';
import './eventBus';
import moneyFilter from './filters/money_format';
import timeFilter from './filters/time_format';


library.add(fas);
axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);
Vue.use(VeeValidate, {
  events: 'change|blur',
});
VeeValidate.Validator.localize('zh_TW', zhTwValid);
Vue.use(VueAwesomeSwiper, {
  slidesPerView: 1,
  centeredSlides: true,
  loop: true,
  autoplay: true,
  pagination: {
    el: '.swiper-pagination',
    dynamicBullets: true,
    clickable: true,
  },
});

Vue.config.productionTip = false;

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('Loading', Loading);
Vue.filter('moneyFilter', moneyFilter);
Vue.filter('timeFilter', timeFilter);


new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');


// 路由守衛
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    // 此頁面需登入驗證
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api)
      .then((res) => {
        if (res.data.success) {
          next();
        } else {
          next({ path: '/login' });
        }
      });
  } else {
    // 此頁面不須登入驗證
    next();
  }
});
