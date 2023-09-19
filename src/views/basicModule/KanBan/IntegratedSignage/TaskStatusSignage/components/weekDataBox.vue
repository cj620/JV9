<template>
  <div style="height: 100%">
    <base-chart style="height: 100%;" :options="options"></base-chart>
  </div>
</template>
<script>

import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";

export default {
  name: "weekDataBox",
  components: { BaseChart },
  props: {
    boxData: {
      type: Array,
      default: [],
    },
  },
  data(){
    return{
      options: {},
    }
  },
  created() {
  },
  watch: {
    boxData(val){
      let data = val.map(item => [item.Name, item.PlanedHours, item.ActualHours, item.AvailableHours]);
      data.unshift([
        this.$t('Generality.Ge_ItemName'),
        this.$t('DataV.Da_PlannedHours'),
        this.$t('DataV.Da_ActualHours'),
        this.$t('DataV.Da_AvailableHours'),
      ])
      this.options = {
        tooltip: {},
        legend: {
          right: '4%',
          textStyle:{
            color:'rgb(255,255,255,0.9)'
          },
        },
        dataset: {
          source: data
        },
        grid: {
          top: '10%',
          left: '3%',
          right: '4%',
          bottom: '6%',
          containLabel: true
        },
        xAxis: {
          type: 'category' ,
          axisLabel: {
            show:true,
            textStyle:{
              color: 'rgb(255,255,255,0.9)'
            }
          }},
        yAxis: {
          axisLabel: {
            show:true,
            textStyle:{
              color: 'rgb(255,255,255,0.9)'
            }
          }
        },
        series: [
          {
            type: 'bar',
            // label: {
            //   show: true,
            //   position: 'inside'
            // },
          },
          {
            type: 'bar' ,
            // label: {
            //   show: true,
            //   position: 'inside'
            // },
          },
          {
            type: 'bar',
            // label: {
            //   show: true,
            //   position: 'inside'
            // },
          }]
      }
    }
  }
};
</script>
<style>
</style>
