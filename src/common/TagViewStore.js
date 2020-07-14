// 引入 js-cookie插件
import Cookie from 'js-cookie';

let TAGVIEW_KEY = 'tagView_key'

// 封装添加标签对象的方法
const SaveTagView = (route) => {
  const TagViewStr = JSON.stringify(route);
  Cookie.set(TAGVIEW_KEY, TagViewStr);
}

// 封装获取标签对象的方法
const GetTageView = () => {
  const TagViewStr = Cookie.get(TAGVIEW_KEY);
  if (TagViewStr) {
    console.log("TagViewStr>>>>>>>>>>>>>>>>>>>>>", TagViewStr);
    return JSON.parse(TagViewStr);
  } else {
    return null;
  }
}

// 删除标签对象
const RemoveTagView = function () {
  Cookie.remove(TAGVIEW_KEY); // 删除指定key本地存储的值 
}

export {
  SaveTagView,
  GetTageView,
  RemoveTagView
}
