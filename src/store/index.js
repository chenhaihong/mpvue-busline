// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

import RouteModule from './modules/route'
import TransitListModule from './modules/transit_list'
import StationListModule from './modules/station_list'
import MetroListModule from './modules/metro_list'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    route: RouteModule,
    transit_list: TransitListModule,
    station_list: StationListModule,
    metro_list: MetroListModule,
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
