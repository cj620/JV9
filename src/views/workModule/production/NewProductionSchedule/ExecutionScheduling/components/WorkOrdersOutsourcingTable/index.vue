<template>
  <div>
    <div style="margin-bottom: 10px; display: flex; justify-content: flex-start">
      <Action
        class="calculate-result-btn"
        size="mini"
        :actions="[
          {
            label: $t('production.Pr_Outsourcing'),
            confirm: execute.bind(null),
            disabled: !selectData.length,
          },
        ]"
      >
      </Action>
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
      <el-table-column type="selection" width="55" align="center"> </el-table-column>
      <el-table-column prop="BillId" :label="$t('Generality.Ge_BillId')" width="120">
      </el-table-column>
      <el-table-column prop="PartNo" :label="$t('Generality.Ge_PartNo')" show-overflow-tooltip width="130">
      </el-table-column>
      <el-table-column prop="PartInfo" :label="$t('production.Pr_ProcessInformation')" show-overflow-tooltip width="130">
      </el-table-column>
      <el-table-column prop="Level" :label="$t('Generality.Ge_Level')">
        <template slot-scope="{ row, column, $index }">
          {{ LevelEnum[row.Level] ? LevelEnum[row.Level].name : '--' }}
        </template>
      </el-table-column>
      <el-table-column prop="Quantity" :label="$t('Generality.Ge_Quantity')"> </el-table-column>
      <el-table-column prop="CurrentStation" :label="$t('production.Pr_CurrentStation')"> </el-table-column>
      <el-table-column prop="PlanStart" :label="$t('Generality.Ge_PlanStart')" width="140">
        <template slot-scope="{ row, column, $index }">
          {{ timeFormat(row.PlanStart, "yyyy-MM-dd hh:mm") }}
        </template>
      </el-table-column>
      <el-table-column prop="PlanEnd" :label="$t('Generality.Ge_PlanEnd')" width="140">
        <template slot-scope="{ row, column, $index }">
          {{ timeFormat(row.PlanEnd, "yyyy-MM-dd hh:mm") }}
        </template>
      </el-table-column>
      <el-table-column prop="Creator" :label="$t('Generality.Ge_Creator')"> </el-table-column>
      <el-table-column prop="CreationDate" :label="$t('Generality.Ge_CreationDate')" width="140">
        <template slot-scope="{ row, column, $index }">
          {{ timeFormat(row.CreationDate, "yyyy-MM-dd hh:mm") }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import timeFormat from "@/jv_doc/utils/time/timeFormat";
import LevelEnum from "@/enum/workModule/production/LevelEnum";
import { addOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";
export default {
  name: "index",
  props: ["data"],
  data() {
    return {
      tableData: [],
      selectData: [],
      LevelEnum,
    };
  },
  created() {
    console.log(this.data, 12312313213122312)
    this.tableData = this.data
  },
  methods: {
    timeFormat,
    handleSelectionChange(val) {
      this.selectData = val;
    },
    execute() {
      let Items = this.selectData.map(item => {
        return {
          KeyId: item.Id,
          Remarks: "",
          Quantity: 1
        }
      })
      // addOutsourcingrRequirement({"Category":"Process","Items":Items}).then(res => {
      //   let tab = this.tableData.map(item => item.Id);
      //   this.selectData.forEach(item => {
      //     let index = tab.indexOf(item.Id)
      //     this.$emit('setTableData', index)
      //   })
      // })
      console.log('请求接口', Items)
    },
  },
};
</script>

<style scoped lang="scss"></style>
