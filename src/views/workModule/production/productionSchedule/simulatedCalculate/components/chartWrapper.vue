<template>
  <div style="width: 50%; height: 50%">
    <div class="chart-title">{{ title }}</div>
    <div class="chart-wrapper">
      <div
        class="chart-description"
        v-if="Object.keys(this.datas).length !== 0"
      >
        <div>该算法最近一次模拟计算时间为:{{ CreationDate }}</div>
        <div>
          共对{{ datas.TotalCount }}个工单进行了模拟排程，其中：
          <span v-for="(item, index) in description" :key="index">
            {{ WorksheetNum[index] !== 0 ? WorksheetNum[index] + item : "" }}
          </span>
        </div>
      </div>
      <div class="chart-description" v-else>
        <div>暂无数据</div>
        <div>请进行模拟排程</div>
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
    id: {
      type: String,
      default() {
        return null;
      },
    },
    datas: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // 标题
      title: "",
      // 各类工单数
      WorksheetNum: [],
      CreationDate: "",
      description: ["个正常工单 ", "个超交期工单 ", "个超负荷工单"],
    };
  },
  mounted() {
    Object.keys(this.title).length !== 0 ? this.load() : "";
    // this.load();
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
        // 正常工单数
        this.datas.TotalCount -
          this.datas.OverdueCount -
          this.datas.OverloadCount,
        // 超交期工单数
        this.datas.OverdueCount,
        // 超负荷工单数
        this.datas.OverloadCount,
      ];
      this.CreationDate = timeFormat(
        this.datas.CreationDate,
        "yyyy-MM-dd hh:mm:ss"
      );
    },
    load() {
      this.title = i18n.t(`production.Pr_${this.datas.AlgorithmType}`);
      if (Object.keys(this.datas).length == 0) {
        this.WorksheetNum = [];
      } else {
        this.getCount();
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
.chart-wrapper {
  border: 2px solid #d3d3d3;
  margin: 1% 6% 2% 6%;
}
.chart-description {
  font-size: 14px;
  font-weight: 500;
  margin-top: 12px;
  text-align: center;
}
.chart-description > div {
  margin-top: 2px;
}
</style>
