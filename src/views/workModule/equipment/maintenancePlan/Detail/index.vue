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
        label: $t('Generality.Ge_Edit'),
        confirm: editBill,
      },
      {
        label: $t('Generality.Ge_Copy'),
        confirm: copyBill,
      },
      {
        label: $t('Generality.Ge_Delete'),
        confirm: deleteBill,
      },
    ]"></Action>
    <!--单据信息-->
    <JvBlock :title="cur_billId" ref="first" style="position:relative;">
      <div style="position: relative">
        <JvDetail :detailObj="detailObj">
        </JvDetail>
      </div>
      <div class="stateTag">
        <el-tag type="success" v-if="State === 'Using'">{{ maintenancePlanEnum[State].name }}</el-tag>
        <el-tag type="danger" v-else>{{
            maintenancePlanEnum[State]?maintenancePlanEnum[State].name: ""
          }}</el-tag>
      </div>
    </JvBlock>
    <!--设备信息-->
    <JvBlock :title="$t('device.De_DeviceInfo')" ref="second">
      <JvTable :table-obj="tableObj1"> </JvTable>
    </JvBlock>
    <!--保养信息-->
    <JvBlock :title="$t('device.De_MaintenanceInfo')" ref="third">
      <JvTable :table-obj="tableObj2"> </JvTable>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :BillId="fileBillId"></JvFileExhibit>
    </JvBlock>
  </PageWrapper>
</template>

<script>
import { tableConfig1, tableConfig2, detailConfig } from "./config"
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "@/jv_doc/class/table";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index.vue";
import {
  assets_device_maintenance_plan_get,
  assets_device_maintenance_plan_delete,
} from "@/api/workApi/equipment/maintenancePlan"
import { maintenancePlanEnum } from "@/enum/workModule";
import closeTag from "@/utils/closeTag";
import {mapState} from "vuex";

export default {
  name: "index",
  components: { JvFileExhibit },
  data() {
    return {
      maintenancePlanEnum,
      cur_billId: "",
      detailObj: {},
      tableObj1: {},
      tableObj2: {},
      fileBillId: "",
      State: "",
      editRouterName: "As_MaintenancePlan_Edit",
      addRouterName: "As_MaintenancePlan_Add",
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t('device.De_DeviceInfo'),
          name: "second",
        },
        {
          label: this.$t('device.De_MaintenanceInfo'),
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
    })
  },
  async created() {
    this.cur_billId = this.$route.query.BillId;
    this.fileBillId = this.$route.query.BillId;
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
    });
    this.tableObj1 = new Table({
      tableSchema: tableConfig1,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    });
    this.tableObj2 = new Table({
      tableSchema: tableConfig2,
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
    async GetData() {
      await assets_device_maintenance_plan_get({
        BillId: this.$route.query.BillId
      }).then((res) => {
        this.State = res.State;
        this.detailObj.detailData = res;
        this.cur_billId = res.BillId;
        this.tableObj1.setData(res.BillMembers);
        this.tableObj2.setData(res.BillItems);
      })
    },
    copyBill() {
      this.$router.push({
        name: this.addRouterName,
        query: {BillId: this.cur_billId,type: "copy"}
      })
    },
    editBill() {
      this.$router.push({
        name: this.editRouterName,
        query: { BillId: this.cur_billId },
      });
    },
    deleteBill() {
      assets_device_maintenance_plan_delete({ BillIds: [this.cur_billId] }).then(() => {
        let TagName = {
          name: "As_MaintenancePlan"
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
