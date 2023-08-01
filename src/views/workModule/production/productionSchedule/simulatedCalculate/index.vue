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
            <el-option label="经典算法" :value="0"></el-option>
            <el-option label="CR值排程" :value="1"></el-option>
            <el-option label="最短工期" :value="2"></el-option>
            <el-option label="最早交货期" :value="3"></el-option>
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
          <!-- 模拟排程tabs -->
          <el-tab-pane label="模拟排程">
            <el-row :gutter="20">
              <!-- 经典算法 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  title="经典算法"
                  :datas="calculatedData[0]"
                  :num="num"
                  :hours="hours"
                  id="PieChart1"
                ></ChartWrapper>
              </el-col>
              <!-- CR值排程 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  title="CR值排程"
                  :datas="calculatedData[1]"
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
                  :datas="calculatedData[2]"
                  :num="num"
                  :hours="hours"
                  id="PieChart3"
                ></ChartWrapper>
              </el-col>
              <!-- 最早交货期 -->
              <el-col :span="12" class="simulatedCalculate-page-chartwrapper">
                <ChartWrapper
                  title="最早交货期"
                  :datas="calculatedData[3]"
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
      // 多选值
      value: [],
      // chartWrapper接收数据
      calculatedData: [[], [], [], []],
      // 算法个数
      dataNum: [0, 1, 2, 3],
      // 传递给组件description的数据（由接口获取）
      num: 1,
      hours: 2,
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
          {
            value: 1231,
            name: "正常任务单",
            itemStyle: { color: "#00FF00" },
          },
          { value: 987, name: "延迟任务单", itemStyle: { color: "red" } },
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
    height: 40%;
  }
}
</style>
