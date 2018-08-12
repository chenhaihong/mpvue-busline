<template>
  <view v-if="visible">
    <Choose />
    <MakerList :markers="markers" />
    <Share />
  </view>
</template>

<script>
import Share from "@/components/share";
import MakerList from "@/components/makerList";
import Choose from "./cell/choose";
import store from "@/store";

export default {
  data() {
    return {};
  },

  computed: {
    markers() {
      return store.state.station_list.stations;
    },
    visible() {
      return store.state.station_list.stations.length > 0;
    }
  },

  components: {
    Share,
    MakerList,
    Choose
  },

  methods: {},

  created() {
    // store.dispatch("station_list/getCenter").then(() => {
    //   store.dispatch("station_list/getStations");
    // });
  },

  onShow() {},

  onLoad() {
    store.dispatch("station_list/getCenter").then(() => {
      store.dispatch("station_list/getStations");
    });
  },
  onReady() {},

  onPullDownRefresh() {
    store.dispatch("station_list/getStations");
  },

  onShareAppMessage(res) {
    return {
      title: "附近的公交站",
      path: "/pages/station_list/main"
    };
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
