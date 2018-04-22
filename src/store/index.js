// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const KEY_HISTORY = 'History'

const store = new Vuex.Store({

  state: {
    count: 0,
    route: { // 路线页数据
      place: {
        a: {
          name: null,
          latitude: null,
          longitude: null
        },
        b: {
          name: null,
          latitude: null,
          longitude: null
        },
      },
      historys: [],
    },
    list: { // 列表页

    },
    detail: { // 详情页

    },
    about: { // 关于

    },
  },

  mutations: {
    increment: (state) => {
      const obj = state
      obj.count += 1
    },
    decrement: (state) => {
      const obj = state
      obj.count -= 1
    },

    /**
     * route
     */
    navigateToRouteList: (state) => {
      let a = state.route.place.a;
      let b = state.route.place.b;

      let place = JSON.stringify({
        a,
        b,
      });

      wx.navigateTo({
        'url': `/pages/list/main?place=${place}`,
      });
    },

    /**
     * place
     */
    clearPlace: (state) => {
      state.route.place.a = {}
      state.route.place.b = {}
    },
    updatePlace: (state, payload) => {
      const {
        place,
        which
      } = payload
      state.route.place[which] = place
    },
    switchAB: (state) => {
      const a = state.route.place.a
      const b = state.route.place.b
      state.route.place.a = b
      state.route.place.b = a
    },

    /**
     * history
     */
    initHistorys: (state) => {
      let historys = wx.getStorageSync(KEY_HISTORY) || [];
      state.route.historys = historys
    },
    clearHistorys: (state) => {
      wx.setStorageSync(KEY_HISTORY, []);
      state.route.historys = []
    },
    saveHistory: (state) => {
      let olds = wx.getStorageSync(KEY_HISTORY) || [];

      let a = state.route.place.a;
      let b = state.route.place.b;
      let one = {
        a: a,
        b: b,
      };

      // 历史查询记录限制15个
      if (olds.length >= 15) {
        olds.pop();
      }

      olds.unshift(one);

      wx.setStorageSync(KEY_HISTORY, olds)

      // 更新页面
      state.route.historys = olds
    }, // end saveHistory
  },

})

export default store
