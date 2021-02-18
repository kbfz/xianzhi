
import {page} from "../api/admin/user/index";
import {menuPage} from "../api/admin/menu/index";
import {btnPage} from "../api/admin/element/index";
import {page as groupTypePage} from "../api/admin/groupType/index";
import {page as feeNamePage} from "../api/generalTradeSys/baseDataMent/costMent/index";
import { equal } from "assert";
import { loginByEmail } from "../api/login"
/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@wallstreetcn\.com$/i;
  return reg.test(str.trim());
}

/* 合法uri*/
export function validateURL(textval) {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 验证key*/
// export function validateKey(str) {
//     var reg = /^[a-z_\-:]+$/;
//     return reg.test(str);
// }

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}
// 用户管理 》 账户名称不能重复
export const userValidator = (rule, value, callback) => {
    if (value.length !== 0) {
      let param = {username: value, _type_: 'equal'}
      page(param).then(response => {
        if (response.status === 200 && response.data.rows.length >=1) {
          callback(new Error('账户名称重复'))
        } else {
          callback()
        }
      })
    }
}
// 菜单管理 》 标题 和 路径编码不能重复
export const menuValidator = (rule, value, callback) => {
    if (value.length !== 0) {
    let param = {code: value, _type_: 'equal'}
    menuPage(param).then(response => {
      if (response.status === 200 && response.data.rows.length >=1) {
         callback(new Error('路径编码重复'))
      } else {
        callback()
      }
    })
  } else {
    callback()
  }
}

export const menuTitleValidator = (rule, value, callback) => {
     if (value.length !== 0) {
    let param = {title: value, _type_: 'equal'}
    menuPage(param).then(response => {
      if (response.status === 200 && response.data.rows.length >=1) {
         callback(new Error('标题重复'))
      } else {
        callback()
      }
    })
  } else {
    callback()
  }
}
// 菜单管理》按钮》资源编码不能重复
export const btnValidator = (rule, value, callback) => {
      if (value.length !== 0) {
          let param = {code: value, _type_: 'equal'}
          btnPage(param).then(response => {
            if (response.status === 200 && response.data.rows.length >=1) {
              callback(new Error('资源编码重复'))
            } else {
              callback()
            }
          })
        } else {
          callback()
        }   
}

// 角色类型 校验编码重复
export const groupTypeValidator = (rule, value, callback) => {
     if (value.length !== 0) {
    let param = {code: value, _type_: 'equal'}
    groupTypePage(param).then(response => {
      if (response.status === 200 && response.data.rows.length >= 1) {
        callback(new Error('编码名称重复'))
      } else {
        callback()
      }
    })
  }
}

// 判断输入的字符串长度为3~20
export const strLength = (rule, value, callback) => {
  // console.log(/^[\u4e00-\u9fa5]{2,10}$|^[\u4e00-\u9fa5_a-zA-Z0-9_]{3,20}$/.test(value))
  // console.log(value.length)
  if (value.length !== 0 && value !== null && /^[\u4e00-\u9fa5]{2}$|^[\u4e00-\u9fa5_a-zA-Z0-9_]{3,20}$/.test(value) === false) {
    callback(new Error('长度在 3 到 20 个字符'))
  } else {
    callback()
  }
}

export const numberValidator = (rule, value, callback) => {
  // console.log(value)
  if (value && /^[0-9]+([.]{1}[0-9]+){0,1}$/.test(value) === false) {
      callback(new Error("只能输入数字值"))
  } else {
      callback()
  }
}
export const parValidator = (rule, value, callback) => {
  // console.log(value)
  if (value && /^[1-9]\d*$/.test(value) === false) {
      callback(new Error("只能输入整数且不能为负数"))
  } else {
      callback()
  }
}
// 手机号验证
export const mobileValidator = (rule, value, callback) => {
  //  console.log(value)
  // if (value !== null && value.length !== 0 && /^(?:(?:(?:13[0-9])|(?:14[57])|(?:15[0-35-9])|(?:17[36-8])|(?:18[0-9]))\d{8})|(?:170[057-9]\d{7})$/.test(value) === false) {
  if (value && /^\d+$/.test(value) === false) {
      callback(new Error("只能输入数字值"))
  } else {
      callback()
  }
}
// 邮箱校验  
export const emailValidator = (rule, value, callback) => {
  // console.log(value)
  // if (value !== null && value.length !== 0 && /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value) === false) {
  if (value && /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value) === false) {
      callback(new Error("请输入合法邮箱"))
  } else {
      callback()
  }
}