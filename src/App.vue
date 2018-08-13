<script>
export default {
  created() {},

  onPageNotFound() {
    // 1.添加onPageNotFound时跳往首页
    wx.switchTab({
      url: "/pages/route/main"
    });
  }
};
</script>

<style>
@import "./utils/Base.css";

/* this rule will be remove */
* {
  transition: width 2s;
  -moz-transition: width 2s;
  -webkit-transition: width 2s;
  -o-transition: width 2s;
}

page {
  font-size: 36rpx;
  line-height: 40rpx;
  color: #666;
  background: #efefef;
}
</style>
