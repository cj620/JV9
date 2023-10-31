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
        <el-form-item :label="$t('menu.Sa_Customer')" prop="CustomerName">
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
        </el-form-item >
          <el-form-item :label="$t('Generality.Ge_Tooling')" label-width="80px" prop="ToolingNo">

                  <el-select
            v-model="form.ToolingNo"
            clearable
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in ItemListData"
              :key="item.ItemId"
              :label="item.ItemId"
              :value="item.ItemId"
            >
            </el-option>
          </el-select>

        </el-form-item>
          <el-form-item :label="$t('Generality.Ge_Items')" label-width="80px"  prop="Keyword">
<el-input v-model="form.Keyword" ></el-input>


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
            <el-button @click="resetForm('form')">{{
              $t('Generality.Ge_Reset')
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
import { itemList } from "@/api/basicApi/systemSettings/Item";

export default {
  name: "selectItem",
  data() {
    return {
      tableObj: {},
      formObj: {},
      ruleForm: {},
      CustomerData: [],
      multipleSelection: [],
       ItemListData:[],
        loading:false,
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
        ToolingNo: "",
        Keyword: "",
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
     this.GetItemData()
    this.Configuration();
  },
  methods: {
        GetItemData(e){
      this.loading = true;
      let str = {
        CurrentPage:1,
        InventoryAlert:false,
        ItemType:'',
        Keyword:e,
        PageSize:20,

      }
      itemList(str).then(res=>{
        console.log(res.Items);
        this.ItemListData =res.Items
        this.loading = false;
      })
    },
    //根据编号搜索
    remoteMethod(query){
      this.GetItemData(query)
    },
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
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.searchForm()
      }
  },
};
</script>

<style scoped>
.customize-ruleForm-dialog-form {
  display: flex;
}
</style>
