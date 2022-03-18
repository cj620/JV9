<!--
 * @Author: H.
 * @Date: 2021-12-31 10:04:21
 * @LastEditTime: 2022-01-20 17:13:50
 * @Description:
-->
<!--  页面-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <template #LogType="{ row }">
        {{ LoginTypeEnum[row.LogType] }}
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";

export default {
  props: {},
  data() {
    return {
      // 表格实例
      tableObj: {},
      LoginTypeEnum: {
        0: this.$t("login.l_LogIn"),
        4: this.$t("Generality.Ge_Edit"),
        8: this.$t("Generality.Ge_Delete"),
      },
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  computed: {},
  watch: {
    "tableObj.formObj.form.StartDate": {
      handler(newV) {
        this.tableObj.formObj.form.EndDate = newV;
      },
    },
  },
};
</script>
