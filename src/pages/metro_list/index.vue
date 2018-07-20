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

  created() {},

  onShow() {},

  onReady() {
    store.dispatch("metro_list/getCenter").then(() => {
      store.dispatch("metro_list/getStations");
    });
  },

  onPullDownRefresh() {
    store.dispatch("metro_list/getCenter").then(() => {
      store.dispatch("metro_list/getStations");
    });
  },

  onShareAppMessage(res) {
    return {
      title: "附近的地铁站",
      path: "/pages/metro_list/main",
      imageUrl: "/static/image/logo.png"
    };
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
