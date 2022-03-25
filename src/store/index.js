import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/localStorage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 一个对象，存储当前登录用户信息（token等数据）
    user: getItem('token_key')
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 为了防止刷新丢失，我们需要把数据备份到本地存储
      setItem('token_key', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
