import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Login = () => import ('../components/Login.vue')
const Home = () => import ('../components/Home.vue')
const Welcom = () => import ('../components/Welcom.vue')
const User = () => import('../components/User/User.vue')

 const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { path: '/home', 
      component: Home, 
      redirect:'/welcom',
      children:[
        {path: '/welcom', component: Welcom},
        {path: '/users', component: User},
       ] 
    },
  ]
})

// 挂载路由导航守卫
router.beforeEach((to,from,next) =>{
  // to 将要访问的路径
  // from代表从哪个路径跳转而来
  // next是一个函数，表示放行
  // next() 放行  next('/login') 强制跳转
  if(to.path == '/login') return next();
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next();
})

export default router