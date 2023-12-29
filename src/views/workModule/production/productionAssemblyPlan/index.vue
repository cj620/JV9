<template>
  <PageWrapper :footer="false">
    <div class="table-header">
      <el-button @click="filter" size="mini">
        <i class="el-icon-search"></i>
        过滤
      </el-button>
    </div>
    <div class="table-body">
      <el-table
        ref="BillTable"
        :data="tableData"
        style="width: 98%;"
        border
      >
        <el-table-column type="expand">
          <template slot-scope="props">
            123
          </template>
        </el-table-column>
        <el-table-column :label="$t('production.Pr_TaskBillId')" prop="TaskBillId">
        </el-table-column>
        <el-table-column :label="$t('Generality.Ge_ToolingNo')" prop="ToolingNo">
        </el-table-column>
        <el-table-column :label="$t('Generality.Ge_ToolingName')" prop="ToolingName">
        </el-table-column>
        <el-table-column :label="$t('Generality.Ge_Department')" prop="Department">
        </el-table-column>
        <el-table-column :label="$t('project.Pro_Worker')" prop="Worker">
        </el-table-column>
        <el-table-column :label="$t('Generality.Ge_Schedule')" prop="Schedule">
        </el-table-column>
        <el-table-column :label="$t('Generality.Ge_State')" prop="State">
        </el-table-column>
        <el-table-column :label="$t('production.Pr_CompleteState')" prop="CompleteState">
        </el-table-column>
      </el-table>
    </div>
  </PageWrapper>
</template>
<script>
export default {
  name: "ProductionAssemblyPlan",
  data() {
    return {
      tableData:[]
    }
  },
  created() {

  },
  methods: {
    filter() {

    }
  }
}

</script>
<style lang="scss" scoped>
.table-header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: right;
}
.table-body {
  
}
</style>
