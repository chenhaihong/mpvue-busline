<template>
  <div class="place">

    <div class="cloumnPlus">
      <div class="prefix">从</div>
      <div class="prefix">到</div>
    </div>

    <div class="columnInput">
      <div class="columnInput--row" :class="{ active: isAOk }">
        <div class="input" data-which="a" @click="bindPlaceInputTap">
          {{aName || "输入起点"}}
        </div>
      </div>
      <div class="columnInput--row" :class="{ active: isBOk }">
        <div class="input" data-which="b" @click="bindPlaceInputTap">
          {{bName || "输入终点"}}
        </div>
      </div>
    </div>

    <div class="columnSwitch" :class="{ rotating: isSwitching }">
      <div class="switch-wrap" @click="bindPlaceSwitcherTap">
        <image class="switch" src="/static/image/route/switch.png"/>
      </div>
      <div class="search-wrap" @click="bindPlaceSearchTap">
        <image class="search" src="/static/image/route/search.png"/>
      </div>
    </div>

  </div>
</template>

<script>
import store from "@/store";

export default {
  data() {
    return {
      isSwitching: false
    };
  },
  computed: {
    aName() {
      return store.state.route.place.a.name;
    },
    bName() {
      return store.state.route.place.b.name;
    },
    isAOk() {
      return !!store.state.route.place.a.name;
    },
    isBOk() {
      return !!store.state.route.place.b.name;
    },
    isABOk() {
      return !!this.aName && !!this.bName;
    }
  },
  methods: {
    bindPlaceInputTap(e) {
      const which = e.currentTarget.dataset.which;

      wx.chooseLocation({
        success: res => {
          store.commit("updatePlace", {
            which,
            place: {
              name: res.name ? res.name : res.address,
              latitude: res.latitude,
              longitude: res.longitude
            }
          });

          if (this.isABOk) {
            store.commit("saveHistory");
            store.commit("navigateToRouteList");
          }
        }
      });
    },
    bindPlaceSwitcherTap(e) {
      this.isSwitching = true;
      store.commit("switchAB");

      setTimeout(() => {
        this.isSwitching = false;
      }, 300);

      if (this.isABOk) {
        store.commit("saveHistory");
        store.commit("navigateToRouteList");
      }
    },
    bindPlaceSearchTap(e) {
      let a = store.state.route.place.a;
      let b = store.state.route.place.b;

      if (!a.name) {
        wx.showModal({
          content: "请输入起点",
          showCancel: false,
          confirmColor: "#4287FF"
        });
        return false;
      } else if (!b.name) {
        wx.showModal({
          content: "请输入终点",
          showCancel: false,
          confirmColor: "#4287FF"
        });
        return false;
      }

      store.commit("saveHistory");
      store.commit("navigateToRouteList");
    }
  },

  created() {
    // load current place
    store.commit("clearPlace");
    wx.getLocation({
      type: "gcj02",
      success: res => {
        store.commit("updatePlace", {
          which: "a",
          place: {
            name: "我的位置",
            latitude: res.latitude,
            longitude: res.longitude
          }
        });
      }
    });
  }
};
</script>

<style scoped>
.place {
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

/** .cloumnPlus */

.cloumnPlus {
  width: 100rpx;
  height: 180rpx;
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.cloumnPlus .prefix {
  height: 90rpx;
  line-height: 90rpx;
  font-size: 28rpx;
  color: #c8dcff;
}

/** .columnInput */

.columnInput {
  position: relative;
  width: 550rpx;
}

.columnInput--row {
  margin: 5rpx 0;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  color: #c8dcff;
  background: #689fff;
  border-radius: 6rpx;
  overflow: hidden;
  display: inline-flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.columnInput--row:active {
  background: #3b79e5;
  transition: background ease 0.1s;
}

.columnInput--row .input {
  width: 450rpx;
  height: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.columnInput--row.active .input {
  color: #fff;
}

/** .columnSwitch */

.columnSwitch {
  width: 100rpx;
  height: 180rpx;
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.columnSwitch .switch-wrap,
.columnSwitch .search-wrap {
  width: 100%;
  height: 90rpx;
  display: inline-flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
}

.columnSwitch .switch,
.columnSwitch .search {
  width: 32rpx;
  height: 32rpx;
}

.columnSwitch.rotating .switch {
  transform: rotate(180deg);
  transition: transform ease 0.3s;
}

/** columnInput */
</style>
