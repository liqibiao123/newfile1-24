import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import Main from '../views/Main.vue'
import Mall from '../views/Mall.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

// 创建路由组件
// 将路由与组件映射

const routes = [
    // 主路由
    {
        path:'/',
        component:Main,
        name:'Main', 
        redirect:'/home',
        children:[   
                      // { path: '/home', name:'home',component: Home },//首页
                      // { path: '/user', name:'user',component: User},//用户管理
                      // { path: '/mall',name:'mall', component: Mall},//商品管理
                      // { path: '/page1', name:'page1',component: PageOne},
                      // { path: '/page2', name:'page2',component: PageTwo}
                    ]
    },
    {
      path:'/login',
      name:'login',
      component:Login
    }

  ]



  // 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // (缩写) 相当于 routes: routes
  })

  // 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
// const app = new Vue({
//     router
//   }).$mount('#app')

export default router