import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/basedatasys/bdGoods/page',
method: 'get',
params: query
});
}

export function addObj(obj) {
return fetch({
url: '/api/basedatasys/bdGoods/add',
method: 'post',
data: obj
});
}

export function getObj(id) {
return fetch({
url: '/api/basedatasys/bdGoods/' + id,
method: 'get'
})
}

export function delObj(id) {
return fetch({
url: '/api/basedatasys/bdGoods/' + id,
method: 'delete'
})
}

export function putObj(id, obj) {
return fetch({
url: '/api/basedatasys/bdGoods/' + id,
method: 'put',
data: obj
})
}
 // 上传文件
 export const importDataUrl = '/api/basedatasys/bdGoods/uploadTempFile'
//  导入
export function addUpload(query) {
  return fetch({
  url: '/api/basedatasys/bdGoods/upload',
  method: 'get',
  params: query
  });
  }
  // 下载文件
  export function addDownLoad(query) {
    return fetch({
    url: '/api/basedatasys/bdGoods/getTemplate',
    method: 'get',
    params: query
    });
    }
    // 默认申报身份
export function cbeNameSelect(query) {
  return fetch({
  url: '/api/basedatasys/bdCustomerDeclaration/getSelectList',
  method: 'get',
  params: query
  })
  }
