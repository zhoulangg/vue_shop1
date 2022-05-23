import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/golab.css'
import Axios from 'axios'

// 配置请求的根路径
Axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
// 判断登录token是否登录 没有就不开权限
Axios.interceptors.request.use(config =>{
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})


// 每一个组件都可以直接访问http 从而发起网络请求
Vue.prototype.$http = Axios

Vue.config.productionTip = false




new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
