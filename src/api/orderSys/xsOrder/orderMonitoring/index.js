import fetch from 'utils/fetch';
export function page(query) {
return fetch({
url: '/api/ordertrace/orderTrace/listByParam',
method: 'get',
params: query
});
}
export function pageObj(query) {
    return fetch({
    url: '/api/ordersys/sellBsorderHead/page',
    method: 'get',
    params: query
    });
    }