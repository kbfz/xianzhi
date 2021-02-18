import fetch from 'utils/fetch';

// 包材管理
export function page(query) {
    return fetch({
        url: '/api/ordersys/customerPackaging/page',
        method: 'get',
        params: query,
    });
}
// 新增保存
export function addObj(obj) {
    return fetch({
        url: '/api/ordersys/customerPackaging/add',
        method: 'post',
        data: obj,
    });
}
// 查询
export function getObj(id) {
    return fetch({
        url: '/api/ordersys/customerPackaging/' + id,
        method: 'get'
    });
}
// 编辑保存
export function updateObj(id,obj) {
    return fetch({
        url: '/api/ordersys/customerPackaging/' + id,
        method: 'put',
        data: obj,
    });
}
// 删除
export function delObj(id) {
    return fetch({
        url: '/api/ordersys/customerPackaging/' + id,
        method: 'delete'
    });
}
// 获取客户列表
export function getCustomer(query) {
    return fetch({
        url: '/api/ordersys/customerPackaging/getCustomerByPackagingId',
        method: 'get',
        params: query,
    });
}
