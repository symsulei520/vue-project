// 封装持久化本地存储的localstore对象
// localStorage的使用
// localStorage.getItem(key):获取指定key本地存储的值
// localStorage.setItem(key,value)：将value存储到key字段

// 1.将localStorage的key字段定义成固定变量名
let USER_KEY = 'user_key';

// 封装添加用户信息的方法
const SaveUserLocal = function (user) { // 参数user为外部传入的json对象
  const userStr = JSON.stringify(user); // 将json对象转为json字符串并赋值
  localStorage.setItem(USER_KEY, userStr); // 将转换为json字符串的外部传入的值 存储到USER_KEY中
}
// 封装获取用户信息的方法
const GetUserLocal = function () {
  const userStr = localStorage.getItem(USER_KEY); // 取出指定key的本地存储的值并赋值
  // 判断获取到的值是否存在
  if (userStr) {
    return JSON.parse(userStr); // 将取出的json字符串转换为json对象 并返回
  } else {
    return null;
  }
}

// 封装删除用户信息的方法
const RemoveUserLocal = function () {
  localStorage.removeItem(USER_KEY); // 删除指定key本地存储的值 
}
// 暴露方法
export {
  SaveUserLocal,
  GetUserLocal,
  RemoveUserLocal
}
