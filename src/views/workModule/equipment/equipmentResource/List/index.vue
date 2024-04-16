<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">

      <template #CumulativeTime="{ record }">
        <!-- 状态标签 -->
        <el-progress :percentage="record"  :color="customColors" style="width: 120px;line-height: 30px;"></el-progress>
        <!-- <el-progress :percentage="record* 100"  :color="customColors" style="width: 120px;line-height: 30px;"></el-progress> -->

      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: editBill.bind(null, row),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.DeviceNo]),
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
            label: $t('Generality.Ge_New'),
            confirm: add,
          },
          // {
          //   label: $t('device.De_Repair'),
          //   confirm: toRepair,
          //   disabled: canIsDel,
          // },
          // {
          //   label: $t('device.De_Maintenance'),
          //   confirm: toMaintenance,
          //   disabled: canIsDel,
          // },
          // {
          //   label: $t('menu.As_MaintenanceTPL'),
          //   confirm: toMaintenanceTPL,
          // },
        ]"
      >
<!--       <el-badge :value="pageCount"  >-->
<!--  <el-button  @click="viewToBeMaintained"   size="mini">-->
<!--    {{$t('device.De_ToBeMaintained')-->
<!--  }}</el-button>-->
<!--</el-badge>-->
      </Action>

    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
// 引入单据状态的枚举
import { stateEnum } from "@/enum/workModule";

import { API} from "@/api/workApi/equipment/device";

// 单据状态组件
// import BillStateTags from "@/components/WorkModule/BillStateTags";
export default {
  // 页面的标识
  name: "As_DeviceList",
  components: {
    // 单据状态组件
    // BillStateTags,
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      machineCategory: 'Machine',
      editRouterName: "As_DeviceEdit",
      addRouterName: "As_DeviceAdd",
      toRepairRouterName: "As_DeviceRepairAdd",
      toMaintainRouterName: "As_DeviceMaintainAdd",
            pageCount: 0,
      customColors: [
        {color: '#5cb87a', percentage: 30},
        {color: '#e6a23c', percentage: 60},
        {color: '#f56c6c', percentage: 90},


      ]
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.formObj.form.DeviceCategory=this.machineCategory
    this.tableObj.getData();
    this.getPageCountList()
  },
  computed: {
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      return datas.length !== 1;
    },
    // 获取按钮状态
    getActionState() {
      return (state, type) => {
        return !stateEnum[state]?.operation?.[type];
      };
    },
  },
  methods: {
    viewToBeMaintained(){
       this.tableObj.formObj.form.ToBeMaintained=true
        this.tableObj.getData();
    },

        //获取对接的数据
    getPageCountList() {
      API.api_list({ PageSize: 20, CurrentPage: 1,ToBeMaintained:true,DeviceCategory:this.machineCategory }).then(
        (res) => {
          console.log(res.Count);
          this.pageCount = res.Count === 0 ? "" : res.Count;
        }
      );
    },
    //跳转模板列表
    toMaintenanceTPL() {
      this.$router.push({
        name: "As_MaintenanceTPL",
      });
    },
    //编辑
    add() {
      // });
      this.$router.push({
        name: this.addRouterName,
      });
    },
    //删除单据
    deleteOrder(ids) {
      this.tableObj.api.del(  ids ).then((_) => {
        this.tableObj.getData();
      });
    },

    // 去报修
    toRepair() {
      this.$router.push({
        name: this.toRepairRouterName,
        params: {
          type: "toRepair",
          cdata: this.tableObj.selectData.datas[0],
        },
      });
    },
    // 去维护
    toMaintenance() {
      this.$router.push({
        name: this.toMaintainRouterName,
        params: {
          type: "toMaintenance",
          cdata: this.tableObj.selectData.datas[0],
        },
      });
    },

    //编辑
    editBill(row) {
      console.log(123);
      let { DeviceNo } = row;
      // });
      this.$router.push({
        name: this.editRouterName,
        query: { DeviceNo },
      });
    },
    //批量删除单据
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
  },
};
</script>
