<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #ItemState="{ record }">
        {{ stateMap[record].name }}
      </template>
      <template #TaskType="{ record }">
        <!-- 状态标签 -->
        {{ taskTypeEnum[record].name }}
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('testTooling.Tt_StartTrial'),
              confirm: startTrial.bind(null, row),
              disabled: row.ItemState !== 'NotStarted',
            },
          ]"
        />
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { taskStateEnum, taskTypeEnum } from "@/enum/workModule";

export default {
  name: "Tt_TestToolingPlan",
  data() {
    return {
      taskTypeEnum,
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.States = ["Approved", "Completed"];
    this.tableObj.getData();
  },
  computed: {
    stateMap() {
      return taskStateEnum;
    },
  },
  methods: {
    startTrial(row) {
      this.$router.push({
        name: "Tt_TestToolingTask_Add",
        query: row,
      })
    }
  }
}
</script>
<style scoped lang="scss">

</style>
