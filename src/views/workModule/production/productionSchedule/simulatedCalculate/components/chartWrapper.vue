<template>
  <div>
    <div class="chart-title">{{ title }}</div>
    <div class="simulatedCalculate-page-chart">
      <div class="chart-description">
        {{ description }}
      </div>
      <PieChart :id="id" :datas="datas"></PieChart>
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
    datas: {
      type: Array,
      default() {
        return [];
      },
    },
    WorksheetNum: {
      type: Array,
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
    datas() {
      this.load();
    },
  },
  // methods: {
  //   load() {
  //     this.datas.length == 0
  //       ? (this.description = `暂无数据，请进行模拟排程`)
  //       : (this.description = `共对${this.WorksheetNum[0]}个工单进行了模拟排程，含${this.WorksheetNum[1]}个正常工单，${this.WorksheetNum[2]}个超交期工单，${this.WorksheetNum[3]}个超负荷工单`);
  //   },
  // },
  methods: {
    load() {
      if (this.datas.length == 0) {
        this.description = "暂无数据，请进行模拟排程";
      } else {
        let description =
          "共对" + this.WorksheetNum[0] + "个工单进行了模拟排程，其中：";
        if (this.WorksheetNum[1] !== 0) {
          description += this.WorksheetNum[1] + "个正常工单，";
        }
        if (this.WorksheetNum[2] !== 0) {
          description += this.WorksheetNum[2] + "个超交期工单，";
        }
        if (this.WorksheetNum[3] !== 0) {
          description += this.WorksheetNum[3] + "个超负荷工单";
        }
        this.description = description;
      }
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
