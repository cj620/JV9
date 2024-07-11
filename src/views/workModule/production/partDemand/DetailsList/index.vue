<!--
 * @Author: C.
 * @Date: 2022-02-22 16:12:01
 * @LastEditTime: 2024-07-11 15:17:39
 * @Description: file content
-->
<!-- 销售订单 明细 页面-->
<template>
  <PageWrapper :footer="false">
    <!-- 销售订单 明细表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj"> </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
export default {
  // 页面的标识
  name: "Pr_PartProductionDemand_Detail_list",
  components: {
    // 单据状态组件
    BillStateTags,
  },
  props: {},
  data() {
    return {
      // 表格实例
      tableObj: {},
      // 编辑路由
      EditRoute: "",
      // 新增路由
      AddRoute: "",
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
};
</script>
