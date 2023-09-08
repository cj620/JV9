<template>
  <div style="height: 100%">
    <base-chart style="height: 100%;top: 5px" :options="options"></base-chart>
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
      colors:[],
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
      console.log(data);
      this.options = {
        tooltip: {},
        legend: {
          textStyle:{
            color:'rgb(255,255,255,0.9)'
          },
          right: 20,
        },
        dataset: {
          source: data
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
        series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
      }
    }
  }
};
</script>
<style>
</style>
