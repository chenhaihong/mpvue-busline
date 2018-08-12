import { platform } from "os";

/*
 * @Author: erye
 * @Date: 2018-05-08 14:23:07
 * @Last Modified by: erye
 * @Last Modified time: 2018-07-18 20:51:05
 */

const TransitDetailModule = {
  namespaced: true,

  state: {
    selected: 0,

    map: {
      scale: 14,
      longitude: null,
      latitude: null,
      markers: [],
      polyline: [],
    },
  },
  getters: {},
  mutations: {
    updateSelected: (state, selected) => {
      state.selected = selected;
    },
    updateMap: (state, payload) => {
      state.map = {
        ...state.map,
        ...payload,
      };
    },
    resetMap: (state) => {
      state.map = {
        scale: 14,
        longitude: null,
        latitude: null,
        markers: [],
        polyline: [],
      };
    }
  },
  actions: {}
}

export default TransitDetailModule
