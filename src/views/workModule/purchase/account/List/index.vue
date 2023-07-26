<!--
 * @Author: H.
 * @Date: 2021-11-17
 * @LastEditTime: 2022-01-20 17:19:39
 * @Description: 采购对账
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
import { API } from "@/api/workApi/purchase/account";
import { Table } from "./config";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";

export default {
  name: "Pu_Account",
  data() {
    return {
      tableObj: {},
      EditRoute: "Pu_Account_Edit",
      AddRoute: "Pu_Account_Add",
    };
  },
  methods: {},
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  mounted() {},
  computed: {
    // 表格操作模块
    getListTableBtnModel() {
      return listTableBtnModel(this);
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
