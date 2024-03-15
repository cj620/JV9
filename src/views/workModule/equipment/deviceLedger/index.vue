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
            <i class="setting-icon el-icon-s-operation" style="font-size: 24px; margin-right: 10px; color: #6E8CFF;"/>
            {{ $t('menu.As_DeviceSpotCheck') }}
          </div>
          <div class="body-top-right">
            {{ $t('Generality.Ge_Date') }}
            <el-date-picker
              v-model="taskDate"
              type="daterange"
              size="small"
              range-separator="~"
              :start-placeholder="$t('Generality.Ge_StartDate')"
              :end-placeholder="$t('Generality.Ge_EndDate')"
              style="margin: 0 20px 0 15px"
              @change="timeChange1"
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
            <div class="body-bottom-items-icon" :style="{background: item.backColor, color: item.color}">
              <i :class="item.icon" style="font-size: 32px"></i>
            </div>
            <div class="body-bottom-items-content">
              <div style="width: 100%;height: 60%; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: bold">{{ item.data }}</div>
              <div style="width: 100%;height: 40%; display: flex; align-items: flex-start; justify-content: center; color: #7d7d7f;">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 底部图表 -->
      <div class="deviceLedger-page-footer">
        <div class="deviceLedger-page-footer-items">
          <div class="echarts-header">
            <i class="el-icon-pie-chart" style="font-size: 24px; margin-right: 10px; color: #6E8CFF;"/>
            设备维修
          </div>
          <div class="echarts-body">
            <repairChart :result="repairChartData"></repairChart>
          </div>
        </div>
        <div class="deviceLedger-page-footer-items">
          <div class="echarts-header" style="justify-content: space-between">
            <div class="echarts-header-left">
              <i class="el-icon-pie-chart" style="font-size: 24px; margin-right: 10px; color: #6E8CFF;"/>
              {{ $t('menu.As_DeviceMaintain') }}
            </div>
            <div class="echarts-header-right">
              {{ $t('Generality.Ge_Date') }}
              <el-date-picker
                  v-model="maintainDate"
                  type="daterange"
                  size="small"
                  range-separator="~"
                  :start-placeholder="$t('Generality.Ge_StartDate')"
                  :end-placeholder="$t('Generality.Ge_EndDate')"
                  style="margin: 0 10px"
                  @change="timeChange2"
              >
              </el-date-picker>
            </div>
          </div>
          <div class="echarts-body">
            <maintainChart :result="maintainChartData"></maintainChart>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
<script>
import {
  assets_device_management_report,
  assets_device_spot_check_report,
  assets_device_maintain_report,
} from "@/api/workApi/equipment/device"
import repairChart from "@/views/workModule/equipment/deviceLedger/components/repairChart.vue";
import maintainChart from "@/views/workModule/equipment/deviceLedger/components/maintainChart.vue";
import { timeFormat } from "@/jv_doc/utils/time";
export default {
  name: "As_DeviceLedger",
  data() {
    return {
      taskDate: ["", ""],
      taskSpan: {
        StartDate: "",
        EndDate: "",
      },
      maintainDate: ["", ""],
      maintainSpan: {
        StartDate: "",
        EndDate: "",
      },
      headerData: [
        {
          title: "设备总数",
          data: 0,
          remarks: "DeviceTotalQuantity",
        },
        {
          title: "保养中设备数",
          data: 0,
          remarks: "MaintenanceingQuantity",
        },
        {
          title: "维修中设备数",
          data: 0,
          remarks: "RepairingQuantity",
        },
        {
          title: "点检超期数",
          data: 0,
          remarks: "SpotCheckOverdueQuantity",
        },
      ],
      bodyData: [
        {
          title: "点检完成率",
          data: 0,
          icon: "el-icon-s-marketing",
          backColor: '#E0F9FC',
          color: '#47DCEE',
          remarks: "SpotCheckCompletionRate",
        },
        {
          title: "点检完成数",
          data: 0,
          icon: "el-icon-finished",
          backColor: '#E5F8ED',
          color: '#4DD189',
          remarks: "SpotCheckCompletionQuantity",
        },
        {
          title: "点检异常数",
          data: 0,
          icon: "el-icon-document-delete",
          backColor: '#FCEAEA',
          color: '#EE7B7B',
          remarks: "SpotCheckAbnormalQuantity",
        },
        {
          title: "超期数",
          data: 0,
          icon: "el-icon-stopwatch",
          backColor: '#FEF8E1',
          color: '#F7D13D',
          remarks: "OverdueQuantity",
        },
        {
          title: "跳过数",
          data: 0,
          icon: "el-icon-guide",
          backColor: '#F4EAE6',
          color: '#A65331',
          remarks: "AutoCompletionQuantity",
        },
      ],
      repairChartData: [],
      maintainChartData: []
    }
  },
  components: {
    repairChart,
    maintainChart,
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      assets_device_management_report().then((res) => {
        this.headerData.forEach(item => {
          const remarksKey = item.remarks;
          if (res.hasOwnProperty(remarksKey)) {
            item.data = res[remarksKey];
          }
        });
        this.repairChartData = res.RepairData.PieChartData;
      })
      this.getSpotCheckData({});
      this.getMaintainData({});
    },
    getSpotCheckData(e) {
      assets_device_spot_check_report(e).then((res) => {
        this.bodyData.forEach(item => {
          const remarksKey = item.remarks;
          if (res.hasOwnProperty(remarksKey)) {
            item.data = res[remarksKey];
          }
        });
      })
    },
    getMaintainData(e) {
      assets_device_maintain_report(e).then((res) => {
        this.maintainChartData = res.PieChartData;
      })
    },
    timeChange1() {
      this.taskSpan.StartDate = timeFormat(this.taskDate[0], 'yyyy-MM-dd hh:mm:ss');
      this.taskSpan.EndDate = timeFormat(this.taskDate[1], 'yyyy-MM-dd hh:mm:ss');
      this.getSpotCheckData(this.taskSpan)
    },
    timeChange2() {
      this.maintainSpan.StartDate = timeFormat(this.maintainDate[0], 'yyyy-MM-dd hh:mm:ss');
      this.maintainSpan.EndDate = timeFormat(this.maintainDate[1], 'yyyy-MM-dd hh:mm:ss');
      this.getMaintainData(this.maintainSpan)
    }
  }
}
</script>
<style lang="scss" scoped>
.deviceLedger-page {
  height: 100%;
  min-width: 1200px;
  background-color: rgba(242,242,242);
  .deviceLedger-page-header {
    width: 100%;
    height: 105px;
    display: flex;
    justify-content: space-between;
    .deviceLedger-page-header-items {
      width: 24%;
      height: 100%;
      background-color: #fff;
      padding: 15px;
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影 */
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
        color: #6E8CFF;
      }
    }
  }
  .deviceLedger-page-body {
    width: 100%;
    height: 250px;
    background-color: #fff;
    margin-top: 15px;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影 */
    .body-top {
      width: 100%;
      height: 50px;
      display: flex;
      margin-bottom: 5px;
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
      height: 195px;
      display: flex;
      flex-wrap: wrap;
      .body-bottom-items {
        width: 25%;
        height: 50%;
        display: flex;
        justify-content: center;
        .body-bottom-items-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: rgba(242,242,242);
        }
        .body-bottom-items-content {
          width: 120px;
          height: 100%;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          padding-bottom: 10px;
        }
      }
    }
  }
  .deviceLedger-page-footer {
    width: 100%;
    height: calc(100% - 385px);
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    .deviceLedger-page-footer-items {
      border-radius: 6px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 阴影 */
      width: 49%;
      height: 100%;
      min-height: 330px;
      background-color: #fff;
      padding: 10px;
      .echarts-header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 30px;
        margin-bottom: 5px;
        font-size: 18px;
        padding-left: 10px;
        .echarts-header-left {
          display: flex;
          align-items: center;
        }
      }
      .echarts-body {
        width: 100%;
        height: calc(100% - 35px);
      }
    }
  }
}
</style>
