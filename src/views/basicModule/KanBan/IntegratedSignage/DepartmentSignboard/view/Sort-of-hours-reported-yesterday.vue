<template>
  <div class="sort-of-hours-reported-yesterday">
    <div class="sort-of-hours-reported-yesterday-title">{{$t('DataV.Da_SortingOfWorkHoursReportedYesterday')}}</div>
    <base-chart style="height: calc(100% - 40px)" :options="options"></base-chart>
  </div>
</template>

<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";

export default {
  name: "Sort-of-hours-reported-yesterday",
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
      options: {}
    }
  },
  watch: {
    result(val) {
      this.options = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          top: '0%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01],
          splitLine: {
            lineStyle: {
              color: ["#999"],
            },
          },
          axisLine: {
            lineStyle: {
              color: "#eaeaea",
            },
          },
        },
        yAxis: {
          type: 'category',
          data: val.Name ? val.Name.reverse() : val.Name,
          axisLine: {
            lineStyle: {
              color: "#eaeaea",
            },
          },
        },
        series: [
          {
            name: '2011',
            type: 'bar',
            data: val.Date ? val.Date.reverse() : val.Date,
            label: {
              show: true,
              position: 'right',
              textBorderColor: 'inherit',
              color: "inherit",
            },
            // itemStyle: {
            //   normal: {
            //     color: '#6481ee' // 深蓝色
            //   }
            // },
          },
        ]
      };
    }
  }
};
</script>

<style scoped lang="scss">
.sort-of-hours-reported-yesterday {
  height: 100%;
  width: 100%;
  &-title {
    font-size: 18px;
    font-weight: bold;
    color: #eaeaea;
    height: 40px;
    width: 100%;
    text-align: center;
    line-height: 40px;
  }
}
</style>
