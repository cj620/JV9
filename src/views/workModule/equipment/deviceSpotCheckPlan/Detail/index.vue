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
    <Action slot="sticky-extra" size="small" :actions="[
      {
        label: $t('Generality.Ge_Copy'),
        confirm: copyBill,
      },
      {
        label: $t('Generality.Ge_Edit'),
        disabled: canIsEdit,
        confirm: editBill,
      },
      {
        label: $t('Generality.Ge_Delete'),
        disabled: canIsEdit,
        confirm: deleteBill,
      },
    ]"></Action>
    <!--单据信息-->
    <JvBlock :title="cur_billId" ref="first" style="position:relative;" :contentStyle="{ paddingLeft: '15px' }">
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
        </JvDetail>
      </div>
      <div class="stateTag">
        <el-tag type="success" v-if="State === 'Using'">{{ spotCheckStateEnum[State].name }}</el-tag>
        <el-tag type="danger" v-else>{{
            spotCheckStateEnum[State]?spotCheckStateEnum[State].name: ""
          }}</el-tag>
      </div>
    </JvBlock>
    <!--计划成员-->
    <JvBlock :title="$t('device.De_PlanMember')" ref="second">
      <JvTable :table-obj="memberTableObj"> </JvTable>
    </JvBlock>
    <!--计划明细-->
    <JvBlock :title="$t('device.De_PlanItem')" ref="third">
      <JvTable :table-obj="itemTableObj"> </JvTable>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :BillId="fileBillId"></JvFileExhibit>
    </JvBlock>
  </PageWrapper>
</template>
<script>
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index.vue";
import { mapState } from "vuex";
import { detailConfig, itemTableConfig, memberTableConfig } from "./config"
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "@/jv_doc/class/table";
import {
  assets_device_spot_check_plan_get,
  assets_device_spot_check_plan_delete
} from "@/api/workApi/equipment/spotCheckPlan";
import { spotCheckStateEnum } from "@/enum/workModule";
import closeTag from "@/utils/closeTag";
export default {
  name: "index",
  components: { JvFileExhibit },
  data(){
    return{
      spotCheckStateEnum,
      cur_billId: "",
      fileBillId: "",
      State: "",
      detailObj: {},
      itemTableObj: {},
      memberTableObj: {},
      editRouterName: "As_DeviceSpotCheckPlan_Edit",
      addRouterName: "As_DeviceSpotCheckPlan_Add",
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("device.De_PlanMember"),
          name: "second",
        },
        {
          label: this.$t("device.De_PlanItem"),
          name: "third",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
      ],
    }
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    canIsEdit(){
      return this.State === "Using"
    }
  },
  async created() {
    this.cur_billId = this.$route.query.BillId;
    this.fileBillId = this.$route.query.BillId;
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
    });
    this.itemTableObj = new Table({
      tableSchema: itemTableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    });
    this.memberTableObj = new Table({
      tableSchema: memberTableConfig,
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
  methods: {
    GetData() {
      assets_device_spot_check_plan_get({
        BillId: this.$route.query.BillId
      }).then((res) => {
        this.State = res.State;
        this.detailObj.detailData = res;
        this.cur_billId = res.BillId;
        this.itemTableObj.setData(res.BillItems);
        this.memberTableObj.setData(res.BillMembers);
      })
    },
    editBill() {
      this.$router.push({
        name: this.editRouterName,
        query: { BillId: this.cur_billId },
      });
    },
    copyBill() {
      this.$router.push({
        name: this.addRouterName,
        query: {BillId: this.cur_billId,type: "copy"}
      })
    },
    deleteBill() {
      assets_device_spot_check_plan_delete({ BillIds: [this.cur_billId] }).then(() => {
        let TagName = {
          name: "As_DeviceSpotCheckPlan"
        }
        closeTag(this.current, TagName);
      })
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  }
}
</script>
<style lang="scss" scoped>
.stateTag {
  position: absolute;
  right: 60px;
  top:50px;
  width: 90px;
  height: 46px;
  .el-tag--light {
    width: 100%;
    height: 100%;
    text-align: center;
    padding-top: 9px;
    font-size: 16px;
  }
}
</style>
