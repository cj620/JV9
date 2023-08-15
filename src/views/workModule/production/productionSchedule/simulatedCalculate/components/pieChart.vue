<!--饼图-->
<template>
  <div style="height: 100%">
    <div :id="id" style="height: 100%"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "pieChart",
  props: {
    height: {
      type: Number,
      default() {
        return 100;
      },
    },
    id: {
      type: String,
      default() {
        return null;
      },
    },
    WorksheetNum: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      myChart: {},
      chartData: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  watch: {
    WorksheetNum() {
      this.drawLine();
    },
  },
  methods: {
    transData() {
      if (this.WorksheetNum.length !== 0) {
        this.chartData = [
          {
            value: this.WorksheetNum[0],
            name: "正常工单",
            itemStyle: { color: "#00FF00" },
          },
          {
            value: this.WorksheetNum[1],
            name: "超交期工单",
            itemStyle: { color: "red" },
          },
          {
            value: this.WorksheetNum[2],
            name: "超负荷工单",
            itemStyle: { color: "yellow" },
          },
        ];
      } else {
        this.chartData = [];
      }
    },
    drawLine() {
      echarts.dispose(document.getElementById(this.id));
      this.transData();
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById(this.id));

      // 绘制图表
      this.myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            data: this.chartData,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
          },
        ],
      });
      window.addEventListener("resize", () => {
        this.myChart.resize();
      });
    },
  },
};
</script>

<style scoped></style>
