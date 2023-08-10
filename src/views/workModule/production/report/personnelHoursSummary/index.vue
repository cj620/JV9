<!--
 * @Author: C.
 * @Date: 2022-10-17 17:15:34
-->
<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: '查看明细',
              confirm: checkDetail.bind(null, row),
            },
          ]"
        ></TableAction>
      </template>
    </JvTable>
    <JvDialog
      title="查看明细"
      :visible.sync="dialogVisible"
      width="90%"
      @confirm="dialogVisible = false"
    >
      <JvTable :table-obj="workRecordDetailTableObj"> </JvTable>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { Table, WorkRecordDetailTable } from "./config";
import TableAction from "@/jv_doc/cpn/JvTable/cpn/TableAction/index.vue";
import JvTable from "@/jv_doc/cpn/JvTable/index.vue";
export default {
  data() {
    return {
      tableObj: {},
      dialogVisible: false,
      workRecordDetailTableObj: {},
    };
  },
  created() {
    this.tableObj = new Table();
    this.workRecordDetailTableObj = new WorkRecordDetailTable();

    this.tableObj.getData();
  },
  methods: {
    checkDetail(row) {
      this.workRecordDetailTableObj.formObj.setForm({
        StartDate: this.tableObj.formObj.form.StartDate,
        EndDate: this.tableObj.formObj.form.EndDate,
        Worker: row.Worker,
      });
      this.workRecordDetailTableObj.getData();
      this.dialogVisible = true;
    },
  },
  components: { TableAction, JvTable },
};
</script>

<style scoped></style>
