<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">

    </JvTable>
  </PageWrapper>
</template>

<script>
import { Table } from "./config"
import BillStateTags from "@/components/WorkModule/BillStateTags";
export default {
  name: "As_AccessoryCheckOut",
  components: {
    BillStateTags,
  },
  data() {
    return {
      tableObj: {},
    }
  },
  created() {
    this.tableObj = new Table()
    this.tableObj.getData()
  }
}

</script>
