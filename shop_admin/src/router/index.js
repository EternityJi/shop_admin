import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import Users from '@/components/Users'
import Roles from '@/components/rights/Roles'
import Rights from '@/components/rights/Rights'
import Categories from '@/components/products/Categories'
import Goods from '@/components/products/Goods'
import Params from '@/components/products/Params'

Vue.use(Router)
// 1 如何配置嵌套路由  用children属性
const router = new Router({
  routes: [{
    path: '/',
    redirect: 'login'
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '/users',
      component: Users
    },
    {
      path: '/roles',
      component: Roles
    },
    {
      path: '/rights',
      component: Rights
    },
    {
      path: '/categories',
      component: Categories
    },
    {
      path: '/goods',
      component: Goods
    },
    {
      path: '/params',
      component: Params
    }
    ]
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

// this.$router.push('/home')
// 利用导航守卫来实现token的状态保持
router.beforeEach((to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  // 判断
  // 1.如果访问的是登录页  则不用判断
  // 2.如果访问的是 别的页面   需要判断
  if (to.path === '/login') {
    next()
    return
  }
  let token = localStorage.getItem('token')
  if (token) {
    next()
  } else {
    next('/login')
  }
})
export default router
