<!-- 排程日志弹窗 -->
<template>
  <div>
    <JvTable :table-obj="tableObj"> </JvTable>
  </div>
</template>
<script>
import { Table } from "./apsLogConfig";
export default {
  data() {
    return {
      // 表格实例
      tableObj: {},
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
};
</script>
