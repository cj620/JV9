<template>
  <div style="height: 100%">
    <base-chart style="height: 100%;" :options="options"></base-chart>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";

export default {
  name: 'processRework',
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
    };
  },
  watch:{
    result(val) {
      this.options = {
        title: {
          text: i18n.t('DataV.Da_ProcessRework'),
          textStyle: {
            color: '#eaeaea'
          },
          left: '3%',
          top: "3%",
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: "3%",
          textStyle: {
            color: '#eaeaea'
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ["50%", "53%"],
            avoidLabelOverlap: false,
            label: {
              formatter: '{b}:{c}' + '\n\r' + '({d}%)',
              color: '#eaeaea'
            },
            data: val,
            itemStyle: {},
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
    }
  }
};
</script>
