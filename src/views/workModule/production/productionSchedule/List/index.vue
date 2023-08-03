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
        ]"
      >
      </Action>
    </JvTable>
    <calculateTime
      :visible.sync="calculateTimeDialogFormVisible"
      v-if="calculateTimeDialogFormVisible"
      @cancel="cancel"
    ></calculateTime>
    <!-- <jv-dialog
      :title="$t('Generality.Ge_Remind')"
      width="30%"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
    >
    </jv-dialog> -->
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
import { do_publish } from "@/api/workApi/production/aps";
import calculateTime from "./components/calculateTime";
export default {
  // 页面的标识
  name: "ProductionSchedule",
  components: { calculateTime },
  data() {
    return {
      // 表格实例
      tableObj: {},
      calculateTimeDialogFormVisible: false,
      // dialogFormVisible: false,
    };
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
    //查看设备负荷
    equipmentLoad() {
      this.$router.push({
        name: "ProductionDetailedLoad",
      });
    },
    open() {
      this.$alert("排程结果已发布，当前版本号为231321123", "提示", {
        confirmButtonText: "确定",
      });
    },
    //发布APS结果
    release() {
      do_publish().then((res) => {
        console.log(res);
        // this.dialogFormVisible = true;
        this.open();
      });
    },
  },
};
</script>
