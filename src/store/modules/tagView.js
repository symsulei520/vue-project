import {
  SaveTagView,RemoveTagView
} from "@/common/TagViewStore.js";
// 封装并暴露 添加、删除tagview标签
export const tagView = {
  state: {
    tagList: []
  },
  mutations: {
    // 添加标签
    ADD_TAG(state, route) {
      //  标签去重，重复的路由不添加，直接返回
      // 使用some函数遍历tagList，取出所有的route与参数route比较
    console.log("state.tagList》》》》》",state.tagList);
    
      const isOK = state.tagList.some(item => {

        return item.path == route.path // 返回一个布尔值，只要item.path中有一个route与route.path中相匹配，结果就为true
      })
      // 判断返回值是否不为真;
      if (!isOK) {
          let routes = {
             meta : route.meta,
             path : route.path 
          }
        state.tagList.push(routes);
      }
      SaveTagView(state.tagList);
    },
    //删除标签
    DELETE_TAG(state, route) {
      for (let i = 0; i < state.tagList.length; i++) { // 循环遍历tageList的数组长度
        if (state.tagList[i] == route) { // 判断当前的数组下标是否等于route的下标
          state.tagList.splice(i, 1); // 删除当前数组下标对象
          // console.log("state.tagList///////////",state.tagList);
          break;
        }
      }
      SaveTagView(state.tagList);// 循环遍历删除某个标签之后，vuex中的tagList数组会发生变化，将新的数组内容重新添加到localStorage进行保存
    }
  },
  actions: {
    addTag({
      commit
    }, route) {
      commit('ADD_TAG', route);
    },
    deleteTag({
      commit,
      state
    }, route) {
      // 封装并返回一个promise对象
      return new Promise((resolve, reject) => {
        commit('DELETE_TAG', route) // 调用mutations中的删除标签的方法 删除指定的route路由
        resolve([...state.tagList]); // 删除route成功时展开一个新的数组
        // console.log("state.tagList!!!!!!!!!!!!!",state.tagList);
      })

    }
  }
}
