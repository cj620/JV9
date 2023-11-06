<template>
  <div>
    <div style="margin-bottom: 10px;display: flex;justify-content: flex-end">
      <el-button @click="execute">执行</el-button>
    </div>
    <el-table
      :header-cell-style="{
        backgroundColor: '#ededed'
      }"
      ref="BillTable"
      :data="tableData"
      border
      height="90%"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        prop="BillId"
        label="零件编号"
        >
      </el-table-column>
      <el-table-column
        prop="Process"
        label="工序"
      >
      </el-table-column>
      <el-table-column
        prop="PlanTime"
        label="预计工时"
      >
      </el-table-column>
      <el-table-column
        prop="PlanDevice"
        label="计划设备"
      >
      </el-table-column>
      <el-table-column
        prop="PlanStart"
        label="计划开始"
      >
      </el-table-column>
      <el-table-column
        prop="PlanEnd"
        label="计划结束"
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "index",
  props: ['tableData'],
  data() {
    return {
      selectData: []
    }
  },
  methods: {
    handleSelectionChange(e) {
      this.selectData = e
      console.log(e)
    },
    execute() {
      console.log(this.selectData);
    }
  }
}
</script>

<style scoped lang="scss">

</style>
