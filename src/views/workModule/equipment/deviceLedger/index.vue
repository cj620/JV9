<template>
  <PageWrapper ref="page" :footer="false">
    <div class="deviceLedger-page">
      <!-- 顶部数据块 -->
      <div class="deviceLedger-page-header">
        <div
          class="deviceLedger-page-header-items"
          v-for="(item, index) in headerData"
          :key="index"
        >
          <div class="header-items-desc">
            {{ item.title }}
          </div>
          <div class="header-items-content">
            {{ item.data }}
          </div>
        </div>
      </div>
      <!-- 中间数据展示 -->
      <div class="deviceLedger-page-body">
        <div class="body-top">
          <div class="body-top-left">
            <i class="setting-icon el-icon-s-operation" style="font-size: 24px; margin-right: 10px"/>
            设备点检
          </div>
          <div class="body-top-right">
            日期
            <el-date-picker
              v-model="taskDate"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              style="margin: 0 20px"
            >
            </el-date-picker>
          </div>
        </div>
        <div class="body-bottom">
          <div
            class="body-bottom-items"
            v-for="(item, index) in bodyData"
            :key="index"
          >
            <div class="body-bottom-items-icon"></div>
            <div class="body-bottom-items-content">
              <div style="width: 100%;height: 60%; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: bold">{{ item.data }}</div>
              <div style="width: 100%;height: 40%; display: flex; align-items: flex-start; justify-content: center; color: #7d7d7f;">{{ item.title }}</div>
            </div>
          </div>
        </div>
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
  data() {
    return {
      taskDate: "",
      headerData: [
        {
          title: "设备总数",
          data: 246,
        },
        {
          title: "保养中资产数",
          data: 210,
        },
        {
          title: "维修中资产数",
          data: 32,
        },
        {
          title: "点检超期数",
          data: 13,
        },
      ],
      bodyData: [
        {
          title: "完成率",
          data: "1.22%",
        },
        {
          title: "需整改数",
          data: "12",
        },
        {
          title: "完成次数",
          data: "10",
        },
        {
          title: "已整改完成",
          data: "10",
        },
        {
          title: "完成巡检点",
          data: "64",
        },
        {
          title: "整改完成率",
          data: "91.67%",
        },
        {
          title: "跳过数",
          data: "4",
        },
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.deviceLedger-page {
  height: 100%;
  min-width: 1200px;
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
        width: 100%;
        height: 25px;
        line-height: 25px;
        font-size: 16px;
        margin-left: 10px;
        color: #7d7d7f;
      }
      .header-items-content {
        margin-top: 5px;
        width: 100%;
        display: flex;
        align-items: center;
        height: calc(100% - 30px);
        font-size: 45px;
        margin-left: 10px;
      }
    }
  }
  .deviceLedger-page-body {
    width: 100%;
    height: 250px;
    background-color: #fff;
    margin-top: 25px;
    .body-top {
      width: 100%;
      height: 60px;
      display: flex;
      .body-top-left {
        width: 40%;
        height: 100%;
        display: flex;
        align-items: center;
        font-size: 18px;
        padding-left: 20px;
      }
      .body-top-right {
        width: 60%;
        height: 100%;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: right;
      }
    }
    .body-bottom {
      width: 100%;
      height: calc(100% - 60px);
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-wrap: wrap;
      padding-bottom: 5px;
      &:after {
        content: "";
        width: 24%;
        height: 45%;
      }
      .body-bottom-items {
        width: 24%;
        height: 45%;
        display: flex;
        justify-content: center;
        .body-bottom-items-icon {
          width: 80px;
          height: 100%;
          background-color: rgba(242,242,242);
        }
        .body-bottom-items-content {
          width: 120px;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
        }
      }
    }
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
      min-height: 330px;
      background-color: #fff;
    }
  }
}
</style>
