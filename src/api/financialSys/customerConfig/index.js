import fetch from 'utils/fetch';
export function page(query) {
return fetch({
url: '/api/ordersys/customsTaxInfo/pageVo',
method: 'get',
params: query
});
}
// 客户下拉选择
export function selectObj(query) {
  return fetch({
  url: '/api/basedatasys/bdCustomer/getSelectList',
  method: 'get',
  params: query
  })
  }
// 税单明细下拉框
export function selectTax(query) {
  return fetch({
  url: '/api/ordersys/customsTaxInfo/selectTaxPeriod ',
  method: 'get',
  params: query
  })
  }
  // 上传文件
  export const importDataUrl = '/api/ordersys/customsTaxInfo/uploadTempFile'
  // 导入税单明细

export function addUpload(obj) {
return fetch({
url: '/api/ordersys/customsTaxInfo/upload',
method: 'post',
data: obj
});
}
// 编辑
export function putObj(id, obj) {
  return fetch({
  url: '/api/ordersys/customsTaxInfo/' + id,
  method: 'put',
  data: obj
  })
  }
  //删除
  export function delObj(id) {
    return fetch({
    url: '/api/ordersys/customsTaxInfo/' + id,
    method: 'delete'
    })
    }
    // 判断开始时间结束时间是否重复
    export function timeObj(query) {
      return fetch({
      url: '/api/ordersys/customsTaxInfo/isCheck',
      method: 'get',
      params: query
      })
      }
// 税单详情
export function pageDetail(query) {
  return fetch({
  url: '/api/ordersys/customerTaxRecord/page',
  method: 'get',
  params: query
  });
  }
  // 图片上传
export const orderImgExportUrl = '/api/ordersys/fileCommon/upload'
  // 缴费
  export function payObj(obj) {
    return fetch({
    url: '/api/ordersys/customerTaxRecord/payTax',
    method: 'post',
    data: obj
    });
    }
// // excel 导出方法
// export const excelExport = params => {
//   let temp = ''
//   for (let item in params) {
//     if (item === 'url') continue
//     temp += item + '=' + params[item] + '&'
//   }
//   temp += 'appId=' + store.getters.appId + '&accessToken=' + getToken()
//    //window.location.href = params.url + '?' + temp  //在当前窗口打开
//  //   console.log(temp)
//   window.open(params.url + '?' + temp)  //打开一个新窗口
// }
// // 导出的url
// export  const orderExcelExportUrl = '/api/ordersys/customerTaxRecord/export'
export function excelExport(query) {
  return fetch({
  url: '/api/ordersys/customerTaxRecord/export',
  method: 'get',
  params: query
  });
  }
  // 电商平台名称下拉框
export function selectNameObj(query) {
  return fetch({
    url: '/api/basedatasys/bdCustomerDeclaration/getEntityList',
    method: 'get',
    params: query
  })
}
