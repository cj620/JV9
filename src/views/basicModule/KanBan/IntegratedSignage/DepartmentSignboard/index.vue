<template>
  <DvFullScreenContainer>
    <div class="department-signboard">
      <div class="department-signboard-header">
        <div class="department-signboard-header-left"></div>
        <div class="department-signboard-header-center">
          {{ $t("DataV.Da_NCDepartmentSignboard") }}
        </div>
        <div class="department-signboard-header-right">
          <formatted-time format="yyyy/MM/dd hh:mm" />
        </div>
      </div>
      <div class="department-signboard-content">
        <div class="department-signboard-content-info">
          <div
            class="department-signboard-content-info-item"
            v-for="(item, i) in infoList"
            :key="i"
            :style="{ marginLeft: i !== 0 ? '30px' : '' }"
          >
            <dv-border-box-7 :color="['#4c5f98', '#5166b0']">
              <div class="department-signboard-content-info-item-box">
                <div style="margin-bottom: 10px">{{ item.label }}</div>
                <div style="font-size: 20px; font-weight: bold">
                  {{ infoRes[i] }}
                </div>
              </div>
            </dv-border-box-7>
          </div>
        </div>
        <div class="department-signboard-content-main">
          <!-- 过去七天工时记录 -->
          <div class="department-signboard-content-left">
            <!-- 上面的柱状图 -->
            <div class="department-signboard-content-left-top">
              <LastSevenDays :result="LastSevenDaysRes" />
            </div>
            <!-- 下面的柱状图和表 -->
            <div class="department-signboard-content-left-bottom">
              <!-- 每日加工任务 -->
              <div class="daily-processing-task"><DailyProcessingTask :result="DailyProcessingTaskList" /></div>
              <!-- 昨日报工工时排序 -->
              <div class="sort-of-hours-reported-yesterday">
                <SortOfHoursReportedYesterday :result="SortOfHoursReportedYesterdayRes" />
              </div>
            </div>
          </div>
          <!-- 设备列表 -->
          <div class="department-signboard-content-right">
            <Devices :result="DevicesRes" />
          </div>
        </div>
      </div>
    </div>
  </DvFullScreenContainer>
</template>

<script>
import Devices from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/Devices.vue";
import FormattedTime from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/formattedTime.vue";
import LastSevenDays from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/LastSevenDays.vue";
import DailyProcessingTask from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/Daily-processing-task.vue";
import SortOfHoursReportedYesterday from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/Sort-of-hours-reported-yesterday.vue";

export default {
  name: "DepartmentSignboard",
  components: {
    SortOfHoursReportedYesterday,
    DailyProcessingTask,
    LastSevenDays,
    FormattedTime,
    Devices,
  },
  data() {
    return {
      infoList: [
        {
          label:
            i18n.t("DataV.Da_PlannedCompletions") +
            "/" +
            i18n.t("DataV.Da_ActualCompletions"),
        },
        {
          label:
            i18n.t("DataV.Da_PlannedTime") +
            "/" +
            i18n.t("DataV.Da_ActualHour"),
        },
        {
          label:
            i18n.t("DataV.Da_TaskAchievementRate") +
            "/" +
            i18n.t("DataV.Da_WorkHourAchievementRate"),
        },
        { label: i18n.t("DataV.Da_PassRate") },
      ],
      infoRes: ["70/60", "60/40", "80%/60%", "60%"],
      LastSevenDaysRes: {},
      DailyProcessingTaskList: [],
      SortOfHoursReportedYesterdayRes: {},
      DevicesRes: {}
    };
  },
  created() {
    setTimeout(() => {
      this.LastSevenDaysRes = {
        XAxis: ['4', '5', '6', '7', '8', '9'],
        PlannedTime: [100, 140, 230, 100, 130, 177],
        ActualHour: [150, 100, 200, 140, 100, 217],
        UtilizationRate: [126, 222,163, 140, 184, 123],
      };
      this.DailyProcessingTaskList = [
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台1', ActualMachine: '机台5', State: '状态1'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台2', ActualMachine: '机台4', State: '状态2'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台3', ActualMachine: '机台3', State: '状态3'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台4', ActualMachine: '机台2', State: '状态4'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台5', ActualMachine: '机台1', State: '状态5'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台5', ActualMachine: '机台1', State: '状态5'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台5', ActualMachine: '机台1', State: '状态5'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台5', ActualMachine: '机台1', State: '状态5'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台5', ActualMachine: '机台1', State: '状态5'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台5', ActualMachine: '机台1', State: '状态5'},
        {StartTime: '2023-08-27T05:00:00', EndTime: '2023-08-27T12:00:00', PlannedMachine: '机台5', ActualMachine: '机台1', State: '状态5'},
      ]
      this.SortOfHoursReportedYesterdayRes = {
        YAxis: ['李显辉', '陈旭', '昌建', '李洪鑫', '陈义初', '林轶龙'],
        Data: [130, 50, 40, 30, 20, 10]
      };
      this.DevicesRes = {
        NormalNumberOfUnits: 9, // 正常台数
        ShutdownMaintenance: 1, // 停机维修
        OperationalAvailability: '90%', // 可动率
        DevicesList: [
          {
            State: '', // 状态
            DevicesName: 'CNC1', // 设备名称
            Worker: '李显辉', // 负责人
            DevicesNo: 'S20230905001-A01', // 设备编号
            PhotoUrl: '',  // 图片
            OperatingHours: 4, //上机工时
            RunTime: 200, // 运行时间
            CurrentNumberOfWorkpieces: 2, // 当前工件数
            DownTime: 100, // 停机时间
            PlannedCropYield: '95%', // 计划稼动率
            ActualCropYield: '80%', // 实际稼动率
          }
        ]
      }
    }, 1000);
  },
};
</script>

<style scoped lang="scss">
.department-signboard {
  width: 100%;
  height: 100%;
  background: #1d2536;
  overflow: hidden;
  &-header {
    width: 100%;
    height: 80px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    position: relative;
    background: url("../1.svg") no-repeat;
    background-size: cover;
    &-center {
      font-size: 28px;
      color: #fff;
      height: 100%;
      line-height: 80px;
      z-index: 1;
    }
    &-left {
      height: 100%;
      display: flex;
      align-items: flex-end;
      padding-left: 20px;
      color: #fff;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 200px;
    }
    &-right {
      height: 100%;
      color: #efefef;
      display: flex;
      align-items: flex-end;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 200px;
      justify-content: center;
    }
  }
  &-content {
    height: calc(100% - 90px);
    padding: 0 40px;
    overflow: hidden;
    &-info {
      margin-top: 10px;
      height: 80px;
      display: flex;
      justify-content: space-between;
      &-item {
        height: 80px;
        color: #eaeaea;
        flex: 1;
        &-box {
          height: 100%;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
    }
    &-main {
      width: 100%;
      height: calc(100% - 90px);
      display: flex;
    }
    &-left {
      width: 1160px;
      height: 100%;
      &-top {
        height: 430px;
        margin-top: 20px;
        width: 100%;
        background: #242d48;
      }
      &-bottom {
        height: 410px;
        margin-top: 20px;
        width: 100%;
        display: flex;
        .daily-processing-task {
          width: 680px;
          height: 100%;
          margin-right: 20px;
          background: #242d48;
        }
        .sort-of-hours-reported-yesterday {
          width: 460px;
          height: 100%;
          background: #242d48;
        }
      }
    }
    &-right {
      width: 680px;
      height: 100%;
    }
  }
}
</style>
