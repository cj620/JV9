<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <!--表格操作行-->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
            // 删除
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
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.Id]),
              },
            },
          ]"
        />
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
import { deleteRCVRecord } from "@/api/workApi/production/baseData"
export default {
  name: "ProductionFitterReceiveRecord",
  data() {
    return {
      tableObj: {},
    }
  },
  computed: {
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys)
      this.$refs.BillTable.clearSelection();
    },
    deleteOrder(Ids) {
      deleteRCVRecord({ BillIds: Ids }).then(() => {
        this.tableObj.getData();
      })
    }
  },
}

</script>
