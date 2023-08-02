<template>
  <PageWrapper ref="page" :footer="false">
    <div class="simulatedCalculate-page">
      <el-form size="mini">
        <el-form-item :label="$t('production.Pr_SchedulingAlgorithmSelection')">
          <!-- 算法多选框 -->
          <el-select
            v-model="value"
            multiple
            :placeholder="$t('production.Pr_PleaseSelectSchedulingAlgorithms')"
            size="small"
            style="width: 400px"
          >
            <!-- 经典算法 -->
            <el-option
              :label="$t('production.Pr_ConventionalAlgorithm')"
              :value="0"
            ></el-option>
            <!-- CR值排程 -->
            <el-option
              :label="$t('production.Pr_CRValueScheduling')"
              :value="1"
            ></el-option>
            <!-- 最短工期算法 -->
            <el-option
              :label="$t('production.Pr_ShortestDurationAlgorithm')"
              :value="2"
            ></el-option>
            <!-- 最早交货期 -->
            <el-option
              :label="$t('production.Pr_AlgorithmForEarliestDeliveryTime')"
              :value="3"
            ></el-option>
          </el-select>
          <el-button
            plain
            size="small"
            style="margin-left: 10px"
            @click="clear"
            >{{ $t("Generality.Ge_Reset") }}</el-button
          >
          <el-button
            plain
            size="small"
            style="margin-left: 10px"
            @click="simulatedCalculate"
            >{{ $t("production.Pr_SimulatedCalculate") }}</el-button
          >
        </el-form-item>
        <el-tabs type="border-card">
          <!-- 模拟排程tabs -->
          <el-tab-pane :label="$t('production.Pr_SimulatedAPS')">
            <el-row :gutter="20">
              <!-- 经典算法 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  :title="$t('production.Pr_ConventionalAlgorithm')"
                  :datas="calculatedData[0]"
                  :WorksheetNum="WorksheetNum"
                  id="PieChart1"
                ></ChartWrapper>
              </el-col>
              <!-- CR值排程 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  :title="$t('production.Pr_CRValueScheduling')"
                  :datas="calculatedData[1]"
                  :WorksheetNum="WorksheetNum"
                  id="PieChart2"
                ></ChartWrapper>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <!-- 最短工期 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  :title="$t('production.Pr_ShortestDurationAlgorithm')"
                  :datas="calculatedData[2]"
                  :WorksheetNum="WorksheetNum"
                  id="PieChart3"
                ></ChartWrapper>
              </el-col>
              <!-- 最早交货期 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  :title="$t('production.Pr_AlgorithmForEarliestDeliveryTime')"
                  :datas="calculatedData[3]"
                  :WorksheetNum="WorksheetNum"
                  id="PieChart4"
                ></ChartWrapper>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane :label="$t('production.Pr_ConventionalAlgorithm')"
            >经典算法</el-tab-pane
          >
          <el-tab-pane :label="$t('production.Pr_CRValueScheduling')"
            >CR值排程</el-tab-pane
          >
          <el-tab-pane :label="$t('production.Pr_ShortestDurationAlgorithm')"
            >最短工期</el-tab-pane
          >
          <el-tab-pane
            :label="$t('production.Pr_AlgorithmForEarliestDeliveryTime')"
            >最早交货期</el-tab-pane
          >
        </el-tabs>
      </el-form>
    </div>
  </PageWrapper>
</template>

<script>
import ChartWrapper from "./components/chartWrapper.vue";
export default {
  name: "index",
  components: {
    ChartWrapper,
  },
  data() {
    return {
      // 多选值
      value: [],
      // chartWrapper接收数据
      calculatedData: [[], [], [], []],
      // 算法个数
      dataNum: [0, 1, 2, 3],
      // 传递给组件的（由接口获取）
      WorksheetNum: [10, 0, 2, 3],
    };
  },
  methods: {
    // 清空多选框与重置数据
    clear() {
      this.value = [];
      this.calculatedData = [[], [], [], []];
      this.simulatedCalculate();
    },
    // 获取接口数据并赋值
    simulatedCalculate() {
      // let maps = {
      //   0: first,
      //   1: first,
      //   2: first,
      //   3: first,
      // };
      this.value.forEach((item, i) => {
        // first().then(res => {
        //   this.calculatedData.splice(item, 1, res);
        // })
        // setTimeout(() => {
        //   let res = [
        //     {
        //       value: 1231,
        //       name: "正常任务单",
        //       itemStyle: { color: "#00FF00" },
        //     },
        //     { value: 987, name: "延迟任务单", itemStyle: { color: "red" } },
        //   ];
        //   this.calculatedData.splice(item, 1, res);
        // }, 1000);
        let res = [
          // "NormalWorksheetNum":正常工单数
          // "TimeoutWorksheetNum"：超交期工单数
          // "OverloadWorksheetNum":超负荷工单数
          {
            value: 1231,
            name: "正常工单",
            itemStyle: { color: "#00FF00" },
          },
          { value: 987, name: "超交期工单", itemStyle: { color: "red" } },
          { value: 987, name: "超负荷工单", itemStyle: { color: "yellow" } },
        ];
        this.calculatedData.splice(item, 1, res);
      });
      // 获取未选中方法并重置其组件获取数据
      let list = this.dataNum.filter((num) => !this.value.includes(num));
      list.forEach((item) => {
        this.calculatedData.splice(item, 1, []);
      });
    },
  },
};
</script>

<style scoped>
.el-form-item {
  margin-bottom: 14px;
}
.simulatedCalculate-page {
  height: 100%;
  background-color: #ffffff;
  padding: 10px;
  .simulatedCalculate-page-chartwrapper {
    padding: 0 20px;
    height: 50%;
  }
}
</style>
