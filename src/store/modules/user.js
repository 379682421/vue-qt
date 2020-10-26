import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
    return {
        token: getToken(),
        name: '',
        avatar: '',
        roles: [],
        menus: [],
    }
}

const state = getDefaultState();

const mutations = {
    resetState: (state) => {
        Object.assign(state, getDefaultState())
    },
    setToken: (state, token) => {
        state.token = token
    },
    setName: (state, name) => {
        state.name = name
    },
    setAvatar: (state, avatar) => {
        state.avatar = avatar
    },
    setRoles: (state, roles) => {
        state.roles = roles
    },
    setMenus: (state, menus) => {
        state.menus = menus
    },
}

const actions = {
    
    // 获取用户信息
    getInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response;

                if (!data) {
                    return reject('验证失败，请重新登录！')
                }

                const { roles, name, avatar} = data;
              
                if (!roles || roles.length <= 0) {
                    reject('getInfo: 角色数组为空！')
                }

                // data.menus = menus;
                commit('setRoles',roles)
                commit('setName',name)
                commit('setAvatar',avatar)
                commit('setMenus',menus)
                
                resolve(data)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 删除Token
    resetToken({commit}){
        return new Promise(resolve => {
            removeToken();
            commit('resetState')
            resolve()
        })
    },

}


export default {
    namespaced: true,
    state,
    mutations,
    actions
}