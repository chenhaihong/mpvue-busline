<template>
  <view class="listBox">
    <view class="container">
      <!-- 出发点 { -->
      <view class="item">
        <view class="timeline">
          <view class="lineA"></view>
          <view class="circle"></view>
          <view class="lineB"></view>
        </view>
        <view class="desc">
          <view class="text">从 {{place.a.name}} 出发</view>
        </view>
      </view>
      <!-- } 出发点 -->
      <!-- segments { -->
      <template v-for="(segment, idx) in segments" wx:key="road">
        <template v-if="(segment.walking && segment.walking.steps && segment.walking.steps.length) || (segment.bus && segment.bus.buslines && segment.bus.buslines.length) || (segment.railway && segment.railway.name)">
          <!-- segment { -->
          <view class="item" :key="idx">
            <view class="timeline">
              <view class="line"></view>
            </view>
            <!-- .desc { -->
            <view class="desc">
              <template v-if="segment.walking && segment.walking.steps && segment.walking.steps.length">
                <walking :walking="segment.walking" />
              </template>
              <template v-if="segment.bus && segment.bus.buslines && segment.bus.buslines.length">
                <bus :busline="segment.bus.buslines[0]" :entrance="segment.entrance" :exit="segment.exit" />
              </template>
              <template v-if="segment.railway && segment.railway.name">
                <railway :railway="segment.railway" />
              </template>
              <template v-if="segment.taxi && segment.taxi.name"></template>
            </view>
            <!-- } .desc -->
          </view>
          <!-- } segment -->
        </template>
      </template>
      <!-- } segments -->
      <!-- 结束点 { -->
      <view class="item">
        <view class="timeline">
          <view class="lineA"></view>
          <view class="circle"></view>
          <view class="lineB"></view>
        </view>
        <view class="desc">
          <view class="text">到达 {{place.b.name}}</view>
        </view>
      </view>
      <!-- } 结束点 -->
    </view>
  </view>
</template>

<script>
import walking from "./walking";
import bus from "./bus";
import railway from "./railway";

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
    place() {
      return store.state.transit_list.place;
    },
    segments() {
      let transit = getTransit();
      return transit.segments;
    }
  },

  components: {
    walking,
    bus,
    railway
  },

  methods: {},

  created() {}
};
</script>

<style lang="less" scoped>
.listBox {
  & {
    display: relative;
    padding: 20rpx 0;
    background-color: #fff;
  }

  .container {
    position: relative;
    .item {
      & {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        margin-right: 30rpx;
      }

      &:last-child .desc {
        border-bottom: none;
      }

      &:first-child .timeline .lineA,
      &:last-child .timeline .lineB {
        background: none;
      }
      &:first-child .timeline .circle {
        background: #4287ff;
        border: 1px solid #4287ff;
      }
      &:last-child .timeline .circle {
        background: #f4040d;
        border: 1px solid #f4040d;
      }

      .desc {
        position: relative;
        display: inline-flex;
        /* margin-right: 30rpx; */
        padding: 24rpx 0;
        width: 100%;
        flex-flow: column nowrap;
        align-items: flex-start;
        justify-content: flex-start;
        border-bottom: 1px dashed #e1e1e1;
      }

      .timeline {
        position: relative;
        display: flex; // 使用弹性布局，首行、末行的圆圈需要居中展示。
        width: 62rpx;
        flex-flow: column nowrap;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        .lineA {
          // 为了兼容ios、安卓所以这样写
          position: absolute;
          top: 0;
          bottom: 50%;
          left: 50%;
          width: 1px;
          background: #e1e1e1;
        }
        .lineB {
          // 为了兼容ios、安卓所以这样写
          position: absolute;
          top: 50%;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: #e1e1e1;
        }
        .line {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 50%;
          width: 1px;
          background: #e1e1e1;
        }
        .circle {
          z-index: 1;
          width: 20rpx;
          height: 20rpx;
          background: #efefef;
          border: 1px solid #c3c3c3;
          border-radius: 100%;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
