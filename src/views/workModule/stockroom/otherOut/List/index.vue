<!--
 * @Author: H.
 * @Date: 2021-11-09 13:07:58
 * @LastEditTime: 2022-01-20 17:22:01
 * @Description: 其它出库
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
import { stateEnum } from "@/enum/workModule";
import BillStateTags from "@/components/WorkModule/BillStateTags";
import {
  listTableBtnModel,
  listTableColBtnModel,
} from "@/jv_doc/utils/system/pagePlugin";
export default {
  name: "OtherOut",
  components: {
    BillStateTags,
  },
  data() {
    return {
      stateEnum,
      // 表格数据
      tableObj: {
        type: "",
        data: "",
      },
      transferData: {
        type: "",
        data: "",
      },
      form: {
        SortColumn: "ItemType",
        SortOrder: 4,
      },
      auditForm: {
        Remarks: "",
        BizFormId: "",
        AuditResult: "",
      },
      remarkShow: false,
      IsState: false,
      dialogFormVisible: false,
      chooseList: [],
      // 编辑路由
      EditRoute: "St_OtherOut_Edit",
      // 新增路由
      AddRoute: "St_OtherOut_Add",
    };
  },
  created() {
    this.tableObj = new Table();

    this.tableObj.getData();
  },
  computed: {
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Rejected", "Unsubmitted"].includes(item.State);
      });
    },
    // 获取按钮状态
    getActionState() {
      return (state, type) => {
        return !stateEnum[state]?.operation?.[type];
      };
    },
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
    toDetailsList() {
      this.$router.push({
        name: "St_OtherOut_Detail_list",
      });
    },
  },
};
</script>
<style lang="scss"></style>
