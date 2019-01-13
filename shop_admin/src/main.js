// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 导入公共样式
import '@/assets/common.css'
/**
 把axios绑定到Vue的原型上

 */
import axios from 'axios'
Vue.prototype.axios = axios
// 给axios设置一个默认的全局的路径
// axios已经有个默认的baseUrl以后得请求都不用加baseUrl

//  默认值要设置成不会变的
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'

/* eslint-disable no-new */

// 添加请求拦截器  成功的  /  失败的
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // config.baseURL = 'http://localhost:8888/api/private/v1/'
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器  成功的  /  失败的  拿到的是响应的结果
axios.interceptors.response.use(res => {
  // console.log(res)
  return res.data
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
