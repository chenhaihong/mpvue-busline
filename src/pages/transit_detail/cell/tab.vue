<template>
  <view class="tab">
    <view class="item" :class="{ active: selected == 0 }" data-which="text" @click="bindTabItemTap">
      <text>详情</text>
    </view>
    <view class="splitter" />
    <view class="item" :class="{ active: selected == 1 }" data-which="map" @click="bindTabItemTap">
      <text>地图</text>
    </view>
  </view>
</template>

<script>
import store from "@/store";
import mapConfig from "@/config/map";

let __markers = []; // 临时存放 markers 的容器

function getPolyline() {
  const transit =
    store.state.transit_list.transits[store.state.transit_list.transit_index];
  const segments = transit.segments;
  const polyline = [];
  for (let i = 0, L = segments.length; i < L; i++) {
    let seg = segments[i];

    let walkingPolyline = getWalkingPolyline(seg.walking);
    let busPolyline = getBusPolyline(seg.bus);
    let railwayPolyline = getRailwayPolyline(seg.railway);

    if (walkingPolyline.points.length) {
      polyline.push(walkingPolyline);
    }
    if (busPolyline.points.length) {
      polyline.push(busPolyline);
    }
    if (railwayPolyline.points.length) {
      polyline.push(railwayPolyline);
    }
    // 如果line.points为空数组，在android机上不会展示折线
    // 所以，下面这句的写法的是错的，
    // 应该使用上面的写法。
    // polyline.push(walkingPolyline, busPolyline, railwayPolyline);
  }
  return polyline;
}
function getMarkers() {
  // 因为 __markers 里的 marker 是通过 getPolyline 函数一个一个插入的，
  // 所以，必须在 getPolyline 之后执行
  let place = store.state.transit_list.place;
  let a = {
    ...place.a,
    iconPath: "/static/image/map/origin.png",
    width: 19,
    height: 25,
    callout: {
      content: place.a.name,
      padding: 2,
      display: "ALWAYS"
    }
  };
  let b = {
    ...place.b,
    iconPath: "/static/image/map/destination.png",
    width: 19,
    height: 25,
    callout: {
      content: place.b.name,
      padding: 2,
      display: "ALWAYS"
    }
  };
  let markers = [].concat(__markers, a, b);
  return markers;
}
function getWalkingPolyline(walking) {
  let points = [];
  if (walking && walking.steps && walking.steps.length) {
    for (let i = 0, L = walking.steps.length; i < L; i++) {
      let polyline = walking.steps[i].polyline;

      polyline.split(";").forEach(item => {
        let lnglat = item.split(",");
        points.push({
          longitude: parseFloat(lnglat[0]),
          latitude: parseFloat(lnglat[1])
        });
      });
    }
  }
  return {
    points,
    color: mapConfig.walking_line_color_active,
    width: mapConfig.bus_line_width,
    arrowLine: mapConfig.bus_line_arrowLine,
    borderColor: mapConfig.walking_line_border_color_active,
    borderWidth: 1
  };
}
function getBusPolyline(bus) {
  let points = [];
  let busline_index = bus.busline_index;
  let busline;
  if (bus && bus.buslines && bus.buslines.length) {
    busline = bus.buslines[busline_index];

    let polyline = busline.polyline;
    polyline.split(";").forEach(item => {
      let lnglat = item.split(",");
      points.push({
        longitude: parseFloat(lnglat[0]),
        latitude: parseFloat(lnglat[1])
      });
    });

    busline.via_stops.forEach(_stop => {
      __markers.push({
        longitude: _stop.location.split(",")[0],
        latitude: _stop.location.split(",")[1],
        width: 15,
        height: 15,
        iconPath: "/static/image/map/marker.png",
        callout: {
          content: _stop.name,
          padding: 1,
          display: "ALWAYS"
        }
      });
    });

    let departure_stop = busline.departure_stop;
    let arrival_stop = busline.arrival_stop;
    __markers.push({
      longitude: departure_stop.location.split(",")[0],
      latitude: departure_stop.location.split(",")[1],
      width: 25,
      height: 25,
      iconPath: "/static/image/map/marker@active.png",
      callout: {
        content: departure_stop.name,
        padding: 2,
        display: "ALWAYS"
      }
    });
    __markers.push({
      longitude: arrival_stop.location.split(",")[0],
      latitude: arrival_stop.location.split(",")[1],
      width: 25,
      height: 25,
      iconPath: "/static/image/map/marker@active.png",
      callout: {
        content: arrival_stop.name,
        padding: 2,
        display: "ALWAYS"
      }
    });
  }
  let color =
    busline && busline.type && busline.type.indexOf("地铁") >= 0
      ? mapConfig.metro_line_color // 地铁红褐色
      : mapConfig.bus_line_color; // 公交车绿色
  return {
    points,
    color: color,
    width: mapConfig.bus_line_width,
    arrowLine: mapConfig.bus_line_arrowLine,
    borderColor: color,
    borderWidth: 1
  };
}
function getRailwayPolyline(railway) {
  let points = [];
  if (railway && railway.name) {
    let departure_stop_lnglat = railway.departure_stop.location.split(" ");
    let arrival_stop_lnglat = railway.arrival_stop.location.split(" ");
    points.push({
      longitude: parseFloat(departure_stop_lnglat[0]),
      latitude: parseFloat(departure_stop_lnglat[1])
    });
    points.push({
      longitude: parseFloat(arrival_stop_lnglat[0]),
      latitude: parseFloat(arrival_stop_lnglat[1])
    });
  }
  return {
    points,
    color: mapConfig.railway_line_color,
    width: mapConfig.bus_line_width,
    arrowLine: mapConfig.bus_line_arrowLine,
    borderColor: mapConfig.railway_line_border_color,
    borderWidth: 1
  };
}

export default {
  data() {
    return {};
  },

  computed: {
    selected() {
      return store.state.transit_detail.selected;
    }
  },

  components: {},

  methods: {
    bindTabItemTap(e) {
      const which = e.mp.currentTarget.dataset.which;

      if (which == "text") {
        store.commit("transit_detail/updateSelected", 0);
        store.commit("transit_detail/resetMap");
      } else {
        store.commit("transit_detail/updateSelected", 1);

        let polyline = getPolyline();
        let markers = getMarkers();

        store.commit("transit_detail/updateMap", {
          polyline,
          markers
        });

        let points = [];
        polyline.forEach(item => {
          points = points.concat(item.points);
        });
        wx.createMapContext("map").includePoints({
          padding: [85, 60, 60, 60],
          points
        });

        __markers = [];
      }
    }
  },

  created() {}
};
</script>

<style lang="less" scoped>
.tab {
  @h: 50px;
  @h_splitter: 20px;
  & {
    z-index: 10;
    position: fixed;
    top: 0;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    height: @h;
    background: #fff;
    background-color: #fff;
    // border-bottom: 1px solid #ddd;
    box-shadow: 0 1px 3px #ddd;
    overflow: hidden;
  }
  .item {
    & {
      display: inline-block;
      width: (750rpx - 2rpx) / 2;
      height: @h;
      line-height: @h;
      text-align: center;
    }
    &.active {
      color: #4287ff;
    }
  }
  .splitter {
    display: inline-block;
    width: 2rpx;
    height: @h_splitter;
    background: #ddd;
  }
}
</style>
