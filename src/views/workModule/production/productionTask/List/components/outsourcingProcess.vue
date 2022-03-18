<!--委外工序-->
<template>
  <div>
    <jv-dialog
      :title="$t('Generality.Ge_SelectTheDetails')"
      width="90%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmItem"
    >
      <!-- 表格 -->
      <JvTable
        ref="BillTable"
        :table-obj="tableObj"
        @selectionChange="handleSelectionChange"
      >
        <template #BillType="{ row }">
          {{ BillTypeEnum[row.BillType].name }}
        </template>
      </JvTable>
    </jv-dialog>
  </div>
</template>

<script>
import { getProductionTask } from "@/api/workApi/production/productionTask";
import { checkPurchaseOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";

import { Table } from "./selectTable";
export default {
  name: "selectItem",
  data() {
    return {
      tableObj: {},
      formObj: {},
      ruleForm: {},
      CustomerData: [],
      multipleSelection: [],
      BillTypeEnum: {
        0: {
          name: i18n.t("menu.Sa_SaleDelivery"),
        },
        1: {
          name: i18n.t("menu.Sa_SaleReturn"),
        },
      },
    };
  },
  props: {
    transferData: {
      type: String,
      default: () => "",
    },
  },

  created() {

    this.tableObj = new Table();

    this.GetData();
  },
  methods: {
    GetData() {
      getProductionTask({ BillId: this.transferData }).then((res) => {

        let arr = [];
        res.Process.forEach((item) => {
          if (item.State === "ToBeReceived") {
            item.ToolingNo = res.ToolingNo;
            item.PartNo = res.PartNo;
            item.PartName = res.PartName;
            arr.push(item);
          }
        });
        this.tableObj.setData(arr);
      });
    },
    //确定明细
    confirmItem() {
      if (this.multipleSelection.length > 0) {
        let arr = [];
        this.multipleSelection.forEach((item) => {
          let str = {};
          str.KeyId = item.Id;
          str.Remarks = "";
          str.Quantity = 1;
          arr.push(str);
        });
        checkPurchaseOutsourcingrRequirement({
          Category: "Process",
          Items: arr,
        }).then((res) => {
          if (res.Items.length > 0) {
            console.log(res.Items);
            const arr1 = res.Items.map((x) => x.Process);
            this.$confirm(
              arr1.toString() + this.$t("Generality.Ge_ContinueOrNot"),
              {
                confirmButtonText: this.$t("Generality.Ge_OK"),
                cancelButtonText: this.$t("Generality.Ge_Cancel"),
                type: "warning",
              }
            ).then(() => {
              this.$emit("confirmOutsourcingPartData", this.multipleSelection);
            });
          } else {
            this.$emit("confirmOutsourcingProcessData", this.multipleSelection);
          }
        });
      } else {
        this.$message.warning(this.$t("Generality.Ge_AddProcess"));
      }
    },

    handleSelectionChange(e) {
      console.log(e);
      this.multipleSelection = e;
    },
    //搜索表格
    searchForm() {
      this.tableObj.formObj.form = Object.assign(
        {},
        this.tableObj.formObj.form,
        this.form
      );
      this.tableObj.getData();
    },
  },
};
</script>

<style scoped>
.customize-ruleForm-dialog-form {
  display: flex;
}
</style>
