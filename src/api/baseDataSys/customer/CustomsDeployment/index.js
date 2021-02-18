import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomerAgent/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/basedatasys/bdCustomerAgent/add',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/basedatasys/bdCustomerAgent/' + id,
    method: 'get'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/basedatasys/bdCustomerAgent/' + id,
    method: 'put',
    data: obj
  })
}
// 选择客户
export function customerSelect(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/getSelectList',
    method: 'get',
    params: query
  })
}
// 默认申报身份
export function cbeNameSelect(query) {
  return fetch({
  url: '/api/basedatasys/bdCustomerDeclaration/getSelectList',
  method: 'get',
  params: query
  })
  }

// 报关行企业
export function clarationSelect(query) {
  return fetch({
    url: '/api/basedatasys/bdAgent/getSelectList',
    method: 'get',
    params: query
  })
}
// 仓库
export function storageSelect(query) {
  return fetch({
    url: '/api/basedatasys/bdWarehouse/getSelectList',
    method: 'get',
    params: query
  })
}
// 关区名称
export function paymentSelect(query) {
  return fetch({
    url: '/api/basedatasys/bdDistrict/getSelectList',
    method: 'get',
    params: query
  })
}
// 电商平台
export function platSelect(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomerPlatform/getSelectList',
    method: 'get',
    params: query
  })
}