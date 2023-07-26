<!--
 * @Author: H.
 * @Date: 2021-11-09 09:42:54
 * @LastEditTime: 2022-08-10 17:17:13
 * @Description: 采购订单
-->

<template>
  <PageWrapper :footer="false">
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
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { Table } from "./config";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  name: "Pu_Requisition",
  data() {
    return {
      tableObj: {},
      // 编辑路由
      EditRoute: "Pu_Requisition_Edit",
      AddRoute: "Pu_Requisition_Add",
      editRouteName: "Pu_Requisition_Edit",
      addRouteName: "Pu_Requisition_Add",
    };
  },
  methods: {
    toDetailsList() {
      this.$router.push({
        name: "Pu_Requisition_Detail_list",
      });
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  mounted() {},
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
  components: {
    BillStateTags,
  },
};
</script>

<style lang="scss" scoped></style>
