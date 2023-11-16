<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_New'),
            confirm: add,
          },
          {
            label: $t('Generality.Ge_Delete'),
            disabled: canIsDel,
            popConfirm: {
              title: $t('Generality.Ge_DeleteConfirm'),
              confirm: delBills,
            },
          }
        ]"
      >
      </Action>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null,row)
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.BillId]),
              },
            },
          ]"
        />
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
export default {
  name: "As_MaintenancePlan",
  data() {
    return {
      tableObj: {},
      editRouterName: "As_MaintenancePlan_Edit",
      addRouterName: "As_MaintenancePlan_Add",
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData()
  },
  computed: {
    // 批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Disable"].includes(item.State);
      });
    },
  },
  methods: {
    // 新增
    add() {
      this.$router.push({
        name: this.addRouterName,
      });
    },
    // 编辑
    edit(row) {
      console.log(row.BillId)
      this.$router.push({
        name: this.editRouterName,
        query: { BillId: row.BillId },
      });
    },
    // 删除
    deleteOrder(ids) {
      this.tableObj.api.del({ BillIds: ids }).then((_) => {
        this.tableObj.getData();
      });
    },
    //批量删除单据
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
  }
}

</script>
