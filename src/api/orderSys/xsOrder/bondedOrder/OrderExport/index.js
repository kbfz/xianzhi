import fetch from 'utils/fetch'

export function page(query) {
  return fetch({
    url: '/api/ordersys/orderExport/page',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/ordersys/orderExport/' + id,
    method: 'delete'
  })
}
