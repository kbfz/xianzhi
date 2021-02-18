import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/element/list',
    method: 'get',
    params: query
  });
}

// 按钮或资源 检查资源编码是否已存在
export function btnPage(query) {
  return fetch({
    url: '/api/admin/element/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/element/add',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/element/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/element/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/element/' + id,
    method: 'put',
    data: obj
  })
}
