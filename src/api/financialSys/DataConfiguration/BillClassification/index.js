import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/financialsys/exportType/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/financialsys/exportType/add',
method: 'post',
data: obj
});
}

// export function getObj(id) {
// return fetch({
// url: '/api/financialsys/customsFeeVip/' + id,
// method: 'get'
// })
// }

// export function delObj(id) {
// return fetch({
// url: '/api/financialsys/customsFeeVip/' + id,
// method: 'delete'
// })
// }

export function putObj(obj) {
return fetch({
url: '/api/financialsys/exportType/update',
method: 'post',
data: obj
})
}
