<!--
 * @Author: H.
 * @Date: 2021-12-22 13:35:03
 * @LastEditTime: 2021-12-24 09:11:35
 * @Description:
-->
<template>
  <div>
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
    pieData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    options() {
      return {
        tooltip: {
          trigger: "item",
        },

        legend: {
          orient: "horizontal",
          left: "left",
        },
        series: [
          {
            name: "",
            type: "pie",
            radius: "50%",
            data: this.pieData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
            label: {
              show: false,
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
