<!--饼图-->
<template>
    <div>
      <div :id="id" :style="{ height:'100%',minHeight:height+'px'}"></div>


    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  name: 'pieChart',
  props:{
    height: {
      type: Number,
      default() {
        return 300
      },
    },
    id: {
      type: String,
      default() {
        return null
      },
    },
    data:{
      type: Array,
      default() {
        return []
      },
    }
  },
 async mounted() {
 await this.drawLine();
},
  methods:{
    drawLine(){
      console.log(this.data,99999999)
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.id))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            data:this.data,
            label: {
              formatter: '{b}: {c}',
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
      })
      window.addEventListener('resize', function() {
        myChart.resize()
      })
      myChart.resize() // 图表自适应
    }
  }
}
</script>

<style scoped>

</style>
