import AxiosServe from '@/api/request.js';

export const RequestManagerList = () => {
  return AxiosServe({
    url: '/api/manager/list',
    method: 'get'
  })
}


