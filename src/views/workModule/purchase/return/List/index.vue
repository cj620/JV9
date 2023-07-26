<!--
 * @Author: H.
 * @Date: 2021-11-09 09:47:32
 * @LastEditTime: 2022-08-10 17:18:25
 * @Description: 采购退货
-->

<template>
  <PageWrapper :footer="false">
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
import { Table } from "./config";
import { API } from "@/api/workApi/purchase/return";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  name: "Pu_Return",
  data() {
    // return {
    //   stateEnum,
    //   // 表格数据
    //   tableObj: {
    //     type: "",
    //     data: "",
    //   },
    //   transferData: {
    //     type: "",
    //     data: "",
    //   },
    //   form: {
    //     SortColumn: "ItemType",
    //     SortOrder: 4,
    //   },
    //   auditForm: {
    //     Remarks: "",
    //     BizFormId: "",
    //     AuditResult: "",
    //   },
    //   remarkShow: false,
    //   dialogFormVisible: false,
    //   chooseList: [],
    // };
    return {
      tableObj: {},
      // 编辑路由
      EditRoute: "Pu_Return_Edit",
      AddRoute: "Pu_Return_Add",
    };
  },
  methods: {
    toDetailsList() {
      this.$router.push({
        name: "Pu_Return_Detail_list",
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
