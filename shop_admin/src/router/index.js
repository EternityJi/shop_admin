import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/login',
      component: Login
    }
  ]
})
// router.beforeEach((to, from, next) => {
// 如果是去登陆的  就不用拦截
// 如果不是登录的  判断是否有token  如果有  放走

// to 要去哪
// from 从哪里来
// next()  是否放行 next() : 方向: next('/login') next('/home')
// console.log('')
//   next()
// })
