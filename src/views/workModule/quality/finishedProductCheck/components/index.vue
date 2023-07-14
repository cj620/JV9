<!--新增-->
<!--编辑销售订单-->
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
    <JvBlock title="检验明细" ref="third">
      <div slot="extra">
        <el-button size="mini" @click="downExport2Excel">{{
          $t("design.De_DownloadTemplate")
        }}</el-button>
        <el-button size="mini" @click="Import">{{
          $t("Generality.Ge_Import")
        }}</el-button>
        <el-button size="mini" @click="addRow">新增</el-button>
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
    <JvBlock title="检验图" ref="third">
      <!-- <div style="height: 600px;display: flex;flex-wrap: wrap">
        <div class="check-mould-img" v-for="(item,index) in BillFiles" :key="index">
          <el-image
            :preview-src-list="[imgUrlPlugin(item)]"
            style="width: 100%; height: 100%"
            :src="imgUrlPlugin(item)"
            fit="cover"
            class="items-details-Img-error"
          >
            <div slot="error" class="image-slot">
              <i class="el-icon-picture-outline"></i>
            </div>
          </el-image>
        </div>
      </div> -->
      <!-- https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg -->
      <!-- <div class="check-mould-img"></div> -->

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
      <el-empty description="暂无数据" v-if="Images.length == 0"></el-empty>
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

import { qc_process_check_get_relevant_info } from "@/api/workApi/quality/processCheck";
import { qc_finished_product_save } from "@/api/workApi/quality/finishedProduct";
import { getUser } from "@/api/basicApi/systemSettings/user";
import { temMerge } from "@/jv_doc/utils/handleData/index";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { getBillFile } from "@/api/basicApi/systemSettings/upload";
import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";
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
      ruleForm: {
        BillId: "",
        BillGui: "",
        ItemId: "",
        SelfCheckProcess: "",
        ProcessingResult: "",
        MachiningPosition: "",
        CheckResult: "",
        Remarks: "",
        Operator: "",
        AssociatedNo: "",
        OperationDate: "",
        ProcessCheckType: "",
        PersonInCharge: "",
        AbnormalCause: "",
        PrTaskBillId: "",
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
        ReasonOfUnqualified: "",
        MeasuredValue: 0,
        State: "",
        Remarks: "",
      },
      Images: [],
      importShow: false,
      exportTemplate: [
        {
          prop: "ItemId",
          label: "物料编号",
        },

        /*上公差*/
        {
          prop: "ItemName",
          label: "名称",
        },
        /*下公差*/
        {
          prop: "Description",
          label: "描述",
        },
        /*备注*/
        {
          prop: "Unit",
          label: "单位",
        },
        /*实测值*/
        {
          prop: "Quantity",
          label: "数量",
        },
      ],
      exportTemplateData: {
        checkData: [],
        checkedFields: [],
        sourceType: "editTable",
        dataType: "TEMPLATE",
        saveType: "xlsx",
        title: "",
        fileName: "检验明细",
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
    this.formObj.eventBus.$on("SubmittedForInspectionQty", (n) => {
      this.formObj.form.InspectionQty = n;
    });
    this.eTableObj = new EditTable();

    if (this.type === "edit") {
      this.fileBillId = this.billData;
      //await this.GetData(this.billData);
    }

    console.log(
      this.$route.params.data.row,
      this.$route.params.ProcessCheckType
    );
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
    console.log(this.ruleForm);
    this.getConfigData();
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
  mounted() {
    // this.$nextTick(() => {
    //   this.$refs.editTask.focus();
    // });
  },

  methods: {
    imgUrlPlugin,
    getProData() {
      if (
        this.PrTaskBillIdKeyword.substring(3, 0) ===
        window.global_config.QRCodeFormat.proBillId
      ) {
        this.GetProcessCheckData(this.PrTaskBillIdKeyword.slice(3));
      } else if (
        this.PrTaskBillIdKeyword.substring(3, 0) ===
        window.global_config.QRCodeFormat.user
      ) {
        getUser({ UserId: this.PrTaskBillIdKeyword.slice(3) }).then((res) => {
          this.formObj.form.Operator = res.UserName;
          this.PrTaskBillIdKeyword = "";
        });
      }
    },

    getConfigData() {
      getConfigKey({ ConfigKey: "ReasonForUnqualifiedProcessInspection" }).then(
        (res) => {
          console.log(res.ConfigValue);
          this.ConfigDataList = JSON.parse(res.ConfigValue);
        }
      );
    },
    //获取检验数据
    GetProcessCheckData(e) {
      qc_process_check_get_relevant_info({ BillId: e }).then((res) => {
        this.formObj.form.PrTaskBillId = res.PrTaskBillId;
        this.formObj.form.ItemId = res.ItemId;
        let str = res.Process.pop();
        console.log(str, 69696969);

        this.ProcessData = res.Process;
        this.PrTaskBillIdKeyword = "";
        this.BillFiles = res.ProcessSelfCheckInfo.BillFiles;
        this.eTableObj.setData(
          temMerge(this.BillItems, res.ProcessSelfCheckInfo.BillItems)
        );
        this.getCheckImgs(res.ProcessSelfCheckInfo.Id);
        if (this.$route.params.ProcessCheckType === "SelfCheck") {
          console.log(str, 69696969);
          this.formObj.form.SelfCheckProcess = str.Process;
        }
      });
    },
    //删除明细
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    //获取检验图片
    getCheckImgs(id) {
      getBillFile({ OwnerId: id }).then((res) => {
        console.log(res);
        this.Images = res.Items.map((item) => {
          return item.FileUrl;
        });
      });
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
      console.log(arr);
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
          this.ruleForm.BillFiles = this.BillFiles;
          this.ruleForm.Images = this.Images;
          // this.formObj.form.Reviewer = JSON.stringify(
          //     this.formObj.form.Reviewer
          //   );
          this.eTableObj.validate((valid1) => {
            let saveArr = Object.assign({}, this.ruleForm, this.formObj.form, {
              Reviewer: JSON.stringify(this.formObj.form.Reviewer),
            });
            console.log(saveArr);
            saveArr.AbnormalCause = saveArr.AbnormalCause.toString();
            if (valid1) {
              qc_finished_product_save(saveArr).then((res) => {
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
        }
      });
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.BillFiles = fileData;
    },
  },

  watch: {
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
        this.formObj.props.formSchema[9].options.list = arrItem;
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
  // background-color: pink;
}
.items-details-Img-error {
  background-color: rgb(231, 231, 231);
  .image-slot {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // color: rgb(161, 161, 161);
    .error-icon {
      color: rgb(161, 161, 161);
      font-size: 19px;
    }
  }
}
</style>
