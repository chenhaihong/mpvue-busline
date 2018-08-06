<template>
  <view class="busline">
    <view class="busline--head" :class="{ allowTap: isActive }" @click="bindTapBuslineTitle">
      <view class="circle"></view>
      <text>{{busline.name}}</text>
    </view>
    <view class="busline--body">
      <view class="busline--body--stops">
        <view class="stop departure_stop">
          <text class="stopName allowTap" :data-location="busline.departure_stop.location" :data-name="busline.departure_stop.name" @click="bindTapStopName">{{busline.departure_stop.name}}</text>
          <text v-if="entrance.name" class="entrance">{{entrance.name}}进站</text>
        </view>
        <view class="more">
          <text class="text">途径{{busline.via_num}}个站</text>
          <text class="dot">·</text>
          <text class="text">{{fmt_distance}}</text>
          <text class="dot" v-if="busline_index == 0">·</text>
          <text class="text" v-if="busline_index == 0">{{fmt_duration}}</text>
        </view>
        <view class="stop">
          <template v-for="(item, idx) in busline.via_stops" :wx:key="name">
            <text :key="item.item" v-if="idx>0">→</text>
            <text :key="item.item">{{item.name}}</text>
          </template>
        </view>
        <view class="stop arrival_stop">
          <text class="stopName allowTap" :data-location="busline.arrival_stop.location" :data-name="busline.arrival_stop.name" @click="bindTapStopName">{{busline.arrival_stop.name}}</text>
          <text v-if="exit.name" class="exit">{{exit.name}}出站</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import store from "@/store";
import * as helpers from "@/utils/helpers";

function getTransit() {
  let index = store.state.transit_list.transit_index;
  let transit = store.state.transit_list.transits[index];
  return transit;
}

// 拿出片段公交数据中所有公交车名称
function getBuslineNames(buslines) {
  let names = [];
  // 如果是公交、地铁，
  // 公交、地铁，提供的数据是数组，可能有多种线路
  let length = buslines.length >= 6 ? 6 : buslines.length; // itemList should not be large than 6
  for (let i = 0, Li = length; i < Li; i++) {
    let name = buslines[i].name;
    names.push(name);
  }

  return names;
}

export default {
  props: ["busline", "segment_index", "entrance", "exit"],
  data() {
    return {};
  },
  computed: {
    busline_index() {
      let transit = getTransit();
      return transit.segments[this.segment_index].bus.busline_index;
    },
    isActive() {
      let transit = getTransit();
      return transit.segments[this.segment_index].bus.buslines.length > 1;
    },
    fmt_distance() {
      return helpers.formatDistance(this.busline.distance);
    },
    fmt_duration() {
      return helpers.formatDuration(this.busline.duration);
    }
  },

  methods: {
    bindTapStopName(e) {
      try {
        let dataset = e.mp.currentTarget.dataset;
        let arr = dataset.location.split(",");

        wx.openLocation({
          latitude: parseFloat(arr[1]),
          longitude: parseFloat(arr[0]),
          scale: 16,
          name: dataset.name
        });
      } catch (e) {}
    },
    bindTapBuslineTitle(e) {
      let transit = getTransit();
      let buslines = transit.segments[this.segment_index].bus.buslines;

      if (buslines.length > 1) {
        let sheets = getBuslineNames(buslines);
        wx.showActionSheet({
          itemList: sheets,
          success: res => {
            // 切换选中公交车
            let tapIndex = res.tapIndex;
            let transits = store.state.transit_list.transits;
            let transit_index = store.state.transit_list.transit_index;

            transits[transit_index].segments[
              this.segment_index
            ].bus.busline_index = tapIndex;
            store.commit("transit_list/updateTransits", transits);
          }
        });
      }
    }
  }
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
    & {
      position: relative;
      padding: 20rpx;
      font-size: 36rpx;
      font-weight: bold;
      color: #fff;
      background-color: rgb(144, 211, 147);
      border-top-left-radius: 6rpx;
      border-top-right-radius: 6rpx;
    }
    &.allowTap {
      text-decoration: underline;
    }
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
      .stopName {
        text-decoration: underline;
      }
    }
  }
}
</style>
