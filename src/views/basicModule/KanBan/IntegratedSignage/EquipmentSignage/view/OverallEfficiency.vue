<template>
  <div style="height: 100%">
    <base-chart style="height: 80%" :options="options"></base-chart>
  </div>
</template>

<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";
import {OverallEfficiency} from "@/enum/baseModule/dataV/OverallEfficiency";

export default {
  name: "OverallEfficiency",
  components: { BaseChart },
  props: {
    result: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      options: {},
      colors: [],
    }
  },
  created() {
    Object.keys(OverallEfficiency).forEach(item => {
      this.colors.push(OverallEfficiency[item].color);
    })
  },
  watch: {
    result(val) {
      const data = val.map(item => {
        return {
          value: item.Value,
          name: item.Name
        }
      })
      this.options = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '30%',
          right: '10%',
          orient: '',
          icon: 'circle',
          textStyle: {
            color: '#eaeaea'
          },
          itemGap : 20
        },
        series: [
          {
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                formatter: '{d}%' //自定义显示格式(b:name, c:value, d:百分比)
              }
            },
            center: ['35%', '60%'],
            data: data,
            itemStyle: {
              normal: {
                color: (colors) => {
                  let colorList = this.colors;
                  return colorList[colors.dataIndex];
                }
              },
            },
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
  },
};
</script>

<style scoped lang="scss"></style>
