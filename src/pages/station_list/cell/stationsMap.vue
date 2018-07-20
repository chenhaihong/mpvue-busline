<template>
  <div>
    <map id="stations_map" :style="{height: height + 'px'}" :longitude="longitude" :latitude="latitude" show-location :controls="controls" @controltap="controltap" :markers="markers" @markertap="markertap"></map>
  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      // 这里不再使用默认scale值，
      // mpvue的状态管理存在bug，每次 state 数据改变，地图的缩放都会重新进行一次
      // scale: 15
    };
  },

  computed: {
    longitude() {
      return store.state.station_list.centerLocation.longitude;
    },
    latitude() {
      return store.state.station_list.centerLocation.latitude;
    },
    height() {
      let sysInfo = wx.getSystemInfoSync();
      let h = sysInfo.windowHeight * 0.5; // 地图的高度，单位像素
      return h;
    },
    controls() {
      let h = this.height || 200;

      let w1 = 43; // control的宽
      let h1 = 43; // control的高
      let gap = 5; // 图标间距
      let paddingX = 10; // 图标与边框x间距
      let paddingY = 10; // 图标与边框y间距

      let controls = [
        {
          id: 1,
          iconPath: "/static/image/map/locate.png",
          position: {
            left: paddingX,
            top: h - (h1 + paddingY),
            width: w1,
            height: h1
          },
          clickable: true
        }
      ];
      return controls;
    },
    markers() {
      return store.getters["station_list/highlight_stations"];
    }
  },

  methods: {
    controltap(e) {
      let id = e.mp.controlId;

      switch (id) {
        case 1: // 定位
          wx.createMapContext("stations_map").moveToLocation();
          break;
      }
    },
    markertap(e) {
      const id = e.mp.markerId;
      store.commit("station_list/updateCurrent", id);
    }
  },

  onReady() {}
};
</script>

<style lang="less" scoped>
#stations_map {
  width: 100%;
  height: 300px;
  border-bottom: 1px solid #ccc;
}
</style>
