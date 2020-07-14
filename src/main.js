import Vue from 'vue'
import App from './App.vue'
import router from './router'
// element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// vuex
import store from './store'

// mockjs获取数据框架全局引入
import Mock from './mock/mock.js';
Mock.bootstrap();

// 统一登录认证
import './permission'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
