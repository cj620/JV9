<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <BillStateTags :state="record"></BillStateTags>
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import BillStateTags from "@/components/WorkModule/BillStateTags/index.vue";
import { Table } from "./config";

export default {
  name: "Pa_ElectrodeDemand_Details_list",
  components: { BillStateTags },
  data() {
    return {
      tableObj: {},
    }
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData({ Category: 1 });
  },
}
</script>
