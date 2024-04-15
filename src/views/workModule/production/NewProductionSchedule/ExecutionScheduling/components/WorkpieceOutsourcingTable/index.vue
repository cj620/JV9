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
          // {
          //   label: $t('production.Pr_EditDeliveryDate'),
          //   confirm: batchEditDate.bind(null),
          //   disabled: !selectData.length,
          // }
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
      <el-table-column prop="BillId" :label="$t('Generality.Ge_BillId')" > </el-table-column>
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
<!--      <el-table-column-->
<!--        :label="$t('Generality.Ge_Operate')"-->
<!--        width="105px"-->
<!--        prop=""-->
<!--      >-->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            @click="editDate(scope.$index, scope.row)"-->
<!--          >{{ $t("production.Pr_EditDeliveryDate") }}</el-button-->
<!--          >-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
<!--    <editDelivery-->
<!--      :visible.sync="editDeliveryDialogFormVisible"-->
<!--      v-if="editDeliveryDialogFormVisible"-->
<!--      :editDeliveryData="editDeliveryData"-->
<!--      :editDeliveryType="editDeliveryType"-->
<!--      @completeEdit="completeEdit"-->
<!--    ></editDelivery>-->
  </div>
</template>

<script>
import timeFormat from "@/jv_doc/utils/time/timeFormat";
import { addOutsourcingrRequirement } from "@/api/workApi/purchase/outsourcingRequirement";
import editDelivery
  from "@/views/workModule/production/NewProductionSchedule/ExecutionScheduling/components/calculate/components/editDelivery.vue";
export default {
  name: "index",
  components: {editDelivery},
  props: ["data"],
  data() {
    return {
      tableData: [],
      selectData: [],
      editDeliveryDialogFormVisible: false,
      editDeliveryData: {},
      editDeliveryType:'noBatch',
    };
  },
  created() {
    console.log(this.data)
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
      addOutsourcingrRequirement({"Category":"Process","Items":Items}).then(res => {
        let tab = this.tableData.map(item => item.Id);
        this.selectData.forEach(item => {
          let index = tab.indexOf(item.Id)
          this.$emit('setTableData', index)
        })
      })
    },
    batchEditDate() {
      this.editDeliveryDialogFormVisible = true;
      this.editDeliveryType = 'batch';
      this.editDeliveryData = this.selectData;
    },
    editDate(index, row) {
      this.editDeliveryDialogFormVisible = true;
      this.editDeliveryData = [row];
    },
    //修改交期完成
    completeEdit(e) {
      this.editDeliveryDialogFormVisible = false;
      // this.$emit('StartAutomaticScheduling')
      this.tableData = this.tableData.map(item => {
        if (e.BillIds.includes(item.BillId)) {
          return { ...item, PlanEnd: e.PlanEnd };
        }
        return item;
      });
    },
  },
};
</script>

<style scoped lang="scss"></style>
