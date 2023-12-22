<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #MemberState="{ record }">
        <!-- 成员状态标签 -->
        <RepairStateTags :state="record" :enum="spotCheckListStateEnum"></RepairStateTags>
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>

import { Table } from "./config";
import RepairStateTags from "@/views/workModule/equipment/repair/components/RepairStateTags.vue";
import { spotCheckListStateEnum } from '@/enum/workModule'
export default {
  name: "As_DeviceSpotCheckRecord",
  components: {RepairStateTags},
  data() {
    return {
      tableObj: {}
    }
  },
  computed: {
    spotCheckListStateEnum() {
      return spotCheckListStateEnum
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData()
  },
}
</script>
