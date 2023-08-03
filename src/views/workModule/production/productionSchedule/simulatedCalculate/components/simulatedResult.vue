<template>
  <PageWrapper :footer="false" class="pageWrapper">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction :actions="getListTableColBtnModel(row)" />
      </template>
      <!-- 表格操作行 -->
      <Action size="mini" slot="btn-list" :actions="getListTableBtnModel">
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  // 页面的标识
  name: "Sa_SaleOrder",
  components: {
    // 单据状态组件
    BillStateTags,
  },
  data() {
    return {
      // 表格实例
      tableObj: {
        type: "",
        data: "",
      },
      // 编辑路由
      EditRoute: "Sa_SaleOrder_Edit",
      // 新增路由
      AddRoute: "Sa_SaleOrder_Add",
      IsState: false,
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  computed: {
    // 表格操作模块
    getListTableBtnModel() {
      return [
        ...listTableBtnModel(this),
        {
          label: i18n.t("project.Pro_CheckDetails"),
          confirm: this.toDetailsList,
        },
      ];
    },
    // 表格操作列按钮
    getListTableColBtnModel() {
      return (row) => {
        return listTableColBtnModel(this, row);
      };
    },
  },
  methods: {
    // 跳转至明细
    toDetailsList() {
      this.$router.push({
        name: "Sa_SaleOrder_Detail_list",
      });
    },
  },
};
</script>
<style scoped>
.table-header {
  padding: 0 10px;
}
</style>
