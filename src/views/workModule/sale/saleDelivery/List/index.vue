<!--销售发货-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- 表格操作行 -->
      <Action size="mini" slot="btn-list" :actions="getListTableBtnModel">
      </Action>
      <!-- 表格操作列按钮 -->
      <template #operation="{ row }">
        <TableAction :actions="getListTableColBtnModel(row)" />
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  name: "Sa_SaleDelivery",
  components: {
    BillStateTags,
  },
  data() {
    return {
      // 表格数据
      tableObj: {
        type: "",
        data: "",
      },
      // 编辑路由
      EditRoute: "Sa_SaleDelivery_Edit",
      // 新增路由
      AddRoute: "Sa_SaleDelivery_Add",
      IsState: false,
    };
  },
  created() {
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
        name: "Sa_SaleDelivery_Detail_list",
      });
    },
  },
};
</script>
<style lang="scss"></style>
