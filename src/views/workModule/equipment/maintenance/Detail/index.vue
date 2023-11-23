<!--
 * @Author: your name
 * @Date: 2021-11-29 10:47:35
 * @LastEditTime: 2022-06-01 16:48:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\project\projectTask\Detail\c-menu.vue
-->
<!--新增-->
<!--编辑销售订单-->
<template>
  <!-- 单据信息 -->
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
    <JvBlock :title="$t('Generality.Ge_BillInfo')"
             ref="first"
             :contentStyle="{
        paddingLeft: '15px',
        height: '300px',
      }"
             style="position: relative">
      <div style="position: relative">
      <JvDetail :detailObj="detailObj"> </JvDetail>
      <MaintenanceState :state="detailObj.detailData.State"></MaintenanceState>
      </div>
    </JvBlock>
    <!-- 保养明细 -->
    <JvBlock :title="$t('device.De_MaintenanceDetail')" ref="second">
      <JvTable :tableObj="maintenanceTableObj"> </JvTable>
    </JvBlock>
    <!--保养配件-->
    <JvBlock :title="$t('device.De_MaintenanceItems')" ref="third">
      <JvTable :table-obj="itemsTableObj"> </JvTable>
    </JvBlock>
    <!--附件-->
    <JvBlock :title="$t('Generality.Ge_Annex')" ref="fourth">
      <JvFileExhibit :BillId="cur_Id"></JvFileExhibit>
    </JvBlock>
    <SelectRepairItems
        :visible.sync="ItemsFormVisible"
        v-if="ItemsFormVisible"
        :transferData="transferData"
        @confirmData="confirmData"
    >
    </SelectRepairItems>
  </PageWrapper>
</template>

<script>
import { mapState } from "vuex";
import { detailTable, detailConfig } from "./config";
import { itemTableConfig } from "@/views/workModule/equipment/repair/Detail/config";
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "~/class/table";
import { API as Maintenance } from "@/api/workApi/equipment/maintenance";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import MaintenanceState from "@/views/workModule/equipment/maintenance/components/MaintenanceState.vue";
import { assets_device_maintenance_start,
  assets_device_maintenance_end,
  assets_device_maintenance_save_accessory
} from "@/api/workApi/equipment/maintenance"
import SelectRepairItems from "@/views/workModule/equipment/repair/components/SelectRepairItems/SelectRepairItems.vue";
export default {
  name: "index",
  components: {
    JvFileExhibit,
    SelectRepairItems,
    MaintenanceState,
  },
  data() {
    return {
      cur_Id: this.$route.query.BillId,
      detailObj: {},
      maintenanceTableObj: {},
      itemsTableObj: {},
      transferData: [],
      btnAction: [],
      ItemsFormVisible: false,
      // 编辑路由指向 谨慎删除
      editRouteName: "As_DeviceMaintenanceEdit",
      printMod: "As_DeviceMaintenance",
      tabPanes: [
        {
          label: this.$t("Generality.Ge_BillInfo"),
          name: "first",
        },
        {
          label: this.$t("device.De_MaintenanceDetail"),
          name: "second",
        },
        {
          label: this.$t("device.De_MaintenanceItems"),
          name: "third",
        },
        {
          label: this.$t("Generality.Ge_Annex"),
          name: "fourth",
        },
      ],
      dynamicShow: false,
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
  },
  created() {
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      column: 3,
    });
    this.maintenanceTableObj = new detailTable();
    this.itemsTableObj = new Table({
      tableSchema: itemTableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 350,
    })
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      Maintenance.api_get({ BillId: this.cur_Id }).then((res) => {
        this.detailObj.setData(res);
        this.maintenanceTableObj.setData(res.BillItems);
        this.itemsTableObj.setData(res.DeviceMaintainAccessories);
        this.transferData = res.DeviceMaintainAccessories
        this.btnAction = [
          // 开始保养
          {
            label: this.$t('device.De_StartMaintenance'),
            disabled: res.State !== "ToBeMaintained",
            confirm: this.startMaintenance,
          },
          // 修改明细
          {
            label: this.$t('device.De_EditDetail'),
            disabled: res.State !== "Maintenanceing",
            confirm: this.editDetail,
          },
          // 添加配件
          {
            label: this.$t('device.De_AddItems'),
            disabled: res.State !== "Maintenanceing",
            confirm: this.selectMaintenanceItems,
          },
          // 结束保养
          {
            label: this.$t('device.De_EndMaintenance'),
            disabled: res.State !== "Maintenanceing",
            confirm: this.endMaintenance,
          },
        ]
      });
    },
    // 开始保养
    startMaintenance() {
      assets_device_maintenance_start({BillId: this.cur_Id}).then((res) => {
        this.getData();
      })
    },
    // 选择物料
    selectMaintenanceItems() {
      this.ItemsFormVisible = true
    },
    // 确定物料
    confirmData(e) {
      // console.log(e)
      const obj = {
        BillId: this.cur_Id,
        DeviceMaintainAccessories: e
      }
      assets_device_maintenance_save_accessory(obj).then((res) => {
        this.getData();
      })
      this.ItemsFormVisible = false
    },
    // 修改明细
    editDetail() {
      console.log(this.detailObj.detailData.BillItems)
    },
    // 确认修改明细
    confirmEditDetail() {

    },
    // 结束保养
    endMaintenance() {

    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
};
</script>

<style lang="scss">

</style>
