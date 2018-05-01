/*
 * @Author: erye 
 * @Date: 2018-04-30 16:50:32 
 * @Last Modified by: erye
 * @Last Modified time: 2018-05-01 22:38:14
 */
import amapFile from "@/utils/amap-wx.js";

const aMap = new amapFile.AMapWX({
  key: '0c8c32fa61ad5d5250bbd4d2ab662bcc',
});

function __getRegeo(location) {
  return new Promise(function (resolve, reject) {
    aMap.getRegeo({
      location,
      success: (data) => {
        resolve(data[0])
      },
      fail: (info) => {
        reject(info)
      },
    });
  })
}

function __getStrategy(strategyIndex) {
  let strategies = [
    {
      id: 0,
      name: '推荐路线'
    }, // 最快捷模式
    {
      id: 1,
      name: '花钱少'
    },
    {
      id: 2,
      name: '换乘少'
    },
    {
      id: 3,
      name: '步行少'
    },
    {
      id: 5,
      name: '不坐地铁'
    }
  ];
  return strategies[strategyIndex].id;
}

const ListModule = {
  namespaced: true,

  // 路线页数据
  state: {
    isLoading: true,

    // busSelector
    // 顶部的选择器的数据
    strategies: ["推荐路线(便捷)", "花钱少", "换乘少", "步行少", "不坐地铁"],
    params: {
      which: "none", // 点击了哪一个picker，datetime（时间）, strategy（策略）, none（无选中）
      date: null,
      time: null,
      strategyIndex: 0,
    },

    // 起点、终点
    'place': {
      'a': {
        'name': null,
        'latitude': null,
        'longitude': null,
        'citycode': null,
      },
      'b': {
        'name': null,
        'latitude': null,
        'longitude': null,
        'citycode': null,
      },
    },

    // 公交列表数据
    distance: null,      // 概览数据
    taxi_cost: null,     // 概览数据
    transits: [],        // 公交列表数据
    transit_index: null, // 选中要查看的第几个公交详情
  },
  getters: {
    params: (state) => {
      const a = state.place.a
      const b = state.place.b
      const params = {
        origin: `${a.longitude.toFixed(6)},${a.latitude.toFixed(6)}`,
        destination: `${b.longitude.toFixed(6)},${b.latitude.toFixed(6)}`,
        city: a.citycode,
        cityd: b.citycode,
        strategy: __getStrategy(state.params.strategyIndex),
      };

      if (state.params.date && state.params.time) {
        params.date = state.params.date;
        params.time = state.params.time;
      }

      return params;
    }
  },
  mutations: {
    loading: (state, value) => {
      state.isLoading = value
    },

    // 重置
    reset: (state) => {
      state.params = {
        which: "none",
        date: null,
        time: null,
        strategyIndex: 0,
      }
      state.place = {
        'a': {
          'name': null,
          'latitude': null,
          'longitude': null,
          'citycode': null,
        },
        'b': {
          'name': null,
          'latitude': null,
          'longitude': null,
          'citycode': null,
        },
      }
      state.distance = null
      state.taxi_cost = null
      state.transits = []
      state.transit_index = null
    },
    /**
     * bus title
     */
    setPlace: (state, place) => {
      // 从首页传过来的数据
      state.place = place
    },
    setACitycode: (state, code) => {
      state.place.a.citycode = code
    },
    setBCitycode: (state, code) => {
      state.place.b.citycode = code
    },

    /**
     * busSelector
     */
    updateParam: (state, { name, value }) => {
      state.params[name] = value
    },

    // bus list
    updateBusList: (state, data) => {
      // const transits = data.transits.map((item) => {
      //   return {
      //     cost: item.cost,
      //     distance: item.distance,
      //     duration: item.duration,
      //     missed: item.missed,
      //     nightflag: item.nightflag,
      //     walking_distance: item.walking_distance,
      //     segments: item.segments,
      //   }
      // })

      state.distance = data.distance
      state.taxi_cost = data.taxi_cost
      state.transits = data.transits
    },

    updateTransitIndex: (state, index) => {
      state.transit_index = index
    }
  },
  actions: {
    async getBusList({ commit, getters, dispatch, state }) {
      commit('loading', true);
      wx.showLoading({
        'title': '请稍等',
        'mask': true,
      });

      try {
        let a = state.place.a
        let b = state.place.b

        // 反向编码坐标，拿到城市编码
        let p1 = __getRegeo(`${a.longitude.toFixed(6)},${a.latitude.toFixed(6)}`)
        let p2 = __getRegeo(`${b.longitude.toFixed(6)},${b.latitude.toFixed(6)}`)
        let results = await Promise.all([p1, p2]);

        const code0 = results[0].regeocodeData.addressComponent.citycode
        const code1 = results[1].regeocodeData.addressComponent.citycode
        commit('setACitycode', code0)
        commit('setBCitycode', code1)

        // 获取公交路线数据
        const params = getters.params // 从 getters 获取参数
        aMap.getTransitRoute({
          ...params,
          success: function (data) {
            commit('loading', false);
            wx.hideLoading();

            commit('updateBusList', data)
          },
          fail: function (err) {
            commit('loading', false);
            wx.hideLoading();

            wx.showModal({
              title: info.errMsg
            });
          },
        });
      } catch (error) {
        // todo 失败提示页面
        wx.hideLoading();
      }
    }
  },
}

export default ListModule