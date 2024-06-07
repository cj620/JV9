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
import { mapState } from "vuex";
import { StateEnum, enumToList } from "@/enum/workModule";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";

import { getProductionTask } from "@/api/workApi/production/productionTask";
import { qc_finished_product_save } from "@/api/workApi/quality/finishedProduct";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";

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
        AbnormalCategory: "",
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

    this.eTableObj = new EditTable();
    var routeParams = this.$route.params;
    this.formObj.form.SelfCheckProcess = routeParams.data.row.Process
      ? routeParams.data.row.Process
      : "";

    if (routeParams.data) {
      this.ruleForm.AssociatedNo = routeParams.data.row.Id
        ? routeParams.data.row.Id
        : 0;
      this.GetProcessCheckData(routeParams.data.row.BillId);
    }
  },
  mounted() {},

  methods: {
    imgUrlPlugin,
    //获取检验数据
    GetProcessCheckData(e) {
      getProductionTask({ BillId: e }).then((res) => {
        this.formObj.form.PrTaskBillId = res.BillId;
        let arr = [];

        res.Process.forEach((item) => {
          if (item.State === "Processed") {
            arr.push({
              value: item.Process,
              label: item.Process,
            });
          }
        });
        this.formObj.formSchema[2].options.list = arr;
        let arr2 = res.Parts.map((part) => {
          part.ItemId = part.PartNo;
          part.ItemName = part.PartName;
          part.State = "";
          part.Remarks = "";
          delete part.PartNo;
          delete part.PartName;
          delete part.ToolingNo;
          return part;
        });
        this.eTableObj.setData(arr2);
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
    save() {
      this.ruleForm.SaveAndSubmit = true;
      this.IsSave();
    },
    IsSave() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.ruleForm.BillItems = this.eTableObj.getTableData();
          this.ruleForm.BillFiles = this.BillFiles;
          let arr3 = this.ruleForm.BillItems.map((billItems) => {
            billItems.Id = 0;
            billItems.BillGui = "";
            return billItems;
          });
          this.ruleForm.BillItems = arr3;

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
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  watch: {
    "formObj.form.SubmittedForInspectionQty": {
      handler(n, o) {
        this.formObj.form.InspectionQty = n;
      }
    },
    "formObj.form.ProcessingResult": {
      handler: function (n, o) {
        if (n !== 'Qualified' && n !== '') {
          this.formObj.form.AbnormalCategory = "Other";
          this.formObj.props.formSchema[2].cpnProps.disabled = false;
        } else {
          this.formObj.form.AbnormalCategory = "";
          this.formObj.form.ReworkProcess = "";
          this.formObj.form.AbnormalCause = "";
          this.formObj.props.formSchema[2].cpnProps.disabled = true;
        }
      },
    },
  }
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
