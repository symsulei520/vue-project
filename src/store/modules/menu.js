import {
  RequestMenu
} from "@/api/indexApi.js";
import router from "@/router/index";
import { SaveUserList } from "@/common/UserListStore.js";
export const Menu = {
  state: {
    // 定义菜单数组
    menuList: []
  },
  mutations: {
    SAVE_MENU(state, menuList) {
      state.menuList = menuList;
      SaveUserList(menuList);
    }
  },
  actions: {
    saveMenu({
      commit
    }) {
      RequestMenu()
        .then(data => {
          if (data.code === 200) {// 判断当code参数等于200时执行路由获取

            // 1.调用路由映射的方法，将sysmenu数组作为函数formatRoutes的参数赋值给routeArrays这个新的路由数组
            let routeArrays = formatRoutes(data.sysmenu);
            // 2.将404错误处理添加到动态路由菜单的最后
            routeArrays.push({
              path: '*',
              component: () => import('@/components/404.vue'),
              meta: {ishidden: false,hidden:false}
            })
            // 3.将获得的新的路由数组routeArrays添加到路由组件
            router.addRoutes(routeArrays); 
            // 4.将路由数据提交到mutations对象中
            commit('SAVE_MENU', routeArrays);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
// 格式化路由菜单
const formatRoutes = (menuRoutes) => { // menuRoutes这个参数就是sysmenu数组（服务器请求的数据）
  const newMenuRoutes = [];
  menuRoutes.forEach(route => {
    // 如果有子路由，递归调用函数本身，继续映射
    let children;
    if (route.children && route.children instanceof Array) { // 判断数组中的children存在，并且children是一个数组
      children = formatRoutes(route.children); // 将 children这个数组作为参数，执行递归函数，再次执行最顶上的formatRoutes函数，此时formatRoutes函数的参数为route.children
    }
    const path = route.path;
    const name = route.name;
    const meta = route.meta;
    const iconCls = route.iconCls;
    const hidden = route.hidden;
    // 组件映射
    const newRoute = {
      path,
      name,
      meta,
      iconCls,
      hidden,
      children,
      component: function () {
        switch (route.component) {
          case "Main":
            return import("@/views/Main.vue");
            break;
          case "UserList":
            return import("@/views/user/KehuList.vue");
            break;
          case "UserAdd":
            return import("@/views/user/KehuAdd.vue");
            break;
          case "ProductList":
            return import("@/views/product/spList.vue");
            break;
          case "ProductAdd":
            return import("@/views/product/spAdd.vue");
            break;
          case "LogList":
            return import("@/views/log/rzList.vue");
            break;
          case "LogAdd":
            return import("@/views/log/rzAdd.vue");
            break;
          case "ManagerList":
            return import("@/views/manager/ManagerList.vue");
            break;
        }
      }
    };
    // console.log('newRoute>>>>>>>>>>>>>>>>>>>>>>', newRoute);
    newMenuRoutes.push(newRoute);
  });
  return newMenuRoutes;
}
