import Vue from 'vue';
// import {Row , Button} from 'element-ui';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router'
import store from './store'  
import './api/mock'
import Cookies from 'js-cookie';

Vue.config.productionTip = false
// Vue.use(Row)
// Vue.use(Button)
Vue.use(ElementUI)
router.beforeEach((to,from,next)=>{
  const token = Cookies.get('token')
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else if (token && to.name ===  'login'){
    // 说明用户登录，跳转到首页 
    next({name:'home'})
  }else{
    next()
  }
})
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
});