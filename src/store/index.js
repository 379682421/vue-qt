import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  },
  // store的计算属性
  getters:{
    token: state => state.user.token,
    roles: state => state.user.roles,
    name:state => state.user.name,
    avatar:state => state.user.avatar,
    menus:state => state.user.menus,
  }
  
})
