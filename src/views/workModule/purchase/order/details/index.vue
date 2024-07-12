<!--采购订单详情-->
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
    <!-- Pu_Order_PR -->
    <Action
      slot="sticky-extra"
      size="small"
      :actions="btnAction"
      :dropDownActions="[
        {
          label: $t('Generality.Ge_Print') + '  ' + $t('menu.Pu_Order_PR'),
          confirm: printPR,
        },
          {
          label: $t('Generality.Ge_Print') + ' KTM ' + $t('menu.Pu_Order_PR'),
          confirm: printKTMPR,
        },
        {
          label: $t('Generality.Ge_Print') + ' KTV ' + $t('menu.Pu_Order_PR'),
          confirm: printKTVPR,
        },
        {
          label: $t('purchase.Pu_EnterStorage'),
          disabled: !stateForm.transform,
          confirm: validateIsCompleted,
        },
      ]"
    ></Action>
    <!--单据信息-->
    <JvBlock :title="cur_billId" ref="first">
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

    <!-- 入库完成提醒弹窗 -->
    <jv-dialog
      :title="`${$t('Generality.Ge_New')} ${$t('menu.Pu_StockIn')}`"
      width="45%"
      :visible.sync="confirmFormVisible"
      @confirm="orderTransform"
    >
      {{ $t("Generality.Ge_ItemId")
      }}<span style="color: red; font-size: 18px">{{ completedItems }}</span
      >{{ $t("Generality.Ge_StockInCompleted") }}
    </jv-dialog>
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
import JvState from "@/components/JVInternal/JvState/index";
import JvRemark from "@/components/JVInternal/JvRemark/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";

import { API as ORDER } from "@/api/workApi/purchase/order";
import { detailPageModel } from "@/jv_doc/utils/system/index";
import { auditPlugin } from "@/jv_doc/utils/system/index";
import { printPlugin } from "@/jv_doc/utils/system/printPlugin";
export default {
  name: "index",
  data() {
    return {
      cur_billId: "",
      tableObj: {},
      detailObj: {},
      detailData: {},
      dialogFormVisible: false,
      tableDetail: [],
      fileBillId: "",
      RemarkData: "",
      type: "",
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
      btnAction: [],
      confirmFormVisible: false,
      isCompleted: false,
      // 完成物料编号组
      completedItems: [],
      printMod: "Pu_Order",
      addRouteName: "Pu_Order_Add",
      editRouteName: "Pu_Order_Edit",
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
      return stateEnum[this.detailObj.detailData.State];
    },
  },

  methods: {
    //获取数据
    GetData() {
      ORDER.api_get({ BillId: this.$route.query.BillId }).then((res) => {
        this.detailObj.detailData = res;
        if (res.Remarks) {
          this.RemarkData = res.Remarks;
        }
        this.cur_billId = res.BillId;
        this.stateForm = auditPlugin(res);
        this.tableObj.setData(res.BillItems);
        this.btnAction = detailPageModel(this, res, ORDER, this.GetData);
        this.btnAction.push({
          label: this.$t("Generality.Ge_Print") + "KTM",
          confirm: this.Print1,
        });
        this.detailObj.detailData.BillItems.forEach((item) => {
          if (
            item.Quantity - item.StockInQuantity + item.ReturnQuantity ===
            0
          ) {
            this.completedItems.push(item.ItemId);
            this.isCompleted = true;
          }
        });
      });
    },
    //判断是否入库完成
    validateIsCompleted() {
      console.log(this.completedItems);
      this.isCompleted
        ? (this.confirmFormVisible = true)
        : this.orderTransform();
    },
    // 打印询价单
    printPR() {
      printPlugin({
        ids: [this.cur_billId],
        category: "Pu_Order_PR",
      });
    },
    //打印马来西亚询价单
    printKTMPR(){
      printPlugin({
        ids: [this.cur_billId],
        category: "Pu_Order_PR_2",
      });
    },

    printKTVPR(){
      printPlugin({
        ids: [this.cur_billId],
        category: "Pu_Order_PR_3",
      });
    },
    //添加不同的模板
    Print1() {
      printPlugin({
        ids: [this.cur_billId],
        category: "Pu_Order_2",
      });
    },
    // 订单转
    orderTransform() {
      this.detailObj.detailData.BillItems.forEach((item) => {
        item.Quantity =
          item.Quantity - item.StockInQuantity + item.ReturnQuantity;
        item.Quantity = item.Quantity === 0 ? 1 : item.Quantity;
        item.BatchNo = "";
        item.ProductionDate = "";
      });
      console.log(this.detailObj.detailData,247)
      this.detailObj.detailData.RelationId = this.detailObj.detailData.BillId
      this.$router.push({
        name: "Pu_StockIn_Add",
        params: { ["deliveryData"]: this.detailObj.detailData },
      });
      this.confirmFormVisible = false;
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
};
</script>

<style lang="scss" scoped></style>
