<template>
  <view class="walking">
    <view class="walking--head">
      <text>步行{{walking.distance}}米</text>
      <text>{{walking.steps[walking.steps.length-1].assistant_action}}，</text>
      <text>约{{(fmt_duration)}}分钟</text>
    </view>
  </view>
</template>

<script>
import store from "@/store";
import * as helpers from "@/utils/helpers";

export default {
  props: ["walking"],
  data() {
    return {};
  },
  computed: {
    fmt_duration() {
      return Math.ceil(parseInt(this.walking.duration) / 60);
    }
  },

  methods: {}
};
</script>

<style lang="less" scoped>
.walking {
  margin-bottom: 20rpx;

  .walking--head {
    font-size: 30rpx;
    color: #bbb;
  }
}
</style>
