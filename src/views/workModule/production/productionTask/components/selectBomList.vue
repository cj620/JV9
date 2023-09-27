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
        label-width="100px"
      >
        <el-form-item :label="$t('Generality.Ge_ToolingNo')">
          <el-input v-model="form.ToolingNo" :disabled="true"></el-input>
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
import { getPartsByPartNo } from "@/api/workApi/production/productionTask";
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
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
        ToolingNo: "",
        BOMType: "Part",
		    ItemCategory: "Part",
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
    ToolingNo: {
      type: String,
      default: () => "",
    },
  },

  created() {

    this.tableObj = new Table();
    this.form.ToolingNo = this.ToolingNo;
    this.form.SortOrder = 1;
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
        if (this.transferData.length > 0) {
          var IsHas = false;
          var arr = [];
          arr = this.transferData.map((x) => x.ToolingNo);
          this.multipleSelection
            .map((x) => x.ToolingNo)
            .forEach((item) => {
              if (arr.indexOf(item) === -1) {
                IsHas = true;
              }
            });
          if (IsHas) {
            this.$message({
              type: "warning",
              message:  this.$t("Generality.Ge_CheckSameMoldDetails"),
            });
          } else {
            var IsHas1 = false;
            var arr1 = [];
            arr1 = this.transferData.map((x) => x.PartNo);
            this.multipleSelection
              .map((x) => x.PartNo)
              .forEach((item) => {
                if (arr1.indexOf(item) === 0) {
                  IsHas1 = true;
                }
              });
            if (IsHas1) {
              this.$message({
                type: "warning",
                message:  this.$t("Generality.Ge_SelectNextOne"),
              });
            } else {
              this.IsGetPartsByPartNo(this.multipleSelection);
            }
          }
        } else {
          //用来判断选中的模具是否相同
          if (
            [...new Set(this.multipleSelection.map((x) => x.ToolingNo))]
              .length > 1
          ) {
            this.$message({
              type: "warning",
              message: this.$t("Generality.Ge_CheckSameMoldDetails"),
            });
          } else {
            this.IsGetPartsByPartNo(this.multipleSelection);
          }
        }
      } else {
        this.$message({
          type: "warning",
          message: this.$t("Generality.Ge_CheckDetails"),
        });
      }
    },
    //用来判断是否开过加工单
    IsGetPartsByPartNo(e) {
      getPartsByPartNo(e.map((x) => x.PartNo)).then((res) => {
        if (res.Items.length > 0) {
          console.log(res.Items);
          this.$confirm(res.Items.toString() + this.$t("Generality.Ge_SheetIsAlreadyCreated"), {
            confirmButtonText: this.$t("Generality.Ge_OK"),
            cancelButtonText: this.$t("Generality.Ge_Cancel"),
          }).then((res) => {
            this.$emit("confirmBomData", e);
          });
        } else {
          this.$emit("confirmBomData", e);
        }
      });
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
