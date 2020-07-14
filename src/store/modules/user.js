import { SaveUserLocal } from "@/common/UserStore.js";
export const User = {
  // 页面状态管理容器对象，集中存储Vue components状态数据
  state: {
    user: null
  },
  // 状态改变操作方法，由actions中的commit(‘mutation 名称’)来触发。是Vuex修改state的唯一推荐方法
  mutations: {
    SAVE_USER(state, user) {
      state.user = user;
      SaveUserLocal(user)
    }
  },
  // 操作行为处理模块,由组件中的$store.dispatch('action 名称', data1)来触发。然后由commit()来触发mutation的调用 , 间接更新 state
  actions: {
    saveUser({commit}, user) {
      commit('SAVE_USER', user)
    }
  }
}
