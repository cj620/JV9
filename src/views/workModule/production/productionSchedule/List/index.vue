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
        <el-input v-show="tableChangeGantt" placeholder="请输入零件编号..." prefix-icon="el-icon-search" size="mini"
          v-model="partNumberValue">
        </el-input>
      </div>
      <div class="action-header-right">
        <el-button-group>
          <el-button size="mini" @click="simulatedCalculate">{{ $t('production.Pr_SimulatedCalculate') }}</el-button>
          <el-button size="mini" @click="calculate">{{ $t('production.Pr_Calculate') }}</el-button>
          <el-button size="mini" @click="equipmentLoad">{{ $t('production.Pr_CheckLoad') }}</el-button>
          <el-button size="mini" @click="SchedulingResultsVisible = true">{{ $t('production.Pr_Release') }}</el-button>
          <el-button size="mini">{{ $t('production.Pr_APSLog') }}</el-button>
          <el-button size="mini" icon="el-icon-view" @click="tableChangeGantt = !tableChangeGantt">{{ tableChangeGantt ?
            $t('Generality.Ge_TabularShow') : $t('Generality.Ge_GanttShow') }}</el-button>
        </el-button-group>
        <span v-show="tableChangeGantt" style="margin-left: 20px;">
          <span style="font-size: 12px;">单位：</span>
          <el-select size="mini" style="width: 66px;" @change="setGanttZoom" v-model="unitOfTime" placeholder="请选择单位">
              <el-option v-for="item in unitOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
          </el-select>
        </span>
      </div>
    </div>

    <!-- 表格 -->
    <div v-show="!tableChangeGantt" :style="{ height: ganttContainerHeight + 40 + 'px' }">
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

    <div v-show="tableChangeGantt">
      <CustomGantt :columns="GanttColumns" taskRadius="6" :result="result" :loading="loading"
        :ganttContainerHeight="ganttContainerHeight" ref="CustomGantt">
        <template #pagination>
          <div class="custom-unfold" @click="setFold">
            <i :class="unfold_icon"></i>
          </div>
        </template>
      </CustomGantt>
    </div>

    <div class="overdueOrObsolete">
      <!-- 陈旧工单 -->
      <div :style="{ height: ganttContainerHeight + 86 + 'px' }" v-show="!tableChangeShow">
        <div class="padding-value"></div>
        <JvTable ref="BillTable" :table-obj="oldTableObj">
          <Action slot="btn-list">
            <el-select size="mini" style="width: 100px;" v-model="tableChangeShow">
                <el-option v-for="item in tableChangeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </Action>
        </JvTable>
      </div>
      <!-- 超期工单 -->
      <div :style="{ height: ganttContainerHeight + 86 + 'px' }" v-show="tableChangeShow">
        <div class="padding-value"></div>
        <JvTable ref="BillTable" :table-obj="ObsoleteTableObj">
          <template #operation="{ row }">
            <TableAction :actions="[
              {
                label: '编辑',
                confirm: obsoleteEdit.bind(null, row)
              }]" />
          </template>
          <Action slot="btn-list">
            <el-select size="mini" style="width: 100px;" v-model="tableChangeShow">
                <el-option v-for="item in tableChangeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
          </Action>
        </JvTable>
      </div>

    </div>

    <!-- 计算弹窗 -->
    <calculateTime :visible.sync="calculateTimeDialogFormVisible" v-if="calculateTimeDialogFormVisible" @cancel="cancel"
      @completed="completed"></calculateTime>
    <!-- 排程日志弹窗 -->
    <!-- 发布提醒弹窗 -->
    <jv-dialog :title="$t('Generality.Ge_Remind')" width="30%" :visible.sync="releaseDialogFormVisible"
      v-if="releaseDialogFormVisible" @confirm="release" @cancel="cancelRelease">
      生产排程完成，无超负荷工单、超交期工单，是否进行发布？当前版本号：{{
        ApsVersionNo
      }}
    </jv-dialog>
    <!-- 版本号弹窗 -->
    <jv-dialog :title="$t('Generality.Ge_Remind')" width="30%" :visible.sync="versionDialogFormVisible"
      :IsShowCancelFooterBtn="false" @confirm="closeVersion" v-if="versionDialogFormVisible">
      排程结果已发布，版本号：{{ ApsVersionNo }}
    </jv-dialog>

    <!-- 发布排程结果弹窗 -->
    <JvDialog :visible.sync="SchedulingResultsVisible" :title="$t('Generality.Ge_Remind')" @confirm="release" width="30%">
      <span style="font-size: 16px">{{ $t('Generality.Ge_WhetherReleaseSchedulingResults') }}</span>
    </JvDialog>

  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table, GanttColumns, OldTable, ObsoleteTable } from "./config";
// 引入单据状态的枚举
import { stateEnum } from "@/enum/workModule";
// 单据状态组件
import { do_publish } from "@/api/workApi/production/aps";
import { timeFormat } from "@/jv_doc/utils/time";
import { Bus } from '@/jv_doc/class/event/EventBus';
import { simulation_scheduling_list } from '@/api/workApi/production/productionSchedule';
import BillStateTags from "@/components/WorkModule/BillStateTags";
import calculateTime from "./components/calculateTime";
import CustomGantt from '@/components/CustomGantt/index.vue';
export default {
  // 页面的标识
  name: "ProductionSchedule",
  components: {
    // 单据状态组件
    BillStateTags,
    calculateTime,
    CustomGantt,
  },
  data() {
    return {
      partNumberValue: '', // 零件编号查询输入框
      // 表格实例
      tableObj: {},
      // 最新发布版本号
      ApsVersionNo: "",
      calculateTimeDialogFormVisible: false,
      releaseDialogFormVisible: false,
      versionDialogFormVisible: false,
      SchedulingResultsVisible: false, // 发布排程结果弹窗
      // 路由跳转前是否提醒发布
      needOpen: false,
      // 路由信息
      toRouteName: null,
      tableChangeGantt: true, // 甘特图和表格切换显示隐藏
      // =================================================
      GanttColumns: GanttColumns,
      result: {},
      AlgorithmType: 'ClassicalAlgorithm',
      // overdueOrObsoleteType: 'Normal',
      loading: false,
      timeout: null,
      // activeName: 'overdue',
      oldTableObj: {}, // 陈旧表格
      ObsoleteTableObj: {}, // 超期表格
      isFold: false, // 是否展开
      ganttContainerHeight: 0, //甘特图盒子的高度
      unfold_icon: 'el-icon-arrow-down',
      eventBus: null,
      unitOptions: [{
        value: 'week',
        label: '周'
      }, {
        value: 'hour',
        label: '时'
      }, {
        value: 'minute',
        label: '分'
      }],
      unitOfTime: 'hour',
      tableChangeShow: false,
      tableChangeOptions: [
        { value: false, label: i18n.t("production.Pr_StaleWorkOrder") },
        { value: true, label: i18n.t("production.Pr_OverdueWorkOrder") },
      ]
    };
  },
  // 路由切换
  beforeRouteLeave(to, from, next) {
    this.toRouteName = to.name;
    console.log("this.toRouteName::: ", this.toRouteName);
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
    this.tableObj.getData();

    this.eventBus = Bus;
    // 创建表格实例
    this.oldTableObj = new OldTable();
    this.oldTableObj.getData({ SelectType: 'Normal' });
    this.ObsoleteTableObj = new ObsoleteTable();
    this.ObsoleteTableObj.getData({ SelectType: 'ObsoleteWorkOrder' });

    this.setAlgorithmType();
  },
  mounted() {
    this.setGanttContainer();
    this.eventBus.$on('handleSizeChange', (pageSize, current) => {
      this.setAlgorithmType(pageSize, current);
    })
    this.eventBus.$on('handleCurrentChange', (pageSize, current) => {
      this.setAlgorithmType(pageSize, current);
    })
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
    // 获取按钮状态
    getActionState() {
      return (state, type) => {
        return !stateEnum[state]?.operation?.[type];
      };
    },
  },
  methods: {
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

    //发布APS结果
    release() {
      do_publish().then(() => {
        this.releaseDialogFormVisible = false;
        this.versionDialogFormVisible = true;
        this.needOpen = false;
      });
    },
    // 发布弹窗取消
    cancelRelease() {
      this.toRouteName
        ? this.$router.push({
          name: this.toRouteName,
        })
        : console.log("无需跳转");
      this.toRouteName = null;
    },
    // 关闭版本号弹窗
    closeVersion() {
      this.versionDialogFormVisible = false;
    },
    // ===========================================
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
        PageSize: size
      }).then(res => {
        res.Items = res.Items.map(item => {
          return {
            ...item,
            Data: item.Data.map(jtem => {
              return {
                ...jtem,
                _PlanStart: timeFormat(jtem.PlanStart, 'yyyy-MM-dd hh:mm:ss'),
                _PlanEnd: timeFormat(jtem.PlanEnd, 'yyyy-MM-dd hh:mm:ss'),
              }
            })

          }
        })
        this.result = res;
        this.loading = false;
      })
    },
    // 自适应高度
    setGanttContainer() {
      let mainContent = document.querySelector('.main-content');
      this.ganttContainerHeight = this.isFold ? mainContent.clientHeight - 110 : mainContent.clientHeight / 2 - 110; // 甘特图盒子的高度
      console.log('ganttContainerHeight::: ', this.ganttContainerHeight);
      window.onresize = (e) => {
        this.debounce(() => {
          this.ganttContainerHeight = this.isFold ? mainContent.clientHeight - 110 : mainContent.clientHeight / 2 - 110; // 甘特图盒子的高度
        }, 100)
      }
    },
    // 展开表格
    setFold() {
      this.isFold = !this.isFold;
      this.unfold_icon = this.isFold ? "el-icon-arrow-up" : "el-icon-arrow-down"
      this.setGanttContainer();
    },
    debounce(func, wait) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(func, wait);
    },
    obsoleteEdit(val) {
      console.log('val::: ', val);
    },
  },
  beforeDestroy() {
    this.eventBus.$off("handleSizeChange");
    this.eventBus.$off("handleCurrentChange");
  },
  watch: {
    tableChangeShow(val) {
      if(!val) {
          this.oldTableObj.reset();
      } else {
          this.ObsoleteTableObj.reset();
      }
    }
  }
};
</script>

<style scoped lang="scss">
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
}</style>
