import Cookies from 'js-cookie';

const app = {
  state: {
    sidebar: {
      opened: !+Cookies.get('sidebarStatus')
    },
    theme: 'default',
    livenewsChannels: Cookies.get('livenewsChannels') || '[]',
    visitedViews: [],
    appId: 'ce825ff0-016c-8627-78c8-577b07461ddb', // appId的默认值
    elTableMediaHeight: function(){
           if (window.screen.height === 1080) {
            return ((window.screen.height) / 1.8)
            // console.log('111')
          }
           if (window.screen.height === 900) {
            return ((window.screen.height) / 1.85)
            // console.log('111')
          }
          if (window.screen.height === 768) {
            return ((window.screen.height) / 2 - 25)
            // console.log('111')
          }
        }() 
    // appId: 'bcbaccd3f0ad0c6bf4d63dc055c6dc6c' // appId的默认值
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      if (state.sidebar.opened) {
        Cookies.set('sidebarStatus', 1);
      } else {
        Cookies.set('sidebarStatus', 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
    },
    SET_APPID: (state,appId) =>{
      state.appId = appId;
    },
    SET_elTableMediaHeight: state => {
       state.elTableMediaHeight = function(){
         if (window.screen.height === 1080) {
          return ((window.screen.height) / 1.5)
          // console.log('111')
        }
         if (window.screen.height === 900) {
          return ((window.screen.height) / 1.85)
          // console.log('111')
        }
        if (window.screen.height === 768) {
          return ((window.screen.height) / 2 - 25)
          // console.log('111')
        }
      }(); 
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, path: view.path })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    }
  },
  actions: {
    ToggleSideBar: ({ commit }) => {
      commit('TOGGLE_SIDEBAR')
    },
    changeAppId: ({ commit }, appId) => {
      commit('SET_APPID', appId)
    },
    addVisitedViews: ({ commit }, view) => {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews: ({ commit }, view) => {
      commit('DEL_VISITED_VIEWS', view)
    }
  }
};

export default app;
