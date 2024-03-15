<template>
  <div style="height: 100%">
    <base-chart style="height: 100%;" :options="options"></base-chart>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
export default {
  name: 'repairChart',
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
      transData: [],
    };
  },
  watch: {
    result(val) {
      this.transData = val;
      this.transData.forEach(item => {
        item.name = item.Name
        item.value = item.Value
        item.itemStyle = { color: item.Color }
      })
      this.options = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          top: "36%",
          right: '10%',
          icon: 'circle',
          textStyle:{
            color: '#7d7d7f',
            fontSize: '15px',
          },
        },
        series: [
          {
            type: 'pie',
            radius: '70%',
            center: ["40%", "50%"],
            avoidLabelOverlap: false,
            label: {
              formatter: '{b}:{c}' + '\n\r' + '({d}%)',
              color: '#7d7d7f',
              fontSize: '15px',
            },
            data: this.transData,
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
