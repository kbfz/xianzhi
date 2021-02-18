import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/dataFilter/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/dataFilter/add',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/dataFilter/' + id,
    method: 'get'
  })
}
export function delObj(id) {
  return fetch({
    url: '/api/admin/dataFilter/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/dataFilter/' + id,
    method: 'put',
    data: obj
  })
}

