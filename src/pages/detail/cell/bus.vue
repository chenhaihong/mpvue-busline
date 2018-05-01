<template>
  <view class="busline">
    <view class="busline--head">
      <view class="circle"></view>
      <text>{{busline.name}}</text>
    </view>
    <view class="busline--body">
      <view class="busline--body--stops">
        <view class="stop departure_stop">
          <text>{{busline.departure_stop.name}}</text>
          <text v-if="entrance.name" class="entrance">{{entrance.name}}进站</text>
        </view>
        <view class="more">
          <text class="text">途径{{busline.via_num}}个站</text>
          <text class="dot">·</text>
          <text class="text">{{fmt_distance}}</text>
          <text class="dot">·</text>
          <text class="text">{{fmt_duration}}</text>
        </view>
        <!-- <view class="stop">
          <block v-for="(item, idx) in busline.via_stops" :wx:key="name">
            <text :key="name" v-if="idx>0">→</text>
            <text :key="name">{{item.name}}</text>
          </block>
        </view> -->
        <view class="stop arrival_stop">
          <text>{{busline.arrival_stop.name}}</text>
          <text v-if="exit.name" class="exit">{{exit.name}}出站</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import store from "@/store";
import * as helpers from "@/utils/helpers";

export default {
  props: ["busline", "entrance", "exit"],
  data() {
    return {};
  },
  computed: {
    fmt_distance() {
      return helpers.formatDistance(this.busline.distance);
    },
    fmt_duration() {
      return helpers.formatDuration(this.busline.duration);
    }
  },

  methods: {}
};
</script>

<style lang="less" scoped>
/* segment bus */

.busline {
  position: relative;
  width: 100%;
  font-size: 30rpx;
  border-radius: 10rpx;
  .busline--head {
    position: relative;
    padding: 20rpx;
    font-size: 36rpx;
    font-weight: bold;
    line-height: 50rpx;
    color: #fff;
    background-color: rgb(144, 211, 147);
    border-top-left-radius: 6rpx;
    border-top-right-radius: 6rpx;
    .circle {
      position: absolute;
      top: 28rpx;
      left: -42rpx;
      z-index: 1;
      width: 20rpx;
      height: 20rpx;
      background: #efefef;
      border: 1px solid #c3c3c3;
      border-radius: 100%;
      flex-shrink: 0;
    }
  }

  .busline--body {
    line-height: 40rpx;
    color: #bbb;
    background-color: rgb(238, 248, 241);

    .busline--body--stops {
      padding: 20rpx;
      .more {
        margin-bottom: 10rpx;
        .dot {
          margin: 0 4rpx;
        }
      }
      .stop {
        margin-bottom: 10rpx;
        &:last-child {
          margin-bottom: 0;
        }
        .entrance,
        .exit {
          position: relative;
          top: -2rpx;
          margin-left: 10rpx;
          padding: 0 4rpx;
          font-size: 24rpx;
          border-radius: 6rpx;
          color: #fff;
          background-color: #4287ff;
        }
        .exit {
          color: #fff;
          background-color: #f4040d;
        }
      }
    }
    .departure_stop,
    .arrival_stop {
      font-weight: bold;
      color: #000;
    }
  }
}
</style>
