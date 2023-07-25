<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #CustomerId="{ prop }">
          <el-select v-model="formObj.form[prop]" filterable>
            <el-option
              v-for="item in CustomerData"
              :key="item.CustomerId"
              :label="item.ShortName"
              :value="item.CustomerId"
            >
            </el-option>
          </el-select>
        </template>

        <template #ProjectId="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            remote
            style="width: 90%"
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in projectDataList"
              :key="item.Project"
              :label="item.Project"
              :value="item.Project"
            >
            </el-option>
          </el-select>
          <i class="el-icon-plus" @click="addProject"></i>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button size="mini" @click="generateItems">
          {{ $t("Generality.Ge_GenerateItems") }}
        </el-button>
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
    <!--新增项目-->
    <addProject
      :visible.sync="addProjectDialogFormVisible"
      @confirmAddProject="confirmAddProject"
    ></addProject>
    <!--生成模具物料-->
    <generateItems
      :visible.sync="generateItemsDialogFormVisible"
      @confirmGenerateItems="confirmGenerateItems"
      ref="generateItems"
      v-model="ProjectData"
    ></generateItems>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
import {
  getProjectQuery,
  saveProjectInfo,
} from "@/api/workApi/project/projectManage";
import SelectMaterial from "@/components/JVInternal/SelectMaterial";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import addProject from "./addProject";
import generateItems from "./generateItems";
import { API as ORDER } from "@/api/workApi/sale/order";
import { getCustomer } from "@/api/workApi/sale/customer";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { amountFormat, temMerge } from "@/jv_doc/utils/handleData/index";
import {
  getTaxAmount,
  getAmount,
  getPrice,
} from "@/jv_doc/utils/system/taxCount";
import { saveItem } from "@/api/basicApi/systemSettings/Item";
import { login } from "../../../../../api/basicApi/systemSettings/user";
import { handleBillContent } from "@/jv_doc/utils/system/billHelp";

export default {
  components: {
    SelectMaterial,
    JvUploadFile,
    addProject,
    generateItems,
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
  data() {
    return {
      formObj: {},
      eTableObj: {},
      ItemsDialogFormVisible: false,
      addProjectDialogFormVisible: false,
      generateItemsDialogFormVisible: false,
      loading: false,
      transferData: [],
      CustomerData: [],
      projectDataList: [],
      textarea: "",
      ProjectData: "",
      fileList: [],
      fileBillId: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        CustomerId: "",
        CustomerName: "",
        Currency: "",
        State: "",
        SalesReps: "",
        ProjectId: "",
        RelationId: "",
        Remarks: "",
        SaveAndSubmit: false,
        BillItems: [],
        BillFiles: [],
      },
      BillItems: {
        Id: 0,
        BillGui: "",
        ItemId: "",
        ItemName: "",
        Description: "",
        Unit: "",
        Quantity: 0,
        Price: 0,
        Amount: 0,
        Tax: 0,
        SampleDate: "",
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
    if (this.$route.params.quotationData) {
      await this.GetQuotationData(this.$route.params.quotationData);
    }
    await this.Configuration();
    await this.GetProjectData();
  },

  methods: {
    //获取客户Id
    async Configuration() {
      await getAllSalesCustomer({}).then((res) => {
        this.CustomerData = res.Items;
      });
    },
    //获取项目
    async GetProjectData() {
      await getProjectQuery({ Keyword: "" }).then((res) => {
        console.log(res.Items);
        this.projectDataList = res.Items;
      });
    },
    GetQuotationData(e) {
      console.log(e);
      let str = {};
      this.formObj.form.CustomerId = e.CustomerId;
      this.formObj.form.ProjectId = e.Project;
      this.formObj.form.DeliveryDate = e.DeliveryDate;
      str.ItemId = e.ToolingNo;
      str.ItemName = e.ToolingName;
      str.Unit = "PCS";
      str.Quantity = 1;
      str.Price = e.Total;
      str.AssociatedNo = e.BillId;
      this.eTableObj.push(temMerge(this.BillItems, [str]));
    },
    //编辑的时候获取信息
    async GetData(Id) {
      await ORDER.api_get({ BillId: Id }).then((res) => {
        if (this.type === "copy") {
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
    //搜索项目
    remoteMethod(query) {
      getProjectQuery({ Keyword: query }).then((res) => {
        console.log(res.Items, 555);
        if (query !== "") {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.projectDataList = res.Items;
          });
        } else {
          this.GetProjectData();
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
                ORDER.api_save(
                  Object.assign({}, this.ruleForm, this.formObj.form)
                ).then((res) => {
                  let TagName = {
                    path: "/sale/saleOrderDetails",
                    name: `Sa_SaleOrder_Detail`,
                    query: { BillId: res },
                    fullPath: "/sale/saleOrderDetails",
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
    //新增项目
    addProject() {
      this.addProjectDialogFormVisible = true;
    },
    //保存项目
    confirmAddProject(e) {
      saveProjectInfo(e).then((res) => {
        this.addProjectDialogFormVisible = false;
        this.formObj.form.ProjectId = e.Project;
      });
    },
    //保存模具物料
    confirmGenerateItems(e) {
      e.Project = this.formObj.form.ProjectId;
      e.ItemCategory = "Tooling";
      e.DataState = "Add";
      saveItem(e).then((res) => {
        this.generateItemsDialogFormVisible = false;
        this.eTableObj.push(temMerge(this.BillItems, [e]));
        this.$refs.generateItems.formObj.reset();
      });
    },
    //生成模具物料
    generateItems() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.generateItemsDialogFormVisible = true;
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
    "formObj.form.CustomerId": {
      handler: function (n, o) {
        if (n) {
          this.changeCustomerId(n);
        }
      },
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
