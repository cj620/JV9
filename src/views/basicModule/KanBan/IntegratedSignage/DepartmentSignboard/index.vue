<template>
  <DvFullScreenContainer>
    <div class="department-signboard">
      <div class="department-signboard-header">
        <div class="department-signboard-header-left"></div>
        <div class="department-signboard-header-center">
          {{ $t("DataV.Da_NCDepartmentSignboard") }}
        </div>
        <div class="department-signboard-header-right">
          <el-dropdown trigger="click" @command="selectDepartment">
            <div class="department-signboard-header-right-select-department">
              <span
                ><input
                  type="text"
                  :placeholder="$t('DataV.Da_SelectDepartment')"
                  @input="departmentChange"
                  @compositionstart="compositionstart"
                  @compositionend="compositionend"
                  @focus="departmentFocus"
                  @blur="departmentBlur"
                  autofocus
                  ref="departmentRef"
                  v-model="departmentName"
              /></span>
              <i class="el-icon-caret-bottom" v-show="!clearable"></i>
              <i
                class="el-icon-error"
                v-show="clearable"
                @click="clearDepartmentName"
              ></i>
            </div>
            <el-dropdown-menu slot="dropdown">
              <d-loading v-show="departmentLoading"></d-loading>
              <el-dropdown-item
                v-for="(item, i) in department"
                :key="i"
                :command="item"
                >{{ item }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <formatted-time format="yyyy-MM-dd hh:mm" />
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
              <div class="daily-processing-task">
                <DailyProcessingTask :result="DailyProcessingTaskList" />
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
  </DvFullScreenContainer>
</template>

<script>
import Devices from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/Devices.vue";
import FormattedTime from "@/views/basicModule/KanBan/IntegratedSignage/EquipmentSignage/components/formattedTime.vue";
import LastSevenDays from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/LastSevenDays.vue";
import DailyProcessingTask from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/Daily-processing-task.vue";
import SortOfHoursReportedYesterday from "@/views/basicModule/KanBan/IntegratedSignage/DepartmentSignboard/view/Sort-of-hours-reported-yesterday.vue";
import dLoading from '../EquipmentSignage/components/d-loading.vue';
import { getDepartmentList } from '@/api/basicApi/systemSettings/department';
import { processing_department_kanban } from '@/api/basicApi/dataV/kanban';
export default {
  name: "DepartmentSignboard",
  components: {
    SortOfHoursReportedYesterday,
    DailyProcessingTask,
    LastSevenDays,
    FormattedTime,
    Devices,
    dLoading,
  },
  data() {
    return {
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
      department: ['部门1','部门2','部门3','部门4','部门5','部门6'], // 部门列表
      departmentName: '', // 部门
      isComposition: false, // 是否开始输入中文
      clearable: false, // 清除按钮
    };
  },
  created() {
    this.search();
    setTimeout(() => {
      this.DevicesRes = {
        NormalNumberOfUnits: 9, // 正常台数
        ShutdownMaintenance: 1, // 停机维修
        OperationalAvailability: '90%', // 可动率
        DevicesList: [
          {
            State: 'Processing', // 状态
            DevicesName: 'CNC1', // 设备名称
            Worker: '陈旭', // 负责人
            DevicesNo: 'S20230905001-A01', // 设备编号
            PhotoUrl: '\\Files\\1478908435801047041.png',  // 图片
            OperatingHours: 4, //上机工时
            RunTime: 200, // 运行时间
            CurrentNumberOfWorkpieces: 2, // 当前工件数
            DownTime: 100, // 停机时间
            PlannedCropYield: '95%', // 计划稼动率
            ActualCropYield: '80%', // 实际稼动率
          },
          {
            State: 'Idle', // 状态
            DevicesName: 'CNC1', // 设备名称
            Worker: '', // 负责人
            DevicesNo: null, // 设备编号
            PhotoUrl: '\\Files\\1478908435801047041.png',  // 图片
            OperatingHours: null, //上机工时
            RunTime: 200, // 运行时间
            CurrentNumberOfWorkpieces: null, // 当前工件数
            DownTime: 100, // 停机时间
            PlannedCropYield: '95%', // 计划稼动率
            ActualCropYield: '80%', // 实际稼动率
          },
          {
            State: 'Processing', // 状态
            DevicesName: 'CNC1', // 设备名称
            Worker: '李显辉', // 负责人
            DevicesNo: 'S20230905001-A01', // 设备编号
            PhotoUrl: '\\Files\\1478908435801047041.png',  // 图片
            OperatingHours: 4, //上机工时
            RunTime: 200, // 运行时间
            CurrentNumberOfWorkpieces: 2, // 当前工件数
            DownTime: 100, // 停机时间
            PlannedCropYield: '95%', // 计划稼动率
            ActualCropYield: '80%', // 实际稼动率
          },
          {
            State: 'Idle', // 状态
            DevicesName: 'CNC1', // 设备名称
            Worker: '', // 负责人
            DevicesNo: null, // 设备编号
            PhotoUrl: '\\Files\\1478908435801047041.png',  // 图片
            OperatingHours: null, //上机工时
            RunTime: 200, // 运行时间
            CurrentNumberOfWorkpieces: null, // 当前工件数
            DownTime: 100, // 停机时间
            PlannedCropYield: '95%', // 计划稼动率
            ActualCropYield: '80%', // 实际稼动率
          },
          {
            State: 'Processing', // 状态
            DevicesName: 'CNC1', // 设备名称
            Worker: '昌建', // 负责人
            DevicesNo: 'S20230905001-A01', // 设备编号
            PhotoUrl: '\\Files\\1478908435801047041.png',  // 图片
            OperatingHours: 4, //上机工时
            RunTime: 200, // 运行时间
            CurrentNumberOfWorkpieces: 2, // 当前工件数
            DownTime: 100, // 停机时间
            PlannedCropYield: '95%', // 计划稼动率
            ActualCropYield: '80%', // 实际稼动率
          },
        ]
      }
    }, 0);
  },
  methods: {
    // 输入部门change事件
    departmentChange() {

    },
    // 选择部门
    selectDepartment(val) {
      this.departmentName = val;
    },
    // 中文输入开始
    compositionstart() {
      this.isComposition = true;
    },
    // 中文输入结束
    compositionend() {
      this.isComposition = false;
      // 因为v-model后执行 此时还没有拿到最新的departmentName的值，所以要加个异步处理
      let timer = setTimeout(() => {
        this.search();
        clearTimeout(timer);
      })
    },
    // 搜索方法
    search() {
      this.departmentName ? this.department = ['开发部', '销售部'] : this.department = ['部门1','部门2','部门3','部门4','部门5','部门6'];
      processing_department_kanban({Department: this.departmentName}).then(res => {
        this.infoRes = res['TopInfo']; // 顶部信息
        this.LastSevenDaysRes = { ...res['WorkHourRecord'] }; // 过去七天工时记录
        this.DailyProcessingTaskList = res['ProcessingTask']; // 每日加工任务
        this.SortOfHoursReportedYesterdayRes = {...res['WorkHoursReported']}; // 昨日报工工时排序
        this.DevicesRes = {...res['Devices']}; // 设备列表
        console.log(res)
      })
    },
    // 聚焦事件
    departmentFocus() {
      if(this.departmentName) {
        this.clearable = true;
      }
    },
    // 失焦事件
    departmentBlur() {
      let timer = setTimeout(() => {
        this.clearable = false;
        clearTimeout(timer);
      },200)
    },
    clearDepartmentName() {
      this.departmentName = '';
      this.$refs.departmentRef.focus();
    }
  },
  watch: {
    departmentName(val) {
      // console.log(val)
      val ? this.clearable = true : this.clearable = false;
      if(this.isComposition) return
      this.search();
    }
  }
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
      width: 310px;
    }
    &-right {
      height: 100%;
      color: #efefef;
      display: flex;
      align-items: flex-end;
      padding-bottom: 10px;
      box-sizing: border-box;
      z-index: 1;
      width: 310px;
      justify-content: space-between;
      padding-right: 20px;
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
</style>
