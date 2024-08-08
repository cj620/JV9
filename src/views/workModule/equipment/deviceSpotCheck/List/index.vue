<!--
 * @Author: C.
 * @Date: 2024-05-14 08:48:29
-->
<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Delete'),
              disabled: row.State !== 'ToBeInspected',
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteOrder.bind(null, [row.BillId]),
              },
            },
          ]"
        />
      </template>
      <template #State="{ record }">
        <!-- 状态标签 -->
        <RepairStateTags
          :state="record"
          :enum="spotCheckListStateEnum"
        ></RepairStateTags>
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
          },
          {
            label: $t('device.De_SpotCheckRecord'),
            confirm: toRecord,
          },
        ]"
      >
      </Action>
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import RepairStateTags from "@/views/workModule/equipment/repair/components/RepairStateTags.vue";
import { spotCheckListStateEnum } from "@/enum/workModule";
export default {
  name: "As_DeviceSpotCheck",
  components: {
    RepairStateTags,
  },
  data() {
    return {
      tableObj: {},
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  computed: {
    spotCheckListStateEnum() {
      return spotCheckListStateEnum;
    },
    // 批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["ToBeInspected"].includes(item.State);
      });
    },
  },
  methods: {
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
    //跳转到点检记录
    toRecord() {
      // this.$router.push({name: "As_DeviceSpotCheckRecord",})
      this.$router.push({ name: "As_CheckRecordForm" });
    },
  },
};
</script>
