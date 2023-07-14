<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock :title="$t('Generality.Ge_BillInfo')">
      <JvForm :formObj="formObj">
        <template #SelfCheckProcess="{ prop }"> </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_ItemsInfo')">
      <!-- <div slot="extra">
        <el-button size="mini" @click="selectItems">选择明细</el-button>
      </div> -->
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

import { getProductionTask } from "@/api/workApi/production/productionTask";
import { qc_finished_product_save } from "@/api/workApi/quality/finishedProduct";
import { getUser } from "@/api/basicApi/systemSettings/user";
import { temMerge } from "@/jv_doc/utils/handleData/index";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { getBillFile } from "@/api/basicApi/systemSettings/upload";
// import { getConfigKey } from "@/api/basicApi/systemSettings/sysSettings";

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
        PrTaskBillId: "",
        ReworkProcess: "",
        ProcessingResult: "",
        PersonInCharge: "",
        AbnormalCause: "",
        Analyst: "",
        SubmittedForInspectionQty: "",
        InspectionQty: "",
        UnqualifiedQty: "",
        AssociatedNo: "",
        Remarks: "",
        BillItems: [],
        BillFiles: [],
      },
      BillItems: {
        Id: 0,
        BillGui: "",
        ItemId: "",
        ItemName: "",
        Description: "",
        Quantity: "",
        State: "",
        Remarks: "",
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

    console.log(
      this.$route.params.data.row,
      this.ruleForm
      // this.$route.params.ProcessCheckType
    );
    var routeParams = this.$route.params;
    this.formObj.form.SelfCheckProcess = routeParams.data.row.Process
      ? routeParams.data.row.Process
      : "";
    // this.formObj.form.ProcessCheckType = routeParams.ProcessCheckType;
    // if (routeParams.ProcessCheckType === "SelfCheck") {
    //   this.formObj.form.ProcessingResult = "Normal";
    //   this.formObj.form.PersonInCharge = routeParams.data.row.UserName;
    //   this.formObj.form.Operator = routeParams.data.row.UserName;
    // } else {
    //   this.formObj.form.Operator = this.name;
    // }
    if (routeParams.data) {
      this.ruleForm.AssociatedNo = routeParams.data.row.Id
        ? routeParams.data.row.Id
        : 0;
      this.GetProcessCheckData(routeParams.data.row.BillId);
    }
    // this.getConfigData();
  },
  mounted() {},

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

    // getConfigData() {
    //   getConfigKey({ ConfigKey: "ReasonForUnqualifiedProcessInspection" }).then(
    //     (res) => {
    //       console.log(res.ConfigValue);
    //       this.ConfigDataList = JSON.parse(res.ConfigValue);
    //     }
    //   );
    // },
    //获取检验数据
    GetProcessCheckData(e) {
      getProductionTask({ BillId: e }).then((res) => {
        this.formObj.form.PrTaskBillId = res.BillId;
        let arr = [];

        res.Process.forEach((item) => {
          console.log(item, 5555999);
          if (item.State === "Processed") {
            arr.push({
              value: item.Process,
              label: item.Process,
            });
          }
        });
        console.log(arr);
        this.formObj.formSchema[1].options.list = arr;
        let arr2 = res.Parts.map((part) => {
          part.ItemId = part.PartNo;
          part.ItemName = part.PartName;
          part.State = "";
          part.Remarks = "";
          delete part.PartNo;
          delete part.PartName;
          return part;
        });
        console.log(arr2);
        this.eTableObj.setData(arr2);
      });
    },
    //编辑的时候获取信息
    // async GetData(Id) {
    //   await finishedProduct.api_get({ BillId: Id }).then((res) => {
    //     console.log(res);
    //     this.ruleForm = res;
    //     this.formObj.form = this.ruleForm;

    //     this.eTableObj.setData(res.BillItems);
    //   });
    // },
    //删除明细
    delItem(index) {
      this.eTableObj.delItem(index);
    },

    changeValue(e, row, cb) {
      if (!e) {
        cb();
      }
    },
    // //选择物料
    // selectItems() {
    //   this.formObj.validate((valid) => {
    //     if (valid) {
    //       this.ItemsDialogFormVisible = true;
    //       this.transferData = this.formObj.form.PrDemandBillId;
    //     }
    //   });
    // },
    save() {
      this.ruleForm.SaveAndSubmit = true;
      this.IsSave();
    },
    IsSave() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ruleForm.BillItems = this.eTableObj.getTableData();
          this.ruleForm.BillFiles = this.BillFiles;
          console.log(
            this.ruleForm.ReworkProcess,
            this.formObj.form.ReworkProcess
          );
          this.eTableObj.validate((valid1) => {
            let saveArr = Object.assign(
              {},
              this.ruleForm,
              this.formObj.form,
              {
                Analyst: this.formObj.form.Analyst,
              },
              {
                PersonInCharge: this.formObj.form.PersonInCharge,
              },
              {
                ReworkProcess: this.formObj.form.ReworkProcess.toString(),
              }
            );
            console.log(saveArr.ReworkProcess);
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

  // watch: {
  //   "formObj.form.AbnormalCause": {
  //     handler(n, o) {
  //       console.log(n, o, this.ConfigDataList);
  //       let arr = [];
  //       let arrItem = [];
  //       if (n.length > 0) {
  //         n.forEach((item) => {
  //           arr = [...this.ConfigDataList[item], ...arr];
  //         });
  //       } else {
  //         arr = [];
  //       }

  //       console.log(arr);
  //       arr.forEach((item) => {
  //         arrItem.push({
  //           value: item,
  //           label: item,
  //         });
  //       });
  //       this.formObj.props.formSchema[9].options.list = arrItem;
  //     },
  //   },
  // },
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
