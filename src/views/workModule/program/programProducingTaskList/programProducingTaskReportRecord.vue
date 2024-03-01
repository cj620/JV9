<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <template #Progress="{ record }">
        <el-progress :percentage="record"></el-progress>
      </template>
      <template #TaskType="{ record }">
        {{ taskTypeEnum[record].name }}
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./reportRecordConfig"
import { taskTypeEnum } from "@/enum/workModule";
export default {
  name: "Pa_ProgramProducingTaskReportRecord",
  data(){
    return {
      taskTypeEnum,
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData({ TaskReportWorkType: "ProgramingTask" });
  }
}
</script>
