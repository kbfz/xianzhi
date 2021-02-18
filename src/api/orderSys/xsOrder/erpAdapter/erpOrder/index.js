import fetch from 'utils/fetch'
export function page(obj) {
  return fetch({
    url: '/api/erp-adapter/orderQuery/searchOrderList',
    method: 'post',
    data: obj
  })
}

// 拼多多订单查询
export function pagePdd(obj) {
  return fetch({
    url: '/api/erp-adapter-pdd/orderQuery/searchOrderList',
    method: 'post',
    data: obj
  })
}

// 取消订单
export function cancelOrder(obj) {
  return fetch({
    url: '/api/erp-adapter/orderQuery/cancelUnPushOrder',
    method: 'post',
    data: obj
  })
}

// 拼多多取消订单
export function cancelOrderPdd(obj) {
  return fetch({
    url: '/api/erp-adapter-pdd/orderQuery/cancelUnPushOrder',
    method: 'post',
    data: obj
  })
}
