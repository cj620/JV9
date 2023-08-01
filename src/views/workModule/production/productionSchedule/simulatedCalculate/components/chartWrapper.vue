<template>
  <div>
    <div class="chart-title">{{ title }}</div>
    <div class="simulatedCalculate-page-chart">
      <div class="chart-description">
        {{ description }}
      </div>
      <PieChart :id="id" :data="data"></PieChart>
    </div>
  </div>
</template>
<script>
import PieChart from "./pieChart.vue";
export default {
  name: "",
  components: { PieChart },
  props: {
    title: {
      type: String,
      default() {
        return null;
      },
    },
    id: {
      type: String,
      default() {
        return null;
      },
    },
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    num: {
      type: Number,
      default() {
        return null;
      },
    },
    hours: {
      type: Number,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      description: "",
    };
  },
  mounted() {
    this.load();
  },
  watch: {
    data() {
      this.load();
    },
  },
  methods: {
    load() {
      this.data.length == 0
        ? (this.description = `当前有${this.num}个工单正在生产，${this.hours}个工单等待生产`)
        : (this.description = `共有8个普通生产任务单延迟，共延迟128个小时`);
    },
  },
};
</script>
<style scoped>
.chart-title {
  font-size: 16px;
  font-weight: 500;
  margin: 10px 10% 5px 10%;
}
.simulatedCalculate-page-chart {
  border: 2px solid #d3d3d3;
  margin: 0 10% 0 10%;
}
.chart-description {
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  text-align: center;
}
</style>
