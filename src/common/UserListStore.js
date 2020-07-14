let USERLIST_KEY = 'userList_key'

// 封装添加用户列表的方法
const SaveUserList = (userList) => {
  const userListStr = JSON.stringify(userList);
  localStorage.setItem(USERLIST_KEY, userListStr);
}

// 封装获取用户列表的方法
const GetUserList = () => {
  const userListStr = localStorage.getItem(USERLIST_KEY);
  if (userListStr) {
    return JSON.parse(userListStr);
  } else {
    return null;
  }
}
export {
  SaveUserList,
  GetUserList
}
