<template>
  <view class="railway">
    <view class="railway--head">
      <view class="circle"></view>
      <text>{{railway.name}}</text>
    </view>
    <view class="railway--body">
      <view class="railway--body--stops">
        <view class="stop departure_stop">{{railway.departure_stop.name}}</view>
        <view class="more">
          <text class="text">{{fmt_distance}}</text>
          <text class="dot">·</text>
          <text class="text">{{fmt_time}}</text>
        </view>
        <view class="stop arrival_stop">{{railway.arrival_stop.name}}</view>
      </view>
    </view>
  </view>
</template>

<script>
import store from "@/store";
import * as helpers from "@/utils/helpers";

export default {
  props: ["railway"],
  data() {
    return {};
  },
  computed: {
    fmt_distance() {
      return helpers.formatDistance(this.railway.distance);
    },
    fmt_time() {
      return helpers.formatDuration(this.railway.time);
    }
  },

  methods: {}
};
</script>

<style lang="less">
.railway {
  position: relative;
  width: 100%;
  font-size: 30rpx;
  border-radius: 10rpx;

  .railway--head {
    position: relative;
    padding: 20rpx;
    font-size: 36rpx;
    font-weight: bold;
    color: #fff;
    background-color: rgb(133, 166, 238);
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

  .railway--body {
    line-height: 40rpx;
    color: #bbb;
    background-color: rgb(237, 243, 253);
    .railway--body--stops {
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
      }

      .departure_stop,
      .arrival_stop {
        font-weight: bold;
        color: #000;
      }
    }
  }
}
</style>
