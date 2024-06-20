<template>
  <div>
    <jv-dialog
      :title="$t('production.Pr_DeletedList')"
      width="90%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirm"
      :IsShowFooterBtn="false"
    >
      <!-- 表格 -->
      <JvTable ref="BillTable" :table-obj="tableObj">

        <!-- operation操作列 -->
        <template #operation="{ row }">
          <TableAction
            :actions="[
            {
              label: $t('setup.Recover'),
              popConfirm: {
                title: $t('production.Pr_WhetherRecover'),
                confirm: recovery.bind(null, [row.BillId]),
              },
            },
          ]"></TableAction>
        </template>
      </JvTable>
    </jv-dialog>
  </div>

</template>

<script>
// 引入表格类
import { Table } from "./deletedDataListTable";
// 引入模块API接口
import {
  production_task_Recovery_list_has_been_deleted
} from "@/api/workApi/production/productionTask";
export default {
    name: "deletedDataList",
  data(){
      return{
        tableObj:{}
      }
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.getData();

  },
    methods:{
      recovery(e){
        production_task_Recovery_list_has_been_deleted(e).then(res=>{
          this.tableObj.getData();
        })

      },
    confirm(){
      this.$emit('confirmDeletedDataList',false)
    }
  }
}
</script>

<style scoped>

</style>
