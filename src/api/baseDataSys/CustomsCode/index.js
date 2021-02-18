import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/basedatasys/bdDistrict/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/basedatasys/bdDistrict/add',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/basedatasys/bdDistrict/' + id,
method: 'get'
})
}


export function putObj(id, obj) {
return fetch({
url: '/api/basedatasys/bdDistrict/' + id,
method: 'put',
data: obj
})
}
