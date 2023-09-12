<template>
  <div style="height: 100%">
    <base-chart style="height: 100%;" :options="options"></base-chart>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
export default {
  name: 'sortStatistics',
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
  watch: {
    result(val) {
      this.options = {
        title: {
          text: "订单分类统计",
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
          orient: 'vertical',
          top: "3%",
          right: '4%',
          textStyle:{
            color: '#eaeaea'
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            center: ["42%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{d}%',
                color: '#eaeaea'
              }
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
}
</script>
