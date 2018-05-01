<template>
  <div>
    <busSelector />

    <scroll-view class="scrollBody" scroll-y enable-back-to-top scroll-with-animation>
      <overview />
      <busList />

      <view class="mb30"></view>
      <share />
    </scroll-view>
  </div>
</template>

<script>
import busSelector from "./cell/busSelector";
import overview from "./cell/overview";
import busList from "./cell/busList";
import share from "@/components/share";

import store from "@/store";

export default {
  data() {
    return {};
  },

  components: {
    busSelector,
    overview,
    busList,
    share
  },

  methods: {},

  onShareAppMessage(res) {
    const place = JSON.parse(this.$root.$mp.query.place);
    let title = `公交路线：${place.a.name}→${place.b.name}`;
    let path = `/pages/list/main?place=${JSON.stringify(place)}`;

    return {
      title,
      path
    };
  },

  onShow() {
    // const place = JSON.parse(this.$root.$mp.query.place);
    // store.commit("list/setPlace", place);
    // store.dispatch("list/getBusList");
  },

  onReady() {
    const place = JSON.parse(this.$root.$mp.query.place);
    store.commit("list/setPlace", place);
    store.dispatch("list/getBusList");
  }
};
</script>

<style lang="less">
.selectorBox {
  z-index: 10;
  position: fixed;
}

.selector {
  height: 120rpx;
}

.pickerBox {
  width: 50%;
}

.shadow {
  z-index: -1;
}

.scrollBody {
  position: fixed;
  top: 120rpx;
  bottom: 0;
  width: 100%;
}
</style>
