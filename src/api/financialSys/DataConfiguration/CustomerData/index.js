import fetch from 'utils/fetch';

export function page(query) {
return fetch({
url: '/api/financialsys/exportConfig/byPage',
method: 'get',
params: query
});
}

// 下拉框
export function selectObj(query) {
  return fetch({
      url: '/api/financialsys/exportConfig/selectDropList',
      methods: 'get',
      params: query
  })
}

//多选框
export function checkbox(query) {
  return fetch({
  url: '/api/financialsys/exportField/page',
  method: 'get',
  params: query
  });
  }

export function getObj(id) {
return fetch({
url: '/api/financialsys/exportConfig/' + id,
method: 'get'
})
}

//编辑
export function setInfo(obj) {
  return fetch({
  url: '/api/financialsys/exportConfig/updateExportSet',
  method: 'post',
  data: obj
  })
  }

  //添加
  export function addObj(obj){
    return fetch({
      url: '/api/financialsys/exportConfig/addExportSet',
      method: 'post',
      data: obj
      });
  }

  //删除
  export function delObj(id) {
    return fetch({
    url: '/api/financialsys/exportConfig/' + id,
    method: 'delete'
    })
    }