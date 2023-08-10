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
            label: $t('production.Pr_LoadOn'),
            confirm: load.bind(null),
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
              title: $t('Generality.Ge_WhetherRelease'),
              confirm: release.bind(null),
            },
          },
        ]"
      >
      </Action>
    </JvTable>
    <editDelivery
      :visible.sync="editDeliveryDialogFormVisible"
      v-if="editDeliveryDialogFormVisible"
    ></editDelivery>
    <calculateTime
      :visible.sync="calculateTimeDialogFormVisible"
      v-if="calculateTimeDialogFormVisible"
      @cancel="cancel"
    ></calculateTime>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 引入单据状态的枚举
import { stateEnum } from "@/enum/workModule";
// 单据状态组件
import { do_publish } from "@/api/workApi/production/aps";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import editDelivery from "../components/editDelivery";
import calculateTime from "../components/calculateTime";
export default {
  // 页面的标识
  name: "ProductionSchedule",
  components: {
    // 单据状态组件
    BillStateTags,
    editDelivery,
    calculateTime,
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      editDeliveryDialogFormVisible: false,
      calculateTimeDialogFormVisible: false,
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

    //编辑
    editBill(row) {
      let { BillId } = row;
      this.tableObj.api.editLock({ BillId }).then((res) => {
        this.$router.push({
          name: "Sa_SaleOrder_Edit",
          query: { BillId },
        });
      });
    },
    //批量删除单据
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
    //加载数据
    load() {
      this.tableObj.getData();
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

    //发布APS结果
    release() {
      do_publish().then((res) => {
        console.log(res);
      });
    },
  },
};
</script>
