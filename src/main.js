// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router, { routerApp, firstPageRouter } from './router'
import store from './store'
// import ElementUI from 'element-ui'
import ELEMENT from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// import 'element-ui/lib/theme-chalk/index.css'
import 'assets/custom-theme/index.css' // 换肤版本element-ui css
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css' // Progress 进度条 样式
import 'normalize.css/normalize.css' // normalize.css 样式格式化
import 'assets/iconfont/iconfont' // iconfont 具体图标见https://github.com/PanJiaChen/vue-element-admin/wiki
import * as filters from './filters' // 全局vue filter
import Multiselect from 'vue-multiselect' // 使用的一个多选框组件，element-ui的select不能满足所有需求
import 'vue-multiselect/dist/vue-multiselect.min.css' // 多选框组件css
import Sticky from 'components/Sticky' // 粘性header组件
import IconSvg from 'components/Icon-svg' // svg 组件
import vueWaves from './directive/waves' // 水波纹指令
import errLog from 'store/errLog' // error log组件
// import './mock/index.js';  // 该项目所有请求使用mockjs模拟
import { getToken } from 'utils/auth'
import { copyProperty } from 'utils/index'
import svg from 'svg-progress-bar' // 引用svg-progress-bar

import {format}  from "silly-datetime" // 时间格式 转换

Vue.use(svg, { componentName: 'percent-bar' })
// register globally
Vue.component('multiselect', Multiselect)
Vue.component('Sticky', Sticky)
Vue.component('icon-svg', IconSvg)
Vue.use(ELEMENT)
Vue.use(vueWaves)

import axios from "axios";
Vue.prototype.$http = axios;

Vue.prototype.$copyJsonProperty = copyProperty
Vue.prototype.$format = format
// Vue.prototype.$echarts = echarts
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// register global progress.
const whiteList = ['/login', '/authredirect'] // 不重定向白名单
console.log(window.location.host)
router.beforeEach((to, from, next) => {
  // console.log(to.path);
  NProgress.start() // 开启Progress
  if (getToken()) {
    // 判断是否有token
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (to.path === '/index/homePage') {
        next()
      } else if (store.getters.menus === undefined) {
        // 判断当前用户是否已拉取完user_info信息
        // console.log(to.path);
        /**
         * 切换系统：
         * 1.this.$store.commit('SET_APPID', appId)
         * 2. this.$store.commit('SET_MENUS', undefined);
         * 3.  route.push("/demo")
         *
         ***/
        console.log(to.path)
        store
          .dispatch('GetInfo')
          .then(info => {
            // 拉取user_info 1.

            next({ ...to }) // hack方法 确保addRoutes已完成
            // })
          })
          .catch(() => {
            store.dispatch('FedLogOut').then(() => {
              next({ path: '/login' })
            })
          })
      } else {
        //  else {
        //   // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        //   if (hasPermission(store.getters.roles, to.meta.role)) {
        //     next();//
        //   } else {
        next()
        //   }
        //   // 可删 ↑
      }
    }
  } else {
    let a = window.location.host
    let index = ''
    let str = ''
    if (a.indexOf('.') != -1) {
      index = a.indexOf(".")
      str = a.substring(a.indexOf('.') + 1)
    } else {
      str = ''
    }
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      // next()
      // 测试环境
      if (str == '' || window.location.host == 'erpui.qst.com') {
        window.location.href =
          'http://sso.qst.com/sso/erp?redirect_url=http://erpui.qst.com/api/auth/jwt/setCookie'
      } else {
        if (window.location.host == 'erp.qst.com') {
          window.location.href =
            'http://sso.qst.com/sso/erp?redirect_url=http://erp.qst.com/api/auth/jwt/setCookie'
        } else if (window.location.host == 'erp.tqst.com') {
          window.location.href =
            'http://sso.tqst.com/sso/erp?redirect_url=http://erp.tqst.com/api/auth/jwt/setCookie'
        } 
        // else if (window.location.host == 'erp.dongdamen.net') {
        //             window.location.href =
        //               'http://sqsso.hnqst.cn/sso/erp?redirect_url=http://erp.dongdamen.net/api/auth/jwt/setCookie'
        //    } 
        else if (window.location.host == '36.133.41.43:7001') {
             window.location.href =
                        'http://36.133.41.43:7000/sso/erp?redirect_url=http://36.133.41.43:7001/api/auth/jwt/setCookie'
          }
        else {
          window.location.href =
            'http://sso.' + str + '/sso/erp?redirect_url=http://erp.' + str + '/api/auth/jwt/setCookie'
        }
      }
    } else {
      // next('/login'); // 否则全部重定向到登录页
      // 测试环境
      if (str == '' || window.location.host == 'erpui.qst.com') {
        window.location.href =
          'http://sso.qst.com/sso/erp?redirect_url=http://erpui.qst.com/api/auth/jwt/setCookie'
      } else {
        if (window.location.host == 'erp.qst.com') {
          window.location.href =
            'http://sso.qst.com/sso/erp?redirect_url=http://erp.qst.com/api/auth/jwt/setCookie'
        } else if (window.location.host == 'erp.tqst.com') {
          window.location.href =
            'http://sso.tqst.com/sso/erp?redirect_url=http://erp.tqst.com/api/auth/jwt/setCookie'
        }
      //    else if (window.location.host == 'erp.dongdamen.net') {
      //        window.location.href =
      //                 'http://sqsso.hnqst.cn/sso/erp?redirect_url=http://erp.dongdamen.net/api/auth/jwt/setCookie'
      //  }
       else if (window.location.host == '36.133.41.43:7001') {
         window.location.href =
                    'http://36.133.41.43:7000/sso/erp?redirect_url=http://36.133.41.43:7001/api/auth/jwt/setCookie'
      }
        else {
          window.location.href =
            'http://sso.' + str + '/sso/erp?redirect_url=http://erp.' + str + '/api/auth/jwt/setCookie'
        }
      }
      NProgress.done() // 在hash模式下 改变手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
    }
  }
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})

Vue.config.productionTip = false

// 生产环境错误日志
if (process.env.NODE_ENV === 'production') {
  Vue.config.errorHandler = function (err, vm) {
    console.log(err, window.location.href)
    errLog.pushLog({
      err,
      url: window.location.href,
      vm
    })
  }
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
