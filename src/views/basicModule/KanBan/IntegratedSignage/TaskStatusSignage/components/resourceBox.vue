<template>
  <div class="resourceBox">
    <div class="resourceBox-left">
      <div v-for="item in description" class="resourceBox-left-content">
        {{ item.str }}:{{ item.data }}
      </div>
    </div>
    <div class="resourceBox-right">
      <base-chart style="height: 100%; right: 70px" :options="options"></base-chart>
    </div>
  </div>
</template>
<script>
import BaseChart from "@/views/dashboard/admin/echarts/base-echart.vue";

export default {
  name: "resourceBox",
  components: { BaseChart },
  props: {
    boxData: {
      type: Object,
      default: null,
    },
  },
  data(){
    return{
      description: [],
      chartData: [],
      options: {},
      colors:[],
    }
  },
  created() {
    const withinPlan = this.boxData.ActualQty < this.boxData.PlanedQty
    const planedQty = withinPlan ? this.boxData.ActualQty : this.boxData.PlanedQty
    const outPlanedQty = withinPlan ? 0 : this.boxData.ActualQty - this.boxData.PlanedQty
    this.chartData = [
      {
        value: planedQty,
        // name: "计划内完成",
        name: this.$t('DataV.Da_PlannedCompletion')
      },
      {
        value: outPlanedQty,
        // name: "计划外完成"
        name: this.$t('DataV.Da_UnplannedCompletion')
      }
    ]
    this.description = [
      // { str: "计划完成数", data: this.boxData.PlanedQty },
      { str: this.$t('DataV.Da_PlannedQuantity'), data: this.boxData.PlanedQty },
      { str: this.$t('DataV.Da_ActualCompletion'), data: this.boxData.ActualQty },
      { str: this.$t('DataV.Da_UnplannedCompletion'), data: outPlanedQty },
      { str: this.$t('DataV.Da_DailyRatedHours'), data: this.boxData.DailyRatedHours },
      { str: this.$t('DataV.Da_DailyPlannedHours'), data: this.boxData.DailyPlanedHours },
    ];

    this.options = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: 0,
        textStyle:{
          color:'rgb(255,255,255,0.9)'
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          label: {
            show: false
          },
          data: this.chartData,
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
  },
  methods:{
  }
}
</script>
<style scoped lang="scss">
.resourceBox {
  width: 100%;
  height: 100%;
  display: flex;
  &-left {
    height: 100%;
    width: 40%;
    &-content {
      margin: 25px 0 0 50px;
      color: #7CE7FD;
      font-size: 16px;
    }
  }
  &-right {
    height: 100%;
    width: 60%;
  }
}
</style>
