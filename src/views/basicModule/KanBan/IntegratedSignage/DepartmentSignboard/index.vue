<template>
  <DvFullScreenContainer>
    <div class="department-signboard">
      <d-loading v-show="loading" />
      <div class="department-signboard-header">
        <div class="department-signboard-header-left">
          <img src="../logo.png" alt="" />
        </div>
        <div class="department-signboard-header-center">
          {{ departmentName }} {{ $t("DataV.Da_Department") }}
        </div>
        <div class="department-signboard-header-right">
          <JvForm :form-obj="formObj"></JvForm>
          <formatted-time />
        </div>
      </div>
      <div class="department-signboard-content">
        <div class="department-signboard-content-info">
          <div
            class="department-signboard-content-info-item"
            v-for="(item, i) in infoList"
            :key="i"
            :style="{ marginLeft: i !== 0 ? '20px' : '' }"
          >
            <dv-border-box-7 :color="['#4c5f98', '#5166b0']">
              <div class="department-signboard-content-info-item-box">
                <div style="margin-bottom: 10px">{{ item.label }}</div>
                <div style="font-size: 20px; font-weight: bold">
                  {{ infoRes[i] || $t("DataV.Da_NoData") }}
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
              <!--              <div class="None-data"  v-show="(JSON.stringify(LastSevenDaysRes) === '{}')">-->
              <!--                <div class="LastSevenDays-title">{{$t('DataV.Da_RecordOfWorkingHoursInThePastSevenDays')}}</div>-->
              <!--                暂无数据-->
              <!--              </div>-->
            </div>
            <!-- 下面的柱状图和表 -->
            <div class="department-signboard-content-left-bottom">
              <!-- 每日加工任务 -->
              <div class="daily-processing-task">
                <DailyProcessingTask :result="DailyProcessingTaskList" />
                <!--                <div class="None-data"  v-show="(JSON.stringify(DailyProcessingTaskList) === '[]')">-->
                <!--                  <div class="daily-processing-task-title">{{$t('DataV.Da_DailyProcessingTasks')}}</div>-->
                <!--                  暂无数据-->
                <!--                </div>-->
              </div>
              <!-- 昨日报工工时排序 -->
              <div class="sort-of-hours-reported-yesterday">
                <SortOfHoursReportedYesterday
                  :result="SortOfHoursReportedYesterdayRes"
                />
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
    <ArrowLeft></ArrowLeft>
    <ArrowRight></ArrowRight>
  </DvFullScreenContainer>
</template>

<script>
import Devices from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/Devices.vue";
import FormattedTime from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/formattedTime.vue";
import LastSevenDays from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/LastSevenDays.vue";
import DailyProcessingTask from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/Daily-processing-task.vue";
import SortOfHoursReportedYesterday from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/Sort-of-hours-reported-yesterday.vue";
import dLoading from "../EquipmentSignage/components/d-loading.vue";
import screenFull from "screenfull";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { processing_department_kanban } from "@/api/basicApi/dataV/kanban";
import { Form } from "~/class/form";
import JvForm from "~/cpn/JvForm/index.vue";
import { formSchema } from "./config";
import ArrowLeft from "../cpns/ArrowLeft";
import ArrowRight from "../cpns/ArrowRight";
import { getConfigKey } from '@/api/basicApi/systemSettings/sysSettings'
export default {
  name: "DepartmentSignboard",
  components: {
    JvForm,
    SortOfHoursReportedYesterday,
    DailyProcessingTask,
    LastSevenDays,
    FormattedTime,
    Devices,
    dLoading,
    ArrowLeft,
    ArrowRight,
  },
  data() {
    return {
      loading: false,
      departmentLoading: false,
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
      infoRes: [],
      LastSevenDaysRes: {}, // 过去七天工时记录
      DailyProcessingTaskList: [], // 每日加工任务
      SortOfHoursReportedYesterdayRes: {}, // 昨日报工工时排序
      DevicesRes: {}, // 设备列表
      department: ["销售部", "生产部", "采购部", "设计部", "编程部", "开发部"], // 部门列表
      departmentName: "", // 部门
      isComposition: false, // 是否开始输入中文
      clearable: false, // 清除按钮
      formObj: {},
    };
  },
  created() {
    screenFull.toggle(); // 全屏
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      labelWidth: "0px",
      labelPosition: "left",
    });

     this.GetDeptData()
  },
  methods: {
    //获取部门数据
    async  GetDeptData(){
      await  getConfigKey({ConfigKey:'DefaultProductionDepartment'}).then(res=>{
        console.log(res.ConfigValue,res,565656)
        console.log(JSON.parse(res.ConfigValue),565656)

        this.departmentName = '生产';
        this.formObj.form.DepartmentNames = JSON.parse(res.ConfigValue)
        this.search();
        this.departmentLoading = false;
      })
    },
    // 搜索方法
    search() {
      this.loading = true;
      processing_department_kanban({ DepartmentNames:  this.formObj.form.DepartmentNames })
        .then((res) => {
          this.loading = false;
          this.infoRes = res["TopInfo"] || []; // 顶部信息
          this.LastSevenDaysRes = { ...res["WorkHourRecord"] } || {}; // 过去七天工时记录
          this.DailyProcessingTaskList = res["ProcessingTask"] || []; // 每日加工任务
          this.SortOfHoursReportedYesterdayRes =
            { ...res["WorkHoursReported"] } || {}; // 昨日报工工时排序
          this.DevicesRes = { ...res["Devices"] } || {}; // 设备列表
        })
        .catch((err) => {
          this.loading = false;
        });
    },
  },
  watch: {
    "formObj.form.DepartmentName"(val) {
      this.departmentName = val;
      this.search();
    },
    departmentName(val) {
      val ? (this.clearable = true) : (this.clearable = false);
      if (this.isComposition) return;
      // this.search();
    },
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
      width: 380px;
      position: relative;
      img {
        width: 190px;
        position: absolute;
        bottom: -14px;
      }
    }
    &-right {
      height: 100%;
      color: #efefef;
      display: flex;
      align-items: flex-end;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 380px;
      justify-content: space-between;
      padding-right: 20px;
      ::v-deep#c-jv-form {
        position: relative;
        bottom: -5px;
      }
      ::v-deep.el-input__inner {
        background: #1d2536;
        color: #fff;
      }
      ::v-deep.el-form-item--mini.el-form-item {
        margin-bottom: 0;
      }
      ::v-deep.el-form-item {
        margin-bottom: 0;
      }
      &-select-department {
        width: 150px;
        height: 30px;
        background: #2f3c57;
        margin-bottom: -6px;
        color: #eaeaea;
        line-height: 30px;
        border-radius: 4px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 6px;
        cursor: pointer;
        input {
          width: 120px;
          border: 0; /*清除自带的2px的边框*/
          padding: 0; /*清除自带的padding间距*/
          outline: none; /*清除input点击之后的黑色边框*/
          background: #2f3c57;
          color: #eaeaea;
        }
        ::-webkit-input-placeholder {
          /* WebKit browsers，webkit内核浏览器 */
          color: #eaeaea;
          font-size: 12px;
        }
        :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #eaeaea;
          font-size: 12px;
        }
        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #eaeaea;
          font-size: 12px;
        }
        :-ms-input-placeholder {
          /* Internet Explorer 10+ */
          color: #eaeaea;
          font-size: 12px;
        }
      }
    }
  }
  &-content {
    height: calc(100% - 90px);
    padding: 0 20px;
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
        position: relative;
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
          position: relative;
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
.el-dropdown-menu {
  width: 150px;
  max-height: 200px;
  background: #2f3c57;
  border: 1px solid #2f3c57;
  overflow-y: auto;
  .el-dropdown-menu__item {
    color: #eaeaea;
  }
  .el-dropdown-menu__item:hover {
    background: #1d2536;
  }
  ::v-deep.popper__arrow {
    border-bottom-color: #2f3c57;
  }
  ::v-deep.popper__arrow::after {
    border-bottom-color: #2f3c57;
  }
}
.department-signboard {
  ::v-deep.c-jv-form .el-form-item .el-form-item__label {
    display: none !important;
  }
}
.None-data {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
  color: #fff;
  background: #242d48;
  position: absolute;
  z-index: 10;
  top: 0;
  .daily-processing-task-title {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    font-size: 18px;
    font-weight: bold;
    color: #eaeaea;
    height: 40px;
    line-height: 40px;
  }
  .LastSevenDays-title {
    position: absolute;
    left: 3.3%;
    top: 3.3%;
    font-weight: bold;
    font-size: 18px;
    color: #eaeaea;
  }
}
</style>
