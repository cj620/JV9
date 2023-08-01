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
    datas: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      myChart: {},
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  watch: {
    datas() {
      echarts.dispose(document.getElementById(this.id));
      this.drawLine();
    },
  },
  methods: {
    drawLine() {
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
            data: this.datas,
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
        this.myChart.resize();
      });
      // this.myChart.resize();
      // this.$nextTick(() => {
      //   this.myChart.resize(); // 图表自适应
      // });
    },
  },
};
</script>

<style scoped></style>
