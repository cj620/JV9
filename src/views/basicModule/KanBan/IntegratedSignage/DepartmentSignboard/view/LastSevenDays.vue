<template>
  <div style="height: 100%">
    <base-chart style="height: 100%" :options="options"></base-chart>
  </div>
</template>

<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
import { timeFormat } from "@/jv_doc/utils/time";
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
      // const xAxisData = val.XAxis.map(item => {
      //   return Month[item].numberName
      // })
      const xAxisData = val.Data.map((item) => {
        return timeFormat(item, "MM-dd");
      });
      // const series = val.Data.map((item) => {
      //   return {
      //     name: item.Name,
      //     type: "line",
      //     data: item.Values,
      //   };
      // });
      this.options = {
        title: {
          text: i18n.t('DataV.Da_RecordOfWorkingHoursInThePastSevenDays'),
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
            name: i18n.t('DataV.Da_PlannedTime'),
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
            name: i18n.t('DataV.Da_ActualHours'),
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
            name: i18n.t('DataV.Da_UtilizationRate'),
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
