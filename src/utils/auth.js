import Cookies from 'js-cookie'

const TokenKey = 'token-auth'
// export const appId = 'ce825ff0-016c-8627-78c8-577b07461ddb'
export function getToken() {
  return Cookies.get(TokenKey)
}
export function getSessionId(sessionId) {
  return Cookies.get(sessionId)
}
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function setTokenWithPath(token,path) {
  return Cookies.set(TokenKey, token, {path: path})
}

export function setTokenWithDomain(token,domain) {
  return Cookies.set(TokenKey, token, {domain: domain})
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setAppId(appid) {
  return Cookies.set("appId",appid)
}
export function getAppId() {
  return Cookies.get("appId")
}

