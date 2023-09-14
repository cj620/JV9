<template>
  <div style="height: 100%">
    <base-chart style="height: 100%;" :options="options"></base-chart>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
export default {
  name: 'top8Shipments',
  components: { BaseChart },
  props: {
    result: {
      type: Array,
      default(){
        return [];
      }
    }
  },
  data() {
    return {
      options: {},
    }
  },
  watch: {
    result(val) {
      const names = val.map(item => item.name);
      const values = val.map(item => item.value);
      this.options = {
        title: {
          text: i18n.t('DataV.Da_Top8Shipments'),
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
          left: '4%',
          right: '5%',
          bottom: '4%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: names,
          axisLabel: {
            show:true,
            textStyle:{
              color: '#eaeaea'
            }
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show:true,
            textStyle:{
              color: '#eaeaea'
            }
          }
        },
        series: [
          {
            data: values,
            type: 'bar'
          }
        ]
      }
    }
  }
}
</script>
