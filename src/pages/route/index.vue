<template>
  <div>

    <place-input />
    <history />

    <scroll-view class="scroll" scroll-y enable-back-to-top scroll-with-animation>
      <history/>
      <div class='mb40'></div>
      <share />
    </scroll-view>

  </div>
</template>

<script>
import placeInput from "@/components/placeInput";
import history from "@/components/history";
import share from "@/components/share";

export default {
  data() {
    return {};
  },

  components: {
    placeInput,
    history,
    share
  },

  methods: {},

  created() {},

  onShareAppMessage(res) {
    return {
      title: "快速查询公交地铁路线、附近站点信息，出行好帮手。",
      path: "/pages/route/main",
      imageUrl: "/static/image/logo.png"
    };
  }
};
</script>

<style>
page {
  overflow-x: hidden;
}

.place {
  z-index: 100;
  position: fixed;
  top: 0;
  padding: 20rpx 0;
  width: 100%;
  /* height: 200rpx; */
  color: #fff;
  background: #4287ff;
}

.shadow {
  z-index: 99;
  position: fixed;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}

.scroll {
  position: fixed;
  top: 220rpx;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
}
</style>
