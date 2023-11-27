<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">

    </JvTable>
  </PageWrapper>
</template>
<script>
export default {
  name: "As_AccessoryCheckOut",
  data() {
    return {
      tableObj: {},
    }
  }
}

</script>
