<template>
  <div>
    <!-- 
      组件不会被销毁。
      在重新进入公交列表页的时候，会重置列表页数据。
      因为详情页的数据是直接从列表页的数据module中拿的，所以报错了。
      
      因此，这里必须判断是否transit数据存在，如果不存在则不适用组件。
    -->
    <overview v-if="is_transit" />
    <segments v-if="is_transit" />
    <view class='mb30'></view>
    <share />
    <view class='pb40'></view>
  </div>
</template>

<script>
import store from "@/store";

import overview from "./cell/overview";
import segments from "./cell/segments";

import share from "@/components/share";

export default {
  data() {
    return {};
  },

  computed: {
    is_transit() {
      let index = store.state.list.transit_index;
      let transit = store.state.list.transits[index];
      return !!transit;
    }
  },

  components: {
    overview,
    segments,
    share
  },

  methods: {},

  created() {},
  onShareAppMessage(res) {
    return {
      title: "快速查询公交地铁路线、附近站点信息，出行好帮手。",
      path: "/pages/route/main",
      imageUrl: "/static/image/logo.png"
    };
  }
};
</script>

<style lang="less">

</style>
