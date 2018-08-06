<template>
  <view class="collectedPlaces">
    <view class="item home allowTap" data-which="home" @click='tapCollectedPlace'>
      <image class="icon" src="/static/image/route/home.png" />
      <view class="text">
        <text>家</text>
        <text class="address">{{home.name || '设置一个地址'}}</text>
      </view>
    </view>
    <view class="item allowTap" data-which="company" @click='tapCollectedPlace'>
      <image class="icon" src="/static/image/route/company.png" />
      <view class="text">
        <text>公司</text>
        <text class="address">{{company.name || '设置一个地址'}}</text>
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
  computed: {
    company() {
      return store.state.route.collected_places.company;
    },
    home() {
      return store.state.route.collected_places.home;
    }
  },
  methods: {
    tapCollectedPlace(e) {
      const which = e.mp.currentTarget.dataset.which;
      let all = store.state.route.collected_places;
      let p = all[which];
      if (!p.name) {
        store.commit("route/addCollectedPlace", which);
        return false;
      }

      wx.showActionSheet({
        itemList: ["从这出发", "到这里去", "删除"],
        success: res => {
          let idx = res.tapIndex;
          if (idx == 0) {
            // 从这里出发
            store.commit("route/updatePlace", {
              place: {
                name: p.name,
                latitude: p.latitude,
                longitude: p.longitude
              },
              which: "a"
            });

            if (store.state.route.place.a.name && store.state.route.place.b.name) {
              store.commit("route/saveHistory");
              store.commit("transit_list/reset");
              store.commit("route/navigateToRouteList");
            }
          } else if (idx == 1) {
            // 到这里去
            store.commit("route/updatePlace", {
              place: {
                name: p.name,
                latitude: p.latitude,
                longitude: p.longitude
              },
              which: "b"
            });
            if (store.state.route.place.a.name && store.state.route.place.b.name) {
              store.commit("route/saveHistory");
              store.commit("transit_list/reset");
              store.commit("route/navigateToRouteList");
            }
          } else {
            // 删除一个兴趣点
            store.commit("route/deleteCollectedPlace", which);
          }
        }
      });
    }
  },
  onReady() {
    store.commit("route/initCollectedPlaces");
  }
};
</script>

<style scoped lang="less">
.collectedPlaces {
  margin-bottom: 20rpx;
  background: #fff;
  overflow: hidden;
  .item {
    @g: 30rpx;
    & {
      position: relative;
      display: flex;
      &.allowTap:active .text {
        border-bottom: 1px solid transparent;
      }
      &.home .text {
        border-bottom: 1px solid #eee;
      }
      &.addone {
        padding: @g;
        justify-content: center;
        color: #999;
      }
    }
    .icon {
      margin: @g;
      width: 36rpx;
      height: 36rpx;
      flex-shrink: 0;
    }
    .text {
      margin-right: @g;
      padding: @g 0;
      width: 100%;
      overflow: hidden;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
      border-bottom: 1px solid transparent;
      .address {
        padding-left: 10rpx;
        color: #999;
      }
    }
  }
}
</style>
