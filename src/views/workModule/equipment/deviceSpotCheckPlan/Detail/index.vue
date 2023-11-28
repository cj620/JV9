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
import { assets_device_spot_check_plan_get } from "@/api/workApi/equipment/spotCheckPlan";
import { spotCheckStateEnum } from "@/enum/workModule";
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
