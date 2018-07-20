<template>
  <swiper class="swiper" :indicator-dots="false" @change='bindSwiperChange' :current="current" duration="300" previous-margin="50px" next-margin="50px">
    <template v-for="(marker, idx) in markers" wx:key="marker_id">
      <swiper-item :key="marker.marker_id">
        <view class="item" :class="{ active: current === idx  }">
          <view class="indicator">{{idx + 1}}/{{markers.length}}</view>
          <view class="name">{{marker.name}}</view>
          <view class="distance">距离{{marker.distance}}</view>
        </view>
      </swiper-item>
    </template>
  </swiper>
</template>

<script>
import store from "@/store";
import * as helpers from "@/utils/helpers";

export default {
  oMapCtx: null,
  data() {
    return {};
  },

  computed: {
    current() {
      return store.state.metro_list.current;
    },
    markers() {
      return store.state.metro_list.stations;
    }
  },

  methods: {
    bindSwiperChange(e) {
      let current = e.mp.detail.current;
      let source = e.mp.detail.source;

      // 通过手指移动，将地图中心移到 marker
      if (source === "touch") {
        store.commit("metro_list/updateCurrent", current);

        let marker = store.state.metro_list.stations[current];
        store.commit("metro_list/updateCenterLocation", {
          name: marker.name,
          latitude: marker.latitude,
          longitude: marker.longitude
        });
      }
    }
  },

  onReady() {}
};
</script>

<style lang="less" scoped>
.swiper {
  @h: 400rpx;
  @p: 20rpx;
  margin-bottom: 20rpx;
  padding-bottom: 1rpx;
  height: 150rpx + @p + @p + 10;
  font-size: 32rpx;
  background: #fff;
  border-bottom: 1px solid #eee;
  .item {
    & {
      margin: @p @p / 2;
      text-align: center;
      border-radius: 5px;
      box-sizing: border-box;
      overflow: hidden;
      background: #f3f3f3;
      border: 1px solid #dfdfdf;
    }
    &.active {
      background: #fff;
      border: 1px solid #4287ff;
      .indicator {
        color: #fff;
        background: #4287ff;
      }
      .name {
        color: #4287ff;
      }
      .distance {
        color: #4287ff;
      }
    }
    .indicator {
      height: 50rpx;
      line-height: 50rpx;
      color: #999;
      background: #dfdfdf;
      overflow: hidden;
    }
    .name {
      margin-top: 10rpx;
      height: 50rpx;
      line-height: 50rpx;
      font-weight: bold;
      color: #323232;
      overflow: hidden;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .distance {
      height: 40rpx;
      line-height: 40rpx;
      font-size: 30rpx;
      color: #999;
    }
  }
}
</style>
