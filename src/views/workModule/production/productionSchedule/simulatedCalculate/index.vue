<template>
  <PageWrapper ref="page" :footer="false">
    <div class="simulatedCalculate-page" v-loading="loading">
      <el-form size="mini">
        <el-form-item :label="$t('production.Pr_SchedulingAlgorithmSelection')">
          <!-- 算法多选框 -->
          <el-select
            v-model="selectedType"
            multiple
            :placeholder="$t('production.Pr_PleaseSelectSchedulingAlgorithms')"
            size="small"
            style="width: 400px"
          >
            <el-option
              v-for="(option, index) in options"
              :key="index"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <el-button
            plain
            size="small"
            style="margin-left: 10px"
            @click="simulatedCalculate"
            :disabled="isValueEmpty"
            >{{ $t("production.Pr_SimulatedCalculate") }}</el-button
          >
          <el-button
            plain
            size="small"
            style="margin-left: 10px"
            @click="Refresh"
            >{{ $t("Generality.Ge_Refresh") }}</el-button
          >
        </el-form-item>
        <el-tabs type="border-card" @tab-click="handleTabClick">
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
            ><SimulatedResult :params="params[0]"
          /></el-tab-pane>
          <el-tab-pane :label="$t('production.Pr_CRValueScheduling')"
            ><SimulatedResult :params="params[1]"
          /></el-tab-pane>
          <el-tab-pane :label="$t('production.Pr_ShortestDurationAlgorithm')"
            ><SimulatedResult :params="params[2]"
          /></el-tab-pane>
          <el-tab-pane
            :label="$t('production.Pr_AlgorithmForEarliestDeliveryTime')"
            ><SimulatedResult :params="params[3]"
          /></el-tab-pane>
        </el-tabs>
      </el-form>
    </div>
  </PageWrapper>
</template>

<script>
import ChartWrapper from "./components/chartWrapper.vue";
import { pie_chart } from "@/api/workApi/production/aps";
import { simulation_calculate } from "@/api/workApi/production/aps";
import SimulatedResult from "./components/simulatedResult.vue";
export default {
  name: "index",
  components: {
    ChartWrapper,
    SimulatedResult,
  },
  data() {
    return {
      options: [
        // 经典算法
        { label: this.$t("production.Pr_ConventionalAlgorithm"), value: 0 },
        // 最短工期
        { label: this.$t("production.Pr_ShortestDurationAlgorithm"), value: 1 },
        // 最早交货期
        {
          label: this.$t("production.Pr_AlgorithmForEarliestDeliveryTime"),
          value: 2,
        },
        // CR值排程
        { label: this.$t("production.Pr_CRValueScheduling"), value: 3 },
      ],
      // 当前时间
      StartDate: new Date(),
      // 多选值
      selectedType: [],
      // chartWrapper接收数据
      calculatedData: [{}, {}, {}, {}],
      // 算法个数
      dataNum: [0, 1, 2, 3],
      // 接口获取到的饼状图数据
      pieChartData: [],
      // 加载
      loading: true,
      // 计算结果入参
      params: [{}, {}, {}, {}],
      //默认选中第一个标签页
      currentTabName: "0",
    };
  },
  created() {
    this.getData();
  },
  // 监控标签页是否切换
  watch: {
    currentTabName(newVue, oldVue) {
      newVue == 0 ? this.getData() : this.postParams(newVue);
    },
  },
  computed: {
    isValueEmpty() {
      return this.selectedType.length === 0;
    },
  },
  methods: {
    handleTabClick(tab) {
      this.currentTabName = tab.paneName;
    },
    // 给对应标签页接口传入参
    postParams(name) {
      const index = name - 1;
      const algorithmType = index;
      if (index != -1) {
        this.params.splice(index, 1, {
          Keyword: "",
          AlgorithmType: algorithmType,
        });
      }
    },
    getData() {
      pie_chart().then((res) => {
        this.pieChartData = res;
        this.loading = false;
        this.calculatedData = res;
      });
    },
    // 刷新
    Refresh() {
      this.getData();
      this.selectedType = [];
    },
    // 赋值
    simulatedCalculate() {
      this.loading = true;
      let arr = [];
      this.selectedType.forEach((item) => {
        // this.calculatedData.splice(item, 1, this.testData);
        arr.push(item);
      });
      simulation_calculate({
        StartDate: this.StartDate,
        AlgorithmTypes: arr,
      }).then((res) => {
        this.loading == false;
        this.Refresh();
      });
      console.log("arr::: ", arr);
    },
  },
};
</script>

<style scoped lang="scss">
.el-form-item {
  margin-bottom: 4px;
}
.simulatedCalculate-page {
  height: 100%;
  background-color: #ffffff;
  padding: 6px 10px;
}
::v-deep .simulatedCalculate-page .el-tabs--border-card > .el-tabs__content {
  padding: 0 !important;
}
</style>
