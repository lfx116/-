import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utils/storage'

Vue.use(Vuex)


const TOUTIAO_USER = 'toutiao_user'

export default new Vuex.Store({
  state: {
    user: getItem(TOUTIAO_USER)
  },
  getters: {},
  mutations: {
    setUser(state, payload) {
      state.user = payload
      setItem(TOUTIAO_USER, payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
