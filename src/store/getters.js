const getters = {
  sidebar: state => state.app.sidebar,
  appId: state => state.app.appId,
  visitedViews: state => state.app.visitedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  menus: state => state.user.menus,
  elements: state => state.user.elements,
  setting: state => state.user.setting,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  currentChildSystemCode: state => state.user.currentChildSystemCode,
  permissionMenus: state => state.user.permissionMenus,
  permissionRouter: state => state.user.permissionRouter,
  elTableMediaHeight: state => state.app.elTableMediaHeight
};
export default getters
