<!--
 * @Author: your name
 * @Date: 2021-11-29 10:47:35
 * @LastEditTime: 2024-07-09 13:47:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectTask\Detail\c-menu.vue
-->
<!--新增-->
<!--编辑销售订单-->
<template>
  <PageWrapper ref="page">
    <!-- tab 导航栏  -->
    <el-tabs @tab-click="tabClick" slot="sticky-tabs">
      <el-tab-pane
        v-for="pane in tabPanes"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      ></el-tab-pane>
    </el-tabs>
    <Action
      slot="sticky-extra"
      size="small"
      :actions="
        btnAction.filter((item) => item.label != $t('Generality.Ge_Copy'))
      "
    ></Action>
    <!-- 单据信息 -->
    <JvBlock
      :title="$t('Generality.Ge_BillInfo')"
      ref="first"
      :contentStyle="{
        paddingLeft: '150px',
        height: '280px',
      }"
      style="position: relative"
    >
      <div class="mould-img">
        <el-image
          :preview-src-list="[imgUrlPlugin(detailObj.detailData.PhotoUrl)]"
          style="width: 100%; height: 100%"
          :src="imgUrlPlugin(detailObj.detailData.PhotoUrl)"
          fit="cover"
        >
          <div slot="error" class="image-slot1">
            <i class="el-icon-picture-outline"></i>
          </div>
        </el-image>
      </div>
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
          <template #RelationId="{ record }">
            <span
              style="color: #409eff; cursor: pointer"
              @click="linkToProject(record)"
            >
              {{ record }}
            </span>
          </template>
        </JvDetail>
        <!-- 状态标签 -->
        <JvState :state="detailObj.detailData.State"></JvState>
      </div>
    </JvBlock>
    <!--物料信息-->
    <JvBlock :title="$t('project.Pro_TestMouldMaterials')" ref="second">
      <JvTable :table-obj="tableObj1"> </JvTable>
    </JvBlock>
    <!-- 试模问题点 -->
    <JvBlock :title="$t('project.Pro_TestMouldProblemPoints')" ref="second">
      <JvTable :tableObj="tableObj">
        <template #BillFiles="{ record }">
          <div v-if="record.length > 0">
            <el-image
              style="width: 50px; height: 50px"
              v-for="(item, index) in record"
              :key="index"
              :preview-src-list="[defaultImgUrl + item]"
              :src="defaultImgUrl + item"
            >
            </el-image>
          </div>
        </template>
      </JvTable>
    </JvBlock>

    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <JvRemark :RemarkData="detailObj.detailData.Remarks"></JvRemark>
    </JvBlock>
    <!--附件-->
    <!--<JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">-->
    <!--  <JvFileExhibit :BillId="cur_Id"></JvFileExhibit>-->
    <!--</JvBlock>-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <div slot="extra">
        <el-button
          size="mini"
          type="primary"
          @click="(_) => $refs.upLoad.upload()"
          >{{ $t("Generality.Ge_Upload") }}</el-button
        >
        <el-button size="mini" type="primary" @click="saveFiles">{{
          $t("Generality.Ge_SaveEdits")
        }}</el-button>
      </div>
      <JvUploadFile
        @returnData="returnData"
        :BillId="cur_Id"
        ref="upLoad"
      ></JvUploadFile>
    </JvBlock>
    <!--审核流程-->
    <JvBlock :title="$t('Generality.Ge_ApproveProcess')" ref="fifth">
      <AuditProcess :process="detailObj.detailData.AuditNodes"></AuditProcess>
    </JvBlock>
    <JvBlock :title="$t('Generality.Ge_Dynamic')" ref="sixth">
      <div slot="extra">
        <el-button size="mini" type="primary" @click="addDynamic">{{
          $t("Generality.Ge_New")
        }}</el-button>
      </div>
      <!-- <DynamicList :cdata="DynamicInfo" @fresh="getData"></DynamicList> -->
    </JvBlock>
    <!-- <Dynamic
      :title="$t('Generality.Ge_New') + $t('Generality.Ge_Dynamic')"
      width="35%"
      :visible.sync="dynamicShow"
      @dynamicConfirm="dynamicConfirm"
    >
    </Dynamic> -->
    <JvDialog
      :visible.sync="informationShow"
      @confirm="informationConfirm"
      width="35%"
      :title="$t('project.Pro_InputTestMouldInfo')"
    >
      <JvForm :form-obj="formObj"></JvForm>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { save_trial_tooling_dynamic } from "@/api/workApi/project/projectTask";
import { mapState } from "vuex";
import { Table, detailConfig, Table1, formSchema } from "./config";
import { Form } from "@/jv_doc/class/form";
import Detail from "@/jv_doc/class/detail/Detail";
import {
  API as ProjectTask,
  successProjectTask,
} from "@/api/workApi/project/projectTask";
import { detailPageModel, imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { save_project_dynamic } from "@/api/workApi/project/projectInfo";
import { taskTypeEnum } from "@/enum/workModule";
import JvState from "@/components/JVInternal/JvState/index";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";
// import Dynamic from "../../projectManage/mouldDetail/cpns/Dynamic.vue";
// import DynamicList from "../../projectManage/mouldDetail/cpns/DynamicList.vue";
import JvUploadFile from "@/components/JVInternal/JvUploadFile/index.vue";
import { update_file_owner } from "@/api/basicApi/systemSettings/upload";
import { format2source } from "~/class/utils/dataFormat";
import JvForm from "~/cpn/JvForm/index.vue";
export default {
  name: "index",
  components: {
    JvForm,
    JvUploadFile,
    JvRemark,
    JvFileExhibit,
    AuditProcess,
    JvState,
    // DynamicList,
    // Dynamic,
  },
  data() {
    return {
      cur_Id: this.$route.query.BillId,
      detailObj: {},
      tableObj: {},
      tableObj1: {},
      DynamicInfo: [],
      btnAction: [],
      defaultImgUrl: window.global_config.ImgBase_Url,
      // 编辑路由指向 谨慎删除
      editRouteName: "Pm_TrialTask_Edit",
      printMod: "Pm_TrialTask_Detail",
      taskTypeEnum,
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("project.Pro_TestMouldProblemPoints"),
          name: "second",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "third",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
        {
          label: this.$t("Generality.Ge_ApproveProcess"),
          name: "fifth",
        },
        {
          label: this.$t("Generality.Ge_Dynamic"),
          name: "sixth",
        },
      ],
      dynamicShow: false,
      informationShow: false,
      formObj: {},
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    //
    // BillIdShow() {},
  },
  created() {
    // this.ruleForm
    this.tableObj = new Table();
    this.tableObj1 = new Table1();
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 3,
    });
    this.formObj = new Form({
      formSchema,
      autoFocus: true,
      baseColProps: { span: 24 },
      labelWidth: "80px",
    });
    this.getData();
  },
  mounted() {},
  methods: {
    imgUrlPlugin,
    // 填写试模信息 确认
    informationConfirm() {
      this.formObj.validate((valid) => {
        if (valid) {
          save_trial_tooling_dynamic({
            BillId: this.cur_Id,
            ...this.formObj.form,
          })
            .then((res) => {
              this.informationShow = false;
              this.getData();
            })
            .catch((err) => {
              this.$message({
                message: err,
                type: "warning",
              });
            });
        }
      });
    },
    // 填写试模 信息
    information() {
      this.informationShow = true;
    },
    getData() {
      ProjectTask.api_get({ BillId: this.cur_Id }).then((res) => {
        formSchema.forEach((item) => {
          this.formObj.form[item.prop] = res.TrialToolingDynamicData[item.prop];
        });
        this.detailObj.setData(res);
        for (let key in res.TrialToolingDynamicData) {
          this.detailObj.detailData[key] = res.TrialToolingDynamicData[key];
        }
        this.tableObj.setData(res.TestMouldProblemPoints);
        this.tableObj1.setData(res.TrialToolingMaterialDetails);
        this.DynamicInfo = res.DynamicInfo || [];
        this.btnAction = detailPageModel(this, res, ProjectTask, this.getData);
        this.btnAction.push(
          {
            label: i18n.t("project.Pro_InputTestMouldInfo"),
            confirm: this.information,
          },
          {
            label: i18n.t("project.Pro_TestMouldMaterials"),
            confirm: this.toItemsDemand,
            disabled: this.detailObj.detailData.State !== "Approved",
          },
          {
            label: this.$t("Generality.Ge_Finished"),
            confirm: this.successProjectTask,
            disabled: this.detailObj.detailData.State !== "Approved",
          } /*,{
          label: this.$t("stockroom.St_Picking"),
          confirm: this.toStockPicking,
          disabled: this.detailObj.detailData.State !== "Approved",
        }*/
        );
      });
    },
    // 完成单据
    successProjectTask() {
      successProjectTask({ BillId: this.cur_Id }).then(() => {
        this.getData();
      });
    },
    toStockPicking() {
      this.$router.push({
        name: "St_Picking_Add",
        params: { trialToolingData: this.detailObj.detailData },
      });
    },
    //跳转到物料需求
    toItemsDemand() {
      this.$router.push({
        name: "De_MaterialRequirement_Add",
        params: {
          ToolingNo: this.detailObj.detailData.ToolingNo,
          PmTaskBillId: this.cur_Id,
          data: [],
        },
      });
    },
    // 新增动态
    addDynamic() {
      this.dynamicShow = true;
    },
    dynamicConfirm(e) {
      console.log(e, 10000);
      let params = Object.assign(
        {},
        {
          DynamicType: "ProjectTask",
          AssociatedNo: this.cur_Id,
        },
        e
      );
      this.saveDynamic(params);
    },
    saveDynamic(params) {
      save_project_dynamic(params).then((res) => {
        this.dynamicShow = false;
        this.getData();
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    linkToProject(BillId) {
      this.$router.push({
        name: "Pm_ProjectTask_Detail",
        query: { BillId },
      });
    },
    saveFiles() {
      update_file_owner({
        BillFiles: this.BillFiles,
        BillId: this.cur_Id,
      }).then((res) => {});
    },
    returnData(fileData) {
      this.BillFiles = fileData;
    },
  },
};
</script>

<style lang="scss" scoped>
.mould-img {
  width: 120px;
  height: 120px;
  // background-color: pink;
  position: absolute;
  left: 10px;
  right: 200px;
}
.el-image {
  ::v-deep .image-slot1 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: #f5f7fa;
    width: 120px;
    i {
      font-size: 20px;
    }
  }
}
.sum-text {
  display: inline-block;
  // padding-right: 100px;
  width: 200px;
  text-align: end;
}
</style>
