<template>
  <view>
    <StationsMap />
    <StationsSwiper />
    <StationDetail />
    <Share />
  </view>
</template>

<script>
import Share from "@/components/share";
import StationsMap from "./cell/stationsMap";
import StationsSwiper from "./cell/stationsSwiper";
import StationDetail from "./cell/stationDetail";
import store from "@/store";

export default {
  data() {
    return {};
  },

  computed: {},

  components: {
    Share,
    StationsMap,
    StationsSwiper,
    StationDetail
  },

  methods: {},

  created() {
    store.dispatch("stations/getCenter").then(() => {
      store.dispatch("stations/getStations");
    });
  },

  onShow() {},

  onReady() {},

  onShareAppMessage(res) {
    return {
      title: "快速查询公交地铁路线、附近站点信息，出行好帮手。",
      path: "/pages/route/main",
      imageUrl: "/static/image/logo.png"
    };
  },

  onPullDownRefresh() {
    store.dispatch("stations/getCenter").then(() => {
      store.dispatch("stations/getStations");
    });
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
