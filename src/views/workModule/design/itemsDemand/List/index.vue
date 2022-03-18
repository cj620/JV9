<!--
 * @Author: H.
 * @Date: 2021-11-09 09:25:31
 * @LastEditTime: 2022-01-20 17:15:03
 * @Description: 物料需求
-->

<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <!-- 状态标签 -->
        <BillStateTags :state="record"></BillStateTags>
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: editBill.bind(null, row),
              disabled: getActionState(row.State, 'edit'),
            },
            {
              label: $t('Generality.Ge_Delete'),
              disabled: getActionState(row.State, 'del'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.BillId]),
              },
            },
          ]"
        />
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
// 引入表格类
import { Table } from "./config";
// 引入单据状态的枚举
import { stateEnum } from "@/enum/workModule";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
export default {
  // 页面的标识
  name: "ItemsDemand",
  components: {
    // 单据状态组件
    BillStateTags,
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.formObj.form.Category = "Part";
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
        name: "De_ItemsDemand_Add",
        params: { type: "add", title: "addSaleOrder" },
      });
    },

    //编辑
    editBill(row) {
      let { BillId } = row;
      this.tableObj.api.editLock({ BillId }).then((res) => {
        this.$router.push({
          name: "De_ItemsDemand_Edit",
          query: { BillId },
        });
      });
    },
    //批量删除单据
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
  },
};
</script>
