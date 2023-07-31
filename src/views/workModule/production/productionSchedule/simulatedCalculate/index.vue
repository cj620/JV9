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
            <el-option label="经典算法" value="1"></el-option>
            <el-option label="CR值排程" value="2"></el-option>
            <el-option label="最短工期" value="3"></el-option>
            <el-option label="最早交货期" value="4"></el-option>
          </el-select>
          <el-button plain size="small" style="margin-left: 10px" @click="clear"
            >清空</el-button
          >
          <el-button
            plain
            size="small"
            style="margin-left: 10px"
            @click="simulatedCalculate"
            >模拟计算</el-button
          >
        </el-form-item>
        <el-tabs type="border-card">
          <el-tab-pane label="模拟排程">
            <el-row :gutter="20">
              <!-- 经典算法 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  title="经典算法"
                  :data="calculatedData1"
                  :num="num"
                  :hours="hours"
                  id="PieChart1"
                ></ChartWrapper>
              </el-col>
              <!-- CR值排程 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <!-- <div class="chart-title">CR值排程</div>
                <div class="simulatedCalculate-page-chart">
                  <div class="chart-description">
                    共有8个普通生产任务单延迟，共延迟128个小时。
                  </div>
                  <PieChart
                    id="PieChart2"
                    :data="calculatedData"
                  ></PieChart>
                </div> -->
                <ChartWrapper
                  title="CR值排程"
                  :data="calculatedData2"
                  :num="num"
                  :hours="hours"
                  id="PieChart2"
                ></ChartWrapper>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <!-- 最短工期 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  title="最短工期"
                  :data="calculatedData3"
                  :num="num"
                  :hours="hours"
                  id="PieChart3"
                ></ChartWrapper>
              </el-col>
              <!-- 最早交货期 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  title="最早交货期"
                  :data="calculatedData4"
                  :num="num"
                  :hours="hours"
                  id="PieChart4"
                ></ChartWrapper>
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
import ChartWrapper from "./components/chartWrapper.vue";
export default {
  name: "index",
  components: {
    ChartWrapper,
  },
  data() {
    return {
      value: [],
      calculatedData1: [
        { value: 0, name: "正常任务单", itemStyle: { color: "#00FF00" } },
        { value: 0, name: "延迟任务单", itemStyle: { color: "red" } },
      ],
      calculatedData2: [],
      calculatedData3: [],
      calculatedData4: [],
      num: 1,
      hours: 2,
    };
  },
  methods: {
    clear() {
      this.value = [];
    },
    simulatedCalculate() {
      this.value.forEach((item) => {
        console.log("item::: ", item);
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
    height: 40%;
  }
}
</style>
