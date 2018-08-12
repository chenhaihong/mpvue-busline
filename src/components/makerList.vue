<template>
  <view class="components-makerList">
    <template v-for="(m, idx) in markers" wx:key="marker_id">

      <view class="marker allowTap" :data-index="idx" :key="m.id" @click="bindRouteTap">
        <view class="main">
          <!-- { 文字内容 -->
          <view class="text-wrap">
            <view class="title">{{m.name}}</view>
            <view class="distance">{{m.distance}}</view>
            <view class="address" v-if="m.address">
              <text>{{m.address}}</text>
            </view>
          </view>
          <!-- 文字内容 } -->
        </view>
        <view class="route">
          <image class="icon" :lazy-load="true" src="/static/image/tabBar/route@active.png" />
          <view class="text">去这里</view>
        </view>
      </view>

    </template>
  </view>
</template>

<script>
export default {
  props: ["markers"],
  data() {
    return {};
  },

  computed: {},

  methods: {
    bindRouteTap(e) {
      const index = e.mp.currentTarget.dataset.index;
      const marker = this.markers[index];
      wx.openLocation({
        latitude: parseFloat(marker.location.split(",")[1]),
        longitude: parseFloat(marker.location.split(",")[0]),
        scale: 14,
        name: marker.name,
        address: marker.address
      });
    }
  },

  onReady() {}
};
</script>

<style lang="less" scoped>
.components-makerList {
  @route_size: 26rpx;
  @address_size: 30rpx;
  @route_width: 100rpx;
  @select_width: 40rpx;
  @distance_width: 120rpx;
  @main_width: 750rpx - @distance_width - @select_width;
  & {
    margin-bottom: 40rpx;
  }
  .marker {
    & {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      padding: 30rpx 0;
      background: #fff;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
    }
    .main {
      & {
        display: inline-flex;
        flex-flow: row nowrap;
        margin: 0 30rpx;
        width: @main_width;
        overflow: hidden;
      }
      .text-wrap {
        & {
          overflow: hidden;
        }
        .title {
          margin-bottom: 20rpx;
          font-weight: bold;
          overflow: hidden;
          word-wrap: normal;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .distance,
        .address {
          font-size: @address_size;
          line-height: 36rpx;
          color: #999;
        }
        .distance {
          margin-bottom: 10rpx;
        }
      }
    }
    .route {
      & {
        flex-shrink: 0;
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
        margin-right: 30rpx;
        width: @route_width;
      }
      .icon {
        flex-shrink: 0;
        width: 50rpx;
        height: 50rpx;
      }
      .text {
        font-size: @route_size;
        color: #4287ff;
      }
    }
  }
}
</style>
