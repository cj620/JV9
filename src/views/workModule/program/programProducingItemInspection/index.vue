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
      <template #IsItCompletedAsPlanned="{ record }">
        {{ record ? '是' : '否' }}
      </template>
      <template #IsSubmit="{ record }">
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
export default {
  name: "Pa_ProgramProducingTaskItemInspection",
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
}
</script>
<style lang="scss" scoped>

</style>
