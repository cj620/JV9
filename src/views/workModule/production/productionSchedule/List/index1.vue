<!--
 * @Author: H.
 * @Date: 2021-11-09 10:36:15
 * @LastEditTime: 2022-01-20 17:17:07
 * @Description: 生产排程
-->

<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <!-- 状态标签 -->
        <BillStateTags :state="record"></BillStateTags>
      </template>

      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('production.Pr_SimulatedCalculate'),
            confirm: simulatedCalculate.bind(null),
          },
          {
            label: $t('production.Pr_Calculate'),
            confirm: calculate.bind(null),
          },

          {
            label: $t('production.Pr_CheckLoad'),
            confirm: equipmentLoad.bind(null),
          },
          {
            label: $t('production.Pr_Release'),
            popConfirm: {
              title: $t('Generality.Ge_WhetherReleaseSchedulingResults'),
              confirm: release.bind(null),
            },
          },
          {
            label: $t('production.Pr_APSLog'),
            confirm: release.bind(null),
          },
        ]"
      >
      </Action>
    </JvTable>
    <!-- 计算弹窗 -->
    <calculateTime
      :visible.sync="calculateTimeDialogFormVisible"
      v-if="calculateTimeDialogFormVisible"
      @cancel="cancel"
      @completed="completed"
    ></calculateTime>
    <!-- 排程日志弹窗 -->
    <!-- 发布提醒弹窗 -->
    <jv-dialog
      :title="$t('Generality.Ge_Remind')"
      width="30%"
      :visible.sync="releaseDialogFormVisible"
      v-if="releaseDialogFormVisible"
      @confirm="release"
      @cancel="cancelRelease"
    >
      生产排程完成，无超负荷工单、超交期工单，是否进行发布？当前版本号：{{
        ApsVersionNo
      }}
    </jv-dialog>
    <!-- 版本号弹窗 -->
    <jv-dialog
      :title="$t('Generality.Ge_Remind')"
      width="30%"
      :visible.sync="versionDialogFormVisible"
      :IsShowCancelFooterBtn="false"
      @confirm="closeVersion"
      v-if="versionDialogFormVisible"
    >
      排程结果已发布，版本号：{{ ApsVersionNo }}
    </jv-dialog>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config1";
// 引入单据状态的枚举
import { stateEnum } from "@/enum/workModule";
// 单据状态组件
import { do_publish } from "@/api/workApi/production/aps";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import calculateTime from "./components/calculateTime";
export default {
  // 页面的标识
  name: "ProductionSchedule",
  components: {
    // 单据状态组件
    BillStateTags,
    calculateTime,
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      // 最新发布版本号
      ApsVersionNo: "",
      calculateTimeDialogFormVisible: false,
      releaseDialogFormVisible: false,
      versionDialogFormVisible: false,
      // 路由跳转前是否提醒发布
      needOpen: false,
      // 路由信息
      toRouteName: null,
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
  },
};
</script>
