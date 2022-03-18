<!--
 * @Author: H.
 * @Date: 2021-12-22 16:36:32
 * @LastEditTime: 2021-12-22 17:20:54
 * @Description:
-->
<template>
  <div>
    <base-chart height="216px" :options="options"></base-chart>
  </div>
</template>

<script>
import BaseChart from "../echarts/base-echart.vue";
export default {
  components: {
    BaseChart,
  },
  props: {
    series: {
      type: Array,
      default: () => [],
    },
    xData: {
      type: Array,
      default: () => [],
    },
    legendData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.legendData,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          data: this.xData,
        },
        yAxis: {
          type: "value",
        },
        series: this.series,
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
