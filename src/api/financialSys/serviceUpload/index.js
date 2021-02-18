import fetch from 'utils/fetch';

// 获取客户下拉框
export function getCustomerSelectList(query) {
    return fetch({
        url: '/api/ordersys/customerController/getCustomerSelectList',
        method: 'get',
        params: query,
    });
}

//退件转寄 分页查询
export function getPageList_R2F(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillReturn/page',
        method: 'get',
        params: query,
    });
}
//修改
export function editBillReturn(id,obj) {
    return fetch({
        url: `/api/ordersys/customerFinanceBillReturn/${id}`,
        method: 'put',
        data: obj,
    });
}
//添加
export function addBillReturn(obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillReturn/add',
        method: 'post',
        data: obj,
    });
}

//删除
export function deleteBillReturn(id,query) {
    return fetch({
        url: `/api/ordersys/customerFinanceBillReturn/${id}`,
        method: 'delete',
        params: query,
    });
}



//下载模板
export function getTemplate(query) {
    return fetch({
        url: `/api/ordersys/financeFileTemplate/getTemplate`,
        method: 'get',
        params: query,
        response:'arraybuffer'
    });
}

/**
 * 
 * 提货转关
 * **/
// 分页查询
export function getTransferPage(query) {
    return fetch({
        url: `/api/ordersys/customerFinanceBillTransfer/page`,
        method: 'get',
        params: query,
    });
}


//修改
export function editTransfer(id,obj) {
    return fetch({
        url: `/api/ordersys/customerFinanceBillTransfer/${id}`,
        method: 'put',
        data: obj,
    });
}

//删除
export function deleteTransfer(id,query) {
    return fetch({
        url: `/api/ordersys/customerFinanceBillTransfer/${id}`,
        method: 'delete',
        params: query,
    });
}


//添加
export function addTransfer(obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillTransfer/add',
        method: 'post',
        data: obj,
    });
}



/**
 * 赔付上传
 * 
 * ***/



//赔付上传 分页查询
export function getBillPayPage(query) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillPay/page',
        method: 'get',
        params: query,
    });
}

//修改
export function editBillPay(id,obj) {
    return fetch({
        url: `/api/ordersys/customerFinanceBillPay/${id}`,
        method: 'put',
        data: obj,
    });
}

//删除
export function deleteBillPay(id,query) {
    return fetch({
        url: `/api/ordersys//customerFinanceBillPay/${id}`,
        method: 'delete',
        params: query,
    });
}


//添加
export function addBillPay(obj) {
    return fetch({
        url: '/api/ordersys/customerFinanceBillPay/add',
        method: 'post',
        data: obj,
    });
}
