<!--饼图-->
<template>
  <div>
    <div :id="id" :style="{ height: '100%', minHeight: height + 'px' }"></div>
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
        return 290;
      },
    },
    id: {
      type: String,
      default() {
        return null;
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  async mounted() {
    await this.drawLine();
  },
  watch: {
    data() {
      this.drawLine();
    },
  },
  methods: {
    drawLine() {
      echarts.dispose(document.getElementById(this.id));
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.id));
      // 绘制图表
      myChart.setOption({
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
            data: this.data,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
          },
        ],
      });
      window.addEventListener("resize", function () {
        myChart.resize();
      });
      myChart.resize();
      this.$nextTick(() => {
        myChart.resize(); // 图表自适应
      });
    },
  },
};
</script>

<style scoped></style>
