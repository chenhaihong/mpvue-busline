<template>
  <div class="shareBox">

    <div class="shareBox--line"></div>

    <div class="shareBox--text">赠人玫瑰，手有余香</div>
    <!-- <div class="shareBox--text">Roses given，fragrance in hand.</div> -->

    <div class="shareBox__div">
      <button class="shareBox__div__button" open-type="share">
        <image class="search" src="/static/image/share/rose.png"/>
      </button>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.shareBox {
  position: relative;
  padding-bottom: 40rpx;
  text-align: center;
  text-shadow: 0 0 1px #efefef;
}

.shareBox--line {
  z-index: 8;
  position: absolute;
  top: 20rpx;
  left: 75rpx;
  height: 1px;
  width: 600rpx;
  background: #ddd;
}

.shareBox--text {
  z-index: 10;
  position: relative;
  margin: 0 auto 20rpx;
  width: 330rpx;
  font-size: 32rpx;
  line-height: 40rpx;
  color: #ccc;
  background: #efefef;
  /* background: transparent; */
}

.shareBox__div {
  z-index: 10;
  position: relative;
  /* margin: 0 auto 10rpx;
  background: red; */
}

.shareBox__div__button {
  padding: 0;
  width: 96rpx;
  height: 96rpx;
  line-height: 96rpx;
  text-align: center;
  border-radius: 100%;
  border: none;
  background-color: #fff;
}

.shareBox__div__button::after {
  border: none;
}

.shareBox__div__button:active {
  background: #ddd;
  transition: background ease 0.1s;
}

.shareBox__div__button .search {
  display: inline-block;
  width: 64rpx;
  height: 64rpx;
  vertical-align: middle;
}
</style>
