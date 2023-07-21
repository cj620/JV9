<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">
    <JvBlock title="设备信息" ref="first">
      <JvForm :formObj="formObj">
        <template #DeviceNo="{ prop }">
          <el-input v-model="formObj.form[prop]" :disabled="IsDisabled">
          </el-input>
        </template>
        <template #DeviceName="{ prop }">
          <el-input v-model="formObj.form[prop]" :disabled="IsDisabled">
          </el-input>
        </template>
        <template #Remarks="{ prop }">
          <el-input v-model="formObj.form[prop]" :disabled="IsDisabled">
          </el-input>
        </template>
        <template #MaintenanceCategory="{ prop }">
          <el-select v-model="formObj.form[prop]" filterable>
            <el-option
              v-for="item in MaintenanceCategoryData"
              :key="item.label"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock title="保养信息" ref="second">
      <div slot="extra">
        <el-button size="mini" @click="selectTemplate"> 选择模板 </el-button>
      </div>
      <JvEditTable :tableObj="M_TableObj">
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delTPLItem.bind(null, row_index),
              },
            ]"
          /> </template
      >
      </JvEditTable>
    </JvBlock>

    <!-- 备注 -->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <el-input type="textarea" :rows="2" v-model="ruleForm.Remarks">
      </el-input>
    </JvBlock>
    <!-- 附件 -->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
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
    <!--模板弹窗-->
    <selectTemplate
      :visible.sync="TemplateDialogFormVisible"
      v-if="TemplateDialogFormVisible"
      @confirmData="confirmData"
    >
    </selectTemplate>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { M_EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";

import { mapState } from "vuex";
// 引入模块API接口
import { API as ProjectTask } from "@/api/workApi/project/projectTask";
import { API as Maintenance_tpl } from "@/api/workApi/equipment/maintenance_tpl";
import { assets_device_managetype_get_by_type } from "@/api/workApi/equipment/maintenance";

// 引入模块API接口
import { API as Maintenance } from "@/api/workApi/equipment/maintenance";
import closeTag from "@/utils/closeTag";
import ImgUploader from "@/components/WorkModule/ImgUploader";
import { temMerge } from "@/jv_doc/utils/handleData/index";
import selectTemplate from "./selectTemplate";

export default {
  name: "As_DeviceMaintainAdd",
  components: {
    JvUploadFile,
    ImgUploader,
    selectTemplate,
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
      MaintenanceCategoryData: [
        {
          label: '定时保养',
          value: "FixedDate",
        },
        {
          label: '定量保养',
          value: "FixedUsedTime",
        },
      ],
      TemplateDialogFormVisible: false,
      detailRouteName: "As_DeviceMaintenanceDetail",
      fileBillId: "",
      M_TableObj: {},
      ruleForm: {
        BillId: "",
        BillGui: "",
        DeviceNo: "",
        Device: "",
        MaintenanceCategory: "",
        MaintenanceDate: new Date(),
        Operator: "",
        Remarks: "",
        Items: [],
        BillFiles: [],
      },
      Items: {
        Id: 0,
        DeviceMaintainGui: "",
        MaintenanceContent: "",
        SortOrder: "",
        MaintenanceResults: "true",
        Remarks: "",
      },

      IsDisabled: false,
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  async created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 6,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.M_TableObj = new M_EditTable();
  },
  mounted() {
    // Object.assign(this.formObj.form, this.$route.params);
    if (this.$route.params.type == "toMaintenance") {
      this.ruleForm.DeviceName = this.$route.params.cdata.DeviceName;
      this.ruleForm.PhotoUrl = this.$route.params.cdata.PhotoUrl;
      this.ruleForm.DeviceNo = this.$route.params.cdata.DeviceNo;
      this.formObj.form = this.ruleForm;
      this.IsDisabled = true;
      let str = 0;
      if (this.$route.params.cdata.MaintenanceTplId) {
        str = this.$route.params.cdata.MaintenanceTplId;
      }
      console.log(
        this.$route.params.cdata.MaintenanceTplId,
        this.$route.params.cdata,
        96969
      );
      Maintenance_tpl.api_get({ Id: str }).then((res) => {
        if (res.BillItems.length > 0) {
          // this.detailObj.setData(res);
          this.M_TableObj.setData(
            res.BillItems.map((item) => {
              return {
                MaintenanceContent: item.MaintenanceContent,
                MaintenanceResults: "true",
                Remarks: "",
              };
            })
          );
        }
      });
    }
    // this.getAllType();
  },
  methods: {
    getAllType() {
      assets_device_managetype_get_by_type({ ManageType: "MaintainType" }).then(
        (res) => {
          console.log(res);
          this.MaintenanceCategoryData = res;
        }
      );
    },

    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    chooseImg(e) {
      this.ruleForm.PhotoUrl = e;
    },

    //选择模板
    selectTemplate() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.TemplateDialogFormVisible = true;
        }
      });
    },
    confirmData(e) {
      console.log(e);
      this.TemplateDialogFormVisible = false;

      this.M_TableObj.push(temMerge(this.Items, e[0].BillItems));
    },
    //保存销售订单
    save(saveAndSubmit) {
      this.ruleForm.SaveAndSubmit = saveAndSubmit;
      this.formObj.submitAll([this.formObj.validate], (valid) => {
        if (valid) {
          this.M_TableObj.validate((valid1) => {
            if (valid1) {
              Object.assign(this.ruleForm, this.formObj.form);
              this._save();
            }
          });
        }
      });
    },
    _save() {
      this.ruleForm.Items = this.M_TableObj.getTableData();
      Maintenance.api_save(this.ruleForm).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { BillId: res },
        };
        closeTag(this.current, TagName);
      });
    },
    //删除物料
    delTPLItem(index) {
      this.M_TableObj.delItem(index);
    },
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
