<template>
  <div>
    <div class="head">
      <image class="head-logo" mode="scaleToFill" src="/static/image/logo.png" />
      <div class="head-name">公交快查</div>
    </div>

    <div class="list-title">设置</div>
    <div class="list">
      <div class="list-item" @click="bindSettingTap">
        <div class="list-item-main">设置</div>
        <div class="list-item-sub">如果不能查询请点这里，允许使用地址位置</div>
      </div>
    </div>

    <div class="list-title">操作</div>
    <div class="list">
      <div class="list-item" @click="bindClearTap">
        <div class="list-item-main">清除缓存</div>
        <div class="list-item-sub">清空历史查询记录</div>
      </div>
      <div class="list-item">
        <div class="list-item-main">分享</div>
        <div class="list-item-sub">赠人玫瑰，手有余香</div>
        <button class="button-share" open-type="share"></button>
      </div>
    </div>
  </div>
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
      const KEY_HISTORY = "History";
      const success = res => {
        if (res.tapIndex == 0) {
          wx.setStorageSync(KEY_HISTORY, []);
          wx.reLaunch({
            url: "/pages/about/main"
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

<style scoped>
@import "./index.css";
</style>
