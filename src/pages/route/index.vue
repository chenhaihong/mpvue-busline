<template>
  <div>
    <placeInput />

    <!-- <scroll-view class="scroll" scroll-y enable-back-to-top scroll-with-animation> -->
    <collectedPlaces />
    <history />
    <share />
    <!-- </scroll-view> -->
  </div>
</template>

<script>
import placeInput from "./cell/placeInput";
import collectedPlaces from "./cell/collectedPlaces";
import history from "./cell/history";
import share from "@/components/share";

import store from "@/store";

export default {
  data() {
    return {};
  },

  components: {
    placeInput,
    collectedPlaces,
    history,
    share
  },

  methods: {},

  created() {},

  onReady() {
    // load current place
    store.commit("route/clearPlace");
    wx.getLocation({
      type: "gcj02",
      success: res => {
        store.commit("route/updatePlace", {
          which: "a",
          place: {
            name: "我的位置",
            latitude: res.latitude,
            longitude: res.longitude
          }
        });
      }
    });
  },

  onShareAppMessage(res) {
    return {
      title: "快速查询公交地铁路线、附近站点信息，出行好帮手。",
      path: "/pages/route/main"
      // imageUrl: "/static/image/logo.png"
    };
  }
};
</script>

<style lang="less">
@import "./index.less";
</style>
