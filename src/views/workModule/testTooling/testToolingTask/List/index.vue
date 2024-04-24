<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <!-- 状态标签 -->
        <BillStateTags :state="record"></BillStateTags>
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { Table } from "./config"
export default {
  name: "TestToolingTask",
  components: { BillStateTags },
  data() {
    return {
      tableObj: {}
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.TaskType = 'TrialTooling';
    this.tableObj.getData();
  },

}

</script>
<style scoped lang="scss">

</style>
