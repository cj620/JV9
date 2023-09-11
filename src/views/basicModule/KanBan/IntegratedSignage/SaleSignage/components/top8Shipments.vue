<template>
  <div style="height: 110%">
    <base-chart style="height: 100%; left: 15px" :options="options"></base-chart>
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
          text: "本年出货Top8统计",
          textStyle: {
            color: '#eaeaea'
          },
          top: "3%",
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
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
