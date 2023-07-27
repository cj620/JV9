<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #SupplierId="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            @change="changeCustomerId"
          >
            <el-option
              v-for="item in SupplierData"
              :key="item.SupplierId"
              :label="item.ShortName"
              :value="item.SupplierId"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_ItemsInfo')">
      <div slot="extra">
        <el-button size="mini" @click="selectItems">{{
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
        <template #operation="{ row, row_index }">
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
      <!-- 提交 -->
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Save")
      }}</el-button>
      <!-- 保存并提交 -->
      <el-button type="primary" @click="saveAndSubmit">{{
        $t("Generality.Ge_SaveAndSubmit")
      }}</el-button>
    </div>
    <select-document-details
      :visible.sync="ItemsDialogFormVisible"
      v-if="ItemsDialogFormVisible"
      :detailedData="transferData"
      @confirmDetails="confirmData"
      :tableConfig="Table"
      detailName="outsourcingRequirement"
      :slotData="['Category', 'State']"
    >
      <template #Category="scope">
        <span>{{ Category[scope.row.Category] }}</span>
      </template>
      <template #State="scope">
        <span>{{ State[scope.row.State] }}</span>
      </template>
    </select-document-details>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import { Table } from "./tableConfig";

import SelectItem from "../../account/components/selectItem.vue";
import SelectDocumentDetails from "@/components/SelectDocumentDetails";
import { API as Outsourcing } from "@/api/workApi/purchase/outsourcing";

import {
  getAllSupplier,
  getSupplierDetails,
} from "@/api/workApi/purchase/supplier";
import {
  getTaxAmount,
  getAmount,
  getPrice,
  getTaxPrice,
} from "@/jv_doc/utils/system/taxCount";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { amountFormat, temMerge } from "@/jv_doc/utils/handleData/index";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import { handleBillContent } from "@/jv_doc/utils/system/billHelp";
export default {
  components: {
    SelectItem,
    JvUploadFile,
    SelectDocumentDetails,
  },
  data() {
    return {
      Table,
      formObj: {},
      eTableObj: {},
      ItemsDialogFormVisible: false,
      transferData: [],
      SupplierData: [],
      SupplierName: "",
      textarea: "",
      fileList: [],
      fileBillId: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        SupplierId: "",
        SupplierName: "",
        Currency: "",
        DeliveryDate: "",
        Remarks: "",
        BillItems: [],
        BillFiles: [],
        SaveAndSubmit: false,
      },
      BillItems: {
        Id: 0,
        BillGui: "",
        PartNo: "",
        PartName: "",
        Description: "",
        PmTaskBillId: "",
        Unit: "",
        Quantity: 0,
        Price: 0,
        Amount: 0,
        Tax: 0,
        ToolingNo: "",
        Process: "",
        Remarks: "",
        AssociatedNo: 0,
        NoTaxPrice: 0,
        TDA: 0,
      },
      Category: {
        Part: this.$t("production.Pr_PartOutsourcing"),
        Process: this.$t("production.Pr_ProcessOutsourcing"),
      },
      State: {
        ToBeProcessed: this.$t("Generality.Ge_Pending"),
        Processed: this.$t("purchase.Pu_Outsourced"),
      },
      // 委外需求物料信息
      RequirementItemData: this.$route.query.ItemsData,
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
    this.eTableObj = new EditTable();
    if (this.type === "edit" || this.type === "copy") {
      this.fileBillId = this.billData;
      await this.GetData(this.billData);
    }
    // 委外需求物料信息
    if (this.RequirementItemData) {
      const BillItems = this.RequirementItemData.map((item) => {
        return {
          Amount: 0,
          BillGui: "",
          Description: item.Description,
          Id: 0,
          PartNo: item.PartNo,
          PartName: item.PartName,
          Price: 0,
          Process: item.Process,
          Quantity: item.Quantity,
          Remarks: item.Remarks,
          PmTaskBillId: item.PmTaskBillId,
          Tax: "",
          ToolingNo: item.ToolingNo,
          Unit: "pcs",
          AssociatedNo: item.Id,
          NoTaxPrice: item.NoTaxPrice || 0,
          TDA: item.TDA || 0,
        };
      });
      this.eTableObj.setData(BillItems);
    }
    await this.Configuration();
  },

  methods: {
    //编辑的时候获取信息
    async GetData(Id) {
      await Outsourcing.api_get({ BillId: Id }).then((res) => {
        if (this.type === "copy") {
          res = handleBillContent(res);
        }
        this.ruleForm = Object.assign({}, this.ruleForm, res);
        this.formObj.form = this.ruleForm;
        this.eTableObj.setData(res.BillItems);
      });
    },
    //获取供应商Id
    async Configuration() {
      await getAllSupplier({}).then((res) => {
        this.SupplierData = res.Items;
      });
    },
    //选择客户确定税率
    changeCustomerId(e) {
      getSupplierDetails({ SupplierId: e }).then((res) => {
        this.ruleForm.SupplierName = res.ShortName;
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
          this.SupplierName = this.ruleForm.SupplierName;
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
      e.forEach((item) => {
        item.AssociatedNo = item.Id;
        item.Id = 0;
      });
      this.eTableObj.push(temMerge(this.BillItems, e));
    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    //保存销售订单
    IsSave() {
      this.formObj.validate((valid) => {
        if (valid) {
          if (this.eTableObj.getTableData().length > 0) {
            this.ruleForm.BillItems = this.eTableObj.getTableData();
            this.eTableObj.validate((valid1) => {
              if (valid1) {
                Outsourcing.api_save(
                  Object.assign({}, this.ruleForm, this.formObj.form)
                ).then((res) => {
                  let TagName = {
                    path: "/purchase/outsourcingDetails",
                    name: `Pu_Outsourcing_Detail`,
                    meta: { cache: true, title: "采购对账详情" },
                    query: { BillId: res },
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
    //保存并提交销售订单
    saveAndSubmit() {
      this.ruleForm.SaveAndSubmit = true;
      this.IsSave();
    },
    //保存销售订单
    save() {
      this.ruleForm.SaveAndSubmit = false;
      this.IsSave();
    },
  },
  watch: {
    $route(to, from) {
      // 页面缓存的时候不刷新数据，监听路由刷新数据
      // 判断路由监听的页面是不是本页面
      if (to.name !== this.$parent.$options.name) return;
      // 判断传过来的数据不为空并且传过来的数据是一条新的数据
      if (this.$route.query.BillId !== undefined) {
        console.log(to, 7788);
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
