<template>
  <div>
    <!-- 表格 -->
    <JvTable class="wrapper" :table-obj="tableObj"> </JvTable>
  </div>
</template>
<script>
// 引入表格类
import { Table } from "./resultConfig";
export default {
  // 页面的标识
  name: "",
  props: {
    params: {
      type: Object,
      default() {
        return null;
      },
    },
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
  },
  watch: {
    params() {
      console.log("this.params::: ", this.params);
      this.tableObj.getData(this.params);
    },
  },
  methods: {},
};
</script>
<style scoped></style>
