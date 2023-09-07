<template>
  <div style="height: 100%">
    <base-chart style="height: 100%" :options="options"></base-chart>
  </div>
</template>

<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
import timeFormat from "~/utils/time/timeFormat";
export default {
  name: "EquipmentDynamicCurve",
  components: { BaseChart },
  props: {
    result: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      options: {},
    };
  },
  watch: {
    result(val) {
      const date = val.Date.map((item) => {
        return timeFormat(item, "MM-dd");
      });
      const series = val.Data.map((item) => {
        return {
          name: item.Name,
          type: "line",
          data: item.Values,
        };
      });
      this.options = {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "4%",
          top: "3%",
          containLabel: true,
        },
        // toolbox: {
        //   feature: {
        //     saveAsImage: {}
        //   }
        // },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
          axisLine: {
            lineStyle: {
              color: "#eaeaea",
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#eaeaea",
            },
          },
          axisLabel: { formatter: "{value}% " },
        },
        series: series,
      };
    },
  },
};
</script>

<style scoped lang="scss"></style>
