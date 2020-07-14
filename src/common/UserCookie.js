// 引入 js-cookie插件
import Cookie from 'js-cookie';

const USER_KEY = 'token_cookie_key'; // 将key的名称传给变量


// 添加用户到cookie
const SaveUserCookie =  (user) => {
    console.log("token>>>><<<<",user);
    const userStr = JSON.stringify(user);
    Cookie.set(USER_KEY,userStr);
}


// 从cookie中获取用户信息
const GetUserCookie = () => {
    const userStr = Cookie.get(USER_KEY);
    if(userStr){
        return JSON.parse(userStr);
    }
    else{
        return null;
    }
}

// 从cookie中删除用户信息

const RemoveUserCookie = () =>{
    Cookie.remove(USER_KEY);
}


// 暴露cookie

export {SaveUserCookie,GetUserCookie,RemoveUserCookie}