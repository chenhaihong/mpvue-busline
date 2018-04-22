<template>
  <div class="historyBox mb40">

    <template v-if="historys.length > 0">

      <template v-for="(item, index) in historys">

        <div class="item" :key="index" :data-index="index" @click="bindHistoryTap">

          <div class="dltBox" :data-index="index" @click="bindHistoryDltOneTap">删除</div>

          <div class="blockBox" :style="{right: (item.right ? item.right : 0) + 'px'}" :data-index="index">
            <image class="icon p40" src="/static/image/route/clock.png"/>
            <div class="textBox ptb40">
              <text class="a">{{item.a.name}}</text>

              <!-- <div v-for="(way, pointIndex) in item.waypoints" :key="way.name" :data-index="pointIndex">
                <text>→</text>
                <text class="end">{{way.name}}</text>
              </div> -->

              <text>→</text>
              <text>{{item.b.name}}</text>
            </div>
          </div>

        </div>
      </template> 

    </template>
    <template v-else>

      <div class="item">
        <div class="blockBox">
          <image class="icon p40" src="/static/image/route/tip.png" />
          <div class="textBox ptb40">
            <text>暂无历史记录</text>
          </div>
        </div>
      </div>
    
    </template>

    <div class="clear ptb40" @click="bindClearTap">清空历史记录</div>

  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {};
  },
  computed: {
    historys() {
      return store.state.route.historys;
    }
  },
  methods: {
    bindHistoryDltOneTap(e) {},
    bindHistoryTap(e) {
      const idx = e.currentTarget.dataset.index;
      const historys = this.historys;
      const history = historys[idx];

      store.commit("updatePlace", { which: "a", place: history.a });
      store.commit("updatePlace", { which: "b", place: history.b });
      store.commit("navigateToRouteList");
    },
    bindClearTap(e) {
      wx.showActionSheet({
        itemList: ["清空"],
        itemColor: "#FF3B30",
        success: res => {
          if (res.tapIndex == 0) {
            store.commit("clearHistorys");
          }
        }
      });
    }
  },
  created() {
    store.commit("initHistorys");
  }
};
</script>

<style scoped>
.historyBox {
  position: relative;
  padding: 1px 0;
  background: #fff;
}

.historyBox .item {
  position: relative;
}

/** .blockBox */

.historyBox .item .blockBox {
  position: relative;
  display: flex;
  background: #fff;
  transition: right ease-in-out 0.2s;
}

.historyBox .item.touchmoving .blockBox {
  transition: none;
}

/** .dltBox */

.dltBox {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100%;
  color: white;
  background: #ff3b30;
}

/** .iconBox */

.historyBox .item .icon {
  width: 36rpx;
  height: 36rpx;
}

/** .textBox */

.historyBox .item .textBox {
  width: 590rpx;
  border-bottom: 1px solid #e4e4e4;
}

.historyBox .item:active .textBox,
.historyBox .item:active .textBox .a {
  color: #4287ff;
}

.historyBox .item .textBox .a {
  color: #ababab;
}

/** .clear */

.historyBox .clear {
  text-align: center;
}

.historyBox .clear:active {
  color: #ff3b30;
}
</style>
