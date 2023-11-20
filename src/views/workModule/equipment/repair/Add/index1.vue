<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
  <PageWrapper ref="page">

    <JvBlock
      :title="$t('device.De_DeviceInfo')"
      ref="first"
      :contentStyle="{
        paddingLeft: '150px',
        position: 'relative',
        height: '250px',
      }"
    >
      <div class="mould-img">
        <ImgUploader
          @confirm="chooseImg"
          :srcUrl="ruleForm.PhotoUrl"
        ></ImgUploader>
      </div>
      <JvForm :formObj="formObj">
<!--        <template #DeviceNo="{ prop }">-->
<!--          <el-input v-model="formObj.form[prop]" :disabled="IsDisabled">-->
<!--          </el-input>-->
<!--        </template>-->
<!--        <template #DeviceName="{ prop }">-->
<!--          <el-input v-model="formObj.form[prop]" :disabled="IsDisabled">-->
<!--          </el-input>-->
<!--        </template>-->
      </JvForm>
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
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { M_EditTable } from "./editConfig";
import { Form } from "@/jv_doc/class/form";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";

// 引入模块API接口
import { API as Repair } from "@/api/workApi/equipment/repair";
import { mapState } from "vuex";
// 引入模块API接口
import { API as ProjectTask } from "@/api/workApi/project/projectTask";
import {
  getByIdProductionDevice,
  AddDevice,
  UpdateDevice,
} from "@/api/workApi/production/baseData";
import closeTag from "@/utils/closeTag";
import ImgUploader from "@/components/WorkModule/ImgUploader";
export default {
  name: "As_DeviceRepairAdd",
  components: {
    JvUploadFile,
    ImgUploader,
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
      IsDisabled: false,
      cur_Id: this.$route.query.BillId,
      formObj: {},
      detailRouteName: "As_DeviceRepairDetail",
      fileBillId: "",
      M_TableObj: {},
      ruleForm: {
        BillId: "",
        DeviceName: "",
        DeviceNo: "",
        Repairer: "",
        RepairCategory: "FaultRepair",
        CompletionDate: "",
        RepairApplicant: "",
        RepairDate: "",
        State: "",
        Creator: "",
        CreationDate: "",
        Remarks: "",
        PhotoUrl: "",
        BillFiles: [],
      },

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
    console.log(this.$store.state.user.name)
  },
  mounted() {
    // Object.assign(this.formObj.form, this.$route.params);
    if (this.$route.params.type == "toRepair") {
      console.log('this.$route.params.cdata::: ', this.$route.params.cdata);
      this.ruleForm.DeviceName = this.$route.params.cdata.DeviceName;
      this.ruleForm.PhotoUrl = this.$route.params.cdata.PhotoUrl;
      this.ruleForm.DeviceNo = this.$route.params.cdata.DeviceNo;
      console.log(this.formObj.form);
      this.formObj.form =this.ruleForm
      this.IsDisabled = true;
    }
  },
  methods: {
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    chooseImg(e) {
      this.ruleForm.PhotoUrl = e;
    },
    //保存销售订单
    save(saveAndSubmit) {
      this.ruleForm.SaveAndSubmit = saveAndSubmit;
      this.formObj.submitAll([this.formObj.validate], (valid) => {
        if (valid) {
          Object.assign(this.ruleForm, this.formObj.form);
          this._save();
        }
      });
    },
    _save() {
      Repair.api_save(this.ruleForm).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { BillId: res },
        };
        closeTag(this.current, TagName);
      });
    },

  },
  watch: {
    $route(to, from) {
      if (this.$route.params.type == "toRepair") {
        this.formObj.form = this.$route.params.cdata;
        this.ruleForm = this.$route.params.cdata;
        this.IsDisabled = true;
      }
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
