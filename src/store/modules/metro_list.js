/*
 * @Author: erye
 * @Date: 2018-05-08 14:23:07
 * @Last Modified by: erye
 * @Last Modified time: 2018-07-18 20:51:05
 */

import amapFile from "@/utils/amap-wx.js";

const aMap = new amapFile.AMapWX({
  key: '0c8c32fa61ad5d5250bbd4d2ab662bcc',
});

const MetroListModule = {
  namespaced: true,

  state: {
    oMap: null,
    centerLocation: { // 屏幕中心经纬度
      name: null,
      latitude: null,
      longitude: null
    },

    current: 0, // swiper current，选中的第几个 swiper-item，高亮标志需要用到这个字段
    stations: [], // 公交站点数据
  },
  getters: {
    // 高亮了图标的站点数据
    highlight_stations: (state) => {
      const index = state.current;
      const stations = state.stations;
      const new_stations = [];

      if (!stations.length) {
        return [];
      }

      // 重置图标为蓝色图标
      stations.forEach((v, k) => {
        new_stations.push({
          ...v,
          iconPath: '/static/image/map/marker.png',
          callout: {},
        });
      });

      // 高亮
      new_stations[index].iconPath = '/static/image/map/marker@active.png';
      new_stations[index].callout = {
        content: new_stations[index].name,
        padding: 2,
        display: 'ALWAYS',
      };

      return new_stations;
    }
  },
  mutations: {
    // updateOMap: (state, oMap) => {
    //   state.oMap = oMap;
    // },
    updateCenterLocation: (state, centerLocation) => {
      state.centerLocation = centerLocation;
    },
    updateStations: (state, data) => {
      state.stations = data;
    },
    // updateHighlightStations: (state, index) => {
    //   // const index = state.current;
    //   const stations = state.stations;
    //   const new_stations = [];

    //   // 重置图标为蓝色图标
    //   stations.forEach((v, k) => {
    //     new_stations.push({
    //       ...v,
    //       iconPath: '/static/image/map/marker.png',
    //       callout: {},
    //     });
    //   });

    //   // 高亮
    //   new_stations[index].iconPath = '/static/image/map/marker@active.png';
    //   new_stations[index].callout = {
    //     content: new_stations[index].name,
    //     padding: 2,
    //     display: 'ALWAYS',
    //   };

    //   state.stations = new_stations;
    // },
    updateCurrent: (state, data) => {
      state.current = data;
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
      let center = state.centerLocation
      // 获取站点数据
      aMap.getPoiAround({
        querykeywords: '地铁站',
        success: (data) => {
          wx.stopPullDownRefresh();

          const markersData = data.markers;
          const poisData = data.poisData;
          const _markers = [];
          markersData.forEach((item, index) => {
            if (index > 9) {
              return false;
            }
            const poi = poisData[index];
            _markers.push({
              id: index,

              marker_id: poi.id,
              name: poi.name,
              distance: poi.distance,
              address: poi.address,
              tel: poi.tel,
              type: poi.type,

              // 高亮第一个点
              latitude: item.latitude,
              longitude: item.longitude,
              width: 32,
              height: 32,
              // 第一个点显示标题
              iconPath: index == 0 ? '/static/image/map/marker@active.png' : '/static/image/map/marker.png',
              callout: index == 0 ? {
                content: item.name,
                padding: 2,
                display: 'ALWAYS',
              } : {},
            });
          });

          // 高德的小程序sdk里目前没有开放页数功能，
          // 只开放了关键词（keywords）、类型（types）这两个参数，
          // 其他参数未开放，所以只能展示拿到的第一页的内容，
          // 未来，如果开放再考虑后续功能。
          if (markersData.length > 0) {
            commit('updateCurrent', 0);
            commit('updateStations', _markers);

            wx.createMapContext("metros_map").includePoints({
              padding: [85, 60, 60, 60], // 距离顶部的距离需要加上marker的高度
              points: _markers.concat([ // 需要将当前点也考虑进去进去
                {
                  latitude: state.centerLocation.latitude,
                  longitude: state.centerLocation.longitude,
                }
              ]),
            });
          } else {
            wx.showModal({ title: '附近无数据' });
          }
        },
        fail: function (info) {
          wx.stopPullDownRefresh();
          wx.showModal({ title: info.errMsg });
        }
      });
    },
  },
}

export default MetroListModule
