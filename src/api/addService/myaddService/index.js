import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/ordersys/serviceInfo/pageDetails',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/add',
    method: 'post',
    data: obj
  })
}
// 获取增值服务列表
export function selectObj(query) {
  return fetch({
    url: '/api/ordersys/serviceCode/list',
    method: 'get',
    params: query
  })
}

export function updateObj(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/update',
    method: 'post',
    data: obj
  })
}
// 撤销

export function changeObj(obj) {
  return fetch({
    url: '/api/ordersys/serviceInfo/updateService',
    method: 'post',
    data: obj
  })
}

// 删除
export function delObjNew(id) {
  return fetch({
    url: '/api/ordersys/serviceInfo/' + id,
    method: 'delete'
  })
}

// 客户下拉选择
export function customerObj(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/getSelectList',
    method: 'get',
    params: query
  })
}
// 首页统计
export function countObj(query) {
  return fetch({
    url: '/api/ordersys/serviceInfo/countService',
    method: 'get',
    params: query
  })
}
