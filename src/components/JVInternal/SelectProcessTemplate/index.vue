<!--选择工艺模板-->
<template>
    <div>
      <jv-dialog
        :title="$t('Generality.Ge_SelectItems')"
        width="40%"
        :close-on-click-modal="true"
        :modal-append-to-body="false"
        :append-to-body="false"
        v-bind="$attrs"
        v-on="$listeners"
        @confirm="confirmProcessTemplate"
      >
        <JvTable
          ref="BillTable1"
          :table-obj="tableObj1"
                 >

        </JvTable>
      </jv-dialog>
    </div>
</template>

<script>
import { Table } from "./config";
import {getAllProcessTemplate} from "@/api/workApi/production/baseData";

export default {
  name: 'index',
  data(){
    return{
      tableObj1:{},

    }
  },
  created(){
    this.tableObj1 = new Table();
    this.GetData()
  },
  methods:{
    GetData(){
      getAllProcessTemplate().then(res=>{
        console.log(res.Items)
        this.tableObj1.setData(res.Items);
      })

    },

    confirmProcessTemplate(){
      console.log(this.tableObj1.selectData.datas[0])
      this.$emit('confirmProcessTemplate', this.tableObj1.selectData.datas[0].BillItems)
    }
  }
}
</script>

<style scoped>

</style>
