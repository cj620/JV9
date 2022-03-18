<!--
 * @Author: C.
 * @Date: 2021-11-09 14:06:15
 * @LastEditTime: 2022-02-22 10:01:26
 * @Description: file content
-->
<!-- 项目成本 页面-->
<template>
  <PageWrapper :footer="false">
    <div style="height: 61%">

      <!-- 项目成本表格 -->
      <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
        <!-- 表格操作行 -->
        <Action
          size="mini"
          slot="btn-list"
          :actions="[
          {
            label: $t('project.Pro_PivotTable'),
            confirm: pivotTable,
          },
          ]"
        ></Action>
        <!-- operation操作列 -->
        <template #operation="{ row }">
          <TableAction
            v-if="row.CostType"
            :actions="[
              {
                label: $t('project.Pro_CheckDetails'),
                confirm: viewDetails.bind(null, row),
              },
            ]"
          />
        </template>
      </JvTable>
    </div>
    <div style="height: 37%; background: #fff; padding-bottom: 15px">
      <el-row>
        <el-col :span="8">
          <ChartBox :option="barChartOption"></ChartBox
        ></el-col>
        <el-col :span="8"><ChartBox :option="planPieChart"></ChartBox></el-col>
        <el-col :span="8"
          ><ChartBox :option="actualPieChart"></ChartBox
        ></el-col>
      </el-row>
    </div>
    <costBreakdown
      :visible.sync="costBreakdownDialogFormVisible"
      :rowData="rowData"
      v-if="costBreakdownDialogFormVisible"
      @confirmGenerateItems="confirmGenerateItems"
    ></costBreakdown>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
import { getBarChartOption, getPieChartOption } from "./chartConfig";
import ChartBox from "@/components/WorkModule/ChartBox";
import costBreakdown from "./components/costBreakdown";
export default {
  // 页面的标识
  name: "Pm_ProjectCost",
  components: {
    ChartBox,
    costBreakdown,
  },
  props: {},
  data() {
    return {
      // 表格实例
      tableObj: {},
      rowData: {},
      // 编辑路由
      EditRoute: "",
      // 新增路由
      AddRoute: "",
      costBreakdownDialogFormVisible: false,
      barChartOption: {},
      planPieChart: {},
      actualPieChart: {},
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.init();
  },
  mounted() {
    // this.$refs.barChart.chartRender();
  },
  computed: {},
  methods: {
    init() {
      // Project
      this.tableObj.formObj.form.Project = this.$route.query.Project;
      this.tableObj.setCallBack((data, form) => {
        // console.log(a, b, 6666666);
        this.getChartData(form);
      });
      this.tableObj.getData();
    },
    pivotTable(){
      this.$router.push({
        name:'Pm_PivotTable',
        query:{
          ProjectId:this.$route.query.Project
        }

      })
    },
    viewDetails(row) {
      if (
        row.CostType === "Material" ||
        row.CostType === "Production" ||
        row.CostType === "Outsourcing" ||
        row.CostType === "TrialTooling"
      ) {
        this.costBreakdownDialogFormVisible = true;
        this.rowData = row;
      }
    },
    getChartData(form) {
      this.tableObj.api.getChartData(form).then((res) => {
        this.barChartOption = getBarChartOption(res);
        this.planPieChart = getPieChartOption(res.PlanCost, "PlanCost");
        this.actualPieChart = getPieChartOption(res.ActualCost, "ActualCost");
      });
    },
    confirmGenerateItems(e) {
      this.costBreakdownDialogFormVisible = e;
    },
  },
  watch: {
    $route(to, from) {
      console.log(to, from, 9989898);
      if (to.name !== this.$options.name) return;
      if (to.query.Project != this.tableObj.formObj.form.Project) {
        this.init();
      }
    },
  },
};
</script>
