<!--销售订单详情-->
<template>
  <PageWrapper ref="page">
    <div slot="sticky-tabs">
      <el-tabs @tab-click="tabClick">
        <!--单据信息-->
        <el-tab-pane
          :label="$t('Generality.Ge_BillInfo')"
          name="first"
        ></el-tab-pane>
        <!--物料信息-->
        <el-tab-pane
          :label="$t('Generality.Ge_ItemsInfo')"
          name="second"
        ></el-tab-pane>
        <!--备注-->
        <el-tab-pane
          :label="$t('Generality.Ge_Remarks')"
          name="third"
        ></el-tab-pane>
        <!--附件-->
        <el-tab-pane
          :label="$t('Generality.Ge_Annex')"
          name="fourth"
        ></el-tab-pane>
        <!--审核流程-->
        <el-tab-pane
          :label="$t('Generality.Ge_ApproveProcess')"
          name="fifth"
        ></el-tab-pane>
      </el-tabs>
    </div>

    <Action slot="sticky-extra" size="small" :actions="btnAction"></Action>
    <!--单据信息-->
    <JvBlock :title="detailObj.detailData.BillId" ref="first">
      <!---->
      <div style="position: relative">
        <JvDetail :detailObj="detailObj"> </JvDetail>
        <JvState :state="detailObj.detailData.State"></JvState>
      </div>
    </JvBlock>

    <!--物料信息-->
    <JvBlock :title="$t('Generality.Ge_ItemsInfo')" ref="second">
      <JvTable :table-obj="tableObj"> </JvTable>
    </JvBlock>
    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="third">
      <JvRemark :RemarkData="RemarkData"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :BillId="fileBillId"></JvFileExhibit>
    </JvBlock>
    <!--审核流程-->
    <JvBlock :title="$t('Generality.Ge_ApproveProcess')" ref="fifth">
      <AuditProcess :process="detailObj.detailData.AuditNodes"></AuditProcess>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { stateEnum } from "@/enum/workModule";
import { tableConfig, detailConfig } from "./config";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { Table } from "@/jv_doc/class/table";
import Detail from "@/jv_doc/class/detail/Detail";
import {
  auditPlugin,
  detailBtnModel,
  detailPageModel,
} from "@/jv_doc/utils/system/index";
import JvState from "@/components/JVInternal/JvState/index";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";
import { API as otherOut } from "@/api/workApi/stockroom/otherOut";
export default {
  name: "index",
  data() {
    return {
      tableObj: {},
      detailObj: {},
      detailData: {},
      formObj: {},
      stateForm: {},
      dialogFormVisible: false,
      tableDetail: [],
      fileBillId: "",
      RemarkData: "",
      type: "",
      btnAction: [],
      // 编辑路由
      editRouteName: "St_OtherOut_Edit",
      addRouteName: "St_OtherOut_Add",
      // 打印模板标识 谨慎删除
      printMod: "St_OtherOut",
    };
  },
  components: {
    JvState,
    JvFileExhibit,
    AuditProcess,
    JvRemark,
  },
  async created() {
    this.fileBillId = this.$route.query.BillId;
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
    });
    this.formObj = new Form({
      formSchema: [
        {
          // 字段名
          prop: "Remarks",
          cpn: "FormInput",
          label: this.$t("Generality.Ge_Remarks"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["change", "blur"],
            },
          ],
        },
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
    this.tableObj = new Table({
      tableSchema: tableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    });
    await this.GetData();
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    stateMap() {
      return stateEnum[this.detailObj.detailData.State];
    },
  },

  methods: {
    //获取数据
    async GetData() {
      await otherOut
        .api_get({ BillId: this.$route.query.BillId })
        .then((res) => {
          this.detailObj.detailData = res;
          this.RemarkData = res.Remarks;
          this.stateForm = auditPlugin(res);
          this.tableObj.setData(res.BillItems);
          this.btnAction = detailPageModel(this, res, otherOut, this.GetData);
        });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
};
</script>

<style lang="scss" scoped></style>
