import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/ordersys/serviceCode/page',
    method: 'get',
    params: query
  })
}

export function putObj(obj) {
  return fetch({
    url: '/api/ordersys/serviceCode/changeStatus',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return fetch({
    url: '/api/ordersys/serviceCode/get/' + id,
    method: 'get'
  })
}

export function addObj(obj) {
  return fetch({
  url: '/api/ordersys/serviceCode/add',
  method: 'post',
  data: obj
  });
  }

  export function reviseObj(id, obj) {
    return fetch({
      url: '/api/ordersys/serviceCode/' + id,
      method: 'put',
      data: obj
    })
  }