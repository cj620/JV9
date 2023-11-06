<template>
  <div class="design-page" ref="designPage">
    <div class="design-page-content">
      <div class="design-page-content-left">
        <el-button type="info" icon="el-icon-more" size="medium" circle style="margin-top: 20px"></el-button>
        <el-button type="info" icon="el-icon-full-screen" size="medium" circle style="margin-top: 20px"></el-button>
        <el-button type="info" icon="el-icon-arrow-left" size="medium" class="left-right" circle></el-button>
      </div>
      <div class="design-page-content-middle">
        <div class="design-page-content-middle-header">
            <div class="design-page-content-middle-header-box">
              <NewMachineCard></NewMachineCard>
            </div>
            <div class="design-page-content-middle-header-box">
              <NewMachineCard></NewMachineCard>
            </div>
            <div class="design-page-content-middle-header-box">
              <NewMachineCard></NewMachineCard>
            </div>
            <div class="design-page-content-middle-header-box">
              <NewMachineCard></NewMachineCard>
            </div>
            <div class="design-page-content-middle-header-box">
              <NewMachineCard></NewMachineCard>
            </div>
        </div>
        <div class="design-page-content-middle-body">
          <div class="design-page-content-middle-body-box"></div>
          <div class="design-page-content-middle-body-box"></div>
          <div class="design-page-content-middle-body-box">
            <div class="design-page-content-middle-body-box-item">
              <NewTaskCard></NewTaskCard>
            </div>
            <div class="design-page-content-middle-body-box-item">
              <NewTaskCard></NewTaskCard>
            </div>
            <div class="design-page-content-middle-body-box-item">
              <NewTaskCard></NewTaskCard>
            </div>
            <div class="design-page-content-middle-body-box-item">
              <NewTaskCard></NewTaskCard>
            </div>
          </div>
          <div class="design-page-content-middle-body-box"></div>
          <div class="design-page-content-middle-body-box"></div>
        </div>
      </div>
      <div class="design-page-content-right">
        <el-button type="info" icon="el-icon-arrow-up" size="medium" circle style="margin-top: 20px"></el-button>
        <el-button type="info" icon="el-icon-arrow-down" size="medium" circle style="margin-top: 20px"></el-button>
        <el-button type="info" icon="el-icon-arrow-right" size="medium" class="left-right" circle></el-button>
      </div>
    </div>
  </div>
</template>
<script>
import NewMachineCard from "./components/NewMachineCard.vue"
import NewTaskCard from "./components/NewTaskCard.vue";
export default {
  // 页面的标识
  name: "TestCyc",
  components: {
    NewMachineCard,
    NewTaskCard
  },
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
  background-color: #f0f2f5;
  &-content {
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: space-between;
    &-left, &-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      height: 100%;
      width: 80px;
      min-width: 80px;
      background-color: white;
      z-index: 1;
      .el-button + .el-button {
        margin-left: 0;
      }
    }
    &-middle {
      height: 100%;
      width: calc(100% - 160px);
      background-color: white;
      &-header {
        width: 100%;
        height: 120px;
        background-color: white;
        display: flex;
        &-box {
          flex: 1;
          margin:10px 25px 0 25px;
          min-width: 250px
        }
      }
      &-body {
        width: 100%;
        height: calc(100% - 140px);
        display: flex;
        &-box {
          flex: 1;
          margin:10px 25px 0 25px;
          min-width: 250px;
          height: 100%;
          display: flex;
          gap: 10px;
          flex-direction: column;
          &-item {
            width: 100%;
            height: 175px;
            min-height: 175px;
          }
        }
      }
    }
  }
}
.left-right {
  margin-top: calc(50vh - 200px);
}
</style>
