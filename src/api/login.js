import fetch from 'utils/fetch';

export function loginByEmail(username, password, barCode, sessionId,userType) {
  const data = {
    username,
    password,
    barCode,
    sessionId,
    userType
  };
  return fetch({
    // url: '/api/auth/jwt/appToken',
    url: '/api/auth/jwt/appTokenByWithBarCode',
    method: 'post',
    data
  });
}

export function logout() {
  return fetch({
    url: '/api/auth/jwt/invalid',
    method: 'post'
  });
}

export function getInfo(token) {
  return fetch({
    url: '/api/admin/user/front/info',
    method: 'get',
    params: { token }
  });
}
// 主页获取用户信息

export function getIndexInfo(query) {
  return fetch({
    url: '/api/admin/user/getCurrentUserInfo',
    method: 'get',
    params: query
  });
}
export function getMenus(token) {
  return fetch({
    url: '/api/admin/user/front/menus',
    method: 'get',
    params: { token }
  });
}