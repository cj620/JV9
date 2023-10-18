<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <template #Schedule="{ record }">
        <el-progress :percentage="record"></el-progress>
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./reportRecordConfig"
export default {
  name: "Pa_ProgramProducingTaskReportRecord",
  data(){
    return {
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  }
}
</script>
