<template>
  <view>
    <!--
      组件对象一致常驻内存，不会被销毁。

      由于，在重新进入公交列表页的时候，我会重置掉列表页数据，如下：
      store.state.transit_list.transit_index = null
      store.state.transit_list.transits = []
      所以结果数据 transit = transits[transit_index] 拿到的是一个 underfined。

      详情页的 overview、segments 这两个组件都是用了 transit 的，但是没有做异常屏蔽处理逻辑，
      导致组件的使用出现了错误。

      因此，这里先做一层判断，判断 transit 是否存在，如果不存在则不使用组件。
    -->
    <tab />
    <template v-if="is_map_visible">
      <mmap />
    </template>
    <template v-else>
      <segments v-if="is_transit" />
      <share />
      <view class='pb40'></view>
    </template>
  </view>
</template>

<script>
import store from "@/store";
import tab from "./cell/tab";
import mmap from "./cell/map";
import segments from "./cell/segments";
import share from "@/components/share";

export default {
  data() {
    return {};
  },

  computed: {
    is_map_visible() {
      return store.state.transit_detail.selected === 1;
    },
    is_transit() {
      let index = store.state.transit_list.transit_index;
      let transit = store.state.transit_list.transits[index];
      return !!transit;
    }
  },

  components: {
    tab,
    mmap,
    segments,
    share
  },

  methods: {},

  created() {},
  onShareAppMessage(res) {
    return {
      title: "公交查询小帮手",
      path: "/pages/route/main"
    };
  }
};
</script>

<style lang="less">
page {
  padding-top: 50px;
}
</style>
