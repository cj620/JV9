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
      <template #DelayDates="{ row }">
        <span style="color: red; font-weight: bold">
          {{ getDelayDates(row.ItemPlanEnd, new Date()) }}
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
  name: "Tt_TestToolingDelayedTasks",
  components: {TaskState},
  data() {
    return {
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.ProcessType = "trialTooling";
    this.tableObj.getData();
  },
  methods: {
    timeFormat,
    getDelayDates(f, n) {
      const timeDiff = new Date().getTime() - new Date(f).getTime();
      return (timeDiff / (1000 * 3600 * 24)).toFixed(1);
    }
  }
}
</script>
<style scoped lang="scss">

</style>
