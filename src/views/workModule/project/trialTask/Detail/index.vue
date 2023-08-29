<!--
 * @Author: your name
 * @Date: 2021-11-29 10:47:35
 * @LastEditTime: 2022-03-31 16:25:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectTask\Detail\index.vue
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

      </el-image>
      </div>
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
        <!-- 任务类别 -->
          <template #TaskType="{ record }">
            {{ taskTypeEnum[record].name }}
          </template>
        </JvDetail>
        <!-- 状态标签 -->
        <JvState :state="detailObj.detailData.State"></JvState>
      </div>
    </JvBlock>
    <!-- 试模动态信息 -->
    <JvBlock title="试模问题点" ref="second">
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

  </PageWrapper>
</template>

<script>
import { mapState } from "vuex";
import { Table, detailConfig } from "./config";
import Detail from "@/jv_doc/class/detail/Detail";
import {
  API as ProjectTask,
  successProjectTask,
} from "@/api/workApi/project/projectTask";
import { imgUrlPlugin } from "@/jv_doc/utils/system/index.js";
import { save_project_dynamic } from "@/api/workApi/project/projectInfo";
// import { detailPageModel } from "@/jv_doc/utils/system/index";
import { taskTypeEnum } from "@/enum/workModule";
import JvState from "@/components/JVInternal/JvState/index";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";
import Dynamic from "../../projectManage/mouldDetail/cpns/Dynamic.vue";
import DynamicList from "../../projectManage/mouldDetail/cpns/DynamicList.vue";
export default {
  name: "Pm_TrialTask_Detail",
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
      // btnAction: [],
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
          label: '试模问题点',
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
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 3,
    });
    this.getData();
  },
  mounted() {},
  methods: {
    imgUrlPlugin,
    getData() {
      ProjectTask.api_get({ BillId: this.cur_Id }).then((res) => {
        this.detailObj.setData(res);
        for (let key in res.TrialToolingDynamicData) {
          this.detailObj.detailData[key] = res.TrialToolingDynamicData[key];
        }
        this.tableObj.setData(res.TestMouldProblemPoints);
        this.DynamicInfo = res.DynamicInfo || [];
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
