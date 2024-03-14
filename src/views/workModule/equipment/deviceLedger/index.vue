<template>
  <PageWrapper ref="page" :footer="false">
    <div class="deviceLedger-page">
      <!-- 顶部数据块 -->
      <div class="deviceLedger-page-header">
        <div class="deviceLedger-page-header-items">
          <div class="header-items-desc"></div>
          <div class="header-items-content"></div>
        </div>
        <div class="deviceLedger-page-header-items"></div>
        <div class="deviceLedger-page-header-items"></div>
        <div class="deviceLedger-page-header-items"></div>
      </div>
      <!-- 中间数据展示 -->
      <div class="deviceLedger-page-body">

      </div>
      <!-- 底部图表 -->
      <div class="deviceLedger-page-footer">
        <div class="deviceLedger-page-footer-items"></div>
        <div class="deviceLedger-page-footer-items"></div>
      </div>
    </div>
  </PageWrapper>
</template>
<script>
export default {
  name: "As_DeviceLedger",
}
</script>
<style lang="scss" scoped>
.deviceLedger-page {
  height: 100%;
  min-width: 1000px;
  background-color: rgba(242,242,242);
  padding: 10px;
  .deviceLedger-page-header {
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: space-between;
    .deviceLedger-page-header-items {
      width: 24%;
      height: 100%;
      background-color: #fff;
      padding: 15px;
      .header-items-desc {
        width: 50%;
        min-width: 120px;
        height: 30px;
        background-color: yellow;
      }
    }
  }
  .deviceLedger-page-body {
    width: 100%;
    height: 250px;
    background-color: #fff;
    margin-top: 25px;
  }
  .deviceLedger-page-footer {
    width: 100%;
    height: calc(100% - 420px);
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    .deviceLedger-page-footer-items {
      width: 49%;
      height: 100%;
      min-height: 300px;
      background-color: #fff;
    }
  }
}
</style>
