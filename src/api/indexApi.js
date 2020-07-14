import AxiosServe from '@/api/request.js';

// 2.登录API
export const RequestLogin = (username, password) => {
  return AxiosServe({
    url: '/api/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

// 3.退出
export const RequestLogout = () => {
  return AxiosServe({
    url: '/api/logout',
    method: 'get'
  })
}

// 动态菜单请求数据接口封装
export const RequestMenu = () => {
  return AxiosServe({
    url: '/api/sysmenu',
    method: 'get'
  })
}
