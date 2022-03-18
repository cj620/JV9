<!--
 * @Author: H.
 * @Date: 2021-11-18 18:23:23
 * @LastEditTime: 2022-01-20 17:17:39
 * @Description:
-->
<!--零件生产报表-->
<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #ActualTime="{ row }">
        <span>{{ row.ActualTime.toFixed(2) }}</span>
      </template>
      <template #Overtime="{ row }">
        <span>{{ row.Overtime.toFixed(2) }}</span>
      </template>
    </JvTable>
  </PageWrapper>
</template>

<script>
import { Table } from "./config";
export default {
  data() {
    return {
      tableObj: {},
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
};
</script>

<style scoped></style>
