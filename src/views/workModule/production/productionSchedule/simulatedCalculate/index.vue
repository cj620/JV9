<template>
  <PageWrapper ref="page" :footer="false">
    <div class="simulatedCalculate-page">
      <el-form size="mini">
        <el-form-item label="排程算法选择">
          <el-select
            v-model="value"
            multiple
            placeholder="请选择排程算法"
            size="small"
            style="width: 400px"
          >
            <el-option label="经典算法" value="经典算法"></el-option>
            <el-option label="CR值排程" value="CR值排程"></el-option>
            <el-option label="最短工期" value="最短工期"></el-option>
            <el-option label="最短交货期" value="最短交货期"></el-option>
          </el-select>
          <el-button plain size="small" style="margin-left: 10px"
            >模拟计算</el-button
          >
        </el-form-item>
        <el-tabs type="border-card">
          <el-tab-pane label="模拟排程">
            <el-row :gutter="20">
              <!-- 经典算法 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <div class="chart-top-title">经典算法</div>
                <div class="simulatedCalculate-page-chart">
                  <!-- <div class="chart-description">
                    共有8个普通生产任务单延迟，共延迟128个小时。
                  </div> -->
                  <div class="chart-description">
                    当前共有18个工单正在生产,7个工单待生产。
                  </div>
                  <PieChart
                    id="PieChart1"
                    :data="AbnormalProportion"
                  ></PieChart>
                </div>
              </el-col>
              <!-- CR值排程 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <div class="chart-top-title">CR值排程</div>
                <div class="simulatedCalculate-page-chart">
                  <div class="chart-description">
                    共有8个普通生产任务单延迟，共延迟128个小时。
                  </div>
                  <PieChart
                    id="PieChart2"
                    :data="AbnormalProportion"
                  ></PieChart>
                </div>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <!-- 最短工期 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <div class="chart-bottom-title">最短工期</div>
                <div
                  class="simulatedCalculate-page-chart"
                  v-if="AbnormalProportion.length > 0"
                >
                  <div class="chart-description">
                    共有8个普通生产任务单延迟，共延迟128个小时。
                  </div>
                  <PieChart
                    id="PieChart3"
                    :data="AbnormalProportion"
                  ></PieChart>
                </div>
                <div class="simulatedCalculate-page-chart" v-else>
                  <div class="chart-description">
                    当前共有18个工单正在生产,7个工单待生产。
                  </div>
                  <PieChart
                    id="PieChart3"
                    :data="AbnormalProportion"
                  ></PieChart>
                </div>
              </el-col>
              <!-- 最早交货期 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <div class="chart-bottom-title">最早交货期</div>
                <div class="simulatedCalculate-page-chart">
                  <div class="chart-description">
                    共有8个普通生产任务单延迟，共延迟128个小时。
                  </div>
                  <PieChart
                    id="PieChart4"
                    :data="AbnormalProportion"
                  ></PieChart>
                </div>
              </el-col>
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="经典算法">经典算法</el-tab-pane>
          <el-tab-pane label="CR值排程">CR值排程</el-tab-pane>
          <el-tab-pane label="最短工期">最短工期</el-tab-pane>
          <el-tab-pane label="最早交货期">最早交货期</el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </PageWrapper>
</template>

<script>
import PieChart from "./components/pieChart";
export default {
  name: "index",
  components: {
    PieChart,
  },
  data() {
    return {
      value: [],
      AbnormalProportion: [
        { value: 0, name: "正常任务单", itemStyle: { color: "#00FF00" } },
        { value: 0, name: "延迟任务单", itemStyle: { color: "red" } },
      ],
    };
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
    height: 40%;
    .simulatedCalculate-page-chart {
      border: 2px solid gainsboro;
      margin: 0 10% 0 10%;
    }
  }
}
.chart-top-title {
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: 500;
  margin: 0 10% 5px 10%;
}
.chart-bottom-title {
  margin: 10px 0 5px 0;
  font-size: 16px;
  font-weight: 500;
  margin: 10px 10% 5px 10%;
}
.chart-description {
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  text-align: center;
}
</style>
