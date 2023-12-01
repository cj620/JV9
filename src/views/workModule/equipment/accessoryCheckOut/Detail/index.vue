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
    <Action
      slot="sticky-extra"
      size="small"
      :actions="btnAction">
    </Action>
    <!--单据信息-->
    <JvBlock :title="cur_billId" ref="first">
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
      <JvRemark :RemarkData="detailObj.detailData.Remarks"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :BillId="cur_billId"></JvFileExhibit>
    </JvBlock>
    <!--审核流-->
    <JvBlock :title="$t('Generality.Ge_ApproveProcess')" ref="fifth">
      <AuditProcess :process="detailObj.detailData.AuditNodes"></AuditProcess>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { tableConfig, detailConfig } from "./config";
import { Table } from "@/jv_doc/class/table";
import Detail from "@/jv_doc/class/detail/Detail";
import { API } from "@/api/workApi/equipment/accessoryCheckout";
import JvState from "@/components/JVInternal/JvState/index.vue";
import JvRemark from "@/components/JVInternal/JvRemark/index.vue";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index.vue";
import AuditProcess from "@/components/BasicModule/AuditProcess/index.vue";
import { mapState } from "vuex";
import { stateEnum } from "@/enum/workModule";
import { auditPlugin } from "@/jv_doc/utils/system/index";
import { detailPageModel } from "@/jv_doc/utils/system";

export default {
  name: "index",
  components: {
    AuditProcess,
    JvFileExhibit,
    JvRemark,
    JvState
  },
  data() {
    return {
      detailObj: {},
      tableObj: {},
      cur_billId: "",
      btnAction: [],
      stateForm: {},
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
      editRouteName: "As_AccessoryCheckOutEdit",
      addRouteName: "As_AccessoryCheckOutAdd",
      printMod: "As_AccessoryCheckOutDetail",
    }
  },
  async created() {
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
      return stateEnum[this.detailObj.detailData.State];
    },
  },
  methods: {
    async GetData() {
       API.api_get({ BillId: this.$route.query.BillId }).then((res) => {
        this.cur_billId = res.BillId;
        this.detailObj.detailData = res;
        this.stateForm = auditPlugin(res);
        this.tableObj.setData(res.BillItems);
        this.btnAction = detailPageModel(this, res, API, this.GetData)
      })
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  }
}
</script>
