const getters = {
  token: status => status.user.token,
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  roles: state => state.user.roles,
  name: state => state.user.name,
  id: state => state.user.id,
  avatar: state => state.user.avatar,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs
}

export default getters
