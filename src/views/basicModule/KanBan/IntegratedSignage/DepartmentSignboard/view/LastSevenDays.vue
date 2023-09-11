<template>
  <div style="height: 100%">
    <base-chart style="height: 100%" :options="options"></base-chart>
  </div>
</template>

<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
import {Month} from '@/enum/baseModule/dataV/Month';
export default {
  name: "LastSevenDays",
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
      const xAxisData = val.XAxis.map(item => {
        return Month[item].numberName
      })
      // const date = val.Date.map((item) => {
      //   return timeFormat(item, "MM-dd");
      // });
      // const series = val.Data.map((item) => {
      //   return {
      //     name: item.Name,
      //     type: "line",
      //     data: item.Values,
      //   };
      // });
      this.options = {
        title: {
          text: '过去七天工时记录',
          textStyle: {
            color: '#eaeaea'
          },
          left: '3%',
          top: "3%",
        },
        tooltip: {
          trigger: 'axis',
          // axisPointer: {
          //   type: 'cross',
          //   crossStyle: {
          //     color: '#999'
          //   }
          // }
        },
        grid: {
          left: "3%",
          right: "3%",
          bottom: "4%",
          top: "14%",
          containLabel: true,
        },
        toolbox: {
          // feature: {
          //   dataView: { show: true, readOnly: false },
          //   magicType: { show: true, type: ['line', 'bar'] },
          //   restore: { show: true },
          //   saveAsImage: { show: true }
          // }
        },
        legend: {
          top: "3%",
          right: "3%",
          textStyle: {color: '#eaeaea'}
        },
        xAxis: [
          {
            type: 'category',
            data: xAxisData,
            axisPointer: {
              type: 'shadow'
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
          }
        ],
        yAxis: [
          {
            type: 'value',
            // name: 'Precipitation',
            min: 0,
            max: 250,
            // interval: 50,
            axisLine: {
              lineStyle: {
                color: "#eaeaea",
              },
            },
            splitLine: {
              lineStyle: {
                color: ["#999"],
              },
            }
          },
          {
            type: 'value',
            // name: 'Temperature',
            min: 0,
            max: 250,
            // interval: 5,
            axisLine: {
              lineStyle: {
                color: "#eaeaea",
              },
            },
            splitLine: {
              lineStyle: {
                color: ["#ccc"],
              },
            }
          }
        ],
        series: [
          {
            name: '预计工时',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },
            data: val.PlannedTime,
            label: {
              show: true,
              position: 'top',
              textBorderColor: 'inherit',
              color: "inherit",
            },
            // itemStyle: {
            //   normal: {
            //     color: '#6481ee' // 深蓝色
            //   }
            // },
          },
          {
            name: '实际工时',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value) {
                return value;
              }
            },
            itemStyle: {
              normal: {
                color: '#46c882'
              }
            },
            data: val.ActualHour,
            label: {
              show: true,
              color: "inherit",
              position: 'top',
              textBorderColor: 'inherit'
            }
          },
          {
            name: '稼动率',
            type: 'line',
            yAxisIndex: 1,
            tooltip: {
              valueFormatter: function (value) {
                return value + ' °C';
              }
            },
            itemStyle: {
              normal: {
                color: '#f3b564' // 深蓝色
              }
            },
            data: val.UtilizationRate,
          }
        ]
      };
    },
  },
};
</script>

<style scoped lang="scss"></style>
