import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap';
import Loading from 'vue-loading-overlay';

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios)


import App from './App.vue'
import router from './router'
import './eventBus'
import moneyFilter from './money_format'

Vue.config.productionTip = false;

Vue.component('Loading',Loading);
Vue.filter('moneyFilter', moneyFilter)
import 'vue-loading-overlay/dist/vue-loading.css';

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next)=>{
  // console.log(to,from,next);
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