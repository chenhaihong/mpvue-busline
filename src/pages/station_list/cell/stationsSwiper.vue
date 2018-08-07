<template>
  <swiper class="swiper" :indicator-dots="false" @change='bindSwiperChange' :current="current" duration="300" previous-margin="50px" next-margin="50px">
    <template v-for="(marker, idx) in markers" wx:key="marker_id">
      <swiper-item :key="marker.marker_id">
        <view class="item" :class="{ active: current === idx  }">
          <view class="indicator">{{idx + 1}}/{{markers.length}}</view>
          <view class="name allowTap" @click="bindNameTap">{{marker.name}}</view>
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
      return store.state.station_list.current;
    },
    markers() {
      return store.state.station_list.stations.map(item => {
        item.distance = helpers.formatDistance(item.distance);
        return item;
      });
    }
  },

  methods: {
    bindNameTap(e) {
      let marker = this.markers[this.current];
      wx.openLocation({
        latitude: marker.latitude,
        longitude: marker.longitude,
        scale: 14,
        name: marker.name,
        address: marker.address
      });
    },
    bindSwiperChange(e) {
      let current = e.mp.detail.current;
      let source = e.mp.detail.source;

      // 通过手指移动，将地图中心移到 marker
      if (source === "touch") {
        store.commit("station_list/updateCurrent", current);

        let marker = store.state.station_list.stations[current];
        store.commit("station_list/updateCenterLocation", {
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
  @h_indicator: 50rpx;
  @h_name: 50rpx;
  @h_distance: 40rpx;
  @p: 20rpx;
  @color_name: #4287FF;
  @color_distance: #4287FF;
  & {
    margin-bottom: 20rpx;
    padding-bottom: 1rpx;
    height: @h_indicator + @h_name + @h_distance + @p + @p + 10;
    font-size: 32rpx;
    background: #fff;
    border-bottom: 1px solid #ccc;
  }
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
      border: 1px solid @color_name;
      .indicator {
        color: #fff;
        background: @color_name;
      }
      .name {
        color: @color_name;
        text-decoration: underline;
      }
      .distance {
        color: @color_distance;
      }
    }
    .indicator {
      height: @h_indicator;
      line-height: @h_indicator;
      color: #999;
      background: #dfdfdf;
      overflow: hidden;
    }
    .name {
      margin-top: 10rpx;
      height: @h_name;
      line-height: @h_name;
      font-weight: bold;
      color: #323232;
      overflow: hidden;
      word-wrap: normal;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .distance {
      height: @h_distance;
      line-height: @h_distance;
      font-size: 30rpx;
      color: #999;
    }
  }
}
</style>
