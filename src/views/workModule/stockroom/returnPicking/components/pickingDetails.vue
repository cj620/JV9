<!--？领料明细-->
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
          <el-input v-model="form.BillId"></el-input>
        </el-form-item>
        <el-form-item :label="$t('Generality.Ge_ItemId')">
          <el-input v-model="form.Keyword"></el-input>
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
      </JvTable>
    </jv-dialog>
  </div>
</template>

<script>
import { Table } from "./selectPickingDetailsTableConfig";
export default {
  name: "materialRequirements",
  data() {
    return {
      tableObj: {},
      formObj: {},
      ruleForm: {},
      CustomerData: [],
      multipleSelection: [],

      form: {
        BillId: "",
        Keyword: "",
        State: "Approved",
        StartDate: "",
        EndDate: "",
      },
    };
  },
  props: {
    detailedData: {
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
    this.tableObj.formObj.form = Object.assign(
      {},
      this.tableObj.formObj.form,
      this.form
    );

    this.tableObj.getData();
  },
  methods: {
    //确定明细
    confirmItem() {
      let IsRepeat = false;
      let repeatMateria = "";
      if (this.multipleSelection.length > 0) {
        if (this.detailedData.length > 0) {
          this.multipleSelection.forEach((item) => {
            this.detailedData.forEach((Titem) => {
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
            this.$emit("demandConfirmData", this.multipleSelection);
          }
        } else {
          this.$emit("demandConfirmData", this.multipleSelection);
        }
      } else {
        this.$message({
          type: "warning",
          message: this.$t("Generality.Ge_CheckDetails"),
        });
      }
    },
    handleSelectionChange(e) {
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
