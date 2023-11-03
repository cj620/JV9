<template>
  <div class="design-page" ref="designPage">
    <div class="design-page-content">
      <div class="design-page-content-left">
        <el-button type="info" icon="el-icon-more" size="medium" circle></el-button>
        <el-button type="info" icon="el-icon-full-screen" size="medium" circle></el-button>
        <el-button type="info" icon="el-icon-arrow-left" size="medium" circle></el-button>
      </div>
      <div class="design-page-content-middle">
        <div class="design-page-content-middle-header"></div>
        <div class="design-page-content-middle-body"></div>
      </div>
      <div class="design-page-content-right">
        <el-button type="info" icon="el-icon-arrow-up" size="medium" circle></el-button>
        <el-button type="info" icon="el-icon-arrow-right" size="medium" circle></el-button>
        <el-button type="info" icon="el-icon-arrow-down" size="medium" circle></el-button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  // 页面的标识
  name: "TestCyc",
  components: {},
  data() {
    return {

    };
  },
  methods: {

  },
};
</script>
<style scoped lang="scss">
.design-page {
  height: calc(100vh - 90px);
  width: 100%;
  position: relative;
  background-color: #f0f2f5;
  &-content {
    height: 100%;
    margin: 0 15px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    &-left, &-right {
      //position: relative;
      height: 100%;
      width: 80px;
      background-color: white;
    }
    &-middle {
      height: 100%;
      width: calc(100% - 160px);
      background-color: #f0f2f5;
      &-header {
        width: 100%;
        height: 120px;
        background-color: yellow;
      }
      &-body {
        width: 100%;
        height: calc(100% - 120px);
      }
    }
  }
}
</style>
