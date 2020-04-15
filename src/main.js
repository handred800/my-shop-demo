import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios)


import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,from,next)=>{
  console.log(to,from,next);
  if(to.meta.requiresAuth){
    
    const api = `${process.env.VUE_APP_API}/api/user/check`;
    axios.post(api)
      .then((res) => {
        // console.log(res)
        res.data.success ? next() : next({ path: '/login' });
      })
  }else{
    next();
  }
})