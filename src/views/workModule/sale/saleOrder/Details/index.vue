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

    <Action
      slot="sticky-extra"
      size="small"
      :actions="btnAction"
      :dropDownActions="[
        {
          label: $t('Generality.Ge_DeliverGoods'),
          disabled: !stateForm.transform,
          confirm: validateIsCompleted,
        },
      ]"
    ></Action>
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

    <!-- 发货完成提醒弹窗 -->
    <jv-dialog
      :title="`${$t('Generality.Ge_New')} ${$t('menu.Sa_SaleDelivery')}`"
      width="45%"
      :visible.sync="confirmFormVisible"
      @confirm="orderTransform"
    >
      {{ $t("Generality.Ge_ItemId")
      }}<span style="color: red; font-size: 18px">{{ completedItems }}</span
      >{{ $t("Generality.Ge_DeliveryCompleted") }}
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
import JvDialog from "@/jv_doc/cpn/JvDialog/index";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import {
  auditPlugin,
  detailBtnModel,
  detailPageModel,
} from "@/jv_doc/utils/system/index";
import AuditProcess from "@/components/BasicModule/AuditProcess";
import { API as ORDER } from "@/api/workApi/sale/order";
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
      confirmFormVisible: false,
      tableDetail: [],
      fileBillId: "",
      RemarkData: "",
      type: "",
      btnAction: [],
      isCompleted: false,
      // 完成物料编号组
      completedItems: [],

      // 编辑路由
      EditRoute: "Sa_SaleOrder_Edit",
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
      editRouteName: "Sa_SaleOrder_Edit",
      addRouteName: "Sa_SaleOrder_Add",
      // 打印模板标识 谨慎删除
      printMod: "Sa_SaleOrder",
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
  },

  methods: {
    //获取数据
    async GetData() {
      await ORDER.api_get({ BillId: this.$route.query.BillId }).then((res) => {
        this.detailObj.detailData = res;
        this.RemarkData = res.Remarks;
        this.cur_billId = res.BillId;
        this.stateForm = auditPlugin(res);
        this.tableObj.setData(res.BillItems);

        this.btnAction = detailPageModel(this, res, ORDER, this.GetData);

        this.detailObj.detailData.BillItems.forEach((item) => {
          if (
            item.Quantity - item.DeliveryQuantity + item.ReturnQuantity ===
            0
          ) {
            this.completedItems.push(item.ItemId);
            this.isCompleted = true;
          }
        });
      });
    },

    // 判断是否发货完成
    validateIsCompleted() {
      console.log(this.completedItems);
      this.isCompleted
        ? (this.confirmFormVisible = true)
        : this.orderTransform();
    },
    //订单转
    orderTransform() {
      this.detailObj.detailData.BillItems.forEach((item) => {
        item.Quantity =
          item.Quantity - item.DeliveryQuantity + item.ReturnQuantity;
        item.Quantity = item.Quantity === 0 ? 1 : item.Quantity;
      });
      this.$router.push({
        name: "Sa_SaleDelivery_Add",
        params: { ["orderData"]: this.detailObj.detailData },
      });
      this.confirmFormVisible = false;
    },
    // orderTransform(routerName, keyName) {
    //   this.detailObj.detailData.BillItems.forEach((item) => {
    //     item.Quantity =
    //       item.Quantity - item.DeliveryQuantity + item.ReturnQuantity;
    //     if (item.Quantity === 0) {
    //       item.Quantity = 1;
    //     }
    //   });
    //   this.$router.push({
    //     name: routerName,
    //     params: { [keyName]: this.detailObj.detailData },
    //   });
    // },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
};
</script>

<style lang="scss" scoped></style>
