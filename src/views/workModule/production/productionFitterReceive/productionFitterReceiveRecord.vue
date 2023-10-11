<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj"> </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
export default {
  name: "ProductionFitterReceiveRecord",
  data() {
    return {
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
}

</script>
