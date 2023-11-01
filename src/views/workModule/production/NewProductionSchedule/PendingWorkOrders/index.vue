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
    this.tableObj.getData({ selectType: 2, CurrentPage: 1, PageSize: 10 });
  },
  methods: {
    GinsengPlatoon() {
      if(!this.tableObj.selectData.datas.length) {
        this.$confirm('是否全部添加到参排？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          update_is_partake_aps({UpdateAll: true}).then(res => {
            console.log(res)
            this.tableObj.getData();
          })
        })
      } else {
        update_is_partake_aps({BillIds: this.tableObj.selectData.keys, IsPartakeAPS: "Normal"}).then(res => {
          console.log(res)
          this.tableObj.getData();
        })

      }
    }
  }
};
</script>

<style scoped lang="scss"></style>
