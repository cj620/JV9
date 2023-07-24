<!--销售发货-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <BillStateTags :state="record"></BillStateTags>
      </template>
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
import { stateEnum } from "@/enum/workModule";
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
      stateEnum,
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
    copy(row) {
      console.log(row);
      this.$router.push({
        name: "Sa_SaleDelivery_Add",
        query: { BillId: row.BillId, type: "copy" },
      });
    },
    toDetailsList() {
      this.$router.push({
        name: "Sa_SaleDelivery_Detail_list",
      });
    },
    //删除单据
    deleteOrder(id) {
      this.tableObj.api.del({ BillIds: id }).then((data) => {
        this.tableObj.getData();
        console.log("110", data);
      });
    },
    //批量删除单据
    del() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
  },
};
</script>
<style lang="scss"></style>
