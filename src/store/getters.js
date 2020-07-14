import {
  GetUserLocal
} from "@/common/UserStore";
import {
  GetUserList
} from "@/common/UserListStore.js";

import {
  GetTageView
} from "@/common/TagViewStore.js"


export const getters = {
  // state.User.user 第一个User是封装的user.js模块，第二个user是模块中的对象
  user: state => {
    // 在获取user对象的值的时候，判断当state.User.user中的值为空的时候，就从localStorage取出对象并赋值给state.User.user中
    if (!state.User.user) {
      state.User.user = GetUserLocal(); // 使用封装的获取用户信息的方法
    }
    return state.User.user;
  },
  menuList: state => {
    if (!state.Menu.menuList) {
      state.Menu.menuList = GetUserList();
    }
    return state.Menu.menuList;
  },
  tagList: state => { 
    if(!state.tagView.tagList){
      // console.log("state.tagView.tagList.length11111.>>",state.tagView.tagList);
      state.tagView.tagList = GetTageView();
    }
    // console.log("state.tagView.tagList.length222.>>",state.tagView.tagList);
    return state.tagView.tagList;
  }
}
