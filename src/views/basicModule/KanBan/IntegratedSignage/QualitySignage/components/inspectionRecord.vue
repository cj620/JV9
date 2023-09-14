<template>
  <div style="height: 100%">
    <base-chart style="height: 100%" :options="options"></base-chart>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";

export default {
  name: "inspectionRecord",
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
    }
  },
  watch: {
    result(val){
      this.options = {
        title: {
          text: i18n.t('DataV.Da_InspectionRecord'),
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
            data: val.Name,
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
            name: i18n.t('DataV.Da_QualifiedQty'),
            type: 'bar',
            stack: 'quantity',
            itemStyle: {
              color: '#46c882'
            },
            emphasis: {
              focus: 'series'
            },
            data: val.QualifiedQty
          },
          {
            name: i18n.t('DataV.Da_UnqualifiedQty'),
            type: 'bar',
            stack: 'quantity',
            itemStyle: {
              color: '#5b7ad8'
            },
            emphasis: {
              focus: 'series'
            },
            data: val.UnqualifiedQty
          }
        ]
      }
    }
  }
};
</script>
