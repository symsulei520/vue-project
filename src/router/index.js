// 创建路由模块文件 router.js

// 1.导入路由插件
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'

// 2.安装路由
Vue.use(VueRouter)

// 3.配置路由规则
const routes = [
  // 设置登录主页
  {
    // 重定向路由
    path: '/',
    redirect: 'Login', // redirect 重新指定位置
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: true,
      ishidden: true
    }
  },
  {
    path: '/main',
    name: 'Main',
    component: Main,
    meta: {
      requiresAuth :false
    },
    children: [
      {
        path: '/index',
        name: 'index',
        hidden: false,
        component: ()=> import('@/views/Index.vue')
      }
    ]
  }
]

// 4.创建vueRouter实例
const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production'? '/yuguo/': '/symsym/',
  routes
})

// element-ui nav-menu导航菜单重复点击报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router
