<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #AchievementRate="{ row }">
        {{ row.AchievementRate }}%
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
export default {
  name: "Pa_ProgramPlanAchievementRate",
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
<style lang="scss" scoped>
::v-deep {
  .table-wrapper {
    height: calc(100% - 45px) !important;
  }
  .jv-table-style .table-wrapper {
    padding: 0 10px 10px 10px !important;
  }
}
</style>
