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
        height: '175px',
      }"
    >
      <div class="mould-img">
        <ImgUploader
          @confirm="chooseImg"
          :srcUrl="ruleForm.PhotoUrl"
        ></ImgUploader>
      </div>
      <JvForm :formObj="formObj">
        <template #DeviceNo="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            remote
            reserve-keyword
            clearable
            :remote-method="remoteMethod"
            @change="selectDevice"
          >
            <el-option
              v-for="item in ListData"
              :key="item.DeviceNo"
              :label="item.DeviceNo"
              :value="item.DeviceNo"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </JvBlock>
    <!-- 问题描述 -->
    <JvBlock :title="$t('device.De_ProblemDescription')" ref="second">
      <el-input type="textarea" :rows="2" v-model="ruleForm.ProblemDescription">
      </el-input>
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
      <el-button type="primary" @click="save">{{
        $t("Generality.Ge_Save")
      }}</el-button>
    </div>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";

// 引入模块API接口
import {API, API as Repair} from "@/api/workApi/equipment/repair";
import { timeFormat } from "~/utils/time/index";
import { assets_device_list } from "@/api/workApi/equipment/device"
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import ImgUploader from "@/components/WorkModule/ImgUploader";
export default {
  name: "As_DeviceRepairAdd",
  components: {
    JvUploadFile,
    ImgUploader,
  },
  data() {
    return {
      cur_Id: this.$route.query.BillId,
      formObj: {},
      schema: {},
      detailRouteName: "As_DeviceRepairDetail",
      fileBillId: "",
      ListData: [],
      ruleForm: {
        BillId: "",
        BillGui: "",
        DeviceNo: "",
        DeviceName: "",
        RepairCategory: "",
        Repairer: "",
        RepairApplicant: "",
        RepairDate: "",
        CompletionDate: "",
        PlanCompletionDate: "",
        Remarks: "",
        PhotoUrl: "",
        MaintenancePersonnel: "",
        RepairLevel: "",
        ProblemDescription: "",
        RepairResults: "",
        BillFiles: [],
        BillItems: [],
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
    this.schema = formSchema;
    this.remoteMethod("");
    if (!this.cur_Id) {
      this.formObj.form.RepairCategory = "FaultRepair";
      this.formObj.form.RepairApplicant = this.$store.state.user.name;
      if (this.$route.params.type === "toRepair") {
        this.formObj.form.DeviceNo = this.$route.params.cdata.DeviceNo
        this.formObj.form.DeviceName = this.$route.params.cdata.DeviceName
        this.ruleForm.PhotoUrl = this.$route.params.cdata.PhotoUrl
      }
    } else {
      this.getData()
    }
  },
  methods: {
    // 复制或编辑时获取数据
    getData() {
      this.fileBillId = this.cur_Id
      API.api_get({ BillId: this.cur_Id }).then((res) => {
        this.formObj.form = res;
        this.ruleForm = res;
        this.$delete(this.ruleForm,'State')
        this.$delete(this.ruleForm,'AcceptedBy')
        this.$delete(this.ruleForm,'CreationDate')
        this.$delete(this.ruleForm,'Creator')
        this.$delete(this.ruleForm,'DevicePhotoUrl')
      })
    },
    //上传文件返回的数据
    returnData(fileData) {
      this.ruleForm.BillFiles = fileData;
    },
    chooseImg(e) {
      this.ruleForm.PhotoUrl = e;
    },
    //保存销售订单
    save() {
      this.formObj.submitAll([this.formObj.validate], (valid) => {
        if (valid) {
          Object.assign(this.ruleForm, this.formObj.form);
          if (this.ruleForm.RepairDate === "") {
            this.ruleForm.RepairDate = timeFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
          }
          this.ruleForm.PlanCompletionDate = ""
          this.ruleForm.CompletionDate = ""
          if (this.$route.query.type === "copy"){
            this.ruleForm.BillGui = ""
            this.ruleForm.BillId = ""
            this.ruleForm.RepairResults = ""
          }
          Repair.api_save(this.ruleForm).then((res) => {
            let TagName = {
              name: this.detailRouteName,
              query: { BillId: res },
            };
            closeTag(this.current, TagName);
          });
        }
      });
    },
    remoteMethod(query){
      const str = {
          Keyword: query,
          PageSize: 20,
          CurrentPage: 1,
      };
      assets_device_list(str).then((res) => {
        this.ListData = res.Items
      })
    },
    selectDevice(e){
      if (e) {
        const item = this.ListData.find(obj => obj.DeviceNo === e)
        this.formObj.form.DeviceName = item.DeviceName;
      }
    }
  },
  watch:{
    "formObj.form.RepairCategory": {
      handler(n, o) {
        if (n === "PrecisionRepair"){
          this.formObj.formSchema = this.schema.filter(item => item.prop !== "MaintenancePersonnel");
          this.formObj.form.MaintenancePersonnel = ""
        } else if (n === "FaultRepair"){
          this.formObj.formSchema = this.schema.filter(item => item.prop !== "Repairer");
          this.formObj.form.Repairer = ""
        } else {
          this.formObj.formSchema = this.schema
        }
      },
    },
  }
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
