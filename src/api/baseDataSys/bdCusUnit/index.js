import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/basedatasys/bdCusUnit/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/basedatasys/bdCusUnit/add',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/basedatasys/bdCusUnit/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/basedatasys/bdCusUnit/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/basedatasys/bdCusUnit/' + id,
method: 'put',
data: obj
})
}

export function getCusUnitData() {
return fetch({
url: '/api/basedatasys/bdCusUnit/all',
method: 'get'
})
}
