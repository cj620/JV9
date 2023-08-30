<!--
 * @Author: your name
 * @Date: 2021-12-08 08:36:02
 * @LastEditTime: 2023-07-25 17:11:22
 * @LastEditors: 勿忘 208760845@qq.com
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\sale\saleQuote\Add\index.vue
-->
<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <el-tabs @tab-click="tabClick" slot="sticky-tabs">
      <!-- tab 导航栏  -->
      <el-tab-pane
        v-for="pane in tabPanes"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      ></el-tab-pane>
    </el-tabs>
    <JvBlock
      :title="$t('sale.Sa_MoldQuotation') + BillIdShow"
      ref="first"
      :contentStyle="{
        paddingLeft: '150px',
        position: 'relative',
      }"
    >
      <div class="mould-img">
        <ImgUploader
          @confirm="chooseImg"
          :srcUrl="ruleForm.PhotoUrl"
        ></ImgUploader>
      </div>
      <JvForm :formObj="formObj">
        <template #Project="{ prop }">
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
    <JvBlock :title="$t('sale.Sa_MaterialCost')" ref="second">
      <div slot="extra">
        <el-button size="mini" @click="addEditRow" type="primary"
          >{{ $t("Generality.Ge_New") }}
        </el-button>
      </div>
      <JvEditTable :tableObj="M_TableObj">
        <template #Amount="{ row }">
          {{ getSummary(row, "Amount") }}
        </template>
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-circle-plus-outline',
                confirm: addItem.bind(null, row_index, M_TableObj),
              },
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index, M_TableObj),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </JvBlock>
    <!-- 项目费用-->
    <JvBlock :title="$t('sale.Sa_ProjectCost')" ref="projectCost">
      <div slot="extra">
        <el-button size="mini" @click="add_project_row" type="primary">{{
          $t("Generality.Ge_New")
        }}</el-button>
      </div>
      <JvEditTable :tableObj="Project_TableObj">
        <template #Amount="{ row }">
          {{ getSummary(row, "Amount") }}
        </template>
        <template #col_Amount="{ row }">
          {{ p_getSummary(row, "col_Amount") }}
        </template>
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-circle-plus-outline',
                confirm: insertDoubleCol.bind(
                  null,
                  Project_TableObj,
                  row_index
                ),
              },
              {
                icon: 'el-icon-delete',
                confirm: delDoubleCol.bind(null, Project_TableObj, row_index),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </JvBlock>
    <!-- 加工费用-->
    <JvBlock :title="$t('sale.Sa_ProcessingCost')" ref="processingCost">
      <div slot="extra">
        <el-button size="mini" @click="add_produce_row" type="primary">{{
          $t("Generality.Ge_New")
        }}</el-button>
      </div>
      <JvEditTable :tableObj="Produce_TableObj">
        <template #Amount="{ row }">
          {{ getSummary(row, "Amount") }}
        </template>
        <template #col_Amount="{ row }">
          {{ p_getSummary(row, "col_Amount") }}
        </template>
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-circle-plus-outline',
                confirm: insertDoubleCol.bind(
                  null,
                  Produce_TableObj,
                  row_index
                ),
              },
              {
                icon: 'el-icon-delete',
                confirm: delDoubleCol.bind(null, Produce_TableObj, row_index),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </JvBlock>
    <!-- 成本合计 -->
    <JvBlock
      :contentStyle="{
        textAlign: 'end',
        paddingRight: '50px',
        background: '#ffd3a5',
      }"
    >
      {{ $t("sale.Sa_Subtotal") }}:<span class="sum-text">{{
        getAllCostSum
      }}</span>
    </JvBlock>
    <!-- 计算基数：成本 -->
    <JvBlock :title="$t('sale.Sa_AdditionalCharges')" ref="fourth">
      <div slot="extra">
        <el-button size="mini" @click="C_TableObj.addEmptyRow" type="primary">{{
          $t("Generality.Ge_New")
        }}</el-button>
      </div>
      <div style="width: 45%; display: inline-block"></div>
      <div style="width: 50%; display: inline-block">
        <JvEditTable :tableObj="C_TableObj">
          <template #Amount="{ row }">
            {{ c_getSummary(row, "Amount") }}
          </template>
          <template #operation="{ row_index }">
            <TableAction
              :actions="[
                {
                  icon: 'el-icon-circle-plus-outline',
                  confirm: insertDoubleCol.bind(null, C_TableObj, row_index),
                },
                {
                  icon: 'el-icon-delete',
                  confirm: delDoubleCol.bind(null, C_TableObj, row_index),
                },
              ]"
            />
          </template>
        </JvEditTable>
      </div>
    </JvBlock>
    <!-- 报价合计 -->
    <JvBlock
      :contentStyle="{
        textAlign: 'end',
        paddingRight: '50px',
        background: '#ffd3a5',
      }"
    >
      {{ $t("sale.Sa_TotalQuotation") }}:<span class="sum-text">{{
        getAllSum
      }}</span>
    </JvBlock>
    <!-- 备注 -->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="fifth">
      <el-input type="textarea" :rows="2" v-model="ruleForm.Remarks">
      </el-input>
    </JvBlock>
    <!-- 附件 -->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="sixth">
      <div slot="extra">
        <el-button
          size="mini"
          type="primary"
          @click="(_) => $refs.upLoad.upload()"
          >{{ $t("Generality.Ge_Upload") }}</el-button
        >
      </div>
      <JvUploadFile
        @returnData="returnData"
        :BillId="fileBillId"
        ref="upLoad"
      ></JvUploadFile>
    </JvBlock>
    <div slot="fixedFooter">
      <!-- 保存 -->
      <el-button type="primary" @click="save(false)">{{
        $t("Generality.Ge_Save")
      }}</el-button>
      <!-- 保存并提交 -->
      <el-button type="primary" @click="save(true)">{{
        $t("Generality.Ge_SaveAndSubmit")
      }}</el-button>
    </div>
    <!--新增项目-->
    <addProject
      :visible.sync="addProjectDialogFormVisible"
      @confirmAddProject="confirmAddProject"
    ></addProject>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { M_EditTable, C_EditTable, Produce_EditTable, Project_EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import ImgUploader from "@/components/WorkModule/ImgUploader";
import { mapState } from "vuex";
import { amountFormat, amount2Number } from "@/jv_doc/utils/handleData/index";
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { data2doubleCol } from "../utils";
import {
  getProjectQuery,
  saveProjectInfo,
} from "@/api/workApi/project/projectManage";
// 引入模块API接口
import {
  API as Quotation,
  sales_quotation_get_last,
} from "@/api/workApi/sale/quotation";
import addProject from "./addProject";
import closeTag from "@/utils/closeTag";
import {
  pushDoubleCol,
  insertDoubleCol,
  delDoubleCol,
  doubleCol2data,
} from "../utils";
export default {
  name: "Sa_SaleQuote_Add",
  components: {
    JvUploadFile,
    ImgUploader,
    addProject,
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
      cur_Id: this.$route.query.BillId,
      formObj: {},
      // 材料费用
      M_TableObj: {},
      // 加工及项目费用
      Project_TableObj: {},
      Produce_TableObj: {},
      // 成本费用
      C_TableObj: {},
      // 成本合计
      costSummary: 0,
      transferData: [],
      CustomerData: [],
      projectDataList: [],
      loading: false,
      textarea: "",
      fileList: [],
      detailRouteName: "Sa_SaleQuote_Detail",
      fileBillId: "",
      addProjectDialogFormVisible: false,
      ruleForm: {
        // 单据编号
        // BillId: "",
        BillGui: "",
        // 报价有效期
        QuotationExpiredAt: "",
        // 客户ID
        CustomerId: "",
        // 客户
        CustomerName: "",
        // 预计交期
        DeliveryDate: "",
        // 税率
        Currency: "",
        // 项目
        Project: "",
        // 名称
        ToolingName: "",
        // 编号
        ToolingNo: "",
        // 描述
        Description: "",
        // 备注
        Remarks: "",
        // 图片
        PhotoUrl: "",
        // 报价合计
        Total: 0,
        // 保存形式
        SaveAndSubmit: true,
        // 附件信息
        BillFiles: [],
        // 材料费用
        MaterialCost: [],
        // 加工费用
        ProductionCost: [],
        // 项目费用
        ProjectCost: [],
        // 其他费用
        AdditionalCost: [],
      },
      tabPanes: [
        {
          label: this.$t("sale.Sa_MoldQuotation"),
          name: "first",
        },
        {
          label: this.$t("sale.Sa_MaterialCost"),
          name: "second",
        },
        {
          label: this.$t("sale.Sa_ProjectCost"),
          name: "projectCost",
        },
        {
          label: this.$t("sale.Sa_ProcessingCost"),
          name: "processingCost",
        },
        {
          label: this.$t("sale.Sa_AdditionalCharges"),
          name: "fourth",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "fifth",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "sixth",
        },
      ],
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    getSummary() {
      return (row, key) => {
        row[key].value = row.Quantity.value * row.Price.value;
        return amountFormat(row[key].value);
      };
    },
    p_getSummary() {
      return (row, key) => {
        row[key].value = row.col_Quantity.value * row.col_Price.value;
        return amountFormat(row[key].value);
      };
    },
    c_getSummary() {
      return (row, key) => {
        row[key].value = row.Rate.value * this.costSummary;
        return amountFormat(row[key].value);
      };
    },
    getAllCostSum() {
      let m_sum = amount2Number(this.M_TableObj.summaryRowResult[6]);
      let project_sum =
        amount2Number(this.Project_TableObj.summaryRowResult[4]) +
        amount2Number(this.Project_TableObj.summaryRowResult[9]);
      let produce_sum =
        amount2Number(this.Produce_TableObj.summaryRowResult[4]) +
        amount2Number(this.Produce_TableObj.summaryRowResult[9]);
      this.costSummary = m_sum + project_sum + produce_sum;
      return amountFormat(m_sum + project_sum + produce_sum);
    },
    getAllSum() {
      let c_sum = amount2Number(this.C_TableObj.summaryRowResult[3]);
      let allsum = amountFormat(c_sum + this.costSummary);
      this.ruleForm.Total = allsum;
      return allsum;
    },
    BillIdShow() {
      return this.cur_Id ? `:  ${this.cur_Id}` : "";
    },
  },
  created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 8,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.formObj.eventBus.$on("CustomerId", (a, b, c) => {
      this.formObj.form.Currency = b.Currency;
    });
    this.M_TableObj = new M_EditTable();
    this.Project_TableObj = new Project_EditTable();
    this.Produce_TableObj = new Produce_EditTable();
    this.C_TableObj = new C_EditTable();
    // await this.Configuration();
    this.GetProjectData();
    this.$options.name == "Sa_SaleQuote_Add" && this.get_last_data();
  },

  methods: {
    get_last_data() {
      if (this.$route.query.type === "copy") {
        this.fileBillId = this.$route.query.BillId;
        Quotation.api_get({ BillId: this.cur_Id }).then((res) => {
          this.ruleForm = Object.assign({}, this.ruleForm, res);
          this.formObj.form = this.ruleForm;

          this.ruleForm.BillId = "";
          this.ruleForm.BillGui = "";
          res.MaterialCost.forEach((item) => {
            item.Id = 0;
          });
          res.ProductionCost.forEach((item) => {
            item.Id = 0;
          });
          res.ProjectCost.forEach((item) => {
            item.Id = 0;
          });
          res.AdditionalCost.forEach((item) => {
            item.Id = 0;
          });
          this.M_TableObj.setData(res.MaterialCost);
          this.Project_TableObj.setData(data2doubleCol(res.ProjectCost));
          this.Produce_TableObj.setData(data2doubleCol(res.ProductionCost));
          this.C_TableObj.setData(res.AdditionalCost);
        });
      }
      /*sales_quotation_get_last().then((res) => {
        console.log(res);

        if (!res) return;
        let result = Object.assign({}, res, { BillId: "" });
        this.formObj.form = result;
        this.ruleForm = result;
        this.M_TableObj.setData(result.MaterialCost);
        this.P_TableObj.setData(data2doubleCol(result.ProductionCost));
        this.C_TableObj.setData(result.AdditionalCost);
      });*/
    },
    // 新增编辑行
    addEditRow() {
      this.M_TableObj.addEmptyRow();
    },
    //获取项目
    async GetProjectData() {
      await getProjectQuery({ Keyword: "" }).then((res) => {
        this.projectDataList = res.Items;
      });
    },
    //搜索项目
    remoteMethod(query) {
      getProjectQuery({ Keyword: query }).then((res) => {
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
    //新增项目
    addProject() {
      this.addProjectDialogFormVisible = true;
    },
    //保存项目
    confirmAddProject(e) {
      saveProjectInfo(e).then((res) => {
        this.addProjectDialogFormVisible = false;
        this.formObj.form.Project = e.Project;
      });
    },
    insertDoubleCol,
    delDoubleCol,
    // 项目费用-
    add_project_row() {
      pushDoubleCol(this.Project_TableObj);
    },
    //加工费用
    add_produce_row() {
      pushDoubleCol(this.Produce_TableObj);
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    //删除物料
    delItem(index, target) {
      target.delItem(index);
    },
    addItem(index, target) {
      let empty_row = target.getEmptyRow();
      target.insert(index, [target.getEmptyRow()]);
    },
    //保存销售订单
    save(saveAndSubmit) {
      this.ruleForm.SaveAndSubmit = saveAndSubmit;
      this.formObj.validate((valid) => {
        if (valid) {
          Object.assign(this.ruleForm, this.formObj.form);

          this.ruleForm.MaterialCost = this.M_TableObj.getTableData();
          this.ruleForm.ProjectCost = doubleCol2data(
            this.Project_TableObj.getTableData()
          );
          this.ruleForm.ProductionCost = doubleCol2data(
            this.Produce_TableObj.getTableData()
          );

          this.ruleForm.AdditionalCost = this.C_TableObj.getTableData();
          this._save();
        }
      });
    },
    _save() {
      Quotation.api_save(this.ruleForm).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { BillId: res },
        };
        closeTag(this.current, TagName);
      });
    },
    chooseImg(e) {
      this.ruleForm.PhotoUrl = e;
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    imgUrlPlugin,
  },
};
</script>

<style lang="scss" scoped>
.sum-text {
  display: inline-block;
  // padding-right: 100px;
  width: 200px;
  text-align: end;
}
.mould-img {
  width: 120px;
  height: 120px;
  // background-color: pink;
  position: absolute;
  left: 10px;
  right: 100px;
}
</style>
