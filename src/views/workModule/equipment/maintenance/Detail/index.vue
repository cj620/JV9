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
    <!--  开始保养选择日期  -->
    <JvDialog
        :title="$t('device.De_StartMaintenance')"
        v-if="startFormVisible"
        :visible.sync="startFormVisible"
        @confirm="confirmToStart"
        width="30%">
      <JvForm :form-obj="startFormObj">
      </JvForm>
    </JvDialog>
    <!--  添加配件  -->
    <SelectRepairItems
        :visible.sync="ItemsFormVisible"
        v-if="ItemsFormVisible"
        :transferData="transferData"
        @confirmData="confirmData"
    >
    </SelectRepairItems>
    <!--  修改明细  -->
    <EditMaintenanceDetail
      :visible.sync="editDetailVisible"
      v-if="editDetailVisible"
      :DetailData="DetailData"
      @confirmData="confirmEditDetail"
    >
    </EditMaintenanceDetail>
    <!--   结束保养   -->
    <JvDialog
      :title="$t('device.De_EndMaintenance')"
      v-if="endFormVisible"
      :visible.sync="endFormVisible"
      @confirm="confirmToEnd"
      width="30%">
      <JvForm :form-obj="endFormObj"></JvForm>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { mapState } from "vuex";
import { detailTable, detailConfig } from "./config";
import { startFormConfig, endFormConfig } from "@/views/workModule/equipment/maintenance/components/startEndConfig";
import { itemTableConfig } from "@/views/workModule/equipment/repair/Detail/config";
import Detail from "@/jv_doc/class/detail/Detail";
import { Table } from "~/class/table";
import { Form } from "@/jv_doc/class/form";
import { API as Maintenance } from "@/api/workApi/equipment/maintenance";
import JvFileExhibit from "@/components/JVInternal/JvFileExhibit/index";
import MaintenanceState from "@/views/workModule/equipment/maintenance/components/MaintenanceState.vue";
import { assets_device_maintenance_start,
  assets_device_maintenance_end,
  assets_device_maintenance_save_accessory,
  assets_device_maintenance_save,
} from "@/api/workApi/equipment/maintenance"
import SelectRepairItems from "@/views/workModule/equipment/repair/components/SelectRepairItems/SelectRepairItems.vue";
import EditMaintenanceDetail from "../components/EditMaintenanceDetail/EditMaintenanceDetail.vue";
import {timeFormat} from "~/utils/time";

export default {
  name: "index",
  components: {
    JvFileExhibit,
    SelectRepairItems,
    MaintenanceState,
    EditMaintenanceDetail,
  },
  data() {
    return {
      cur_Id: this.$route.query.BillId,
      detailObj: {},
      maintenanceTableObj: {},
      itemsTableObj: {},
      startFormObj: {},
      endFormObj: {},
      transferData: [],
      DetailData: [],
      btnAction: [],
      ItemsFormVisible: false,
      startFormVisible: false,
      endFormVisible: false,
      editDetailVisible: false,
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
      ],
      dynamicShow: false,
      dialogVisible: false,
    };
  },
  computed: {
    ...mapState({
      current: (state) => state.page.current,
    }),
    // 明细是否全部完成
    allCompleted() {
      if (this.DetailData) {
         return this.DetailData.every((item) => { return  item.MaintenanceResults === "Completed" })
      } else { return true }
    }
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
    this.startFormObj = new Form({
      formSchema: startFormConfig,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
    this.endFormObj = new Form({
      formSchema: endFormConfig,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    })
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      Maintenance.api_get({ BillId: this.cur_Id }).then((res) => {
        this.detailObj.setData(res);
        this.maintenanceTableObj.setData(res.BillItems);
        this.DetailData = res.BillItems.map(item => {
          return {
            ...item
          }
        })
        this.itemsTableObj.setData(res.DeviceMaintainAccessories);
        this.transferData = res.DeviceMaintainAccessories
        this.btnAction = [
          // 开始保养
          {
            label: this.$t('device.De_StartMaintenance'),
            disabled: res.State !== "ToBeMaintenance",
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
            disabled: res.State !== "Maintenanceing" || !this.allCompleted,
            confirm: this.endMaintenance,
          },
        ]
      });
    },
    // 开始保养
    startMaintenance() {
      this.startFormVisible = true
      this.startFormObj.form.MaintenanceStartDate = timeFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
    },
    // 确认开始
    confirmToStart() {
      this.startFormObj.validate((valid) => {
        if (valid) {
          assets_device_maintenance_start({
            BillId: this.cur_Id,
            MaintenanceStartDate: timeFormat(this.startFormObj.form.MaintenanceStartDate, "yyyy-MM-dd hh:mm:ss")
          }).then((res) => {
            this.getData();
          })
          this.startFormVisible = false
        }
      })
    },
    // 选择物料
    selectMaintenanceItems() {
      this.ItemsFormVisible = true
    },
    // 确定物料
    confirmData(e) {
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
      this.editDetailVisible = true
    },
    // 确认修改明细
    confirmEditDetail(e) {
      this.detailObj.detailData.BillItems = e
      assets_device_maintenance_save(this.detailObj.detailData).then((res) => {
        this.getData()
      })
      this.editDetailVisible = false
    },
    // 结束保养
    endMaintenance() {
      this.endFormVisible = true
      this.endFormObj.form.MaintenanceStartDate = timeFormat(this.detailObj.detailData.MaintenanceStartDate, "yyyy-MM-dd hh:mm:ss")
      this.endFormObj.form.MaintenanceEndDate = timeFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
    },
    confirmToEnd() {
      this.endFormObj.form.MaintenanceStartDate = timeFormat(this.endFormObj.form.MaintenanceStartDate, "yyyy-MM-dd hh:mm:ss")
      this.endFormObj.form.MaintenanceEndDate = timeFormat(this.endFormObj.form.MaintenanceEndDate, "yyyy-MM-dd hh:mm:ss")
      const obj = {
          MaintenanceStartDate: this.endFormObj.form.MaintenanceStartDate,
          MaintenanceEndDate: this.endFormObj.form.MaintenanceEndDate,
          MaintenanceTime: this.endFormObj.form.MaintenanceTime,
          BillId: this.detailObj.detailData.BillId,
          Remarks: this.endFormObj.form.Remarks,
      }
      assets_device_maintenance_end(obj).then((res) => {
          this.getData()
      })
      this.endFormVisible = false
    },
    tabClick(e) {
      let top = this.$refs[e.name].offsetTop;
      this.$refs.page.scrollTo(top);
    },
  },
  watch: {
    'endFormObj.form.MaintenanceEndDate': function(newVal, oldVal) {
      const endDate = new Date(newVal);
      const startDate = new Date(this.endFormObj.form.MaintenanceStartDate);
      this.endFormObj.form.MaintenanceTime = Math.floor((endDate - startDate) / (1000 * 60));
    }
  }
};
</script>

<style lang="scss">

</style>
