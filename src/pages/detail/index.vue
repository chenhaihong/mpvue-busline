<template>
  <div>
    <!-- 
      组件对象一致常驻内存，不会被销毁。
      
      由于，在重新进入公交列表页的时候，我会重置掉列表页数据，如下：
      store.state.list.transit_index = null
      store.state.list.transits = []
      所以结果数据 transit = transits[transit_index] 拿到的是一个 underfined。

      详情页的 overview、segments 这两个组件都是用了 transit 的，但是没有做异常屏蔽处理逻辑，
      导致组件的使用出现了错误。
      
      因此，这里先做一层判断，判断 transit 是否存在，如果不存在则不使用组件。
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
