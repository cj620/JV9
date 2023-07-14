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

    <Action slot="sticky-extra"
            size="small"
            :actions="btnAction"
            :dropDownActions="[
        {
          label: '订单',
          disabled: !this.detailObj.detailData.State==='Approved',
          confirm: orderTransform.bind(
            null,
            'Sa_SaleOrder_Add',
            'quotationData'
          ),
        },
      ]"
    ></Action>
    <!--单据信息-->
    <JvBlock
      :title="cur_billId"
      ref="first"
      :contentStyle="{
        paddingLeft: '150px',
        height: '170px',
        position: 'relative',
      }"
    >
      <div class="mould-img">
        <el-image
          style="width: 100%; height: 100%"
          :src="imgUrlPlugin(this.detailObj.detailData.PhotoUrl)"
          :preview-src-list="[imgUrlPlugin(this.detailObj.detailData.PhotoUrl)]"
        ></el-image>
      </div>
      <JvDetail :detailObj="detailObj"> </JvDetail>
      <JvState :state="detailObj.detailData.State"></JvState>
    </JvBlock>

    <!--材料费用-->
    <JvBlock :title="$t('sale.Sa_MaterialCost')" ref="second">
      <JvTable :table-obj="M_TableObj"> </JvTable>
    </JvBlock>
    <!--加工费用及项目费用-->
    <JvBlock :title="$t('sale.Sa_ProcessingCostAndProjectCost')" ref="third">
      <JvTable :table-obj="P_TableObj"> </JvTable>
    </JvBlock>
    <!-- 成本合计 -->
    <JvBlock
      :contentStyle="{
        textAlign: 'end',
        paddingRight: '50px',
        background: '#ffd3a5',
      }"
    >
      {{ $t("sale.Sa_Subtotal") }}:<span class="sum-text">{{
        amountFormat(detailObj.detailData.CommonCostAmount)
      }}</span>
    </JvBlock>
    <!--附加费用-->
    <JvBlock :title="$t('sale.Sa_AdditionalCharges')" ref="fourth">
      <div style="width: 45%; display: inline-block"></div>
      <div style="width: 50%; display: inline-block">
        <JvTable :table-obj="C_TableObj"> </JvTable>
      </div>
    </JvBlock>
    <!-- 报价合计 -->
    <JvBlock
      :contentStyle="{
        textAlign: 'end',
        paddingRight: '50px',
        background: '#ffd3a5',
      }"
    >
      {{ $t("sale.Sa_TotalQuotation") }}:<span class="sum-text">{{
        amountFormat(detailObj.detailData.TotalAmount)
      }}</span>
    </JvBlock>

    <!--备注-->
    <JvBlock :title="$t('Generality.Ge_Remarks')" ref="fifth">
      <JvRemark :RemarkData="detailObj.detailData.Remarks"></JvRemark>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="sixth">
      <JvFileExhibit :BillId="cur_billId"></JvFileExhibit>
    </JvBlock>
    <!--审核流程-->
    <JvBlock :title="$t('Generality.Ge_ApproveProcess')" ref="seventh">
      <AuditProcess :process="detailObj.detailData.AuditNodes"></AuditProcess>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { tableConfig, detailConfig } from "./form.config";
import { M_Table, P_Table, C_Table } from "./table.config";
import { Table } from "@/jv_doc/class/table";
import Detail from "@/jv_doc/class/detail/Detail";
import JvState from "@/components/JVInternal/JvState/index";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import { detailPageModel } from "@/jv_doc/utils/system/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";
import { data2doubleCol } from "../utils";
import { amountFormat, amount2Number } from "@/jv_doc/utils/handleData/index";
import { imgUrlPlugin } from "@/jv_doc/utils/system";
import { API as Quotation } from "@/api/workApi/sale/quotation";
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
      // 材料费用
      M_TableObj: {},
      // 加工及项目费用
      P_TableObj: {},
      // 成本费用
      C_TableObj: {},
      // 当前单据的id
      cur_billId: this.$route.query.BillId,
      tableObj: {},
      detailObj: {},
      detailData: {},
      btnAction: [],
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("sale.Sa_MaterialCost"),
          name: "second",
        },
        {
          label: this.$t("sale.Sa_ProcessingCostAndProjectCost"),
          name: "third",
        },
        {
          label: this.$t("sale.Sa_AdditionalCharges"),
          name: "fourth",
        },
        {
          label: this.$t("Generality.Ge_Remarks"),
          name: "fifth",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "sixth",
        },
        // 审核流程
        {
          label: this.$t("Generality.Ge_ApproveProcess"),
          name: "seventh",
        },
      ],
      // 编辑路由指向 谨慎删除
      editRouteName: "Sa_SaleQuote_Edit",
      // 打印模板标识 谨慎删除
      printMod: "Sa_SaleQuote",
    };
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
    this.M_TableObj = new M_Table();
    this.P_TableObj = new P_Table();
    this.C_TableObj = new C_Table();
    this.GetData();
  },
  computed: {},

  methods: {
    //获取数据
    GetData() {
      Quotation.api_get({ BillId: this.$route.query.BillId }).then((res) => {
        this.detailObj.detailData = res;
        this.M_TableObj.setData(res.MaterialCost);
        // this.P_TableObj.setData(res.ProductionCost);
        this.P_TableObj.setData(data2doubleCol(res.ProductionCost));
        this.C_TableObj.setData(res.AdditionalCost);
        this.btnAction = detailPageModel(this, res, Quotation, this.GetData);
        this.btnAction=[...this.btnAction,...[{
          label: '复制',
          confirm: this.copy,
        }]]
      });
    },
    copy(){
      this.$router.push({
        name: "Sa_SaleQuote_Add",
        query: { BillId: this.$route.query.BillId, type: "copy" },
      });
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
    //订单转
    orderTransform(routerName, keyName) {
      this.$router.push({
        name: routerName,
        params: { [keyName]: this.detailObj.detailData },
      });
    },
    amountFormat,
    imgUrlPlugin,
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
