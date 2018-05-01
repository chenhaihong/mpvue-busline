// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

import RouteModule from './modules/route'
import ListModule from './modules/list'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    route: RouteModule,
    list: ListModule,
  },

  state: {

  },

  mutations: {

  },

  actions: {

  },

  getters: {

  }

})

export default store
