import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/ordersys/customerBail/page',
method: 'get',
params: query
});
}
// 额度设置
export function prepaidObj(obj) {
return fetch({
url: '/api/ordersys/customerBail/prepaid',
method: 'post',
data: obj
});
}
// 图片上传
export const orderImgExportUrl = '/api/ordersys/fileCommon/upload'
// 修改预警值
export function changeObj(obj) {
    return fetch({
    url: '/api/ordersys/customerBail/modify',
    method: 'put',
    data: obj
    })
    }
export function delObj(id) {
return fetch({
url: '/api/financialsys/accountConfig/' + id,
method: 'delete'
})
}

// 客户下拉选择
export function selectObj(query) {
    return fetch({
    url: '/api/basedatasys/bdCustomer/getSelectList',
    method: 'get',
    params: query
    })
    }
// 新增保证金
export function addObj(obj) {
    return fetch({
    url: '/api/ordersys/customerBail/add',
    method: 'post',
    data: obj
    });
    }