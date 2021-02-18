import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/add',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/' + id,
    method: 'put',
    data: obj
  })
}

export function getCustomerData() {
  return fetch({
    url: '/api/basedatasys/bdCustomer/all',
    method: 'get'
  })
}
// 客户下拉框
export function selectObj(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomer/getSelectList',
    method: 'get',
    params: query
  })
}
