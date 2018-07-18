<template>
  <view class="detail">
    <view class="row row-type">
      <text class="title">类型:</text>
      <template v-for="(type, idx) in types">
        <text class="type" :key="idx">{{type}}</text>
      </template>
    </view>
    <view class="row row-address">
      <text class="title">路线:</text>
      <text class="address">{{marker.address}}</text>
    </view>
  </view>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {};
  },

  computed: {
    marker() {
      try {
        const current = store.state.stations.current;
        return store.state.stations.stations[current];
      } catch (error) {
        return {};
      }
    },
    types() {
      try {
        const str_type = this.marker.type;
        let types = [];
        if (str_type && str_type.length) {
          types = str_type.split(";");
        }
        return types;
      } catch (error) {
        return [];
      }
    }
  },

  methods: {},

  onReady() {}
};
</script>

<style lang="less" scoped>
.detail {
  margin-bottom: 40rpx;
  font-size: 30rpx;
  background: #fff;
  .row {
    padding: 30rpx 30rpx;
    border-bottom: 1px solid #eee;
    .title {
      margin-right: 10rpx;
      font-weight: bold;
      color: #333;
    }
    &.row-type {
      padding-bottom: 20rpx;
      .type {
        display: inline-block;
        margin-right: 10rpx;
        margin-bottom: 10rpx;
        padding: 4rpx 10rpx;
        background: #dfdfdf;
        border-radius: 6rpx;
        &:active {
          background: #ccc;
        }
      }
    }
    &.row-address {
      .address {
        text-decoration: underline;
        &:active {
          color: #4287ff;
        }
      }
    }
    &.row-tel {
      .tel {
        text-decoration: underline;
        &:active {
          color: #4287ff;
        }
      }
      .semicolon {
        margin-left: 6rpx;
        margin-right: 10rpx;
      }
    }
  }
}
</style>
