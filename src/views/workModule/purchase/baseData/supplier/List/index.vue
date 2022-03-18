<!--
 * @Author: your name
 * @Date: 2021-11-01 09:26:46
 * @LastEditTime: 2022-01-20 17:19:47
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
              confirm: edit.bind(null, row.SupplierId),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteSupplier.bind(null, row.SupplierId),
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
import { deleteSupplier } from "@/api/workApi/purchase/supplier";
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
    deleteSupplier(id) {
      deleteSupplier([id]).then(() => {
        this.tableObj.getData();
      });
    },

    // 编辑客户
    edit(SupplierId) {
      this.$router.push({
        name: "Pu_Supplier_Edit",
        query: { type: "add", title: "editSupplier", isAdd: false, SupplierId },
      });
    },

    // 新建客户
    add() {
      this.$router.push({
        name: "Pu_Supplier_Add",
        query: { type: "add", title: "addSupplier", isAdd: true },
      });
    },
  },
};
</script>
<style lang="scss"></style>
