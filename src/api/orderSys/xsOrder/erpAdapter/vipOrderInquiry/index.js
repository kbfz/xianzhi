import fetch from 'utils/fetch'
export function page(query) {
  return fetch({
    url: '/api/ordersys/vipWarehouseOrder/page',
    method: 'get',
    params: query
  })
}
// 客户下拉
export function customerSelect(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/getWeiPinCustomerList',
    method: 'get',
    params: query
  })
}
// 订单状态下拉
export function OrderStatusSelect(query) {
  return fetch({
    url: '/api/basedatasys/bdWeiPinOrderStatus/getSelectList',
    method: 'get',
    params: query
  })
}