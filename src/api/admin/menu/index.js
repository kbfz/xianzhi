import fetch from 'utils/fetch';

export function fetchTree(query) {
  return fetch({
    url: '/api/admin/menu/tree',
    method: 'get',
    params: query
  });
}

export function fetchAll() {
  return fetch({
    url: '/api/admin/menu/all',
    method: 'get'
  });
}
export function addObj(obj) {
  return fetch({
    url: '/api/admin/menu/add',
    method: 'post',
    data: obj
  });
}

export function getObj(id) {
  return fetch({
    url: '/api/admin/menu/' + id,
    method: 'get'
  })
}

export function delObj(id) {
  return fetch({
    url: '/api/admin/menu/' + id,
    method: 'delete'
  })
}

export function putObj(id, obj) {
  return fetch({
    url: '/api/admin/menu/' + id,
    method: 'put',
    data: obj
  })
}

// 校验路径编码和路径是否已存在
export function menuPage(query) {
  return fetch({
    url: '/api/admin/menu/page',
    method: 'get',
    params: query
  })
}
// 获取当前用户拥有的系统
export function getUserSystem() {
  return fetch({
    url: '/api/admin/menu/user/system',
    method: 'get',
    params: {}
  })
}
// 修改密码 ===>  校验密码

export function checkPassword(obj) {
  return fetch({
    url: '/api/admin/user/checkUserPassword',
    method: 'post',
    data: obj
  });
}

// 修改密码 ===>  更新保存密码
export function updatePassword(obj) {
  return fetch({
    url: '/api/admin/user/updateUserPassword',
    method: 'post',
    data: obj
  });
}


