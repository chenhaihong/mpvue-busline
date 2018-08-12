<template>
  <view class="mapContainer">
    <map id="map" class="map" :longitude="longitude" :latitude="latitude" :scale="scale" :markers="markers" :controls="controls" :polyline="polyline" :show-location="true" @controltap="bindControlTap"></map>
  </view>
</template>

<script>
import store from "@/store";

function getMapSize() {
  const sysInfo = wx.getSystemInfoSync();
  const w = sysInfo.windowWidth; // 可使用窗口宽度，单位像素
  const h = sysInfo.windowHeight - 50; // 可使用窗口高度 ，单位像素

  return { w, h };
}

export default {
  data() {
    let size = getMapSize();
    let w = size.w;
    let h = size.h;

    let w1 = 45; // control的宽
    let h1 = 45; // control的高
    let gap = 5; // 图标间距
    let paddingX = 10; // 图标与地图右（左）部的距离
    let paddingY = 25; // 图标与地图底部的距离

    let controls = [
      {
        id: 1,
        iconPath: "/static/image/map/-.png",
        position: {
          left: w - (w1 + paddingX),
          top: h - (h1 + paddingY),
          width: w1,
          height: h1
        },
        clickable: true
      },
      {
        id: 2,
        iconPath: "/static/image/map/+.png",
        position: {
          left: w - (w1 + paddingX),
          top: h - (h1 + paddingY) - (h1 + gap),
          width: w1,
          height: h1
        },
        clickable: true
      },
      {
        id: 3,
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

    return {
      controls
    };
  },

  computed: {
    scale() {
      return store.state.transit_detail.map.scale;
    },
    longitude() {
      return store.state.transit_detail.map.longitude;
    },
    latitude() {
      return store.state.transit_detail.map.latitude;
    },
    markers() {
      return store.state.transit_detail.map.markers;
    },
    polyline() {
      return store.state.transit_detail.map.polyline;
    }
  },

  components: {},

  methods: {
    bindControlTap(e) {
      let id = e.mp.controlId;

      switch (id) {
        case 1: // -，缩放级别，取值范围为5-18
          this.zoomOut();
          break;
        case 2: // +，缩放级别，取值范围为5-18
          this.zoomIn();
          break;
        case 3: // 定位
          wx.createMapContext("map").moveToLocation();
          break;
      }
    },

    zoomIn() {
      let scale = parseInt(store.state.transit_detail.map.scale) + 1;
      wx.createMapContext("map").getCenterLocation({
        success: res => {
          store.commit("transit_detail/updateMap", {
            longitude: res.longitude,
            latitude: res.latitude,
            scale: scale > 18 ? 18 : scale
          });
        }
      });
    },

    zoomOut() {
      let scale = parseInt(store.state.transit_detail.map.scale) - 1;
      wx.createMapContext("map").getCenterLocation({
        success: res => {
          store.commit("transit_detail/updateMap", {
            longitude: res.longitude,
            latitude: res.latitude,
            scale: scale > 18 ? 18 : scale
          });
        }
      });
    }
  },

  created() {},

  onReady() {
    // wx.createMapContext("map").moveToLocation();
  }
};
</script>

<style lang="less" scoped>
.mapContainer {
  & {
    position: absolute;
    top: 51px;
    bottom: 0;
    left: 0;
    right: 0;
  }
  .map {
    width: 100%;
    height: 100%;
  }
}
</style>
