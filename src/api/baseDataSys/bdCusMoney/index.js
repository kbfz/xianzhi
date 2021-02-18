import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/basedatasys/bdCusMoney/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/basedatasys/bdCusMoney/add',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/basedatasys/bdCusMoney/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/basedatasys/bdCusMoney/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/basedatasys/bdCusMoney/' + id,
method: 'put',
data: obj
})
}

export function getCusMoneyData(id, obj) {
    return fetch({
    url: '/api/basedatasys/bdCusMoney/all',
    method: 'get'
    })
    }
    