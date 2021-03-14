import { asyncRoutes, constantRoutes } from '@/router'
import $api from '@/api'
import { generateChildRouters } from '@/utils/addRouter'

/**
 * 通过 meta.role 来判断是否拥有权限
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * 通过递归过滤路由
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state) => {
    state.addRoutes = constantRoutes
    state.routes = constantRoutes
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let accessedRoutes
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  },

  remoteRoutes({ commit }) {
    return new Promise(resolve => {
      $api.userInfo.getMenuList().then(res => {
        const accessedRoutes = generateChildRouters(res.data)
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  },

  initRoutes({commit}){
    commit('SET_ROUTES')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
