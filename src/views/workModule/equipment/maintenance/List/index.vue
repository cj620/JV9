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
            // {
            //   label: $t('device.De_EndMaintenance'),
            //   confirm: endMaintenance.bind(null,row),
            //   disabled: row.State !== 'Maintenanceing',
            // },
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
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
import { assets_device_maintenance_start,assets_device_maintenance_end } from "@/api/workApi/equipment/maintenance"
import MaintenanceStateTags from "@/views/workModule/equipment/maintenance/components/MaintenanceStateTags.vue";
import { Form } from "@/jv_doc/class/form";
import {timeFormat} from "~/utils/time";
export default {
  // 页面的标识
  name: "As_DeviceMaintain",
  components: {
    MaintenanceStateTags
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      startFormObj: {},
      selectedId: "",
      startFormVisible: false,
      editRouterName:  "As_DeviceMaintenanceEdit",
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
    this.startFormObj = new Form({
      formSchema: [
        {
          prop: "MaintenanceStartDate",
          label: i18n.t('device.De_MaintenanceStartDate'),
          cpn: "SingleDateTime",
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["change", "blur"],
            },
          ],
        }
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
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
    // endMaintenance(row){
    //   assets_device_maintenance_end({BillId: row.BillId}).then((res) => {
    //     this.tableObj.getData();
    //   })
    // },
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
};
</script>
