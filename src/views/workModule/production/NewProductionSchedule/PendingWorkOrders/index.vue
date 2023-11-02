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
              label: $t('production.Pr_AddToSchedulingWorkOrder'),
              confirm: GinsengPlatoon,
              disabled: !tableObj.selectData.keys.length
            },
            {
              label: $t('production.Pr_AddToSchedulingWorkOrderAll'),
              confirm: GinsengPlatoon.bind(null, true),
            },
          ]"
        ></Action>
      </template>
    </JvTable>
  </page-wrapper>
</template>

<script>
import { Table } from "./config";
import LevelEnum from "@/enum/workModule/production/LevelEnum";
import Action from "~/cpn/JvAction/index.vue";
import { update_is_partake_aps } from '@/api/workApi/production/productionSchedule'
export default {
  name: "PendingWorkOrders",
  components: { Action },
  data() {
    return {
      tableObj: {},
      LevelEnum,
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData({ selectType: 2});
  },
  methods: {
    GinsengPlatoon(all) {
      if(all) {
        this.$confirm(
          this.$t("production.Pr_WhetherAddToSchedulingWorkOrderAll"),
          this.$t("Generality.Ge_Remind"), {
          confirmButtonText: this.$t("Generality.Ge_OK"),
          cancelButtonText: this.$t("Generality.Ge_Cancel"),
          type: 'warning'
        }).then(() => {
          update_is_partake_aps({UpdateAll: true}).then(res => {
            this.tableObj.getData();
          })
        })
      } else {
        update_is_partake_aps({BillIds: this.tableObj.selectData.keys, IsPartakeAPS: "Normal"}).then(res => {
          this.tableObj.getData();
        })

      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
