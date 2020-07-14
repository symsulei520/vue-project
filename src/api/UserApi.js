import AxiosServe from '@/api/request.js';

// 用户列表
export const RequestUserList = () => {
  return AxiosServe({
    url: '/api/list',
    method: 'get'
  })
}

// 分页用户列表接口封装
// 将页号作为参数传入，请求不同页面的数据
export const RequestUserListPage = (pageNo, pageSize) => {
  return AxiosServe({
    url: '/api/list_page',
    method: 'get',
    // 将params的内容拼接到url地址后 （/api/list_page?pageNo=1）
    params: {
      pageNo,
      pageSize
    }
  })
}

// 封装添加用户接口
export const RequestUserAdd = (formData) => {
  return AxiosServe({
    url: '/api/add',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

// 封装删除用户接口
export const RequestUserDelete = (id) => {
  return AxiosServe({
    url: '/api/delete',
    method: 'get',
    params: {
      uid: id
    }
  })
}
