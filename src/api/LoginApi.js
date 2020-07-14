import AxiosServe from '@/api/request.js';


// 封装添加日志接口
export const RequestLogAdd = (content,logtime,mid) => {
  return AxiosServe({
    url: '/api/logadd',
    method: 'post',
    data: {
      content,
      logtime,
      mid
    }
  })
}

// 封装获取日志列表接口
export const RequestLogList = (pageNo, name = null, startTime = null, endTime = null) => {
  return AxiosServe({
    url: '/api/log/list_page',
    method: 'get',
    params: {
      pageNo,
      name,
      startTime,
      endTime
    }
  })
}

/**
 * 查询日志
 * /*@param {} id 
 */
export const RequestLogFind = (id) => {
  return AxiosServe({
      url: '/api/log/find',
      method: 'get',
      params: {
          id
      }
  })
}

/**
* 修改日志
*/
export const RequestLogUpdate = (id, content) => {
  return AxiosServe({
      url: '/api/log/update',
      method: 'post',
      data: {
          id,
          content
      }
  })
}
/**
* 删除日志
*/
export const RequestLogDelete = (id) => {
  return AxiosServe({
      url: '/api/log/delete',
      method: 'get',
      params: {
          id
      }
  })
}
