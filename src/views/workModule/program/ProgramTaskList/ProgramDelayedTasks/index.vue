<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- 状态标签 -->
      <template #ItemState="{ record }">
        <TaskState :state="record"></TaskState>
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import TaskState from "@/components/JVInternal/TaskState/index.vue";

export default {
  name: "Pa_ProgramDelayedTasks",
  components: {TaskState},
  data() {
    return {
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.ProcessType = "program";
    this.tableObj.getData();
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">

</style>
