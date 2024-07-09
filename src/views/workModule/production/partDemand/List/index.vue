<!--
 * @Author: H.
 * @Date: 2021-11-09 11:33:00
 * @LastEditTime: 2024-07-09 15:49:43
 * @Description: 试模任务
-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <!-- 状态标签 -->
        <BillStateTags :state="record"></BillStateTags>
      </template>
      <template #TaskType="{ record }">
        <!-- 状态标签 -->
        {{ taskTypeEnum[record].name }}
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction :actions="getListTableColBtnModel(row)" />
      </template>
      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_Delete'),
            disabled: canIsDel,
            popConfirm: {
              title: $t('Generality.Ge_DeleteConfirm'),
              confirm: delBills,
            },
          },
        ]"
      >
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { listTableColBtnModel } from "@/jv_doc/utils/system/pagePlugin";
import { stateEnum, taskTypeEnum } from "@/enum/workModule";
// 引入表格类
import { Table } from "./config";
export default {
  name: "Pr_PartProductionDemand",
  components: {
    // 单据状态组件
    BillStateTags,
  },
  data() {
    return {
      taskTypeEnum,
      // 表格实例
      tableObj: {},
      // 编辑路由
      EditRoute: "Pr_PartProductionDemand_Edit",

      TaskType: "TrialTooling",
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  methods: {
    init() {
      this.tableObj = new Table();
      this.tableObj.formObj.form.TaskType = this.TaskType;
      this.tableObj.getData();
    },
    //批量删除单据
    delBills() {
      this.tableObj.api
        .del({ BillIds: this.tableObj.selectData.keys })
        .then((_) => {
          this.tableObj.getData();
        });
    },
  },
  computed: {
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
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
};
</script>

<style lang="scss" scoped></style>
