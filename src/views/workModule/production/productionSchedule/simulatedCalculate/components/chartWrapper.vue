<template>
  <div>
    <div class="chart-title">{{ title }}</div>
    <div class="simulatedCalculate-page-chart">
      <div class="chart-description">
        {{ description }}
      </div>
      <PieChart :id="id" :WorksheetNum="WorksheetNum"></PieChart>
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
      type: Object,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      description: "",
      WorksheetNum: [],
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
  methods: {
    // 提取信息
    getCount() {
      this.WorksheetNum = [
        this.datas.TotalCount,
        this.datas.TotalCount -
          this.datas.OverdueCount -
          this.datas.OverloadCount,
        this.datas.OverdueCount,
        this.datas.OverloadCount,
      ];
    },
    load() {
      if (Object.keys(this.datas).length == 0) {
        this.WorksheetNum = [];
        this.description = "暂无数据，请进行模拟排程";
      } else {
        this.getCount();
        let description =
          "共对" + this.WorksheetNum[0] + "个工单进行了模拟排程，其中：";
        if (this.WorksheetNum[1] !== 0) {
          description += this.WorksheetNum[1] + "个正常工单 ";
        }
        if (this.WorksheetNum[2] !== 0) {
          description += this.WorksheetNum[2] + "个超交期工单 ";
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
  margin: 0 6% 0 6%;
}
.chart-description {
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  text-align: center;
}
</style>
