import router from './router';
import {GetUserCookie} from "@/common/UserCookie.js";
// 全局导航守卫封装
router.beforeEach((to, from, next) => {
  if (to.matched.some(item => !item.meta.requiresAuth)) {
    // 统一登录认证
    const token = localStorage.getItem("token");
    if (token) {
      next(); // 放行
    } else {
      next({
        path: '/Login'
      });
    }
  } else {
    next(); // 直接放行
  }
})

