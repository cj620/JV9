<!--委外零件-->
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
      <el-form
        ref="form"
        class="customize-ruleForm-dialog-form"
        size="mini"
        :model="form"
        label-width="80px"
      >
        <el-form-item :label="$t('Generality.Ge_KeyWords')">
          <el-input v-model="form.Keyword"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_Type')">
          <el-select v-model="form.BOMType">
            <el-option
              :label="$t('Generality.Ge_Part')"
              value="Part"
            ></el-option>
            <el-option
              :label="$t('Generality.Ge_Electrode')"
              value="Electrode"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" label-width="20px">
          <el-button type="primary" size="mini" @click="searchForm">{{
            $t("Generality.Ge_Search")
          }}</el-button>
        </el-form-item>
      </el-form>
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
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
import { checkPurchaseOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";

import { Table } from "./selectBomListTableConfig";
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
      form: {
        Keyword: "",
        BOMType: "Part",
      },
    };
  },
  props: {
    CustomerName: {
      type: String,
      default: () => "",
    },
    transferData: {
      type: Array,
      default: () => [],
    },
  },

  created() {

    this.tableObj = new Table();
    this.tableObj.formObj.form = Object.assign(
      {},
      this.tableObj.formObj.form,
      this.form
    );

    this.tableObj.getData();
    this.Configuration();
  },
  methods: {
    //获取客户
    async Configuration() {
      await getAllSalesCustomer({}).then((res) => {
        this.CustomerData = res.Items;
      });
    },
    //确定明细
    confirmItem() {
      if (this.multipleSelection.length > 0) {
        let arr = [];
        this.multipleSelection.forEach((item) => {
          let str = {};
          str.KeyId = item.PartNo;
          str.Remarks = "";
          str.Quantity = 1;
          arr.push(str);
        });
        checkPurchaseOutsourcingrRequirement({
          Category: "Part",
          Items: arr,
        }).then((res) => {

          if (res.Items.length > 0) {

            const arr1 = res.Items.map((x) => x.PartName);
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
            this.$emit("confirmOutsourcingPartData", this.multipleSelection);
          }
        });
      } else {
        this.$message.warning(this.$t("Generality.Ge_ChoosePart"));
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
