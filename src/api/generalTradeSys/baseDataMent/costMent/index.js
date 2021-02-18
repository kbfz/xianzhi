import fetch from 'utils/fetch';
export function page(query) {
    return fetch({
    url: '/api/generaltradesys/baseFee/page',
    method: 'get',
    params: query
    });
    }
    export function addObj(obj) {
        return fetch({
        url: '/api/generaltradesys/baseFee/add',
        method: 'post',
        data: obj
        });
        }
        
 export function putObj(obj) {
    return fetch({
        url: '/api/generaltradesys/baseFee/update',
        method: 'post',
        data: obj
    });
 }
export function getObj(id) {
  return fetch({
    url: '/api/generaltradesys/baseFee/' + id,
    method: 'get'
  })
}