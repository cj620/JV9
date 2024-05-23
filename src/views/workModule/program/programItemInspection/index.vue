<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          // 点检
          {
            label: $t('device.De_SpotCheck'),
            confirm: batchSpotCheck.bind(null, ''),
          },
          // 延期
          {
            label: '延期',
            confirm: delay.bind(null, ''),
          }
        ]"
      >
      </Action>
      <template #ItemState="{ record }">
        <TaskState :state="record"></TaskState>
      </template>
      <template #IsItCompletedAsPlanned="{ record }">
        {{ record ? '是' : '否' }}
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
            },
            {
              label: $t('device.De_SpotCheck'),
              confirm: spotCheck.bind(null, row),
            },
          ]"
        />
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import TaskState from "@/components/JVInternal/TaskState/index.vue";
export default {
  name: "Pa_ProgramTaskItemInspection",
  components: { TaskState },
  data() {
    return {
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    edit() {

    },
    spotCheck() {

    },
    batchSpotCheck() {

    },
    delay() {

    },
  },
  watch: {
    "tableObj.formObj.form.StartDate": {
      handler(n,o) {
        this.tableObj.formObj.form.EndDate = n;
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
