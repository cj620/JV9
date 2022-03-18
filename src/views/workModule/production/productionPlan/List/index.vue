<!--
 * @Author: H.
 * @Date: 2021-12-07 10:45:08
 * @LastEditTime: 2022-01-20 17:16:20
 * @Description:
-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <!-- 状态标签 -->
      <template #State="{ record }">{{ record }} </template>
      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('production.Pr_CheckSchedule'),
            confirm: checkProgress.bind(),
          },
          {
            label: $t('production.Pr_CheckLoad'),
            confirm: checkLoad.bind(),
          },
        ]"
      />
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
export default {
  // 页面的标识
  name: "",
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
  methods: {
    checkProgress() {
      this.$router.push({ name: "ProductionSchedule" });
    },
    checkLoad() {
      this.$router.push({ name: "ProductionLoad" });
    },
  },
};
</script>
