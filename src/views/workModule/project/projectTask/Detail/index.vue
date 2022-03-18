<!--
 * @Author: your name
 * @Date: 2021-11-29 10:47:35
 * @LastEditTime: 2022-01-20 16:39:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectTask\Detail\index.vue
-->
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
    <Action slot="sticky-extra" size="small" :actions="btnAction"></Action>
    <JvBlock
      :title="$t('Generality.Ge_BillInfo')"
      ref="first"
      :contentStyle="{
        paddingLeft: '150px',
        height: '140px',
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

      </el-image>
      </div>
      <div style="position: relative">
      <JvDetail :detailObj="detailObj">
        <template #TaskType="{ record }">
          <!-- 状态标签 -->
          {{ taskTypeEnum[record].name }}
        </template>
      </JvDetail>

        <JvState :state="detailObj.detailData.State"></JvState>

      </div>
    </JvBlock>
    <!-- 物料信息 -->
    <JvBlock :title="$t('Generality.Ge_ProcessInfo')" ref="second">
      <JvTable :tableObj="tableObj">
        <template #operation="{ row }">
          <TableAction
            :actions="[
              {
                label: $t('project.Pro_ReportToWorkRecord'),
                confirm: jobRecordVisiable.bind(null, row),
              },
            ]"
          />
        </template>
        <template #Progress="{ row }">
          <el-progress
            :text-inside="true"
            :stroke-width="14"
            :percentage="row.Progress"
          ></el-progress>
        </template>
      </JvTable>
    </JvBlock>

    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <JvRemark :RemarkData="detailObj.detailData.Remarks"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :BillId="cur_Id"></JvFileExhibit>
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
      <DynamicList :cdata="DynamicInfo" @fresh="getData"></DynamicList>
    </JvBlock>
    <Dynamic
      :title="$t('Generality.Ge_New') + $t('Generality.Ge_Dynamic')"
      width="35%"
      :visible.sync="dynamicShow"
      @dynamicConfirm="dynamicConfirm"
    >
    </Dynamic>
    <JvDialog
      :visible.sync="dialogVisible"
      :title="$t('project.Pro_ReportToWorkRecord')"
      v-if="dialogVisible"
      @confirm="dialogConfirm"
      width="60%"
    >
      <JvTable :tableObj="jobRecordTableObj">
        <template #TaskType="{ record }">
          <!-- 状态标签 -->
          {{ taskTypeEnum[record].name }}
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { mapState } from "vuex";
import { Table, detailConfig } from "./config";
import { JobRecordTable } from "./jobRecordTableConfig";
import Detail from "@/jv_doc/class/detail/Detail";
import {
  API as ProjectTask,
  getJobRecord,
  successProjectTask,
} from "@/api/workApi/project/projectTask";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { save_project_dynamic } from "@/api/workApi/project/projectInfo";
import { detailPageModel } from "@/jv_doc/utils/system/index";
import { taskTypeEnum } from "@/enum/workModule";
import JvState from "@/components/JVInternal/JvState/index";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";
import Dynamic from "../../projectManage/mouldDetail/cpns/Dynamic.vue";
import DynamicList from "../../projectManage/mouldDetail/cpns/DynamicList.vue";
export default {
  // name: "Pm_ProjectTask_Detail",
  components: {
    JvRemark,
    JvFileExhibit,
    AuditProcess,
    JvState,
    DynamicList,
    Dynamic,
  },
  data() {
    return {
      cur_Id: this.$route.query.BillId,
      detailObj: {},
      // 工序
      tableObj: {},
      jobRecordTableObj: {},
      btnAction: [],
      DynamicInfo: [],
      // 编辑路由指向 谨慎删除
      editRouteName: "Pm_ProjectTask_Edit",
      printMod: "Pm_ProjectTask",
      taskTypeEnum,
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_ProcessInfo"),
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
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),

    BillIdShow() {},
  },
  created() {
    // this.ruleForm
    this.tableObj = new Table();
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 3,
    });
    this.jobRecordTableObj = new JobRecordTable();
    this.getData();
  },
  mounted() {},
  methods: {
    imgUrlPlugin,
    getData() {
      ProjectTask.api_get({ BillId: this.cur_Id }).then((res) => {
        this.detailObj.setData(res);
        this.tableObj.setData(res.BillItems);
        this.DynamicInfo = res.DynamicInfo || [];
        this.btnAction = detailPageModel(this, res, ProjectTask, this.getData);
        this.btnAction.push({
          label: this.$t("Generality.Ge_Finished"),
          confirm: this.successProjectTask,
          disabled: this.detailObj.detailData.State !== "Approved",
        });
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
    jobRecordVisiable(row) {
      getJobRecord({ ItemId: row.Id }).then((res) => {
        this.dialogVisible = true;
        this.jobRecordTableObj.setData(res.Items);

      });
    },
    dialogConfirm() {
      this.dialogVisible = false;
    },
    // 完成单据
    successProjectTask() {
      successProjectTask({ BillId: this.cur_Id }).then(() => {
        this.getData();
      });
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

  .sum-text {
  display: inline-block;
  // padding-right: 100px;
  width: 200px;
  text-align: end;
}
</style>
