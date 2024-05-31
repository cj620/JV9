<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- 状态标签 -->
      <template #ItemState="{ record }">
        <TaskState :state="record"></TaskState>
      </template>
      <template #ItemPlanEnd="{ record }">
        <span style="color: red; font-weight: bold">
          {{ timeFormat(record, "yyyy-MM-dd") }}
        </span>
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { timeFormat } from "@/jv_doc/utils/time";
import TaskState from "@/components/JVInternal/TaskState/index.vue";

export default {
  name: "As_AssyDelayedTasks",
  components: {TaskState},
  data() {
    return {
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.ProcessType = "assy";
    this.tableObj.getData();
  },
  methods: {
    timeFormat
  }
}
</script>
<style scoped lang="scss">

</style>
