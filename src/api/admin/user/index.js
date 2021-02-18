import fetch from 'utils/fetch';

export function page(query) {
  return fetch({
    url: '/api/admin/user/page',
    method: 'get',
    params: query
  });
}

export function addObj(obj) {
  return fetch({
    url: '/api/admin/user/add',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/user/' + id,
    method: 'put',
    data: obj
  })
}

export function putRole(id, obj) {
  return fetch({
    url: '/api/admin/user/' + id +'/group',
    method: 'post',
    params: obj
  })
}
export function pageTable(query) {
  return fetch({
    url: '/api/admin/dataFilter/page',
    method: 'get',
    params: query
  });
}
// 数据权限确定
export function updateFilter(obj) {
  return fetch({
    url: '/api/admin//userData/updateFilterRelation',
    method: 'put',
    data: obj
  });
}
// 查询权限
export function updateID(query) {
  return fetch({
    url: '/api/admin/userData/listByParam',
    method: 'get',
    params: query
  });
}