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
      transData: [],
    };
  },
  watch: {
    result(val) {
      this.transData = val
      this.transData.forEach(item => {
        if (item.Name === 'Shipped'){
          item.name = this.$t('DataV.Da_ShippedAmount')
          item.value = item.Value
        }else if (item.Name === 'Unshipped'){
          item.name = this.$t('DataV.Da_UnshippedAmount')
          item.value = item.Value
        }else if (item.Name === 'ReturnedPurchase'){
          item.name = this.$t('DataV.Da_ReturnAmount')
          item.value = item.Value
        }
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
            center: ["42%", "50%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                formatter: '{d}%',
                color: '#eaeaea'
              }
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
