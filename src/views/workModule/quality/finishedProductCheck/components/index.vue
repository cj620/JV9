<!--
 * @Author: DESKTOP-2CGOASQ\JvUser 208760845@qq.com
 * @Date: 2022-06-20 12:56:50
 * @LastEditors: 勿忘 208760845@qq.com
 * @LastEditTime: 2023-06-05 17:31:41
 * @FilePath: \jvmmsv9-1front\src\views\workModule\quality\finishedProductCheckList\components\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<!--新增-->
<!--编辑-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <!-- <div class="input-query">
      <el-input
        v-model="PrTaskBillIdKeyword"
        ref="editTask"
        style="width: 180px"
        @keyup.enter.native="getProData($event)"
        placeholder="请扫描加工单"
      ></el-input>
    </div> -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button
          size="mini"
          :disabled="formObj.form.PrDemandBillId === ''"
          @click="viewProcessCheck"
          >查看过程检验单</el-button
        >
      </div>
      <JvForm :formObj="formObj">
        <template #PrDemandBillId="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            remote
            disabled
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in productionDemandList"
              :key="item.BillId"
              :label="item.BillId"
              :value="item.BillId"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <div slot="extra">
        <el-button size="mini" @click="selectItems">选择明细</el-button>
      </div>
      <JvEditTable :tableObj="eTableObj">
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

    <!-- 物料信息 -->
    <JvBlock title="检验明细">
      <div slot="extra" style="display: flex">
        <el-input
          v-model="ColumnNumber"
          placeholder="请输入列数"
          type="number"
        ></el-input>

        <el-button size="mini" @click="AddColumn">添加列数</el-button>
      </div>
      <JvEditTable :tableObj="eTableObj1" v-if="!loading1"> </JvEditTable>
      <div style="text-align: right; margin-right: 10px">
        <el-button size="mini" @click="addTableObj2">新增</el-button>
      </div>
      <JvEditTable :tableObj="eTableObj2" v-if="!loading1">
        <template #operation="{ row, row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem1.bind(null, row_index),
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
    <!--生产需求明细弹窗-->
    <selectDetails
      :visible.sync="ItemsDialogFormVisible"
      v-if="ItemsDialogFormVisible"
      :transferData="transferData"
      @confirmData="confirmData"
    >
    </selectDetails>
    <!--生产需求明细弹窗-->
    <viewProcessCheck
      :visible.sync="viewProcessCheckDialogFormVisible"
      v-if="viewProcessCheckDialogFormVisible"
      :productionId="productionId"
      :IsShowFooterBtn="false"
    >
    </viewProcessCheck>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { EditTable0, EditTable1, EditTable2 } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import { API as finishedProduct } from "@/api/workApi/quality/finishedProduct";
// 引入模块API接口
import { API as produceDemand } from "@/api/workApi/production/productionDemand";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { temMerge } from "@/jv_doc/utils/handleData/index";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";
import selectDetails from "./selectDetails";
import viewProcessCheck from "./viewProcessCheck";
import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";
import { EditTable } from "@/jv_doc/class/table";
import { production_task_get_related_demand } from "@/api/workApi/production/productionTask";
import { StateEnum, enumToList } from "@/enum/workModule";

export default {
  name: "index",
  components: {
    JvUploadFile,
    selectDetails,
    viewProcessCheck,
  },
  data() {
    return {
      formObj: {},
      eTableObj: {},
      eTableObj1: {},
      eTableObj2: {},
      ConfigDataList: {},
      loading1: false,
      ItemsDialogFormVisible: false,
      viewProcessCheckDialogFormVisible: false,
      loading: false,
      ColumnNumber: 1,
      productionDemandList: [],
      Data1: [
        {
          Type: "包装",
          Item1: "",
          Item2: "",
          Item3: "",
          Item4: "",
          Item5: "",
          Item6: "",
          CheckResult: "",
          Remarks: "",
        },
        {
          Type: "外观",
          Item1: "",
          Item2: "",
          Item3: "",
          Item4: "",
          Item5: "",
          Item6: "",
          CheckResult: "",
          Remarks: "",
        },
      ],
      textarea: "",
      PrTaskBillIdKeyword: "",
      transferData: "",
      productionId: "",
      fileList: [],
      fileBillId: "",
      ruleForm: {
        BillId: "",
        BillGui: "",
        PrDemandBillId: "",
        PrTaskBillId: "",
        DeliveryDate: "",
        AssociatedNo: "",
        SizeDetails: "",
        AppearanceDetails: "",
        FinishedProductCheckType: "",
        Analyst: "",
        State: "",
        Remarks: "",
        PersonInCharge: "",
        AbnormalCause: "",
        ProcessingResult: "",
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
        Quantity: 0,
        RelatedCode: "",
        TaskProcessId: "",
        CheckResult: "",
        Remarks: "",
        PrDemandItemId: "",
        BatchNumber: "",
      },
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
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
    this.formObj.eventBus.$on("QuantitySubmittedForInspection", (n) => {
      this.formObj.form.InspectionQuantity = n;
    });
    this.eTableObj = new EditTable0();
    this.eTableObj1 = new EditTable1();
    this.eTableObj1.setData(this.Data1);
    this.eTableObj2 = new EditTable2();
    this.GetProduceDemandData();
    if (this.type === "edit") {
      this.fileBillId = this.billData;
      await this.GetData(this.billData);
    }
    if (this.$route.params) {
      this.ruleForm.AssociatedNo = this.$route.params.data.row.Id;
      this.GetProductionTaskData(this.$route.params.data.row.BillId);
    }
    this.getConfigData();
  },

  methods: {
    //获取加工单的内容
    getProData() {
      if (
        this.PrTaskBillIdKeyword.substring(3, 0) ===
        window.global_config.QRCodeFormat.proBillId
      ) {
        this.GetProductionTaskData(this.PrTaskBillIdKeyword.slice(3));
      }
    },
    getConfigData() {
      getConfigKey({ ConfigKey: "ReasonForUnqualifiedProcessInspection" }).then(
        (res) => {
          this.ConfigDataList = JSON.parse(res.ConfigValue);
        }
      );
    },
    //获取加工单的内容
    GetProductionTaskData(e) {
      production_task_get_related_demand({ BillId: e }).then((res) => {
        this.productionId = e;
        this.formObj.form.PrDemandBillId = res.BillId;
        this.formObj.form.PrTaskBillId = e;
        this.formObj.form.DeliveryDate = res.PlanEnd;
        res.BillItems.forEach((item) => {
          item.PrDemandItemId = item.Id;
        });
        this.eTableObj.push(temMerge(this.BillItems, res.BillItems));
        this.PrTaskBillIdKeyword = "";
        let arr = [];

        res.Process.forEach((item) => {
          console.log(item, 5555999);
          arr.push({
            value: item.Process,
            label: item.Process,
          });
        });
        this.formObj.formSchema[4].options.list = arr;
      });
    },

    //编辑的时候获取信息
    async GetData(Id) {
      await finishedProduct.api_get({ BillId: Id }).then((res) => {
        this.ruleForm = res;
        this.formObj.form = this.ruleForm;

        this.eTableObj.setData(res.BillItems);
      });
    },
    //搜索项目
    remoteMethod(query) {
      let str = {
        BillId: query,
        CurrentPage: 1,
        PageSize: 20,
      };
      produceDemand.api_list(str).then((res) => {
        if (query !== "") {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.productionDemandList = res.Items;
          });
        } else {
          this.GetProduceDemandData();
        }
      });
    },
    //获取生产需求数据
    GetProduceDemandData() {
      let str = {
        BillId: "",
        CurrentPage: 1,
        PageSize: 20,
      };
      produceDemand.api_list(str).then((res) => {
        this.productionDemandList = res.Items;
      });
    },
    //选择物料
    selectItems() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ItemsDialogFormVisible = true;
          this.transferData = this.formObj.form.PrDemandBillId;
        }
      });
    },
    //新增明细
    addTableObj2() {
      this.eTableObj2.addPushEmptyRow();
    },

    //查看检验过程单
    viewProcessCheck() {
      this.viewProcessCheckDialogFormVisible = true;
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    //确认选择物料
    confirmData(e) {
      console.log(e, 54321);
      this.ItemsDialogFormVisible = false;

      this.eTableObj.push(temMerge(this.BillItems, e));
    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },

    delItem1(index) {
      this.eTableObj2.delItem(index);
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

    AddColumn() {
      this.loading1 = true;
      console.log(this.formObj.form.count);

      this.eTableObj1 = new EditTable(this.generateTable1Config());
      this.eTableObj2 = new EditTable(this.generateTable2Config());
      this.eTableObj1.setData(this.generateTable1Data());

      setTimeout(() => {
        this.loading1 = false;
      }, 500);
    },
    generateTable1Data() {
      let str = {};
      let arr1 = [];
      for (let i = 0; i < this.ColumnNumber; i++) {
        str["Item" + (i + 1)] = "";
      }
      let arr = ["包装", "外观"];

      arr.forEach((item) => {
        arr1.push({
          ...str,
          ...{
            Type: item,
            CheckResult: "",
            Remarks: "",
          },
        });
      });
      console.log(arr1, 96969);
      return arr1;
    },
    //自动生成第一个表格的配置

    generateTable1Config() {
      let Table1Config = {};
      let cols = Array(Number(this.ColumnNumber))
        .fill(null)
        .map((_, index) => {
          return {
            prop: "Item" + (index + 1),
            label: "测量" + (index + 1),
            formCpn: "FormSelect",
            options: {
              list: enumToList(StateEnum),
            },
            editConfig: {
              colInit: true,
            },
          };
        });
      console.log(cols, "cols");
      Table1Config = Object.assign(
        {
          // 表格配置
          tableSchema: [],
          data: [],
          // 表格标题
          title: "",
          tableHeaderShow: false,
          chooseCol: false,
          sortCol: false,
          height: 180,
          operationWidth: 80,
          operationCol: false,
        },
        {
          tableSchema: [
            ...[
              {
                prop: "Type",
                label: "类别",
                editConfig: {
                  disabled: true,
                },
              },
            ],
            ...cols,
            ...[
              /*结果*/
              {
                prop: "CheckResult",
                label: "结果",
                formCpn: "FormSelect",
                options: {
                  list: enumToList(StateEnum),
                },
                editConfig: {},
              },
              /*备注*/
              {
                prop: "Remarks",
                label: "备注",
                formCpn: "FormInput",
              },
            ],
          ],
        }
      );
      return Table1Config;
    },
    //自动生成第二个表格的配置

    generateTable2Config() {
      let Table1Config = {};
      let cols = Array(Number(this.ColumnNumber))
        .fill(null)
        .map((_, index) => {
          return {
            prop: "SizeItem" + (index + 1),
            label: "测量" + (index + 1),
            formCpn: "FormInput",
            type: "number",
            editConfig: {
              colInit: true,
            },
          };
        });
      console.log(cols, "cols");
      Table1Config = Object.assign(
        {
          // 表格配置
          tableSchema: [],
          data: [],
          // 表格标题
          title: "",
          tableHeaderShow: false,
          chooseCol: false,
          sortCol: false,
          height: 400,
          operationWidth: 80,
          operationCol: false,
        },
        {
          tableSchema: [
            ...[
              /*Item1*/
              {
                prop: "TheoreticalValue",
                label: "理论值",
                formCpn: "FormInput",
                type: "number",
              },
              /*上公差*/
              {
                prop: "UpperTolerance",
                label: "上公差",
                formCpn: "FormInput",
                type: "number",
              },
              /*下公差*/
              {
                prop: "LowerTolerance",
                label: "下公差",
                formCpn: "FormInput",
                type: "number",
              },
            ],
            ...cols,
            ...[
              /*结果*/
              {
                prop: "SizeCheckResult",
                label: "结果",
                formCpn: "FormSelect",
                options: {
                  list: enumToList(StateEnum),
                },
                editConfig: {},
              },
              /*备注*/
              {
                prop: "SizeRemarks",
                label: "备注",
                formCpn: "FormInput",
              },
            ],
          ],
        }
      );
      return Table1Config;
    },
    IsSave() {
      this.formObj.validate((valid) => {
        if (valid) {
          if (this.eTableObj.getTableData().length > 0) {
            this.ruleForm.BillItems = this.eTableObj.getTableData();

            // this.formObj.form.Reviewer = JSON.stringify(
            //   this.formObj.form.Reviewer
            // );
            this.eTableObj.validate((valid1) => {
              if (valid1) {
                let ruleForm = Object.assign(
                  {},
                  this.ruleForm,
                  this.formObj.form,
                  {
                    Reviewer: JSON.stringify(this.formObj.form.Reviewer),
                  }
                );

                ruleForm.ReworkProcess = ruleForm.ReworkProcess.toString();
                ruleForm.AbnormalCause = ruleForm.AbnormalCause.toString();
                ruleForm.AbnormalCauseItem =
                  ruleForm.AbnormalCauseItem.toString();
                ruleForm.AppearanceDetails = JSON.stringify(
                  this.eTableObj1.getTableData()
                );
                const dataArr = this.eTableObj2.getTableData();
                dataArr.forEach((item, index) => {
                  item.SizeItemNo = index + 1;
                });
                ruleForm.SizeDetails = JSON.stringify(dataArr);
                finishedProduct.api_save(ruleForm).then((res) => {
                  let TagName = {
                    path: "/quality/Qc_FinishedProduct_Detail",
                    name: `Qc_FinishedProduct_Detail`,
                    query: { BillId: res },
                    fullPath: "/quality/Qc_FinishedProduct_Detail",
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
      if (to.name !== this.$options.name) return;
      // 判断传过来的数据不为空并且传过来的数据是一条新的数据
      if (this.$route.query.BillId !== undefined) {
        this.billData = this.$route.query.BillId;
        this.GetData(this.billData);
      }
    },
    "formObj.form.ProcessingResult": {
      handler: function (n, o) {
        console.log(n, o);
        if (n === "Normal") {
          this.formObj.form.ReworkProcess = "";
          this.formObj.form.AbnormalCause = "";
          this.formObj.props.formSchema[4].cpnProps.disabled = true;
          this.formObj.props.formSchema[6].cpnProps.disabled = true;
        } else {
          this.formObj.props.formSchema[4].cpnProps.disabled = false;
          this.formObj.props.formSchema[6].cpnProps.disabled = false;
        }
      },
    },
    "formObj.form.AbnormalCause": {
      handler(n, o) {
        console.log(n, o, this.ConfigDataList);
        let arr = [];
        let arrItem = [];
        if (n.length > 0) {
          n.forEach((item) => {
            arr = [...this.ConfigDataList[item], ...arr];
          });
        } else {
          arr = [];
        }

        console.log(arr);
        arr.forEach((item) => {
          arrItem.push({
            value: item,
            label: item,
          });
        });
        this.formObj.props.formSchema[7].options.list = arrItem;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.input-query {
  padding: 10px;
  background: #fff;
  margin-bottom: 15px;
}
.remarks-info-content {
  padding: 15px;
  .remarks-info-content-remarks {
    margin-bottom: 20px;
  }
}
</style>
