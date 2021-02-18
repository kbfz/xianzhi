import fetch from 'utils/fetch'

// 获取统计
export function collect(query) {
  return fetch({
    url: '/api/ordersys/serviceDetail/collect',
    method: 'get',
    params: query
  })
}

// 导出
export function exports(query) {
  return fetch({
    url: '/api/ordersys/serviceDetail/export',
    method: 'get',
    params: query
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
    url: '/api/ordersys/serviceInfo/changeStatus',
    method: 'post',
    data: obj
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
