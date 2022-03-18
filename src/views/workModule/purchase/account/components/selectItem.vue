<!--
 * @Author: H.
 * @Date: 2021-12-09 11:25:47
 * @LastEditTime: 2022-01-17 10:33:20
 * @Description:
-->
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
        <el-form-item :label="$t('purchase.Pu_Supplier')">
          <el-select
            v-model="form.SupplierName"
            clearable
            filterable
            @change="searchForm"
            style="width: 100%"
          >
            <el-option
              v-for="item in SupplierData"
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
      <JvTable ref="BillTable" :table-obj="tableObj">
        <template #BillType="{ row }">
          {{ BillTypeEnum[row.BillType].name }}
        </template>
      </JvTable>
    </jv-dialog>
  </div>
</template>

<script>
import { getAllSupplier } from "@/api/workApi/purchase/supplier";

export default {
  props: {
    SupplierName: {
      type: String,
      default: () => "",
    },
    transferData: {
      type: Array,
      default: () => [],
    },
    tableConfig: {
      type: Function,
      require: true,
    },
  },
  data() {
    return {
      form: {
        BillId: "",
        SupplierName: "",
        DateType: 0,
        IsNotChecked: true,
        StartDate: "",
        EndDate: "",
      },
      SupplierData: [],
      tableObj: {},
      BillTypeEnum: {
        0: {
          name: i18n.t("menu.Pu_StockIn"),
        },
        1: {
          name: i18n.t("menu.Pu_Return"),
        },
      },
    };
  },
  methods: {
    //获取供应商
    async Configuration() {
      await getAllSupplier({}).then((res) => {
        this.SupplierData = res.Items;
      });
    },
    confirmItem() {
      const { datas } = this.tableObj.selectData;
      let IsRepeat = false;
      let repeatMateria = "";
      if (datas.length > 0) {
        if (this.transferData.length > 0) {
          datas.forEach((item) => {
            this.transferData.forEach((Titem) => {
              if (item.Id === Titem.AssociatedNo) {
                IsRepeat = true;
                repeatMateria = item.ItemName ?? item.PartName;
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
            this.$emit("confirmData", datas);
          }
        } else {
          this.$emit("confirmData", datas);
        }
      } else {
        this.$message({
          type: "warning",
          message: this.$t("purchase.Pu_PleaseChooseTheNeededSheetFirst"),
        });
      }
    },
    searchForm() {
      this.tableObj.formObj.form = Object.assign(
        {},
        this.tableObj.formObj.form,
        this.form
      );
      this.tableObj.getData();
    },
  },
  created() {
    this.form.SupplierName = this.SupplierName;
    this.Configuration();
    if (this.tableConfig) {
      this.tableObj = new this.tableConfig();
    }
    this.tableObj.formObj.form = Object.assign(
      {},
      this.tableObj.formObj.form,
      this.form
    );

    this.tableObj.getData();
  },
  mounted() {},
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped>
.customize-ruleForm-dialog-form {
  display: flex;
}
</style>
