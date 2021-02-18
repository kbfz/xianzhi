import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/ordersys/serviceInfo/pageByHandle',
    method: 'get',
    params: query
  })
}

// 详情
export function BusinessObj(id) {
  return fetch({
    url: '/api/ordersys/serviceInfo/details/'+ id,
    method: 'get',
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/ordersys/serviceInfo/details/' + id,
    method: 'get'
  })
}
// 优惠
export function reviseObj(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/offer',
    method: 'post',
    data: obj
  })
}

// 修改单价
export function installObj(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/modifyPrice',
    method: 'post',
    data: obj
  })
}

// 删除
export function delObj(id) {
  return fetch({
    url: '/api/ordersys/serviceInfo/' + id,
    method: 'delete'
  })
}
// 检查是否是出账日
export function BillTime(query) {
  return fetch({
    url: '/api/ordersys/serviceInfo/isBillTime',
    method: 'get',
    params: query
  })
}

// 客户名称下拉
export function customerSelect(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/getSelectList',
    methods: 'get',
    params: query
  })
}
export function getActualPrice(obj) {
  return fetch({
    url: '/api/ordersys/serviceDetail/getActualPrice',
    method: 'post',
    data: obj
  })
}
