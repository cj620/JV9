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
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      options: {},
    };
  },
  watch: {
    result(val) {
      const months = val.Date.map(date => {
        const d = new Date(date);
        return d.getMonth() + 1;
      });
      const xAxisData = months.map(item => {
        return Month[item].numberName
      })
      this.options = {
        color: ['#FFD700'],
        title: {
          text: i18n.t('DataV.Da_MonthlyShipmentStatisticsForThisYear'),
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
            name: i18n.t('DataV.Da_ShipmentAmountRMB'),
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
            data: val.Amount
          },
        ]
      }
    }
  }
}
</script>
