<template>
  <div class="shareBox">

    <!-- <div class="line"></div> -->

    <!-- <div class="text">赠人玫瑰，手有余香</div> -->
    <!-- <div class="text">Roses given，fragrance in hand.</div> -->

    <div class="buttonWrap">
      <button class="button" open-type="share">
        <image class="rose" src="/static/image/share/rose.png" />
      </button>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.shareBox {
  position: relative;
  padding-bottom: 40rpx;
  text-align: center;
  text-shadow: 0 0 1px #efefef;

  .line {
    z-index: 1;
    position: absolute;
    top: 20rpx;
    left: 75rpx;
    height: 1px;
    width: 600rpx;
    background: #ddd;
  }

  .text {
    z-index: 2;
    position: relative;
    margin: 0 auto 20rpx;
    width: 330rpx;
    font-size: 32rpx;
    line-height: 40rpx;
    color: #ccc;
    background: #efefef;
    /* background: transparent; */
  }

  .buttonWrap {
    z-index: 2;
    position: relative;
    margin: 0 auto 10rpx;

    .button {
      & {
        padding: 0;
        width: 96rpx;
        height: 96rpx;
        line-height: 96rpx;
        text-align: center;
        border-radius: 100%;
        border: none;
        background-color: #fff;
        &::after {
          border: none;
        }
        &:active {
          background: #ddd;
          transition: background ease 0.1s;
        }
      }
      .rose {
        display: inline-block;
        width: 64rpx;
        height: 64rpx;
        vertical-align: middle;
      }
    }
  }
}
</style>
