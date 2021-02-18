import fetch from 'utils/fetch';
export function page(obj) {
  return fetch({
    url: '/api/erp-adapter/orderQuery/listErrorOrderLog',
    method: 'post',
    data: obj
  })
}

// 拼多多异常日志
export function pagePdd(obj) {
  return fetch({
    url: '/api/erp-adapter-pdd/orderQuery/listErrorOrderLog',
    method: 'post',
    data: obj
  })
}