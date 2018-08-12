<template>
  <view class="choose allowTap" @click="bindChooserTap">
    <text class="name">在“{{place.name}}”附近搜索</text>
    <text class="toggle">[切换]</text>
  </view>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {};
  },

  computed: {
    place() {
      return store.state.metro_list.centerLocation;
    }
  },

  methods: {
    bindChooserTap(e) {
      wx.chooseLocation({
        success: res => {
          let which = e.currentTarget.dataset.which;
          let name = res.name ? res.name : res.address;
          store.commit("metro_list/updateCenterLocation", {
            name,
            latitude: res.latitude,
            longitude: res.longitude
          });
          store.dispatch("metro_list/getStations");
        }
      });
    }
  },

  onReady() {}
};
</script>

<style lang="less" scoped>
.choose {
  & {
    margin-bottom: 20rpx;
    padding: 30rpx;
    background: #fff;
    border-bottom: 1px solid #ddd;
  }
  .name {
    margin-right: 10rpx;
    font-size: 34rpx;
  }
  .toggle {
    font-size: 28rpx;
  }
}
</style>
