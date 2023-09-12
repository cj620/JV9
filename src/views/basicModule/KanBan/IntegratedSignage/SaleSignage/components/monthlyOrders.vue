<template>
  <div style="height: 100%">
    <base-chart style="height: 100%" :options="options"></base-chart>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
import { Month } from "@/enum/baseModule/dataV/Month"
export default {
  name: "monthlyOrders",
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
      XAxis: ['1','2','3','4','5','6','7','8','9','10','11','12'],
    };
  },
  watch: {
    result(val) {
      const xAxisData = this.XAxis.map(item => {
        return Month[item].numberName
      })
      this.options = {
        title:{
          text: "本年每月订单统计",
          textStyle: {
            color: '#eaeaea'
          },
          left: '3%',
          top: "3%",
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          top: "3%",
          right: '4%',
          textStyle:{
            color: '#eaeaea'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
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
            name: '国内订单',
            type: 'bar',
            stack: 'order',
            itemStyle: {
              color: '#46c882'
            },
            emphasis: {
              focus: 'series'
            },
            data: val.DomesticOrders
          },
          {
            name: '国外订单',
            type: 'bar',
            stack: 'order',
            itemStyle: {
              color: '#06E0E1'
            },
            emphasis: {
              focus: 'series'
            },
            data: val.ForeignOrders
          },
          {
            name: '客诉订单',
            type: 'bar',
            stack: 'order',
            itemStyle: {
              color: '#EA6D6A'
            },
            emphasis: {
              focus: 'series'
            },
            data: val.ComplaintOrder
          },
          {
            name: '其它类型',
            type: 'bar',
            stack: 'order',
            itemStyle: {
              color: '#5b7ad8'
            },
            emphasis: {
              focus: 'series'
            },
            data: val.OtherOrder
          },
        ]
      }
    }
  }
};
</script>
