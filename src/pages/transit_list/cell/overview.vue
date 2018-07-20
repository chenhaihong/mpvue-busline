<template>
  <view class="overview p40 mtb20 bgFFF">
    <view class="place mb10">
      <text class="distance">{{place.a.name}}</text>
      <text class="plr10">→</text>
      <text class="taxi">{{place.b.name}}</text>
    </view>
    <view v-if="distance && taxi_cost" class="desc">
      <text class="distance">{{distance}}</text>
      <text class="plr10">·</text>
      <text class="taxi">{{taxi_cost}}</text>
    </view>
  </view>
</template>

<script>
import * as helpers from "@/utils/helpers";
import store from "@/store";

export default {
  data() {
    return {};
  },
  computed: {
    place() {
      return store.state.transit_list.place;
    },
    distance() {
      let dst = store.state.transit_list.distance;
      return dst ? helpers.formatDistance(dst) : null;
    },
    taxi_cost() {
      if (store.state.transit_list.taxi_cost) {
        let cost = parseInt(store.state.transit_list.taxi_cost) || 0;
        return `出租车${cost}元起`;
      } else {
        return null;
      }
    }
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.overview {
  text-align: right;
  .place {
    font-weight: bold;
    color: #000;
  }

  .desc {
    font-size: 32rpx;
  }
}
</style>
