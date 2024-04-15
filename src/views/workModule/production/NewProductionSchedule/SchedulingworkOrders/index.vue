<template>
  <page-wrapper :footer="false">
    <JvTable :tableObj="tableObj">
      <template #Level="{ row }">
        <div>
          {{ LevelEnum[row.Level].name }}
        </div>
      </template>
      <template #btn-list>
        <Action
          size="mini"
          :actions="[
            {
              label: $t('production.Pr_AddToPendingWorkOrder'),
              confirm: GinsengPlatoon,
              disabled: !tableObj.selectData.keys.length
            },
            {
              label: $t('production.Pr_EditDeliveryDate'),
              confirm: editDeliveryDate,
              disabled: !tableObj.selectData.keys.length
            }
          ]"
        ></Action>
      </template>
    </JvTable>
    <editDelivery
      :visible.sync="editDeliveryDialogFormVisible"
      v-if="editDeliveryDialogFormVisible"
      :editDeliveryData="editDeliveryData"
      @completeEdit="completeEdit"
    ></editDelivery>
  </page-wrapper>
</template>

<script>
import { Table } from "./config";
import LevelEnum from "@/enum/workModule/production/LevelEnum";
import { update_is_partake_aps } from "@/api/workApi/production/productionSchedule";
import Action from "~/cpn/JvAction/index.vue";
import editDelivery
  from "@/views/workModule/production/NewProductionSchedule/ExecutionScheduling/components/calculate/components/editDelivery.vue";
export default {
  name: "SchedulingWorkOrders",
  components: { editDelivery, Action },
  data() {
    return {
      tableObj: {},
      LevelEnum,
      editDeliveryDialogFormVisible: false,
      editDeliveryData: [],
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData({ selectType: 3 });
  },
  methods: {
    GinsengPlatoon() {
      update_is_partake_aps({BillIds: this.tableObj.selectData.keys, IsPartakeAPS: "ToBeArranged"}).then(res => {
        this.tableObj.getData();
      })
    },
    editDeliveryDate() {
      this.editDeliveryData = this.tableObj.selectData.datas
      this.editDeliveryDialogFormVisible = true;
    },
    completeEdit() {
      this.editDeliveryDialogFormVisible = false;
      this.tableObj.getData({ selectType: 3 });
    }
  }
};
</script>

<style scoped lang="scss"></style>
