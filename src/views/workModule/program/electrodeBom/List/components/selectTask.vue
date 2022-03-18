<!--
 * @Author: H.
 * @Date: 2021-11-30 13:11:26
 * @LastEditTime: 2022-01-14 14:19:20
 * @Description:
-->
<!--选择任务弹窗-->
<template>
  <div>
    <jv-dialog
      :title="$t('Generality.Ge_SelectTask')"
      width="40%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmTask"
    >
      <!-- 表格 -->
      <JvTable
        ref="BillTable"
        :table-obj="tableObj"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
      </JvTable>
    </jv-dialog>
  </div>
</template>

<script>
import { Table } from "@/jv_doc/class/table";
export default {
  name: "selectTask",
  data() {
    return {
      tableObj: {},
      selectData: [],
    };
  },
  props: {
    taskData: {
      type: Array,
      default: () => [],
    },
  },
  created() {
    this.tableObj = new Table({
      tableSchema: [
        /*任务*/
        {
          prop: "BillId",
          label: this.$t("Generality.Ge_BillId"),
        },
        {
          prop: "TaskType",
          label: this.$t("Generality.Ge_DocumentType"),
        },
      ],
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 250,
    });
    (this.taskData, "222222");
    this.tableObj.setData(this.taskData);
  },
  methods: {
    confirmTask() {
      if (this.selectData.length > 0) {
        this.$emit("confirmTask", this.selectData);
      } else {
        this.$message.warning(this.$t("Generality.Ge_PleaseSelectTask"));
      }
    },
    handleCurrentChange(val) {
      (val);
      this.selectData = [val];
    },
  },
};
</script>

<style scoped></style>
