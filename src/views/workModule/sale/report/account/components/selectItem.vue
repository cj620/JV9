<!--选择发货和退货的明细-->
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
        <el-form-item label="客户">
          <el-select
            v-model="form.CustomerName"
            clearable
            filterable
            style="width: 100%"
          >
            <el-option
              v-for="item in CustomerData"
              :key="item.ShortName"
              :label="item.ShortName"
              :value="item.ShortName"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" label-width="20px">
          <el-checkbox v-model="form.IsNotChecked">{{
            $t("purchase.Pr_Unreconciled")
          }}</el-checkbox>
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
import { Table } from "./selectItemTableConfig";
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
        BillId: "",
        CustomerName: "",
        DateType: 0,
        IsNotChecked: true,
        StartDate: "",
        EndDate: "",
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
    this.form.CustomerName = this.CustomerName;
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
      let IsRepeat = false;
      let repeatMateria = "";
      if (this.multipleSelection.length > 0) {
        if (this.transferData.length > 0) {
          this.multipleSelection.forEach((item) => {
            this.transferData.forEach((Titem) => {
              if (item.Id === Titem.AssociatedNo) {
                IsRepeat = true;
                repeatMateria = item.ItemName;
              }
            });
          });
          if (IsRepeat) {
            this.$message({
              type: "warning",
              message:
                this.$t("Generality.Ge_IsDuplicate") + repeatMateria + " 重复!",
            });
          } else {
            this.$emit("confirmData", this.multipleSelection);
          }
        } else {
          this.$emit("confirmData", this.multipleSelection);
        }
      } else {
        this.$message({
          type: "warning",
          message: this.$t("Generality.Ge_CheckDetails"),
        });
      }
    },
    handleSelectionChange(e) {
      console.log(e, "9955885");
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
