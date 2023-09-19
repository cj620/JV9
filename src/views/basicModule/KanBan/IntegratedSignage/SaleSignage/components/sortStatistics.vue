<template>
  <div style="height: 100%">
    <base-chart style="height: 100%;" :options="options"></base-chart>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
import { SortStatistics } from "@/enum/baseModule/dataV/SortStatistics";
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
      transData: [],
    };
  },
  watch: {
    result(val) {
      this.transData = val
      this.transData.forEach(item => {
        item.name = SortStatistics[item.Name].name
        item.value = item.Value
      })
      this.options = {
        title: {
          text: i18n.t('DataV.Da_OrderClassificationStatistics'),
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
            center: ["45%", "55%"],
            avoidLabelOverlap: false,
            label: {
              formatter: '{b}:{c}' + '\n\r' + '({d}%)',
              color: '#eaeaea'
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
