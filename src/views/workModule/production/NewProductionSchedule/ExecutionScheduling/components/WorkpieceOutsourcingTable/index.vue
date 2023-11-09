<template>
  <div>
    <div style="margin-bottom: 10px; display: flex; justify-content: flex-end">
      <el-button @click="execute" :disabled="!selectData.length">{{ $t('production.Pr_Outsourcing') }}</el-button>
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
      <el-table-column prop="PartNo" :label="$t('Generality.Ge_PartNo')" > </el-table-column>
      <el-table-column prop="Process" :label="$t('Generality.Ge_Process')"> </el-table-column>
      <el-table-column prop="PlanTime" :label="$t('Generality.Ge_PlanTime')"> </el-table-column>
      <el-table-column prop="PlanDevice" :label="$t('production.Pr_PlanningDevices')"> </el-table-column>
      <el-table-column prop="PlanStart" :label="$t('Generality.Ge_PlanStart')">
        <template slot-scope="{ row, column, $index }">
          {{ timeFormat(row.PlanStart, "yyyy-MM-dd hh:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="PlanEnd" :label="$t('Generality.Ge_PlanEnd')">
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
        let tab = this.tableData.map(item => item.Id);
        this.selectData.forEach(item => {
          let index = tab.indexOf(item.Id)
          this.$emit('setTableData', index)
        })
      })
    },
  },
};
</script>

<style scoped lang="scss"></style>
