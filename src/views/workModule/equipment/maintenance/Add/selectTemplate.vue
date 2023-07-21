<template>
<div>
  <jv-dialog
    title="模板"
    width="70%"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
    :append-to-body="false"
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmMaterial"
  >
    <!-- 表格 -->
    <JvTable
      ref="BillTable"
      :table-obj="tableObj"
    >

    </JvTable>
  </jv-dialog>
</div>
</template>

<script>
import { Table } from './templateConfig'

export default {
  name: 'selectTemplate',
  data(){
    return{
      // 表格数据
      tableObj: {},


    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
    this.tableObj.props.selectType = "radio";

  },
  methods:{
    confirmMaterial(){
      this.$emit("confirmData", this.tableObj.selectData.datas);

    }
  }
}
</script>

<style scoped>

</style>
