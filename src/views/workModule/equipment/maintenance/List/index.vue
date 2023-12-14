<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{record}">
        <MaintenanceStateTags :state="record"></MaintenanceStateTags>
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('device.De_StartMaintenance'),
              confirm: startMaintenance.bind(null,row),
              disabled: row.State !== 'ToBeMaintenance',
            },
            {
              label: $t('device.De_EndMaintenance'),
              confirm: endMaintenance.bind(null,row),
              disabled: !(row.State === 'Maintenanceing' && row.BillItems.every((item) => item.MaintenanceResults === 'Completed')),
            },
            {
              label: $t('device.De_AddItems'),
              disabled: row.State !== 'Maintenanceing',
              confirm: addItems.bind(null,row),
            },
            {
              label: $t('Generality.Ge_Delete'),
              disabled: row.State !== 'ToBeMaintenance',
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.BillId]),
              },
            },
          ]"
        />
      </template>
      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_Delete'),
            disabled: canIsDel,
            popConfirm: {
              title: $t('Generality.Ge_DeleteConfirm'),
              confirm: delBills,
            },
          }
        ]"
      >
      </Action>
    </JvTable>
    <JvDialog
      :title="$t('device.De_StartMaintenance')"
      v-if="startFormVisible"
      :visible.sync="startFormVisible"
      @confirm="confirmToStart"
      width="30%">
      <JvForm :form-obj="startFormObj">
      </JvForm>
    </JvDialog>
    <SelectRepairItems
      :visible.sync="ItemsFormVisible"
      v-if="ItemsFormVisible"
      :transferData="transferData"
      @confirmData="confirmData"
    >
    </SelectRepairItems>
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
// 引入表格类
import { Table } from "./config";
import {
    assets_device_maintenance_start,
    assets_device_maintenance_end,
    assets_device_maintenance_save_accessory
} from "@/api/workApi/equipment/maintenance"
import MaintenanceStateTags from "@/views/workModule/equipment/maintenance/components/MaintenanceStateTags.vue";
import { Form } from "@/jv_doc/class/form";
import { startFormConfig, endFormConfig } from "@/views/workModule/equipment/maintenance/components/startEndConfig";
import {timeFormat} from "~/utils/time";
import SelectRepairItems from "@/views/workModule/equipment/repair/components/SelectRepairItems/SelectRepairItems.vue";
export default {
  // 页面的标识
  name: "As_DeviceMaintain",
  components: {
    SelectRepairItems,
    MaintenanceStateTags
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      startFormObj: {},
      endFormObj: {},
      transferData: [],
      selectedId: "",
      startFormVisible: false,
      ItemsFormVisible: false,
      endFormVisible: false,
      editRouterName:  "As_DeviceMaintenanceEdit",
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
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
  },
  computed: {
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["ToBeMaintenance"].includes(item.State);
      });
    },
  },
  methods: {
    startMaintenance(row){
      this.selectedId = row.BillId
      this.startFormVisible = true
      this.startFormObj.form.MaintenanceStartDate = timeFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
    },
    confirmToStart(){
      this.startFormObj.validate((valid) => {
        if (valid) {
          assets_device_maintenance_start({
            BillId: this.selectedId,
            MaintenanceStartDate: timeFormat(this.startFormObj.form.MaintenanceStartDate, "yyyy-MM-dd hh:mm:ss")
          }).then((res) => {
            this.tableObj.getData();
          })
          this.startFormVisible = false
        }
      })
    },
    addItems(row) {
      this.selectedId = row.BillGui
      row.DeviceMaintainAccessories ? this.transferData = row.DeviceMaintainAccessories : ""
      this.ItemsFormVisible = true
    },
    confirmData(e) {
      const obj = {
        BillGui: this.selectedId,
        DeviceMaintainAccessories: e
      }
      assets_device_maintenance_save_accessory(obj).then((res) => {
        this.tableObj.getData();
      })
      this.ItemsFormVisible = false
    },
    endMaintenance(row){
      this.selectedId = row.BillId
      this.endFormObj.form.MaintenanceStartDate = timeFormat(row.MaintenanceStartDate, "yyyy-MM-dd hh:mm:ss")
      this.endFormObj.form.MaintenanceEndDate = timeFormat(new Date(), "yyyy-MM-dd hh:mm:ss")
      this.endFormVisible = true
    },
    confirmToEnd() {
      this.endFormObj.form.MaintenanceStartDate = timeFormat(this.endFormObj.form.MaintenanceStartDate, "yyyy-MM-dd hh:mm:ss")
      this.endFormObj.form.MaintenanceEndDate = timeFormat(this.endFormObj.form.MaintenanceEndDate, "yyyy-MM-dd hh:mm:ss")
      const obj = {
        MaintenanceStartDate: this.endFormObj.form.MaintenanceStartDate,
        MaintenanceEndDate: this.endFormObj.form.MaintenanceEndDate,
        MaintenanceTime: this.endFormObj.form.MaintenanceTime,
        BillId: this.selectedId,
        Remarks: this.endFormObj.form.Remarks,
      }
      assets_device_maintenance_end(obj).then((res) => {
        this.tableObj.getData();
      })
      this.endFormVisible = false
    },
    //删除单据
    deleteOrder(ids) {
      this.tableObj.api.del({ BillIds: ids }).then((_) => {
        this.tableObj.getData();
      });
    },
    //批量删除单据
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys);
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
