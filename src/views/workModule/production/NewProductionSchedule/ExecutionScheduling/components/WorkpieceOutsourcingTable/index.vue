<template>
  <div>
    <div style="margin-bottom: 10px; display: flex; justify-content: flex-end">
      <el-button @click="execute">外协</el-button>
    </div>
    <el-table
      :header-cell-style="{
        backgroundColor: '#ededed',
        color: '#4f4f4f',
        fontWeight: '100',
      }"
      ref="BillTable"
      :data="tableData"
      border
      height="50vh"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="PartNo" label="零件编号"> </el-table-column>
      <el-table-column prop="Process" label="工序"> </el-table-column>
      <el-table-column prop="PlanTime" label="预计工时"> </el-table-column>
      <el-table-column prop="PlanDevice" label="计划设备"> </el-table-column>
      <el-table-column prop="PlanStart" label="计划开始">
        <template slot-scope="{ row, column, $index }">
          {{ timeFormat(row.PlanStart, "yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="PlanEnd" label="计划结束">
        <template slot-scope="{ row, column, $index }">
          {{ timeFormat(row.PlanEnd, "yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import timeFormat from "@/jv_doc/utils/time/timeFormat";
import { addOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";
export default {
  name: "index",
  props: ["tableData"],
  data() {
    return {
      selectData: [],
    };
  },
  methods: {
    timeFormat,
    handleSelectionChange(e) {
      this.selectData = e;
      console.log(e);
    },
    execute() {
      let Items = this.selectData.map(item => {
        return {
          KeyId: item.Id,
          Remarks: "",
          Quantity: 1
        }
      })
      addOutsourcingrRequirement({"Category":"Process","Items":Items}).then(res => {
        console.log(res)
      })
      console.log(this.selectData, Items);
    },
  },
};
</script>

<style scoped lang="scss"></style>
