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
              label: '参排',
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
  name: "index",
  components: { Action },
  data() {
    return {
      tableObj: {},
      LevelEnum,
    };
  },
  created() {
    this.tableObj = new Table();
    console.log(this.tableObj.getData);
    this.tableObj.getData({ selectType: 3, CurrentPage: 1, PageSize: 10 });
  },
  methods: {
    GinsengPlatoon() {
      update_is_partake_aps({BillIds: this.tableObj.selectData.keys, IsPartakeAPS: "ToBeArranged"}).then(res => {
        console.log(res)
        this.tableObj.getData();
      })
    }
  }
};
</script>

<style scoped lang="scss"></style>
