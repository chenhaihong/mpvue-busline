<template>
  <view>

    <view class="head">
      <image class="logo" mode="scaleToFill" src="/static/image/logo.png" />
      <view class="name">公交快查</view>
    </view>

    <view class="listTitle">设置</view>
    <view class="list">
      <view class="item" @click="bindSettingTap">
        <view class="main">设置</view>
        <view class="sub">如果不能查询请点这里，允许使用地址位置</view>
      </view>
      <view class="item" @click="bindClearTap">
        <view class="main">清除缓存</view>
        <view class="sub">清空历史查询记录</view>
      </view>
    </view>

    <view class="listTitle">操作</view>
    <view class="list">
      <view class="item">
        <view class="main">分享</view>
        <view class="sub">赠人玫瑰，手有余香</view>
        <button class="button-share" open-type="share"></button>
      </view>
    </view>

  </view>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {};
  },

  components: {},

  methods: {
    bindSettingTap() {
      wx.openSetting({
        success: res => {
          let authSetting = res.authSetting;
          if (authSetting["scope.userLocation"]) {
          } else {
            wx.showToast({
              title: "地理位置未开启，无法正常查询",
              icon: "none"
            });
          }
        }
      });
    },

    bindClearTap() {
      const success = res => {
        if (res.tapIndex == 0) {
          wx.clearStorageSync();
          wx.reLaunch({
            url: "/pages/setting/main"
          });
        }
      };

      wx.showActionSheet({
        itemList: ["清空"],
        itemColor: "#FF3B30",
        success
      });
    }
  },

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

<style lang="less">
@import "./index.less";
</style>
