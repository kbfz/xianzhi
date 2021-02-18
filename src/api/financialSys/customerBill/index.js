
import fetch from 'utils/fetch';

// 获取客户账单列表
export function customerFinanceBill(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBill/page',
        method: 'get',
        params: query,
    });
}
// 客户下拉
export function customerSelect(query) {
    return fetch({
        url: '/api/ordersys/customerController/getCustomerSelectList',
        method: 'get',
        params: query,
    });
}
// 查看客户详情
export function customerDetail(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBill/getById',
        method: 'get',
        params: query,
    });
}
// 操作费查看详情
export function postDetail(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillOrder/page',
        method: 'get',
        params: query,
    });
}
// 查看收费标准
export function getActiveObj(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBill/getCustomerRuleByBillId',
        method: 'get',
        params: query,
    });
}
// 确定并重新计算
export function newBill(obj) {
    return fetch({
        url: '/api/ordersys/customerRule/addNewRuleAndReProcessBill',
        method: 'post',
        data: obj,
    });
}
// 增值服务查看详情
export function getServiceObj(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillService/page',
        method: 'get',
        params: query,
    });
}
// 提货转关
export function getTransferObj(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillTransfer/page',
        method: 'get',
        params: query,
    });
}
// 退件转寄
export function getReturnObj(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillReturn/page',
        method: 'get',
        params: query,
    });
}
// 国际物流
export function getInternationalObj(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillInternational/page',
        method: 'get',
        params: query,
    });
}
// 包材费
export function getPackageObj(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillPackage/page',
        method: 'get',
        params: query,
    });
}
// 仓储费
export function getStorageObj(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillWarehouseFee/page',
        method: 'get',
        params: query,
    });
}
// 查验费
export function getCheckFeeObj(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillCheck/page',
        method: 'get',
        params: query,
    });
}
// 赔付
export function getPayObj(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillPay/page',
        method: 'get',
        params: query,
    });
}
// 其他项目新增保存
export function otherAdd(obj) {
    return fetch({
        url: '/api/ordersys//customerFinanceBillOther/add',
        method: 'post',
        data: obj
    });
}
// 获取其他项目
export function otherGet(id) {
    return fetch({
        url: '/api/ordersys//customerFinanceBillOther/' + id,
        method: 'get'
    });
}
// 编辑保存
export function otherUpdate(id,obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillOther/' + id,
        method: 'put',
        data: obj
    });
}
// 删除
export function otherDel(id) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillOther/' + id,
        method: 'delete'
    });
}




