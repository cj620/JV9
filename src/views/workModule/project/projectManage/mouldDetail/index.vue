<!--销售订单详情-->
<template>
  <PageWrapper ref="page" class="mould-detail">
    <el-tabs @tab-click="tabClick" slot="sticky-tabs">
      <!-- tab 导航栏  -->
      <el-tab-pane
        v-for="pane in tabPanes"
        :key="pane.name"
        :label="pane.label"
        :name="pane.name"
      ></el-tab-pane>
    </el-tabs>

    <!-- <Action slot="sticky-extra" size="small" :actions="btnAction"></Action> -->

    <a
      :href="'JvisoftFileManager:' + cur_Id"
      class="customize-button"
      slot="sticky-extra"
      >{{ $t("project.Pro_FileManagement") }}
    </a>

    <!--单据信息-->
    <JvBlock
      :title="$t('Generality.Ge_BasicInformation')"
      ref="first"
      :contentStyle="{
        paddingLeft: '150px',
        height: '140px',
      }"
      style="position: relative"
    >
      <div slot="extra">
        <el-button
          size="mini"
          type="primary"
          @click="editBaciInfo(detailObj.detailData)"
        >
          编辑
        </el-button>
      </div>
      <div class="mould-img">
        <el-image
          style="width: 100%; height: 100%"
          :src="imgUrlPlugin(this.detailObj.detailData.PhotoUrl)"
          :preview-src-list="[imgUrlPlugin(this.detailObj.detailData.PhotoUrl)]"
        ></el-image>
      </div>
      <JvDetail :detailObj="detailObj"> </JvDetail>
    </JvBlock>
    <!-- 技术要求 -->
    <JvBlock :title="$t('project.Pro_TechnicalRequirement')" ref="second">
      <div slot="extra">
        <el-button size="mini" type="primary" @click="edit_T_table">{{
          $t("Generality.Ge_Edit")
        }}</el-button>
      </div>
      <JvTable :table-obj="T_tableObj"> </JvTable>
      <!-- <div style="width: 45%; display: inline-block"></div> -->
    </JvBlock>
    <!-- 相关人员 -->
    <JvBlock :title="$t('project.Pro_RelevantPersonnel')" ref="third">
      <JvTable :table-obj="R_tableObj"> </JvTable>
    </JvBlock>
    <!-- 项目任务 -->
    <JvBlock :title="$t('menu.Pm_ProjectTask')" ref="fourth">
      <div slot="extra">
        <el-button
          size="mini"
          type="primary"
          @click="addNewTask(taskTypeEnum['NewTooling'].value)"
          >{{ $t("project.Pro_AddNewToolingTask") }}</el-button
        >
        <el-button
          size="mini"
          type="primary"
          @click="addNewTask(taskTypeEnum['DesignChange'].value)"
          >{{ $t("project.Pro_AddDesignChangeTask") }}</el-button
        >
        <el-button
          size="mini"
          type="primary"
          @click="addNewTask(taskTypeEnum['TrialTooling'].value)"
          >{{ $t("project.Pro_AddTrialMoldTask") }}</el-button
        >
      </div>
      <JvTable :table-obj="P_tableObj">
        <template #State="{ record }">
          <!-- 状态标签 -->
          <BillStateTags :state="record"></BillStateTags>
        </template>
        <template #TaskType="{ record }">
          <!-- 状态标签 -->
          {{ taskTypeEnum[record].name }}
        </template>
      </JvTable>
    </JvBlock>
    <!-- 动态 -->
    <JvBlock :title="$t('Generality.Ge_Dynamic')" ref="fifth">
      <div slot="extra">
        <el-button size="mini" type="primary" @click="addDynamic">{{
          $t("Generality.Ge_New")
        }}</el-button>
      </div>
      <DynamicList :cdata="DynamicInfo" @fresh="getData"></DynamicList>
    </JvBlock>
    <Dynamic
      :title="$t('Generality.Ge_New') + $t('Generality.Ge_Dynamic')"
      width="35%"
      :visible.sync="dynamicShow"
      @dynamicConfirm="dynamicConfirm"
    >
    </Dynamic>
    <jv-dialog
      title="编辑"
      width="35%"
      :visible.sync="editVisible"
      v-if="editVisible"
      @confirm="confirmEditDate"
      :autoFocus="true"
      :confirmText="$t('Generality.Ge_Save')"
    >
      <JvForm :formObj="formObj1"> </JvForm>
      <JvUploadList v-model="ImgDataList" :listType="false"></JvUploadList>
    </jv-dialog>
  </PageWrapper>
</template>

<script>
import { detailConfig, P_Table, T_Table, R_Table } from "./config";
import { data2doubleCol } from "@/views/workModule/sale/saleQuote/utils";
import Dynamic from "./cpns/Dynamic.vue";
import Detail from "@/jv_doc/class/detail/Detail";
import {
  getToolingDetail,
  save_project_dynamic,
} from "@/api/workApi/project/projectInfo";
import { saveToolingBasis } from "@/api/basicApi/systemSettings/Item";
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { taskTypeEnum } from "@/enum/workModule";
import JvUploadList from "@/components/JVInternal/JvUpload/List";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import DynamicList from "./cpns/DynamicList.vue";
import { formSchema1 } from "./formConfig";
import { Form } from "~/class/form";
export default {
  name: "index",
  components: { BillStateTags, DynamicList, Dynamic, JvUploadList },
  data() {
    return {
      ImgDataList: [],
      editVisible: false, // 编辑基础信息弹窗
      // 当前单据的id
      cur_billId: "",
      // 技术要求
      T_tableObj: {},
      // 相关人员
      R_tableObj: {},
      // 项目任务
      P_tableObj: {},
      detailObj: {},
      dynamicShow: false,
      cur_Id: this.$route.query.BillId,
      DynamicInfo: [],
      taskTypeEnum,
      btnAction: [
        {
          label: this.$t("project.Pro_FileManagement"),
          confirm: () => {},
        },
      ],
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BasicInformation"),
          name: "first",
        },
        {
          label: this.$t("project.Pro_TechnicalRequirement"),
          name: "second",
        },
        {
          label: this.$t("project.Pro_RelevantPersonnel"),
          name: "third",
        },
        {
          label: this.$t("menu.Pm_ProjectTask"),
          name: "fourth",
        },
        {
          label: this.$t("Generality.Ge_Dynamic"),
          name: "fifth",
        },
      ],
      // 技术要求模板
      skillReqTemp: [],
      // 打印模板标识 谨慎删除
      printMod: "Sa_SaleOrder",
      formObj1: {},
    };
  },
  async created() {
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
    });
    this.P_tableObj = new P_Table();
    this.T_tableObj = new T_Table();
    this.R_tableObj = new R_Table();
    await this.getData();

    this.formObj1 = new Form({
      formSchema: formSchema1,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
  },

  methods: {
    imgUrlPlugin,
    //获取数据
    getData() {
      getToolingDetail({ ToolingNo: this.cur_Id }).then((res) => {
        this.detailObj.setData(res.ToolingBasicInfo);
        this.P_tableObj.setData(res.ProjectTaskInfo);
        this.skillReqTemp = res.ToolingSpecInfo;
        this.R_tableObj.setData(data2doubleCol(res.RelatedWorkerInfo));
        this.T_tableObj.setData(data2doubleCol(res.ToolingSpecInfo));
        this.DynamicInfo = res.DynamicInfo;
      });
    },

    addNewTask(TaskType) {
      this.$router.push({
        name: "Pm_ProjectTask_Add",
        params: {
          ToolingNo: this.detailObj.detailData.ToolingNo,
          TaskType,
        },
      });
    },
    dynamicConfirm(e) {
      console.log(e, 10000);
      let params = Object.assign(
        {},
        {
          DynamicType: "Tooling",
          AssociatedNo: this.detailObj.detailData.ToolingNo,
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
    // 编辑技术要求
    edit_T_table() {
      this.$router.push({
        name: "ProjectManage_skill_req",
        params: {
          ToolingNo: this.detailObj.detailData.ToolingNo,
          skillTemp: this.skillReqTemp,
        },
      });
    },
    // 新增动态
    addDynamic() {
      this.dynamicShow = true;
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    editBaciInfo(data) {
      this.editVisible = true;
      data.ItemName = JSON.parse(JSON.stringify(data.ToolingName));
      this.formObj1.form = JSON.parse(JSON.stringify(data));
      this.ImgDataList = [JSON.parse(JSON.stringify(data.PhotoUrl))];
    },
    confirmEditDate() {
      this.formObj1.form.PhotoUrl = this.ImgDataList[0];
      this.formObj1.form.ItemId = this.formObj1.form.ToolingNo;
      this.formObj1.form.DataState = "Modify";
      saveToolingBasis(this.formObj1.form).then((res) => {
        this.editVisible = false;
        this.getData();
      });
    }
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
  right: 100px;
}
.customize-button {
  padding: 7px 15px;
  color: #ffffff;
  border-radius: 3px;
  background: #1890ff;
  cursor: pointer;
  margin-bottom: 10px;
}
.mould-detail {
}
</style>
