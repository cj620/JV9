<template>
  <PageWrapper ref="page" :footer="false">
    <div class="simulatedCalculate-page" v-loading="loading">
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
            <!-- 最短工期算法 -->
            <el-option
              :label="$t('production.Pr_ShortestDurationAlgorithm')"
              :value="1"
            ></el-option>
            <!-- 最早交货期 -->
            <el-option
              :label="$t('production.Pr_AlgorithmForEarliestDeliveryTime')"
              :value="2"
            ></el-option>
            <!-- CR值排程 -->
            <el-option
              :label="$t('production.Pr_CRValueScheduling')"
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
                  id="PieChart1"
                ></ChartWrapper>
              </el-col>
              <!-- 最短工期 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  :title="$t('production.Pr_ShortestDurationAlgorithm')"
                  :datas="calculatedData[1]"
                  id="PieChart2"
                ></ChartWrapper>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <!-- 最早交货期 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  :title="$t('production.Pr_AlgorithmForEarliestDeliveryTime')"
                  :datas="calculatedData[2]"
                  id="PieChart3"
                ></ChartWrapper>
              </el-col>

              <!-- CR值排程 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  :title="$t('production.Pr_CRValueScheduling')"
                  :datas="calculatedData[3]"
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
import { pie_chart } from "@/api/workApi/production/aps";
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
      calculatedData: [{}, {}, {}, {}],
      // 算法个数
      dataNum: [0, 1, 2, 3],
      // 接口获取到的饼状图数据
      pieChartData: [],
      // 加载
      loading: true,
    };
  },
  created() {
    pie_chart().then((res) => {
      this.pieChartData = res;
      this.loading = false;
    });
  },
  methods: {
    // 清空多选框与重置数据
    clear() {
      this.value = [];
      this.calculatedData = [{}, {}, {}, {}];
      this.simulatedCalculate();
    },
    // 赋值
    simulatedCalculate() {
      this.value.forEach((item) => {
        this.calculatedData.splice(item, 1, this.pieChartData[item]);
      });
      // 获取未选中方法并重置其组件获取数据
      let list = this.dataNum.filter((num) => !this.value.includes(num));
      list.forEach((item) => {
        this.calculatedData.splice(item, 1, {});
      });
      // console.log("this.calculatedData::: ", this.calculatedData);
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
}
/* .simulatedCalculate-page-chartwrapper {
  padding: 0 20px;
  height: 50%;
} */
</style>
