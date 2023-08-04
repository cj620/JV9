<template>
  <div>
    <!-- 表格 -->
    <JvTable ref="BillTable" class="wrapper" :table-obj="tableObj"> </JvTable>
  </div>
</template>
<script>
// 引入表格类
import { Table } from "./resultConfig";
export default {
  // 页面的标识
  name: "Pr_ConventionalAlgorithm",
  data() {
    return {
      // 表格实例
      tableObj: {},
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData({ Keyword: "", AlgorithmType: 0 });
  },
  methods: {},
};
</script>
<style scoped></style>
