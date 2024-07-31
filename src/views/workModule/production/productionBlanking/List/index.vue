<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: '下料',
              disabled: row.State == 'BlankingCompleted',
              popConfirm: {
                title: '是否下料？',
                confirm: changeProjectBlankingState.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { project_blanking_state_change } from "@/api/workApi/production/productionBlanking";
export default {
  // 页面的标识
  name: "Pr_Blanking",
  components: {
    // 单据状态组件
    BillStateTags,
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      IsState: false,
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    async changeProjectBlankingState(row) {
      await project_blanking_state_change({
        Id: row.Id,
        State: "BlankingCompleted",
        TaskProcessId: row.TaskProcessId,
      });
      this.tableObj.getData();
    },
  },
};
</script>
