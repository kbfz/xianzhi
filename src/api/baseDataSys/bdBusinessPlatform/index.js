import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/basedatasys/bdCustomerPlatform/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/basedatasys/bdCustomerPlatform/addPlatform',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/basedatasys/bdCustomerPlatform/' + id,
method: 'get'
})
}


export function putObj(id, obj) {
return fetch({
url: '/api/basedatasys/bdCustomerPlatform/' + id,
method: 'put',
data: obj
})
}

