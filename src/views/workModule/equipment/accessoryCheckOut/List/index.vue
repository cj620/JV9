<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction :actions="getListTableColBtnModel(row)" />
      </template>
      <!-- 表格操作行 -->
      <Action slot="btn-list" :actions="getListTableBtnModel" size="mini">
      </Action>
    </JvTable>
  </PageWrapper>
</template>

<script>
import { Table } from "./config"
import BillStateTags from "@/components/WorkModule/BillStateTags";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";

export default {
  name: "As_AccessoryCheckOut",
  components: {
    BillStateTags,
  },
  data() {
    return {
      tableObj: {},
      // 编辑路由
      EditRoute: "As_AccessoryCheckOutEdit",
      // 新增路由
      AddRoute: "As_AccessoryCheckOutAdd",
    }
  },
  created() {
    this.tableObj = new Table()
    this.tableObj.getData()
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
        name: "As_AccessoryCheckOutDetailList",
      });
    },
  }
}
</script>
