<template>
  <div style="height: 100%">
    <base-chart style="height: 100%" :options="options"></base-chart>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
import { Month } from "@/enum/baseModule/dataV/Month"
export default {
  name: 'monthlyShipments',
  components: { BaseChart },
  props: {
    result: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      options: {},
      XAxis: ['1','2','3','4','5','6','7','8','9','10','11','12'],
    };
  },
  watch: {
    result(val) {
      const xAxisData = this.XAxis.map(item => {
        return Month[item].numberName
      })
      this.options = {
        color: ['#FFD700'],
        title: {
          text: "本年每月订单统计",
          textStyle: {
            color: '#eaeaea'
          },
          left: '3%',
          top: "3%",
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          top: '3%',
          right: '4%',
          data: ['出货金额RMB'],
          textStyle:{
            color: '#eaeaea'
          }
        },
        grid: {
          left: '4%',
          right: '5%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: xAxisData,
            axisLabel: {
              show:true,
              textStyle:{
                color: '#eaeaea'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLine:{
              show:true
            },
            axisLabel: {
              show:true,
              textStyle:{
                color: '#eaeaea'
              }
            }
          }
        ],
        series: [
          {
            name: '出货金额RMB',
            type: 'line',
            smooth: true,
            lineStyle: {
              width: 2
            },
            showSymbol: false,
            areaStyle: {
              opacity: 0.8,
              color: '#AEB103'
            },
            emphasis: {
              focus: 'series'
            },
            data: val
          },
        ]
      }
    }
  }
}
</script>
