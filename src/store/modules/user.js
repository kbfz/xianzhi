import {
  loginByEmail,
  logout,
  getInfo,
  getMenus,
  getIndexInfo
} from 'api/login';
import {
  getToken,
  setToken,
  removeToken
} from 'utils/auth';
import {
  Message
} from 'element-ui';
const user = {
  state: {
    user: '',
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: 'http://qst-file-image-201804.oss-cn-shenzhen.aliyuncs.com/upload/20190419/8022b5fa1652472f8fc4bc97ef756f86.png',
    introduction: '',
    roles: [],
    menus: undefined,
    elements: undefined,
    permissionMenus: undefined,
    currentChildSystemCode: undefined,
    permissionRouter: [],
    setting: {
      articlePlatform: []
    }
  },

  mutations: {
    SET_CODE: (state, code) => {
      state.code = code;
    },
    SET_permissionRouter: (state, permissionRouter) => {
      state.permissionRouter = permissionRouter;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    },
    SET_SETTING: (state, setting) => {
      state.setting = setting;
    },
    SET_STATUS: (state, status) => {
      state.status = status;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_MENUS: (state, menus) => {
      state.menus = menus;
    },
    SET_ELEMENTS: (state, elements) => {
      state.elements = elements;
    },
    LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    LOGOUT_USER: state => {
      state.user = '';
    },
    SET_currentChildSystemCode: (state, currentChildSystemCode) => {
      state.currentChildSystemCode = currentChildSystemCode;
    },
    SET_PERMISSION_MENUS: (state, permissionMenus) => {
      state.permissionMenus = permissionMenus; // 每个系统的子菜单
      // console.log(permissionMenus)
    }

  },

  actions: {
    // 邮箱登录
    LoginByEmail({
      commit
    }, userInfo) {
      const username = userInfo.username.trim();
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      commit('SET_MENUS', undefined);
      commit('SET_ELEMENTS', undefined);
      removeToken();
      return new Promise((resolve, reject) => {
        // loginByEmail(username, userInfo.password).then(response => {
        loginByEmail(username, userInfo.password, userInfo.barCode, userInfo.sessionId, userInfo.userType).then(response => {
          const data = response;
          // console.log(response)
          // console.log(data)
          if (data.status === 500) {
            Message({
              message: '账户或密码错误！',
              type: 'warning'
            });
            return Promise.reject('error');
          } else {
            if (data.data !== undefined) {
              setToken(data.data.token);
              commit('SET_TOKEN', data.data.token);
            }
            resolve(response);
          }
          // console.log(data)
        }).catch(error => {
          console.log(error)
          reject(error);
        });
      });
    },
    // 系统首页获取用户信息
    HomeInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getIndexInfo().then(response => {
          const res = response.data;
          commit('SET_ROLES', 'admin');
          commit('SET_AVATAR', 'http://qst-file-image-201804.oss-cn-shenzhen.aliyuncs.com/upload/20190419/8022b5fa1652472f8fc4bc97ef756f86.png');
          commit('SET_NAME', res.name);
        }).catch(error => {
          // reject(error);
        });
      });
    },
    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response;
          commit('SET_ROLES', 'admin');
          commit('SET_NAME', data.name);
          commit('SET_AVATAR', 'http://qst-file-image-201804.oss-cn-shenzhen.aliyuncs.com/upload/20190419/8022b5fa1652472f8fc4bc97ef756f86.png');
          commit('SET_INTRODUCTION', data.description);
          const menus = {};
          for (let i = 0; i < data.menus.length; i++) {
            menus[data.menus[i].code] = true;
          }
          commit('SET_MENUS', menus);
          // console.log("<")
          // console.log(menus);
          // console.log(">")
          const elements = {};
          for (let i = 0; i < data.elements.length; i++) {
            elements[data.elements[i].code] = true;
          }
          commit('SET_ELEMENTS', elements);
          // resolve(response);
        }).catch(error => {
          // reject(error);
        });
        // commit('SET_currentChildSystemCode', response[0].code);
        getMenus(state.token).then(response => {
          // console.log(response[0].code);
          commit('SET_PERMISSION_MENUS', response[0].children);
          commit('SET_currentChildSystemCode', response[0].code);
          resolve(response);
        }).catch(error => {
          reject(error);
        });

      });
    },
    // 第三方验证登录
    LoginByThirdparty({
      commit,
      state
    }, code) {
      return new Promise((resolve, reject) => {
        commit('SET_CODE', code);
        loginByThirdparty(state.status, state.email, state.code).then(response => {
          commit('SET_TOKEN', response.data.token);
          setToken(response.data.token);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then((res) => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          commit('SET_MENUS', undefined);
          commit('SET_ELEMENTS', undefined);
          commit('SET_PERMISSION_MENUS', undefined, undefined);
          removeToken();
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      });
    },

    // 前端 登出
    FedLogOut({
      commit
    }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '');
        commit('SET_MENUS', undefined);
        commit('SET_ELEMENTS', undefined);
        commit('SET_PERMISSION_MENUS', undefined, undefined);
        removeToken();
        resolve();
      });
    },

    // 动态修改权限
    ChangeRole({
      commit
    }, role) {
      return new Promise(resolve => {
        commit('SET_ROLES', [role]);
        commit('SET_TOKEN', role);
        setToken(role);
        resolve();
      })
    }
  }
};

export default user;
