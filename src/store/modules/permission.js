
import { constantRoutes } from '@/router'
import { filterAsyncRouter } from '@/router/import-production'

/**
 * Use meta.role to determine if the current user has permission
 * 使用meta.role确定当前用户是否具有权限
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
 * Filter asynchronous routing tables by recursion
 * 通过递归过滤异步路由表
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
    setRouters: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRouters({ commit }, { roles, menus }) {

        let asyncRoutes = filterAsyncRouter(menus) || [];

        return new Promise(resolve => {
            let accessedRoutes
            if (roles.includes('admin')) {
                accessedRoutes = asyncRoutes || []
            } else {
                accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
            }
            commit('setRouters', accessedRoutes)
            resolve(accessedRoutes)
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}