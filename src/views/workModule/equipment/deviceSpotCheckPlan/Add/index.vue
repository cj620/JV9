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
      :title="$t('device.De_PlanInfo')"
      ref="first"

    >
      <JvForm :formObj="formObj">
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

    </div>
  </PageWrapper>
</template>

<script>
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index";

import { mapState } from "vuex";
// 引入模块API接口
import { API,assets_device_add } from "@/api/workApi/equipment/device";
import closeTag from "@/utils/closeTag";
export default {
  name: "As_DeviceSpotCheckPlan_Add",
  components: {
    JvUploadFile,
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
      cur_Id: this.$route.query.DeviceNo,
      formObj: {},
      detailRouteName: "As_DeviceDetail",
      fileBillId: "",
      machineCategory: 'Machine',
      ruleForm: {
        BillId: "",
        BillGui: "",
        PlanName: "",
        RoleName: "",
        PlanType: "",
        SpotCheckType: "",
        ExecutionTime: "",
        TimeOut: "",
        AfterTimeOut: "",
        State: "",
        BillItems: [],
        BillMembers: [],
        BillFiles: [],
      },
      BillItems:{
        Id: 0,
        BillGui: "",
        SortOrder: "",
        SpotCheckContent: "",
      },
      BillMembers:{
        Id: 0,
        BillGui: "",
        DeviceNo: "",
        DeviceName: "",
        SpecModel: "",
        PhotoUrl: "",
      },
      tabPanes: [
        {
          label: this.$t("menu.Pr_Devices"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "third",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
      ],
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
    this.GetTplData()
    this.formObj.formSchema[0].cpnProps.disabled=false
    this.formObj.formSchema[1].cpnProps.disabled=false
    this.ruleForm.DeviceCategory=this.machineCategory
    console.log(this.formObj);
  },
  mounted() {
    Object.assign(this.formObj.form, this.$route.params);
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
      assets_device_add(this.ruleForm).then((res) => {
        let TagName = {
          name: this.detailRouteName,
          query: { DeviceNo: this.ruleForm.DeviceNo },
        };
        closeTag(this.current, TagName);
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
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
