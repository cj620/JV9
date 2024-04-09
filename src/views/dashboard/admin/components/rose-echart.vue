<!--
 * @Author: H.
 * @Date: 2021-12-13 15:06:03
 * @LastEditTime: 2021-12-24 09:09:20
 * @Description: 玫瑰图
-->
<template>
  <div class="rose-echart">
    <base-chart height="300px" :options="options"></base-chart>
  </div>
</template>

<script>
import BaseChart from "../echarts/base-echart.vue";
export default {
  components: {
    BaseChart,
  },
  props: {
    roseData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    options() {
      return {
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: false, readOnly: false },
            restore: { show: false },
            saveAsImage: { show: false },
          },
        },
        series: [
          {
            name: "类别数据",
            type: "pie",
            radius: [10, 80],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 4,
            },
            label: {
              show: false,
            },
            data: this.roseData,
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
