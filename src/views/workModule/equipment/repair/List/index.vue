<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #State="{ record }">
        <!-- 状态标签 -->
        <RepairStateTags :state="record"></RepairStateTags>
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              disabled: row.State !== 'ToBeRepair' && row.State !== 'BackTo',
              confirm: editBill.bind(null, row)
            },
            {
              label: $t('Generality.Ge_Delete'),
              disabled: row.State !== 'ToBeRepair' && row.State !== 'BackTo',
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
            label: $t('Generality.Ge_New'),
            confirm: addOrder
          },
          {
            label: $t('Generality.Ge_Delete'),
            disabled: canIsDel,
            popConfirm: {
              title: $t('Generality.Ge_DeleteConfirm'),
              confirm: delBills,
            },
          },
          {
            label: $t('device.De_StartToRepair'),
            disabled: canIsStart,
            confirm: startRepair,
          },
          {
            label: $t('device.De_ReturnRepair'),
            disabled: canIsStart,
            confirm: returnRepair,
          },
          {
            label: $t('device.De_AddItems'),
            disabled: canIsAdd,
            confirm: addItems,
          },
          {
            label: $t('device.De_CompleteRepair'),
            disabled: canIsAdd,
            confirm: completeRepair,
          },
          {
            label: $t('device.De_CheckRepair'),
            disabled: canIsCheck,
            confirm: checkRepair,
          },
        ]"
      >
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
import RepairStateTags from "../components/RepairStateTags.vue";
export default {
  // 页面的标识
  name: "As_DeviceRepair",
  components: {
    RepairStateTags
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      editRouterName: "As_DeviceRepairEdit",
      addRouterName: "As_DeviceRepairAdd",
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  computed: {
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["ToBeRepair", "BackTo"].includes(item.State);
      });
    },
    canIsStart() {
      let { datas } = this.tableObj.selectData;
      if (datas.length !== 1) return true;
      return datas[0].State !== 'ToBeRepair'
    },
    canIsAdd() {
      let { datas } = this.tableObj.selectData;
      if (datas.length !== 1) return true;
      return datas[0].State !== 'Repairing'
    },
    canIsCheck() {
      let { datas } = this.tableObj.selectData;
      if (datas.length !== 1) return true;
      return datas[0].State !== 'Accepted'
    }
  },
  methods: {
    //新增
    addOrder() {
      this.$router.push({
        name: this.addRouterName,
      });
    },
    //删除单据
    deleteOrder(ids) {
      this.tableObj.api.del({ BillIds: ids }).then((_) => {
        this.tableObj.getData();
      });
    },
    //编辑
    editBill(row) {
      let { BillId } = row;
      this.$router.push({
        name: this.editRouterName,
        query: { BillId },
      });
    },
    //批量删除单据
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
    // 开始维修
    startRepair() {
      console.log(this.tableObj.selectData.keys[0])
    },
    // 打回维修
    returnRepair() {

    },
    // 添加配件
    addItems(row) {

    },
    // 验收维修
    checkRepair(row) {

    },
    // 完成维修
    completeRepair() {

    },
  },
};
</script>
