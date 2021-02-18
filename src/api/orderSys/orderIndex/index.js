import fetch from 'utils/fetch';
export function getObj(query) {
  return fetch({
  url: '/api/ordersys/sellBsorderStatistics/overview',
  method: 'get',
  params: query
  })
  }
  export function getChart(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderStatistics/orderCurve',
    method: 'get',
    params: query
    })
    }




