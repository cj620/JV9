<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #TaskType="{ record }">
        <!-- 状态标签 -->
        {{ taskTypeEnum[record] ? taskTypeEnum[record].name : "--" }}
      </template>
      <template #Progress="{ row }">
        <el-progress
          :text-inside="true"
          :stroke-width="14"
          :percentage="row.Progress"
        ></el-progress>
      </template>
      <template #IsItCompletedAsPlanned="{ record }">
        {{ record ? $t('Generality.Ge_Yes') : $t('Generality.Ge_No') }}
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config"
import { taskTypeEnum } from "@/enum/workModule";
export default {
  name: "Se_MyTaskReport",
  data() {
    return {
      tableObj: {},
      taskTypeEnum,
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.UserName = this.$store.getters.name;
    this.tableObj.getData();
  },
  methods: {

  }
}
</script>
<style scoped lang="scss">

</style>
