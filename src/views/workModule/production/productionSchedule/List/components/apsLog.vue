<!-- 排程日志弹窗 -->
<template>
  <JvDialog
      width="60%"
      :title="$t('production.Pr_APSLog')"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      :IsShowFooterBtn="false"
  >
    <JvTable :tableObj="tableObj"></JvTable>
  </JvDialog>
</template>
<script>
import { Table } from "./apsLogConfig";
export default {
  data() {
    return {
      // 表格实例
      tableObj: {},
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
};
</script>
