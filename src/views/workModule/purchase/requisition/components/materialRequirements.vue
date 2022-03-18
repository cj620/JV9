<!--/物料需求-->
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
          <el-input v-model="form.ToolingNo"></el-input>
        </el-form-item>

        <el-form-item label="" style="width: 100%" label-width="20px">
          <div class="select-details-header">
            <div>
              <el-button type="primary" size="mini" @click="searchForm">{{
                $t("Generality.Ge_Search")
              }}</el-button>
              <el-checkbox style="margin-left: 20px" v-model="checked">{{
                $t("Generality.Ge_IncludeProcessed")
              }}</el-checkbox>
            </div>
            <div>
              <el-button size="mini" type="primary" @click="Processed">
                {{ $t("Generality.Ge_MarkAsProcessed") }}
              </el-button>
              <el-button size="mini" type="primary" @click="Pending">
                {{ $t("Generality.Ge_MarkAsPending") }}</el-button
              >
            </div>
          </div>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <JvTable
        ref="BillTable"
        :table-obj="tableObj"
        @selectionChange="handleSelectionChange"
      >
        <template #Category="{ row }">
          {{ CategoryEnum[row.Category].name }}
        </template>
        <template #ItemState="{ record }">
          {{ demandStatusMap[record] && demandStatusMap[record].name }}
        </template>
      </JvTable>
    </jv-dialog>
  </div>
</template>

<script>
import { Table } from "./tableConfig";
import { demandStatusEnum } from "@/enum/workModule";
import { designMaterialRequirementUpdateItemState } from "@/api/workApi/design/materialRequirement";

export default {
  name: "materialRequirements",
  data() {
    return {
      tableObj: {},
      formObj: {},
      ruleForm: {},
      CustomerData: [],
      checked: false,
      multipleSelection: [],
      CategoryEnum: {
        Part: {
          name: this.$t("Generality.Ge_Part"),
        },
        Electrode: {
          name: this.$t("Generality.Ge_Electrode"),
        },
      },
      form: {
        Category: "",
        Keyword: "",
        ToolingNo: "",
        State: "Approved",
        ItemState: "",
        ItemStates: ["Pending"],
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
  computed: {
    demandStatusMap() {
      return demandStatusEnum;
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
            this.$emit("confirmDetails", this.multipleSelection);
          }
        } else {
          this.$emit("confirmDetails", this.multipleSelection);
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
    //已处理
    Processed() {
      if (this.multipleSelection.length > 0) {
        const str = {
          Ids: this.multipleSelection.map((x) => x.Id),
          State: "Processed",
        };
        designMaterialRequirementUpdateItemState(str).then((res) => {
          this.tableObj.getData();
        });
      } else {
        this.$message({
          type: "warning",
          message: this.$t("Generality.Ge_CheckDetails"),
        });
      }
    },
    //待处理
    Pending() {
      console.log(55);
      if (this.multipleSelection.length > 0) {
        const str = {
          Ids: this.multipleSelection.map((x) => x.Id),
          State: "Pending",
        };
        designMaterialRequirementUpdateItemState(str).then((res) => {
          this.tableObj.getData();
        });
      } else {
        this.$message({
          type: "warning",
          message: this.$t("Generality.Ge_CheckDetails"),
        });
      }
    },
    //搜索表格
    searchForm() {
      this.checked
        ? (this.form.ItemStates = ["Processed", "Pending"])
        : ["Pending"];
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
.select-details-header {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
