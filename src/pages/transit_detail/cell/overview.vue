<template>
  <view class="overview">
    <view class="content">
      <text class="text">{{fmt_distance}}</text>
      <text class="point">·</text>
      <text class="text">{{fmt_duration}}</text>
      <text class="point">·</text>
      <text class="text">{{fmt_cost}}元</text>
      <text v-if="fmt_walking_distance" class="point">·</text>
      <!-- text bug:  text内容换行会导致展示的时候也换行 -->
      <text v-if="fmt_walking_distance" class="text">步行{{fmt_walking_distance}}</text>
    </view>
  </view>
</template>

<script>
import * as helpers from "@/utils/helpers";
import store from "@/store";

function getTransit() {
  let index = store.state.transit_list.transit_index;
  let transit = store.state.transit_list.transits[index];
  return transit;
}

export default {
  data() {
    return {};
  },
  computed: {
    fmt_distance() {
      let transit = getTransit();
      return helpers.formatDistance(transit.distance);
    },
    fmt_duration() {
      let transit = getTransit();
      return helpers.formatDuration(transit.duration);
    },
    fmt_cost() {
      let transit = getTransit();
      return parseInt(transit.cost) || 0;
    },
    fmt_walking_distance() {
      let transit = getTransit();
      let dst = transit.walking_distance.length
        ? helpers.formatDistance(transit.walking_distance)
        : null;
      return dst;
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.overview {
  position: relative;
  // margin-bottom: 20rpx;
  padding: 20rpx 24rpx;
  color: #fff;
  background: #4287ff;

  .content {
    text-align: right;
    color: #fff;
    .point {
      margin: 0 10rpx;
      font-weight: bold;
    }
  }
}
</style>
