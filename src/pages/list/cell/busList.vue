<template>
  <view v-if="!isLoading" class="listBox mb20">
    <template v-if="transits.length">

      <template v-for="(transit, idx1) in transits">
        <view class="list p40 mb20 bgFFF allowTap" :key="idx1" :data-index="idx1" @click="bindListItemTap">
          <!-- 标题 -->
          <view class="list--title mb20">
            <template v-for="(transport, idx2) in transit.fmt_transports">
              <text :key="idx2" class="arrow" v-if="idx2>0">→</text>
              <view :key="idx2" class="text">

                <template v-for="(item, idx3) in transport">
                  <text :key="idx3" v-if="idx3>0">/</text>
                  <text :key="idx3">{{item}}</text>
                </template>

              </view>
            </template>
          </view>
          <!-- 标题 -->
          <!-- 描述 -->
          <view class="list--desc mb10">
            <text>{{transit.fmt_duration}}</text>
            <text class="plr10">·</text>
            <text>{{transit.fmt_cost}}元</text>
            <text v-if="transit.fmt_walking_distance" class="plr10">·</text>
            <text v-if="transit.fmt_walking_distance">步行{{transit.fmt_walking_distance}}</text>
          </view>
          <view class="list--distance">本路线{{transit.fmt_distance}}</view>
          <!-- 描述 -->
        </view>
      </template>

    </template>
    <template v-else>

      <view class="list--none p40 mb20 bgFFF">
        <text>没有推荐路线</text>
      </view>

    </template>
  </view>
</template>

<script>
import store from "@/store";
import * as helpers from "@/utils/helpers";

export default {
  data() {
    return {};
  },
  computed: {
    isLoading() {
      return store.state.list.isLoading;
    },
    transits() {
      return store.state.list.transits.map(item => {
        let fmt_walking_distance = item.walking_distance.length
          ? helpers.formatDistance(item.walking_distance)
          : null;
        return {
          fmt_cost: parseInt(item.cost) || 0,
          fmt_distance: helpers.formatDistance(item.distance),
          fmt_duration: helpers.formatDuration(item.duration),
          fmt_walking_distance,
          fmt_transports: helpers.formatTransports(item.segments)
        };
      });
    }
  },
  methods: {
    bindListItemTap(e) {
      const idx = e.currentTarget.dataset.index;
      store.commit("list/updateTransitIndex", idx);

      wx.navigateTo({
        url: `/pages/detail/main`
      });
    }
  }
};
</script>

<style lang="less" scoped>
.listBox {
  .list {
    .list--title {
      & {
        font-weight: bold;
        color: #000;
        &:active .list--title .text {
          background-color: #ccc;
        }
      }
      .text {
        display: inline-block;
        margin: 0 0 10rpx;
        padding: 10rpx 10rpx;
        background-color: #e6e6e6;
        border-radius: 6rpx;
      }
      .arrow {
        padding: 0 10rpx;
        color: #999;
        background-color: none;
      }
    }

    .list--desc,
    .list--distance {
      font-size: 32rpx;
      color: #999;
    }
  }
}

.list--none {
  font-size: 32rpx;
  color: #999;
  text-align: center;
}
</style>
