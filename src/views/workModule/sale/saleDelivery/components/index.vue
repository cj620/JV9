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

    <!--客户信息-->
    <JvBlock :title="$t('Generality.Ge_CustomerInfo')" ref="first">
      <!---->
      <div slot="extra">
        <el-select
          v-model="ruleForm.Address"
          filterable
          size="mini"
          @change="changeAddress"
        >
          <el-option
            v-for="item in AddressData"
            :key="item.Address"
            :label="item.Address"
            :value="item.Address"
          >
          </el-option>
        </el-select>
      </div>
      <JvDetail :detailObj="detailObj"> </JvDetail>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button size="mini" @click="selectItems">{{
          $t("Generality.Ge_SelectItems")
        }}</el-button>
        <el-button size="mini" @click="openDetailsDialog">{{
          $t("Generality.Ge_SelectTheDetails")
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
      <!-- 提交 -->
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
    <select-doc-details
      :visible.sync="detailsVisible"
      v-if="detailsVisible"
      :tableConfig="Table"
      :detailedData="detailedData"
      @confirmDetails="validateIsCompleted"
    ></select-doc-details>

    <!-- 发货完成提醒弹窗 -->
    <jv-dialog
      :title="`${$t('Generality.Ge_New')} ${$t('menu.Sa_SaleDelivery')}`"
      width="45%"
      :visible.sync="confirmFormVisible"
      @confirm="detailsConfirm"
    >
      {{ $t("Generality.Ge_ItemId")
      }}<span style="color: red; font-size: 18px">{{ completedItems }}</span
      >{{ $t("Generality.Ge_DeliveryCompleted") }}
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import { formSchema, detailConfig } from "./formConfig";
import { EditTable } from "./editConfig";
import { Table } from "./tableConfig";
import Detail from "@/jv_doc/class/detail/Detail";
import { Form } from "@/jv_doc/class/form";
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
import SelectMaterial from "@/components/JVInternal/SelectMaterial";
import { API as delivery } from "@/api/workApi/sale/delivery";
import { getCustomer } from "@/api/workApi/sale/customer";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { amountFormat, temMerge } from "@/jv_doc/utils/handleData/index";
import {
  getTaxAmount,
  getAmount,
  getPrice,
} from "@/jv_doc/utils/system/taxCount";
// 单据转换逻辑
import { billTransform } from "~/utils/system/editPagePlugin";
import SelectDocDetails from "@/components/SelectDocumentDetails";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
export default {
  name: "Sa_SaleOrder_Edit",
  components: {
    SelectMaterial,
    JvUploadFile,
    SelectDocDetails,
  },
  data() {
    return {
      Table,
      formObj: {},
      eTableObj: {},
      detailObj: {},
      ItemsDialogFormVisible: false,
      detailsVisible: false,
      transferData: [],
      CustomerData: [],
      detailedData: [],
      AddressData: [],
      textarea: "",
      fileList: [],
      fileBillId: "",
      confirmFormVisible: false,
      completedItems: [],
      selectedItems: [],
      ruleForm: {
        BillId: "",
        BillGui: "",
        CustomerId: "",
        CustomerName: "",
        OutDate: "",
        Currency: "",
        State: "",
        SalesReps: "",
        Stockroom: "",
        Remarks: "",
        SaveAndSubmit: false,
        BillItems: [],
        BillFiles: [],
        Address: "",
        Contact: "",
        Tel: "",
        Email: "",
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
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
    });
    this.eTableObj = new EditTable();
    if (this.type === "edit") {
      this.fileBillId = this.billData;
      await this.GetData(this.billData);
    } else if (this.$route.params.orderData) {
      console.log(this.$route.params.orderData, 99669955);
      billTransform(this, "orderData");
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
      await delivery.api_get({ BillId: Id }).then((res) => {
        this.ruleForm = res;
        this.formObj.form = this.ruleForm;
        this.detailObj.detailData = this.ruleForm;

        this.eTableObj.setData(res.BillItems);
      });
    },
    //选择客户确定税率
    changeCustomerId(e) {
      console.log(e);
      getCustomer({ CustomerId: e }).then((res) => {
        this.ruleForm.CustomerName = res.ShortName;
        this.AddressData = res.ContactInfo;
        this.BillItems.Tax = res.Tax;
        this.changeTax(res.Tax);
      });
    },

    //选择地址
    changeAddress(e) {
      console.log(e);
      this.AddressData.forEach((item) => {
        if (item.Address === e) {
          this.detailObj.detailData = item;
          console.log(this.ruleForm, item, this.detailObj);
        }
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
    openDetailsDialog() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.detailsVisible = true;
          this.detailedData = this.eTableObj.getTableData();
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
    // 判断是否发货完成
    validateIsCompleted(e) {
      this.selectedItems = e;
      // e.forEach((item) => {
      //   if (item.Quantity - item.DeliveryQuantity + item.ReturnQuantity === 0) {
      //     this.completedItems.push(item.ItemId);
      //     console.log(111);
      //   }
      // });
      this.completedItems = e
        .filter(
          (item) =>
            item.Quantity - item.DeliveryQuantity + item.ReturnQuantity === 0
        )
        .map((item) => item.ItemId);
      console.log("this.completedItems::: ", this.completedItems);
      this.completedItems.length === 0
        ? this.detailsConfirm()
        : (this.confirmFormVisible = true);
    },
    // 确认选择明细
    detailsConfirm() {
      console.log("this.selectedItems::: ", this.selectedItems);
      this.selectedItems.forEach((item) => {
        item.AssociatedNo = item.Id;
        item.Id = 0;
        item.Quantity =
          item.Quantity - item.DeliveryQuantity + item.ReturnQuantity;
      });
      this.confirmFormVisible = false;
      this.detailsVisible = false;
      this.eTableObj.push(temMerge(this.BillItems, this.selectedItems));
      this.selectedItems = [];
      this.completedItems = [];
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
    //保存销售订单
    IsSave() {
      this.formObj.validate((valid) => {
        if (valid) {
          if (this.eTableObj.getTableData().length > 0) {
            this.ruleForm.BillItems = this.eTableObj.getTableData();
            this.eTableObj.validate((valid1) => {
              if (valid1) {
                delivery
                  .api_save(
                    Object.assign(
                      {},
                      this.ruleForm,
                      this.formObj.form,
                      this.detailObj.detailData
                    )
                  )
                  .then((res) => {
                    let TagName = {
                      path: "/sale/saleDeliveryDetails",
                      name: `Sa_SaleDelivery_Detail`,
                      query: { BillId: res },
                      fullPath: "/sale/saleDeliveryDetails",
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
