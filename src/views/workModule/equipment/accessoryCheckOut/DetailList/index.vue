<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj"> </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import BillStateTags from "@/components/WorkModule/BillStateTags";
export default {
  // 页面的标识
  name: "As_AccessoryCheckOutDetailList",
  components: {
    BillStateTags,
  },
  props: {},
  data() {
    return {
      tableObj: {},
      EditRoute: "",
      AddRoute: "",
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
};
</script>
