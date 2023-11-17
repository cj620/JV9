<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_Enable'),
            confirm: startToUse,
            disabled: canIsDel,
          },
          {
            label: $t('production.Pr_StopUse'),
            confirm: endToUse,
            disabled: canIsBan,
          },
          {
            label: $t('Generality.Ge_New'),
            confirm: add,
          },
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
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Copy'),
              confirm: copy.bind(null,row)
            },
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null,row),
              disabled: row.State === 'Using',
            },
            {
              label: $t('Generality.Ge_Delete'),
              disabled: row.State === 'Using',
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.BillId]),
              },
            },
          ]"
        />
      </template>
      <template #State="{ record }">
        <el-tag type="success" v-if="record === 'Using'">{{ maintenancePlanEnum[record].name }}</el-tag>
        <el-tag type="danger" v-else>{{ maintenancePlanEnum[record].name }}</el-tag>
      </template>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { assets_device_maintenance_plan_update_state } from "@/api/workApi/equipment/maintenancePlan"
import { maintenancePlanEnum } from "@/enum/workModule";

export default {
  name: "As_MaintenancePlan",
  data() {
    return {
      maintenancePlanEnum,
      tableObj: {},
      editRouterName: "As_MaintenancePlan_Edit",
      addRouterName: "As_MaintenancePlan_Add",
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData()
  },
  computed: {
    // 批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Disable"].includes(item.State);
      });
    },
    // 批量禁用
    canIsBan() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["Using"].includes(item.State);
      });
    }
  },
  methods: {
    startToUse(){
      let arr1 = [];
      this.tableObj.selectData.datas.forEach((item) => {
        arr1.push(item.BillId)
      })
      assets_device_maintenance_plan_update_state({BillIds:arr1,State:0}).then((res) => {
        this.tableObj.getData()
      })
    },
    endToUse(){
      let arr2 = [];
      this.tableObj.selectData.datas.forEach((item) => {
        arr2.push(item.BillId)
      })
      assets_device_maintenance_plan_update_state({BillIds:arr2,State:1}).then((res) => {
        this.tableObj.getData()
      })
    },
    // 新增
    add() {
      this.$router.push({
        name: this.addRouterName,
      });
    },
    // 复制
    copy(row) {
      console.log(row)
      this.$router.push({
          name: this.addRouterName,
          query: {BillId: row.BillId,type: "copy"}
      });
    },
    // 编辑
    edit(row) {
      this.$router.push({
        name: this.editRouterName,
        query: { BillId: row.BillId },
      });
    },
    // 删除
    deleteOrder(ids) {
      this.tableObj.api.del({ BillIds: ids }).then((_) => {
        this.tableObj.getData();
      });
    },
    //批量删除单据
    delBills() {
      this.deleteOrder(this.tableObj.selectData.keys);
    },
  }
}

</script>
<style lang="scss" scoped>
.el-tag--light {
  width: 100%;
  max-width: 100px;
  text-align: center;
}
</style>
