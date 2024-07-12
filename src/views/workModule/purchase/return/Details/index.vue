<!--销售订单详情-->
<template>
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
    <!--单据信息-->
    <JvBlock :title="detailObj.detailData.BillId" ref="first">
      <!---->
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
          <!-- <template #sex="{ record }">
          </template> -->
        </JvDetail>
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
import { stateEnum } from "@/enum/workModule";
import { tableConfig, detailConfig } from "./config";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { Table } from "@/jv_doc/class/table";
import Detail from "@/jv_doc/class/detail/Detail";
import JvState from "@/components/JVInternal/JvState/index";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import { auditPlugin } from "@/jv_doc/utils/system/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";
import { API } from "@/api/workApi/purchase/return";
import { detailPageModel } from "@/jv_doc/utils/system/index";

export default {
  name: "index",
  data() {
    return {
      tableObj: {},
      detailObj: {},
      detailData: {},
      stateForm: {},
      tableDetail: [],
      fileBillId: "",
      RemarkData: "",
      type: "",
      btnAction: [],
      editRouteName: "Pu_Return_Edit",
      addRouteName: "Pu_Return_Add",
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("Generality.Ge_ItemsInfo"),
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
      ],
      printMod: "Pu_Return",
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
      console.log(stateEnum, this.detailObj.detailData, "状态");
      return stateEnum[this.detailObj.detailData.State];
    },
  },

  methods: {
    //获取数据
    async GetData() {
      await API.api_get({ BillId: this.$route.query.BillId }).then((res) => {
        this.detailObj.detailData = res;
        this.RemarkData = res.Remarks;
        this.stateForm = auditPlugin(res);
        this.tableObj.setData(res.BillItems);
        this.btnAction = detailPageModel(this, res, API, this.GetData);
        this.btnAction.push({
          label: '发票',
          disabled: !this.stateForm.transform,
          confirm: this.Account.bind(null,'Pu_Account_Add', 'deliveryData'),
        },)
      });
    },
    Account(routerName,keyName) {
      this.detailObj.detailData.RelationId = this.detailObj.detailData.BillId
      this.$router.push({
        name: routerName,
        params: { [keyName]: this.detailObj.detailData },
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
