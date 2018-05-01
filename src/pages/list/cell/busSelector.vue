<template>
  <!-- selectorBox -->
  <div class="selectorBox">

    <!-- selector -->
    <div class="selector bgFFF">
      <div class="item allowTap" @click="bindDatetimeTap">
        <div>
          <div v-if="date" class="mr10">{{date}}</div>
          <div v-if="time" class="mr10">{{time}}</div>
          <div v-if="!date && !time">现在</div>
        </div>
        <div>出发</div>
        <image class="image" src="/static/image/detail/a_down.png" />
      </div>
      <picker class="item allowTap" @change="bindStrategyChange" :value="strategyIndex" :range="strategies" @click="bindStrategyTap">
        <div class="picker">
          <div>{{strategies[strategyIndex]}}</div>
          <image class="image" src="/static/image/detail/a_down.png" />
        </div>
      </picker>
    </div>
    <!-- selector -->

    <!-- pickersWrap -->
    <div v-if="which == 'datetime'" class="pickersWrap">
      <div class="pickers pt20 bgFFF">
        <picker class="mb20" mode="date" :value="date" @change="bindDateChange">
          <div class="pickerHandler">
            <text>{{'选择日期'}}</text>
            <text>{{date ? ': ' + date : ''}}</text>
          </div>
        </picker>
        <picker class="mb20" mode="time" :value="time" @change="bindTimeChange">
          <div class="pickerHandler">
            <text>{{'选择时间'}}</text>
            <text>{{time ? ': ' + time : ''}}</text>
          </div>
        </picker>
      </div>
      <!-- pickers -->
      <div class="confirm ptb30" @click="bindConfirmTap">确定(需同时设置日期、时间)</div>

      <div class="shadow" @click="bindShadowTap"></div>
    </div>
    <!-- pickersWrap -->

  </div>
  <!-- selectorBox -->
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {};
  },
  computed: {
    which() {
      return store.state.list.params.which;
    },
    date() {
      return store.state.list.params.date;
    },
    time() {
      return store.state.list.params.time;
    },
    strategyIndex() {
      return store.state.list.params.strategyIndex;
    },
    strategies() {
      return store.state.list.strategies;
    }
  },
  methods: {
    bindDatetimeTap(e) {
      let which = "datetime";
      if (this.which === "datetime") {
        which = "none";
      }

      store.commit("list/updateParam", {
        name: "which",
        value: which
      });
    },
    bindStrategyTap(e) {
      store.commit("list/updateParam", {
        name: "which",
        value: "none"
      });
    },
    bindDateChange(e) {
      store.commit("list/updateParam", {
        name: "date",
        value: e.mp.detail.value
      });
    },
    bindTimeChange(e) {
      store.commit("list/updateParam", {
        name: "time",
        value: e.mp.detail.value
      });
    },
    bindStrategyChange(e) {
      store.commit("list/updateParam", {
        name: "strategyIndex",
        value: e.mp.detail.value
      });
      store.dispatch("list/getBusList");
    },
    // 隐藏遮罩层
    bindShadowTap(e) {
      store.commit("list/updateParam", {
        name: "which",
        value: "none"
      });
    },
    // 搜索路线列表
    bindConfirmTap(e) {
      store.commit("list/updateParam", {
        name: "which",
        value: "none"
      });
      store.dispatch("list/getBusList");
    }
  }
};
</script>

<style lang="less" scoped>
.selectorBox {
  width: 100%;
  font-size: 34rpx;
  color: #000;

  // .selector
  .selector {
    & {
      width: 100%;
      box-shadow: 0 1px 3px #ddd;
      border-bottom: 1px solid #e4e4e4;
      display: flex;
      flex-flow: row nowrap;
    }

    .item {
      & {
        position: relative;
        width: 375rpx;
        height: 100%;
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;

        &.active .image {
          transform: rotate(180deg);
        }
      }

      .image {
        margin-left: 10rpx;
        width: 32rpx;
        height: 32rpx;
        transition: transform ease 0.3s;
      }

      .picker {
        width: 375rpx;
        height: 120rpx;
        display: inline-flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
      }
    }
  }

  // .pickersWrap
  .pickersWrap {
    .pickers {
      border-bottom: 1px solid #e4e4e4;

      .pickerHandler {
        margin: auto;
        padding: 20rpx;
        width: 600rpx;
        color: #fff;
        text-align: center;
        background: #4287ff;
        border-radius: 6rpx;
      }
    }
    .confirm {
      color: #fff;
      font-weight: bold;
      text-align: center;
      background: #4287ff;
    }
    .pickerHandler:active,
    .confirm:active {
      background: #245ab9;
      transition: background ease 0.1s;
    }
  }
}
</style>
