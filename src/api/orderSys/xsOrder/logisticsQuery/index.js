import fetch from 'utils/fetch';
export function page(query) {
  return fetch({
  url: '/api/ordertrace/logistrace/page',
  method: 'get',
  params: query
  });
  }