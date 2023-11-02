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
              label: '添加至待排工单',
              confirm: GinsengPlatoon,
              disabled: !tableObj.selectData.keys.length
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
import { update_is_partake_aps } from "@/api/workApi/production/productionSchedule";
import Action from "~/cpn/JvAction/index.vue";
export default {
  name: "SchedulingWorkOrders",
  components: { Action },
  data() {
    return {
      tableObj: {},
      LevelEnum,
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
    }
  }
};
</script>

<style scoped lang="scss"></style>
