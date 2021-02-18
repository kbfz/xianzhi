import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/financialsys/accountConfig/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/financialsys/accountConfig/add',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/financialsys/accountConfig/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/financialsys/accountConfig/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/financialsys/accountConfig/' + id,
method: 'put',
data: obj
})
}
export function cancelObj(obj) {
    return fetch({
    url: '/api/financialsys/accountConfig/abandonConfig',
    method: 'post',
    data: obj
})
}