import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/apiUser/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/apiUser/add',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/apiUser/' + id,
    method: 'get'
  })
}
export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/apiUser/' + id,
    method: 'put',
    data: obj
  })
}
