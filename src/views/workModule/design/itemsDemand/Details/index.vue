<!--物料需求详情-->
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
    <!-- :dropDownActions="[
        {
          label: '领料',
          disabled: !stateForm.transform,
          confirm: orderTransform.bind(null, 'St_Picking_Add', 'deliveryData'),
        },
        {
          label: '退料',
          disabled: !stateForm.transform,
          confirm: orderTransform.bind(
            null,
            'St_ReturnPicking_Add',
            'deliveryData'
          ),
        },
      ]" -->
    <Action slot="sticky-extra" size="small" :actions="btnAction"></Action>
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
      <JvTable :table-obj="tableObj">
        <template #State="{ record }">
          {{ demandStatusMap[record] && demandStatusMap[record].name }}
        </template>
      </JvTable>
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
import { stateEnum, demandStatusEnum } from "@/enum/workModule";
import { tableConfig, detailConfig } from "./config";
import { mapState } from "vuex";
import closeTag from "@/utils/closeTag";
import { Table } from "@/jv_doc/class/table";
import Detail from "@/jv_doc/class/detail/Detail";
import JvState from "@/components/JVInternal/JvState/index";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import { auditPlugin, detailBtnModel,detailPageModel } from "@/jv_doc/utils/system/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";
import { API as materialRequirement } from "@/api/workApi/design/materialRequirement";
export default {
  name: "index",
  components: {
    JvState,
    JvFileExhibit,
    AuditProcess,
    JvRemark,
  },
  data() {
    return {
      // 当前单据的id
      cur_billId: "",
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
      // 编辑路由指向 谨慎删除
      editRouteName: "De_ItemsDemand_Edit",
      // 打印模板标识 谨慎删除
      printMod: "De_ItemsDemand",
    };
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
    demandStatusMap() {
      return demandStatusEnum;
    },
  },

  methods: {
    //获取数据
    async GetData() {
      await materialRequirement
        .api_get({ BillId: this.$route.query.BillId })
        .then((res) => {
          console.log(this.tableObj);
          this.detailObj.detailData = res;
          this.RemarkData = res.Remarks;
          this.cur_billId = res.BillId;
          this.stateForm = auditPlugin(res);
          this.tableObj.setData(res.BillItems);
          this.btnAction = detailPageModel(this, res, materialRequirement, this.GetData);
          this.btnAction.push({
            label: this.$t("stockroom.St_Picking"),
            confirm: this.toStockPicking,
            disabled: this.detailObj.detailData.State !== "Approved",
          });
        });
    },
    toStockPicking(){
      console.log(this.detailObj.detailData);
      this.$router.push({
        name: "St_Picking_Add",
        params: { itemsDemandData: this.detailObj.detailData },
      });
    },
    //订单转
    orderTransform(routerName, keyName) {
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
