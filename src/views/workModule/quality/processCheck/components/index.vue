<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #SelfCheckProcess="{ prop }">
          <el-select v-model="formObj.form[prop]" filterable>
            <el-option
              v-for="item in ProcessData"
              :key="item.Id"
              :label="item.Process"
              :value="item.Process"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <JvBlock :title="$t('quality.Qc_CheckDetailList')" ref="third">
      <div slot="extra">
        <el-button size="mini" @click="downExport2Excel">{{
          $t("design.De_DownloadTemplate")
        }}</el-button>
        <el-button size="mini" @click="Import">{{
          $t("Generality.Ge_Import")
        }}</el-button>
        <el-button size="mini" @click="addRow">{{
          $t("Generality.Ge_New")
        }}</el-button>
      </div>

      <JvEditTable :tableObj="eTableObj">
        <!-- 单价 -->
        <template #State="{ row }">
          <span :style="{ color: getState(row) == 'NG' ? 'red' : '#000' }">
            {{ getState(row) }}
          </span>
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
    <JvBlock :title="$t('quality.Qc_ProcessCheckChart')" ref="third">

      <el-image
        v-for="(item, index) in Images"
        :key="index"
        style="width: 100px; height: 100px; padding: 5px"
        :preview-src-list="[imgUrlPlugin(item)]"
        :src="imgUrlPlugin(item)"
        fit="cover"
        class="items-details-Img-error"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <el-empty
        :description="$t('Generality.Ge_NoData')"
        v-if="Images.length == 0"
      ></el-empty>
    </JvBlock>
    <!-- 附件 -->
    <JvBlock :title="$t('Generality.Ge_Annex')">
      <div slot="extra">
        <el-button
          size="mini"
          @click="(_) => $refs.upLoad.upload()"
          v-if="this.formObj.form.PrTaskBillId"
          >{{ $t("Generality.Ge_Upload") }}</el-button
        >
      </div>
      <JvUploadFile
        @returnData="returnData"
        :BillId="this.formObj.form.PrTaskBillId"
        ref="upLoad"
      ></JvUploadFile>
    </JvBlock>
    <div slot="fixedFooter">
      <!-- 保存 -->
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Save")
      }}</el-button>
    </div>
    <!-- 导入数据 -->
    <Import
      :visible.sync="importShow"
      width="28%"
      :title="$t('Generality.Ge_Import')"
      @complete="importComplete"
    ></Import>
  </PageWrapper>
</template>

<script>
import { EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import { formSchema } from "./formConfig";
import closeTag from "@/utils/closeTag";
import { mapState, mapGetters } from "vuex";
import { StateEnum, enumToList } from "@/enum/workModule";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";

import {
  qc_process_check_get_relevant_info,
  qc_process_check_save,
} from "@/api/workApi/quality/processCheck";
import { temMerge } from "@/jv_doc/utils/handleData";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { export2Excel } from "~/cpn/JvTable/utils/export2Excel";

export default {
  components: {
    JvUploadFile,
  },
  data() {
    return {
      formObj: {},
      eTableObj: {},
      ConfigDataList: {},
      PrTaskBillIdKeyword: "",
      ProcessData: [],
      BillFiles: [],
      StateList: enumToList(StateEnum),
      input: "",
      workQuantity: 0,
      ruleForm: {
        BillId: "",
        BillGui: "",
        PrTaskBillId: "",
        ItemId: "",
        SelfCheckProcess: "",
        ProcessCheckType: "",
        ProcessingResult: "",
        AbnormalCategory: "",
        Operator: "",
        OperationDate: "",
        PersonInCharge: "",
        AbnormalCause: "",
        MachiningPosition: "",
        CheckResult: "",
        Remarks: "",
        AssociatedNo: "",
        BillItems: [],
        BillFiles: [],
        Images: [],
      },
      BillItems: {
        Id: 0,
        BillGui: "",
        SortOrder: 0,
        TheoreticalValue: "",
        UpperTolerance: "",
        LowerTolerance: "",
        MeasuredValue: 0,
        State: "",
        Remarks: "",
      },
      Images: [],
      importShow: false,
      exportTemplate: [
        {
          prop: "TheoreticalValue",
          label: i18n.t("quality.Qc_TheoreticalValue"),
        },

        /*上公差*/
        {
          prop: "UpperTolerance",
          label: i18n.t("quality.Qc_UpperTolerance"),
        },
        /*下公差*/
        {
          prop: "LowerTolerance",
          label: i18n.t("quality.Qc_LowerTolerance"),
        },
        /*备注*/
        {
          prop: "Remarks",
          label: i18n.t("Generality.Ge_Remarks"),
        },
        /*实测值*/
        {
          prop: "MeasuredValue",
          label: i18n.t("quality.Qc_MeasuredValue"),
        },
      ],
      exportTemplateData: {
        checkData: [],
        checkedFields: [],
        sourceType: "editTable",
        dataType: "TEMPLATE",
        saveType: "xlsx",
        title: "",
        fileName: this.$t("quality.Qc_CheckDetailList"),
      },
    };
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

    if (this.type === "edit") {
      this.fileBillId = this.billData;
    }

    var routeParams = this.$route.params;
    this.formObj.form.SelfCheckProcess = routeParams.data.row.Process
      ? routeParams.data.row.Process
      : "";
    this.formObj.form.ProcessCheckType = routeParams.ProcessCheckType;
    if (routeParams.ProcessCheckType === "SelfCheck") {
      this.formObj.form.ProcessingResult = "Normal";
      this.formObj.form.PersonInCharge = routeParams.data.row.UserName;
      this.formObj.form.Operator = routeParams.data.row.UserName;
    } else {
      this.formObj.form.Operator = this.name;
    }
    if (routeParams.data) {
      this.ruleForm.AssociatedNo = routeParams.data.row.Id
        ? routeParams.data.row.Id
        : 0;
      this.ruleForm.MachiningPosition = routeParams.data.row.MachiningPosition
        ? routeParams.data.row.MachiningPosition
        : "";
      this.GetProcessCheckData(routeParams.data.row.BillId);
    }
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    ...mapGetters(["userId", "sidebar", "avatar", "device", "name"]),

    getState() {
      return (row) => {
        const number1 =
          Number(row.TheoreticalValue.value) + Number(row.UpperTolerance.value);
        const number2 =
          Number(row.TheoreticalValue.value) - Number(row.LowerTolerance.value);
        if (
          number2 <= Number(row.MeasuredValue.value) &&
          Number(row.MeasuredValue.value) <= number1
        ) {
          row.State.value = "OK";
        } else {
          row.State.value = "NG";
        }
        return row.State.value;
      };
    },
  },

  methods: {
    imgUrlPlugin,
    //获取检验数据
    GetProcessCheckData(e) {
      qc_process_check_get_relevant_info({ BillId: e }).then((res) => {
        this.workQuantity = res.Quantity;
        this.formObj.form.PrTaskBillId = res.PrTaskBillId;
        this.formObj.form.ItemId = res.ItemId;
        const str = JSON.parse(JSON.stringify(res)).Process.pop();

        this.ProcessData = res.Process;
        this.PrTaskBillIdKeyword = "";
        if (this.$route.params.ProcessCheckType === "SelfCheck") {
          this.formObj.form.SelfCheckProcess = str.Process;
        }
      });
    },
    //删除明细
    delItem(index) {
      this.eTableObj.delItem(index);
    },

    changeValue(e, row, cb) {
      if (!e) {
        cb();
      }
    },

    //新增一行数据
    addRow() {
      this.BillItems.UpperTolerance = 0.01;
      this.BillItems.LowerTolerance = 0.01;
      this.eTableObj.push([this.BillItems]);
    },
    //下载导入模板
    downExport2Excel() {
      var arr = [];
      this.eTableObj.props.tableSchema.forEach((item) =>
        this.exportTemplate.forEach((Titem) => {
          if (item.label === Titem.label) {
            arr.push(item);
          }
          export2Excel;
        })
      );
      this.exportTemplateData.checkedFields = arr;
      export2Excel(this.exportTemplateData);
    },

    //导入
    Import() {
      this.importShow = true;
    },

    //导入成功
    importComplete(e) {
      this.importShow = false;
      var arr = [];

      e.forEach((Titem) => {
        var str = {
          TheoreticalValue: "",
          UpperTolerance: "",
          LowerTolerance: "",
          MeasuredValue: "",
          Remarks: "",
        };
        this.exportTemplate.forEach((item) => {
          if (Titem[item.label]) {
            str[item.prop] = Titem[item.label];
          }
        });
        arr.push(str);
      });
      this.eTableObj.push(temMerge(this.BillItems, arr));
    },

    save() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ruleForm.BillItems = this.eTableObj.getTableData();
          this.ruleForm.BillItems.forEach((item, index) => {
            item.SortOrder = index + 1
          })
          this.ruleForm.BillFiles = this.BillFiles;
          this.ruleForm.Images = this.Images;

          if (this.formObj.form.SubmittedForInspectionQty > this.workQuantity) {
            this.$message.error(`
            ${this.$t('quality.Qc_TheQuantitySubmittedShallNotExceedTheProcessingQuantity')}
            : ${this.workQuantity}`);
          } else if (this.formObj.form.InspectionQty > this.formObj.form.SubmittedForInspectionQty) {
            this.$message.error(`${this.$t('quality.Qc_TheQuantityForInspectionShallNotExceedTheSubmittedQuantity')}`);
          } else if (this.formObj.form.UnqualifiedQty > this.formObj.form.InspectionQty) {
            this.$message.error(`${this.$t('quality.Qc_TheQuantityUnqualifiedShallNotExceedTheInspectionQuantity')}`);
          } else {
            this.eTableObj.validate((valid1) => {
              let saveArr = Object.assign(
                {},
                this.ruleForm,
                this.formObj.form
              );
              if (valid1) {
                qc_process_check_save(saveArr).then((res) => {
                  let TagName = {
                    path: "/quality/Qc_ProcessCheck_Detail",
                    name: `Qc_ProcessCheck_Detail`,
                    query: { BillId: res },
                    fullPath: "/quality/Qc_ProcessCheck_Detail",
                  };
                  closeTag(this.current, TagName);
                });
              }
            });
          }
        }
      });
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.BillFiles = fileData;
    },
  },
  watch: {
    "formObj.form.SubmittedForInspectionQty": {
      handler(n, o) {
        this.formObj.form.InspectionQty = n;
      },
    },
    "formObj.form.ProcessingResult": {
      handler(n, o) {
        if (n !== 'Qualified' && n !== '') {
          this.formObj.form.AbnormalCategory = "Other";
        } else {
          this.formObj.form.AbnormalCategory = "";
        }
      },
    },
  },
};
</script>

<style lang="scss">
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
.check-mould-img {
  margin-right: 10px;
  width: 120px;
  height: 120px;
}
.items-details-Img-error {
  background-color: rgb(231, 231, 231);
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .error-icon {
      color: rgb(161, 161, 161);
      font-size: 19px;
    }
  }
}
</style>
