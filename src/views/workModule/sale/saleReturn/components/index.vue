<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #CustomerId="{ prop }">
          <el-form-item :label="$t('sale.Sa_CustomerName')" :prop="prop">
            <el-select
              v-model="formObj.form[prop]"
              filterable
              @change="changeCustomerId"
            >
              <el-option
                v-for="item in CustomerData"
                :key="item.CustomerId"
                :label="item.ShortName"
                :value="item.CustomerId"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button size="mini" @click="selectItems">{{
          $t("Generality.Ge_SelectItems")
        }}</el-button>
      </div>
      <JvEditTable :tableObj="eTableObj">
        <!-- 含税金额 -->
        <template #Amount="{ row }">
          {{ getSummary(row, "Amount") }}
        </template>
        <!-- 未税金额 -->
        <template #TDA="{ row }">
          {{ getTDA(row, "TDA") }}
        </template>
        <!-- 单价 -->
        <template #Price="{ row }">
          {{ getPrice(row, "Price") }}
        </template>
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </JvBlock>
    <!-- 备注 -->
    <JvBlock :title="$t('Generality.Ge_Remarks')">
      <el-input type="textarea" :rows="2" v-model="ruleForm.Remarks">
      </el-input>
    </JvBlock>
    <!-- 附件 -->
    <JvBlock :title="$t('Generality.Ge_Annex')">
      <div slot="extra">
        <el-button size="mini" @click="(_) => $refs.upLoad.upload()">{{
          $t("Generality.Ge_Upload")
        }}</el-button>
      </div>

      <JvUploadFile
        @returnData="returnData"
        :BillId="fileBillId"
        ref="upLoad"
      ></JvUploadFile>
    </JvBlock>
    <div slot="fixedFooter">
      <!-- 保存 -->
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Save")
      }}</el-button>
      <!-- 保存并提交 -->
      <el-button type="primary" @click="saveAndSubmit">{{
        $t("Generality.Ge_SaveAndSubmit")
      }}</el-button>
    </div>
    <!--父级物料弹窗-->
    <SelectMaterial
      :visible.sync="ItemsDialogFormVisible"
      v-if="ItemsDialogFormVisible"
      :transferData="transferData"
      @confirmData="confirmData"
    >
    </SelectMaterial>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
import SelectMaterial from "@/components/JVInternal/SelectMaterial";
/*
import {getSalesReturn, saveSalesReturn } from "@/api/workApi/sale/return";
*/
import { API as Return } from "@/api/workApi/sale/return";
import { getCustomer } from "@/api/workApi/sale/customer";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { amountFormat, temMerge } from "@/jv_doc/utils/handleData/index";
import {
  getTaxAmount,
  getAmount,
  getPrice,
} from "@/jv_doc/utils/system/taxCount";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
// 单据转换逻辑
import { billTransform } from "~/utils/system/editPagePlugin";
import { handleBillContent } from "@/jv_doc/utils/system/billHelp";

export default {
  name: "Sa_SaleReturn_Edit",
  components: {
    SelectMaterial,
    JvUploadFile,
  },
  data() {
    return {
      Id: this.$route.query.BillId,
      formObj: {},
      eTableObj: {},
      ItemsDialogFormVisible: false,
      transferData: [],
      CustomerData: [],
      textarea: "",
      fileList: [],
      fileBillId: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        CustomerId: "",
        CustomerName: "",
        ReturnDate: "",
        Currency: "",
        State: "",
        SalesReps: "",
        Stockroom: "",
        Remarks: "",
        BillItems: [],
        BillFiles: [],
        SaveAndSubmit: false,
      },
      BillItems: {
        Id: "",
        BillGui: "",
        ItemId: "",
        ItemName: "",
        Description: "",
        Unit: "",
        Quantity: 0,
        Price: 0,
        Amount: 0,
        Tax: 0,
        Remarks: "",
        NoTaxPrice: 0,
        TDA: 0,
      },
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    getSummary() {
      return getAmount;
    },
    getTDA() {
      return getTaxAmount;
    },
    getPrice() {
      return getPrice;
    },
  },
  props: {
    billData: {
      type: String,
      default: () => "",
    },
    type: {
      type: String,
      default: () => "",
    },
  },

  async created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 8,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    console.log(1234, this.billData, this.type);
    this.eTableObj = new EditTable();
    // if (this.type === "edit") {
    //   console.log(55555);
    //   this.fileBillId = this.billData;
    //   await this.GetData(this.billData);
    // } else if (this.$route.params.deliveryData) {
    //   billTransform(this, "deliveryData");
    // }
    // 判断是否为编辑或复制
    if (this.type === "edit" || this.type === "copy") {
      this.fileBillId = this.billData;
      await this.GetData(this.fileBillId);
    }
    // 判断是否由销售发货转退货
    if (this.$route.params.deliveryData) {
      billTransform(this, "deliveryData");
    }
    await this.Configuration();
  },

  methods: {
    //获取客户Id
    async Configuration() {
      await getAllSalesCustomer({}).then((res) => {
        this.CustomerData = res.Items;
      });
    },
    //编辑的时候获取信息
    async GetData(Id) {
      await Return.api_get({ BillId: Id }).then((res) => {
        if (this.$route.query.type === "copy") {
          res = handleBillContent(res);
        }
        this.ruleForm = res;
        this.formObj.form = this.ruleForm;

        this.eTableObj.setData(res.BillItems);
      });
    },
    //选择客户确定税率
    changeCustomerId(e) {
      getCustomer({ CustomerId: e }).then((res) => {
        this.formObj.form.Currency = res.Currency;
        this.ruleForm.CustomerName = res.ShortName;
        this.BillItems.Tax = res.Tax;
        this.changeTax(res.Tax);
      });
    },
    changeTax(val) {
      this.eTableObj.setDefaultColData({
        prop: "Tax",
        value: val,
      });
    },
    //选择物料
    selectItems() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ItemsDialogFormVisible = true;
          this.transferData = this.eTableObj.getTableData();
        }
      });
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    //确认选择物料
    confirmData(e) {
      this.ItemsDialogFormVisible = false;

      this.eTableObj.push(temMerge(this.BillItems, e));
    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    //保存销售订单
    save() {
      this.ruleForm.SaveAndSubmit = false;
      this.IsSave();
    },
    //保存并提交销售订单
    saveAndSubmit() {
      this.ruleForm.SaveAndSubmit = true;
      this.IsSave();
    },
    IsSave() {
      this.formObj.validate((valid) => {
        if (valid) {
          if (this.eTableObj.getTableData().length > 0) {
            this.ruleForm.BillItems = this.eTableObj.getTableData();
            this.eTableObj.validate((valid1) => {
              if (valid1) {
                Return.api_save(
                  Object.assign({}, this.ruleForm, this.formObj.form)
                ).then((res) => {
                  let TagName = {
                    path: "/sale/saleReturnDetails",
                    name: `Sa_SaleReturn_Detail`,
                    query: { BillId: res },
                    fullPath: "/sale/saleReturnDetails",
                  };
                  closeTag(this.current, TagName);
                });
              }
            });
          } else {
            /* 请添加明细 */
            this.$message.warning(this.$t("Generality.Ge_PleaseAddItems"));
          }
        }
      });
    },
  },
  watch: {
    $route(to, from) {
      // 页面缓存的时候不刷新数据，监听路由刷新数据
      // 判断路由监听的页面是不是本页面
      if (to.name !== this.$parent.$options.name) return;
      // 判断传过来的数据不为空并且传过来的数据是一条新的数据
      if (this.$route.query.BillId !== undefined) {
        this.billData = this.$route.query.BillId;
        this.GetData(this.billData);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.remarks-info-content {
  padding: 15px;
  .remarks-info-content-remarks {
    margin-bottom: 20px;
  }
}
</style>
