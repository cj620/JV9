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
    }
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
        title: {
          text: i18n.t('DataV.Da_MonthlyAnomaly'),
          textStyle: {
            color: '#eaeaea'
          },
          left: '3%',
          top: "3%",
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          top: "3%",
          right: '4%',
          textStyle:{
            color: '#eaeaea'
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
			      alignTicks: true,
            axisLine:{
              show:true,
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
			      alignTicks: true,
            axisLine:{
              show:true,
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
				  name: i18n.t('DataV.Da_UnqualifiedQty'),
				  type: 'bar',
				  data: val.UnqualifiedQty,
          label: {
            show: true,
            position: 'inside'
          },
			  },
			  {
				  name: i18n.t('DataV.Da_UnqualifiedPercent'),
				  type: 'line',
				  yAxisIndex: 1,
				  data: val.UnqualifiedPercent,
			  },
      ]
      }
    }
  }
}
</script>
