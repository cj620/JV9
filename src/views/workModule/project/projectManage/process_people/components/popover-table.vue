<template>
  <JvTable :table-obj="tableObj"> </JvTable>
</template>

<script>
import { Table } from "@/jv_doc/class/table";
import { tableConfig } from '../config'
export default {
  name: "popover-table",
  props: {
    item: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      tableObj: {},
    };
  },
  created() {
    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
    });
    this.tableObj.setData(this.item.ProjectTaskLogs);
  },
  watch: {
    item(val) {
      this.tableObj.setData(this.item.ProjectTaskLogs);
    }
  }
}
</script>

<style scoped lang="scss">

</style>
