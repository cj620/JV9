<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts';
require("echarts/theme/macarons"); // echarts theme
import resize from "~/utils/system/mixins/resize";

const animationDuration = 6000;

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "300px",
    },
    option: {
      type: Object,
      default: () => {
        return {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          grid: {
            top: 10,
            left: "2%",
            right: "2%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              axisTick: {
                show: false,
              },
            },
          ],
          series: [
            {
              name: "pageA",
              type: "bar",
              stack: "vistors",
              barWidth: "60%",
              data: [79, 52, 200, 334, 390, 330, 220],
              animationDuration,
            },
            {
              name: "pageB",
              type: "bar",
              stack: "vistors",
              barWidth: "60%",
              data: [80, 52, 200, 334, 390, 330, 220],
              animationDuration,
            },
            {
              name: "pageC",
              type: "bar",
              stack: "vistors",
              barWidth: "60%",
              data: [30, 52, 200, 334, 390, 330, 220],
              animationDuration,
            },
          ],
        }
      }
    },
  },
  data() {
    return {
      chart: null,
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
    this.chartRender();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    chartRender() {
      if (!this.isMounted) {
        setTimeout(() => {
          this.chartRender();
        }, 100);
      } else {
        this.$nextTick(() => {
          this.initChart();
        });
      }
    },
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption(this.option);
    },
  },
  watch: {
    option: {
      handler(n, o) {
        this.chartRender();
      },
      deep: true,
    },
  },
};
</script>
