<template>
  <div>
    <div class="chart-title">{{ title }}</div>
    <div class="simulatedCalculate-page-chart">
      <div class="chart-description">
        {{ description1 }}
      </div>
      <div class="chart-description">
        {{ description2 }}
      </div>
      <PieChart :id="id" :WorksheetNum="WorksheetNum"></PieChart>
    </div>
  </div>
</template>
<script>
import PieChart from "./pieChart.vue";
import { timeFormat } from "@/jv_doc/utils/time";
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
      description1: "",
      description2: "",
      WorksheetNum: [],
      CreationDate: "",
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
        this.datas.CreationDate,
      ];
      this.CreationDate = timeFormat(
        this.WorksheetNum[4],
        "yyyy-MM-dd hh:mm:ss"
      );
    },
    load() {
      if (Object.keys(this.datas).length == 0) {
        this.WorksheetNum = [];
        this.description1 = "暂无数据";
        this.description2 = "请进行模拟排程";
      } else {
        this.getCount();
        let description1 = "该算法最近一次模拟时间为" + this.CreationDate;
        let description2 =
          "共对" + this.WorksheetNum[0] + "个工单进行了模拟排程，其中：";
        if (this.WorksheetNum[1] !== 0) {
          description2 += this.WorksheetNum[1] + "个正常工单 ";
        }
        if (this.WorksheetNum[2] !== 0) {
          description2 += this.WorksheetNum[2] + "个超交期工单 ";
        }
        if (this.WorksheetNum[3] !== 0) {
          description2 += this.WorksheetNum[3] + "个超负荷工单";
        }
        this.description1 = description1;
        this.description2 = description2;
      }
    },
  },
};
</script>
<style scoped>
.chart-title {
  font-size: 16px;
  font-weight: 500;
  margin: 2% 6% 1% 6%;
}
.simulatedCalculate-page-chart {
  border: 2px solid #d3d3d3;
  margin: 1% 6% 2% 6%;
}
.chart-description {
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  text-align: center;
}
</style>
