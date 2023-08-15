<!--
 * @Author: H.
 * @Date: 2021-11-09 10:36:15
 * @LastEditTime: 2022-01-20 17:17:07
 * @Description: 生产排程
-->

<template>
  <PageWrapper :footer="false">
    <!-- 顶部操作行 -->
    <div class="action-header">
      <div class="action-header-left">
        <div v-show="tableChangeGantt" style="font-size: 12px; line-height: 0">
          {{$t("Generality.Ge_Unit")}}：
        </div>
        <div v-show="tableChangeGantt" style="margin-right: 20px">
          <el-select
            v-model="unitOfTime"
            placeholder="请选择单位"
            size="mini"
            style="width: 66px"
            @change="setGanttZoom"
          >
            <el-option
              v-for="item in unitOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
        <div>
          <el-input
            v-show="tableChangeGantt"
            v-model="partNumberValue"
            placeholder="请输入零件编号..."
            prefix-icon="el-icon-search"
            size="mini"
          >
          </el-input>
        </div>
          <el-button size="mini" style="margin-left: 10px" type="primary"
          >搜索</el-button
          >
        <div class="apsVersionNo">{{$t("production.Pr_ReleaseVersionNumber")}}：{{ ApsVersionNo }}</div>
      </div>
      <div class="action-header-right">
        <Action
          size="mini"
          :actions="[
            {
              label: $t('production.Pr_Calculate'),
              confirm: calculate.bind(),
            },
            {
              label: $t('production.Pr_SimulatedAPS'),
              confirm: simulatedCalculate.bind(),
            },
            {
              label: $t('production.Pr_CheckLoad'),
              confirm: equipmentLoad.bind(),
            },
            {
              label: $t('production.Pr_Release'),
              confirm: setSchedulingResultsVisible.bind(),
            },
            {
              label: $t('production.Pr_APSLog'),
              confirm: openApsLog.bind(),
            },
            {
              icon: 'el-icon-view',
              label: tableChangeGantt
                ? $t('Generality.Ge_TabularShow')
                : $t('Generality.Ge_GanttShow'),
              confirm: setTableChangeGantt.bind(),
            },
          ]"
        ></Action>
      </div>
    </div>

    <!-- 表格 -->
    <div
      v-show="!tableChangeGantt"
      :style="{ height: ganttContainerHeight + 40 + 'px' }"
    >
      <JvTable ref="BillTable" :table-obj="tableObj">
        <template #State="{ record }">
          <!-- 状态标签 -->
          <BillStateTags :state="record"></BillStateTags>
        </template>
        <template #PaginationLeft>
          <div class="custom-unfold" @click="setFold">
            <i :class="unfold_icon"></i>
          </div>
        </template>
      </JvTable>
    </div>

    <!--甘特图-->
    <div v-show="tableChangeGantt">
      <!--      :popoverInnerHtml="setPopoverInnerHtml"-->
      <CustomGantt
        ref="CustomGantt"
        :columns="GanttColumns"
        :ganttContainerHeight="ganttContainerHeight"
        :loading="loading"
        :result="result"
        :padding="10"
        :floatingWindow="floatingWindow"
        :detailShow="true"
        :popoverOptions="popoverOptions"
        :taskInnerHtml="setTaskInnerHtml"
        taskDialogTitle="Process"
        taskRadius="25"
        @taskClick="taskClick"
        @taskDialogConfrim="taskDialogConfrim"
      >
        <template #popover="{ item }">
          <gantt-popover :item="item"></gantt-popover>
        </template>
        <template #taskDialogSlot="{ item }">
          <JvForm :formObj="formObj"> </JvForm>
        </template>
      </CustomGantt>
      <!-- 分页器 -->
      <div class="custom-pagination">
        <div>
          <div class="custom-unfold" @click="setFold">
            <i :class="unfold_icon"></i>
          </div>
        </div>
        <div class="custom-pagination-box">
          <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            layout="total, sizes, prev, pager, next"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
            :page-size="10"
            :total="result.Count"
          >
          </el-pagination>
        </div>
      </div>
    </div>

    <div class="overdueOrObsolete">
      <!-- 陈旧工单 -->
      <div
        v-show="!tableChangeShow"
        :style="{ height: ganttContainerHeight + 86 + 'px' }"
      >
        <div class="padding-value"></div>
        <JvTable ref="BillTable" :table-obj="oldTableObj">
          <template #LastReportingDays="{ record }">
            <div style="color: red; font-size: 20px; font-weight: bold">
              {{ record }}
            </div></template
          >
          <template #btn-list>
              <el-button size="mini" :disabled="canMark" @click="mark" style="margin-right: 5px">
                {{$t('production.Pr_MarkAsNormal')}}
              </el-button>
              <el-select
                v-model="tableChangeShow"
                size="mini"
                style="width: 100px"
                @change="tableChangeFn"
              >
                <el-option
                  v-for="item in tableChangeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
          </template>
        </JvTable>
      </div>
      <!-- 超期工单 -->
      <div
        v-show="tableChangeShow"
        :style="{ height: ganttContainerHeight + 86 + 'px' }"
      >
        <div class="padding-value"></div>
        <JvTable ref="BillTable" :table-obj="ObsoleteTableObj">
          <template #LastReportingDays="{ record }">
            <div style="color: red; font-size: 20px; font-weight: bold">
              {{ record }}
            </div></template
          >
          <template #operation="{ row }">
            <TableAction
              :actions="[
                {
                  label: $t('Generality.Ge_Edit'),
                  confirm: obsoleteEdit.bind(null, row),
                },
              ]"
            />
          </template>
          <template #btn-list>
            <Action>
              <el-select
                v-model="tableChangeShow"
                size="mini"
                style="width: 100px"
                @change="tableChangeFn"
              >
                <el-option
                  v-for="item in tableChangeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </Action>
          </template>
        </JvTable>
      </div>
    </div>

    <!-- 计算弹窗 -->
    <calculateTime
      v-if="calculateTimeDialogFormVisible"
      :visible.sync="calculateTimeDialogFormVisible"
      @loading="handleLoading"
      @cancel="cancel"
      @completed="completed"
    ></calculateTime>
    <!-- 排程日志弹窗 -->
    <apsLog
      v-if="apsDialogFormVisible"
      :visible.sync="apsDialogFormVisible"
    ></apsLog>
    <!-- 提醒是否发布弹窗 -->
    <jv-dialog
      v-if="releaseDialogFormVisible"
      :title="$t('Generality.Ge_Remind')"
      :visible.sync="releaseDialogFormVisible"
      width="30%"
      @cancel="cancelRelease"
      @confirm="release"
    >
      生产排程完成，无超负荷工单、超交期工单，是否进行发布？当前版本号：{{
        ApsVersionNo
      }}
    </jv-dialog>
    <!-- 发布弹窗 -->
    <JvDialog
      :title="$t('Generality.Ge_Remind')"
      :visible.sync="SchedulingResultsVisible"
      width="30%"
      @confirm="release"
    >
      <span style="font-size: 16px">{{
        $t("Generality.Ge_WhetherReleaseSchedulingResults")
      }}</span>
    </JvDialog>
    <el-backtop target=".c-page-wrapper"></el-backtop>
      <!-- 修改超期工单计划结束时间 -->
      <JvDialog
          :title="$t('production.Pr_ModifyPlanEndTime')"
          :visible.sync="UpdatePlanEndFormVisible"
          width="30%"
          @confirm="updatePlanEnd"
      >
          <el-date-picker
              v-model="planData.planEnd"
              type="date"
              placeholder="选择日期时间">
          </el-date-picker>
      </JvDialog>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table, GanttColumns, OldTable, ObsoleteTable } from "./config";
// 引入表单 配置
import { formSchema } from "./formConfig";
// 引入单据状态的枚举
import { stateEnum } from "@/enum/workModule";
// 单据状态组件
import { do_publish } from "@/api/workApi/production/aps";
import { simulation_scheduling_list } from "@/api/workApi/production/productionSchedule";
import { update_is_partake_aps , update_plan_end } from "@/api/workApi/production/productionTask"
import BillStateTags from "@/components/WorkModule/BillStateTags";
import calculateTime from "./components/calculateTime";
import apsLog from "./components/apsLog";
import CustomGantt from "@/components/CustomGantt/index.vue";
import GanttPopover from "./components/gantt-popover.vue";
import floatingWindow from "./components/floatingWindow.vue";
import item from "@/layout/components/Sidebar/Item.vue";
import { Form } from "@/jv_doc/class/form";
import Action from "~/cpn/JvAction/index.vue";
export default {
  // 页面的标识
  name: "ProductionSchedule",
  components: {
    Action,
    apsLog,
    GanttPopover,
    // 单据状态组件
    BillStateTags,
    calculateTime,
    CustomGantt,
  },
  data() {
    return {
      // 组件
      floatingWindow: floatingWindow,
      partNumberValue: "", // 零件编号查询输入框
      // 表格实例
      tableObj: {},
      // 表单实例
      formObj: "",
      // 最新发布版本号
      ApsVersionNo: "",
      // 计算
      calculateTimeDialogFormVisible: false,
      // 计算完成时或离开页面提醒是否进行发布
      releaseDialogFormVisible: false,
      // 发布日志
      apsDialogFormVisible: false,
      // 发布
      SchedulingResultsVisible: false,
      // 超期编辑计划结束时间
      UpdatePlanEndFormVisible: false,
      // 路由跳转前是否提醒发布
      needOpen: false,
      // 路由信息
      toRouteName: null,
      tableChangeGantt: false, // 甘特图和表格切换显示隐藏
      // =================================================
      GanttColumns: GanttColumns,
      result: {},
      AlgorithmType: "ClassicalAlgorithm",
      // overdueOrObsoleteType: 'Normal',
      loading: false,
      timeout: null,
      // activeName: 'overdue',
      oldTableObj: {}, // 陈旧表格
      ObsoleteTableObj: {}, // 超期表格
      isFold: false, // 是否展开
      ganttContainerHeight: 0, //甘特图盒子的高度
      unfold_icon: "el-icon-arrow-down",
      unitOptions: [
        {
          value: "week",
          label: i18n.t('Generality.Ge_Week'),
        },
        {
          value: "hour",
          label: i18n.t('Generality.Ge__Hour'),
        },
        {
          value: "minute",
          label: i18n.t('Generality.Ge_Minute'),
        },
      ],
      // 默认时间单位
      unitOfTime: "hour",
      // 表格切换显示隐藏
      tableChangeShow: false,
      tableChangeOptions: [
        { value: false, label: i18n.t("production.Pr_StaleWorkOrder") },
        { value: true, label: i18n.t("production.Pr_OverdueWorkOrder") },
      ],
      popoverOptions: {
        placement: "right",
        width: 570,
        trigger: "hover",
      },
      planData: {
        planEnd:null,
        billId:null
      }
    };
  },
  // 路由切换
  beforeRouteLeave(to, from, next) {
    this.toRouteName = to.name;
    // 判断是否需要弹出发布提醒
    if (this.needOpen) {
      this.releaseDialogFormVisible = true;
      this.needOpen = false;
      return;
    }
    next();
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.ObsoleteTableObj = new ObsoleteTable();
    this.oldTableObj = new OldTable();
    // 创建表单实例
    this.formObj = new Form({
      formSchema: formSchema,
      baseColProps: {
        span: 24,
      },
      // gutter: 30,
      labelWidth: "80px",
    });

    this.setTableChangeGantt(); // 调生产排程接口

    this.tableChangeFn(false); // 调陈旧工单接口
  },
  mounted() {
    this.setGanttContainer();
  },
  computed: {
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Rejected", "Unsubmitted"].includes(item.State);
      });
    },
    // 是否可以批量标记
	  canMark() {
		  return this.oldTableObj.selectData.datas.length === 0;
	  },
    // 获取按钮状态
    getActionState() {
      return (state, type) => {
        return !stateEnum[state]?.operation?.[type];
      };
    },
  },
  methods: {
    // task弹窗确认事件
    taskDialogConfrim(taskDetail) {
      console.log(taskDetail);
    },
    // task点击事件
    taskClick(data) {
      Object.keys(this.formObj.form).forEach((item) => {
        this.formObj.form[item] = data[item];
      });
    },
    // task悬浮窗的innerHtml
    setPopoverInnerHtml(item) {
      return `
        <div>${i18n.t("Generality.Ge_ProcessName")}：${item.Process}</div>
        <div>${i18n.t("Generality.Ge_PlanTime")}：${item.PlanTime}H</div>
        <div>${i18n.t("production.Pr_PlanningDevices")}：${
        item.PlanDevice
      }</div>
              <div>${i18n.t("Generality.Ge_PlanStart")}：${
        item._PlanStart
      }</div>
              <div>${i18n.t("Generality.Ge_PlanEnd")}：${item._PlanEnd}</div>`;
    },
    setTaskInnerHtml(item) {
      return `${item.Process} + (${item.PlanTime}H) ${item.PlanDevice}`;
    },
    setTableChangeGantt() {
      this.tableChangeGantt = !this.tableChangeGantt;
      if (this.tableChangeGantt) {
        this.setAlgorithmType(); // 调甘特图获取排程结果接口
      } else {
        this.tableObj.getData();
        this.tableObj.setCallBack(() => {
          this.ApsVersionNo = this.tableObj.tableData[0].ApsVersionNo;
        });
      }
    },
    tableChangeFn(val) {
      // 创建表格实例
      if (val) {
        this.ObsoleteTableObj.getData();
      } else {
        this.oldTableObj.getData();
      }
    },
    //删除单据
    deleteOrder(ids) {
      this.tableObj.api.del({ BillIds: ids }).then((_) => {
        this.tableObj.getData();
      });
    },
    //新增
    add() {
      this.$router.push({
        name: "Sa_SaleOrder_Add",
        params: { type: "add", title: "addSaleOrder" },
      });
    },
    // 监听计算loading
    handleLoading(loading) {
      this.loading = loading;
    },
    // 模拟计算
    simulatedCalculate() {
      this.$router.push({
        name: "ProductionSimulatedCalculate",
      });
    },
    //计算
    calculate() {
      this.calculateTimeDialogFormVisible = true;
    },
    //关闭计算
    cancel() {
      this.calculateTimeDialogFormVisible = false;
    },
    // 计算结果无超交期超负荷时提醒发布
    completed() {
      this.calculateTimeDialogFormVisible = false;
      this.tableObj.getData();
      this.tableObj.setCallBack(() => {
        this.ApsVersionNo = this.tableObj.tableData[0].ApsVersionNo;
        this.releaseDialogFormVisible = true;
        this.needOpen = true;
      });
    },
    //查看设备负荷
    equipmentLoad() {
      this.$router.push({
        name: "ProductionDetailedLoad",
      });
    },
    // 查看排程日志
    openApsLog() {
      this.apsDialogFormVisible = true;
    },

    //发布APS结果
    release() {
      this.loading = true;
      do_publish()
        .then(() => {
          this.releaseDialogFormVisible = false;
          this.SchedulingResultsVisible = false;
          this.needOpen = false;
          this.loading = false;
          this.tableObj.getData();
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 发布弹窗取消，若需跳转其它页面进行跳转
    cancelRelease() {
      this.toRouteName
        ? this.$router.push({
            name: this.toRouteName,
          })
        : console.log("无需跳转");
      this.toRouteName = null;
    },
    // 切换时间
    setGanttZoom(val) {
      this.$refs.CustomGantt.setGanttZoom(val);
    },
    // 获取排程结果
    setAlgorithmType(size = 10, page = 1) {
      this.loading = true;
      simulation_scheduling_list({
        AlgorithmType: this.AlgorithmType,
        CurrentPage: page,
        PageSize: size,
        // SortColumn: "PartNo,PlanStart",
        // SortOrder: 1,
      }).then((res) => {
        this.result = res;
        this.loading = false;
        this.ApsVersionNo = res.VersionNo;
      });
    },
    // 自适应高度
    setGanttContainer() {
      let mainContent = document.querySelector(".main-content");
      this.ganttContainerHeight = this.isFold
        ? mainContent.clientHeight - 110
        : mainContent.clientHeight / 2 - 110; // 甘特图盒子的高度
      console.log("ganttContainerHeight::: ", this.ganttContainerHeight);
      window.onresize = (e) => {
        this.debounce(() => {
          this.ganttContainerHeight = this.isFold
            ? mainContent.clientHeight - 110
            : mainContent.clientHeight / 2 - 110; // 甘特图盒子的高度
        }, 100);
        this.eTableObj.doLayout();
      };
    },
    // 展开表格
    setFold() {
      this.isFold = !this.isFold;
      this.unfold_icon = this.isFold
        ? "el-icon-arrow-up"
        : "el-icon-arrow-down";
      this.setGanttContainer();
    },
    // 防抖函数
    debounce(func, wait) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(func, wait);
    },
    // 编辑
    obsoleteEdit(val) {
      console.log("val::: ", val);
	    this.UpdatePlanEndFormVisible = true;
		  this.planData.planEnd = val.PlanEnd;
		  this.planData.billId = val.BillId;
    },
	  // 修改超交期工单计划结束日期
	  updatePlanEnd(){
		  this.loading = true;
		  console.log(this.planData.planEnd ,this.planData.billId);
		  update_plan_end({BillIds:[this.planData.billId],PlanEnd:this.planData.planEnd }).then(() => {
			  this.loading = false;
        this.ObsoleteTableObj.getData()
		  }).catch(() => {
		    this.loading = false;
	    });
		  this.UpdatePlanEndFormVisible = false;
      this.planData = {
        planEnd:null,
        billId:null
      }
	  },
    // 总条数切换
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // 分页切换
    handleCurrentChange(current) {
      this.current = current;
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // 是否发布排程结果
    setSchedulingResultsVisible() {
      this.SchedulingResultsVisible = true;
    },
    // 批量标记陈旧工单为正常
    mark(){
		  this.loading = true;
      let { datas } = this.oldTableObj.selectData;
      let BillIds = [];
      datas.forEach((item)=>{
        BillIds.push(item.BillId)
      })
      update_is_partake_aps({ BillIds } ).then(()=>{
        this.oldTableObj.getData()
        this.loading = false;
		  }).catch(() => {
			  this.loading = false;
		  });
    },
  },
  watch: {
    tableChangeShow(val) {
      if (!val) {
        this.oldTableObj.reset();
      } else {
        this.ObsoleteTableObj.reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.c-page-wrapper {
  // overflow: hidden;
}

.action-header {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 6px 10px;
  height: 48px;
  border-radius: 4px;
  align-items: center;

  &-left,
  &-right {
    display: flex;
    align-items: center;
  }
}
.apsVersionNo {
  font-size: 12px;
  display: flex;
  margin-left: 10px;
  white-space: nowrap; /* 取消换行 */
  line-height: 0;
}

.overdueOrObsolete {
  background-color: #fff;
  margin-top: 10px;

  ::v-deep .el-tabs__header {
    margin: 0;
  }
}

.custom-unfold {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
}

.padding-value {
  height: 10px;
}
.custom-pagination {
  height: 40px;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-box {
  }
}
</style>
