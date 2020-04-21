import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import VeeValidate from 'vee-validate';
import zhTwValid from 'vee-validate/dist/locale/zh_TW'

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios)
Vue.use(VeeValidate,{
  events: 'change|blur'
});
VeeValidate.Validator.localize('zh_TW', zhTwValid);

import App from './App.vue'
import router from './router'
import './eventBus'
import moneyFilter from './money_format'

Vue.config.productionTip = false;

Vue.component('Loading',Loading);
Vue.filter('moneyFilter', moneyFilter)



new Vue({
  router,
  render: h => h(App)
}).$mount('#app')


// 路由守衛
router.beforeEach((to,from,next)=>{
  if(to.meta.requiresAuth){
    // 此頁面需登入驗證
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api)
      .then((res) => {
        // console.log(res)
        res.data.success ? next() : next({ path: '/login' });
      })
  }else{
    // 此頁面不須登入驗證
    next();
  }
})