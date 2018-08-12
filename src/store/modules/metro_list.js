/*
 * @Author: erye
 * @Date: 2018-05-08 14:23:07
 * @Last Modified by: erye
 * @Last Modified time: 2018-07-18 20:51:05
 */

import * as helpers from "@/utils/helpers";
import amapFile from "@/utils/amap-wx.js";

const aMap = new amapFile.AMapWX({
  key: '0c8c32fa61ad5d5250bbd4d2ab662bcc',
});

const MetroListModule = {
  namespaced: true,

  state: {
    centerLocation: { // 屏幕中心经纬度
      name: null,
      latitude: null,
      longitude: null
    },

    stations: [], // 地铁站点数据
  },
  getters: {},
  mutations: {
    updateCenterLocation: (state, centerLocation) => {
      state.centerLocation = centerLocation;
    },
    updateStations: (state, data) => {
      state.stations = data;
    },
  },
  actions: {
    getCenter: ({ state, commit, getters }) => {
      return new Promise((resolve, reject) => {
        wx.getLocation({
          type: "gcj02",
          success: res => {
            commit("updateCenterLocation", {
              name: "我的位置",
              latitude: res.latitude,
              longitude: res.longitude
            });
            resolve(1);
          },
          fail: err => {
            reject(err);
          },
        });
      });
    },
    getStations: ({ state, commit }) => {
      wx.showLoading({ title: '加载中', });

      let center = state.centerLocation;
      // 获取站点数据
      aMap.getPoiAround({
        querykeywords: '地铁站',
        location: `${center.longitude},${center.latitude}`,
        success: (data) => {
          wx.hideLoading();
          wx.stopPullDownRefresh();

          const poisData = data.poisData.map(item => {
            item.distance = helpers.formatDistance(parseInt(item.distance));
            return item;
          });

          // 高德的小程序sdk里目前没有开放页数功能，
          // 只开放了关键词（keywords）、类型（types）这两个参数，
          // 其他参数未开放，所以只能展示拿到的第一页的内容，
          // 未来，如果开放再考虑后续功能。
          if (poisData.length > 0) {
            commit('updateStations', poisData);
          } else {
            wx.showModal({ title: '附近无数据' });
          }
        },
        fail: (info) => {
          wx.hideLoading();
          wx.stopPullDownRefresh();
          wx.showModal({ title: info.errMsg });
        }
      });
    },
  },
}

export default MetroListModule
