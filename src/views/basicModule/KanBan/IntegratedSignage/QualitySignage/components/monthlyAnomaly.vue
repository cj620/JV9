<template>
  <div style="height: 100%">
    <base-chart style="height: 100%" :options="options"></base-chart>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
import { Month } from "@/enum/baseModule/dataV/Month"
export default {
  name: "monthlyAnomaly",
  components: {
    BaseChart,
  },
  props: {
    result: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data(){
    return {
      options: {},
      XAxis: ['1','2','3','4','5','6','7','8','9','10','11','12']
    }
  },
  watch: {
    result(val) {
      const xAxisData = this.XAxis.map(item => {
        return Month[item].numberName
      })
      this.options = {
        title: {
          text: "每月异常统计",
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
        toolbox: {
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
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
            position: 'left',
            axisLine:{
              show:true
            },
            axisLabel: {
              show:true,
              textStyle:{
                color: '#eaeaea'
              }
            }
          },
          {
            type: 'value',
            position: 'right',
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
      }
    }
  }
}
</script>
