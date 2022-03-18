<!--
 * @Author: your name
 * @Date: 2021-11-01 09:26:46
 * @LastEditTime: 2022-01-20 17:20:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\views\workModule\sale\baseData\customer\List\index.vue
-->
<!--客户-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable
      ref="BillTable"
      :table-obj="tableObj"
      @selectionChange="handleSelectionChange"
    >
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row.CustomerId),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteCustomer.bind(null, row.CustomerId),
              },
            },
          ]"
        />
      </template>

      <Action slot="btn-list" max="10">
        <el-button size="mini" @click="add">
          {{ $t("Generality.Ge_New") }}
        </el-button>
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { deleteSalesCustomer } from "@/api/workApi/sale/customer";
export default {
  data() {
    return {
      // 表格数据
      tableObj: {
        type: "",
        data: "",
      },
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    handleSelectionChange(id) {
      console.log(keys, 111);
    },

    // 删除客户
    deleteCustomer(id) {
      deleteSalesCustomer([id]).then(() => {
        this.tableObj.getData();
      });
    },

    // 编辑客户
    edit(id) {
      this.$router.push({
        name: "Sa_Customer_Edit",
        query: { type: "add", title: "editCustomer", isAdd: false, id },
      });
    },

    // 新建客户
    add() {
      this.$router.push({
        name: "Sa_Customer_Add",
        query: { type: "add", title: "addCustomer", isAdd: true },
      });
    },
  },
};
</script>
<style lang="scss"></style>
