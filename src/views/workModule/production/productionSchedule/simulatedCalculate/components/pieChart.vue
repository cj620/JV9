<!--饼图-->
<template>
  <div>
    <div :id="id" :style="{ height: height + 'px' }"></div>
    <!-- 异常工单详情 -->
    <billsDetail
        v-if="billsDetailVisible"
        :visible.sync="billsDetailVisible"
        :billData="billData"
    ></billsDetail>
  </div>
</template>

<script>
import * as echarts from "echarts";
import billsDetail from "./billsDetail.vue"
export default {
  name: "pieChart",
  components: { billsDetail },
  props: {
    height: {
      type: Number,
      default() {
        return 100;
      },
    },
    id: {
      type: String,
      default() {
        return null;
      },
    },
    WorksheetNum: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      myChart: {},
      chartData: [],
      billsDetailVisible:false,
      billData: [],
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.drawLine();
    });
  },
  watch: {
    WorksheetNum() {
      this.drawLine();
    },
  },
  methods: {
    transData() {
      if (this.WorksheetNum.length !== 0) {
        this.chartData = [
          {
            type: "Normal",
            value: this.WorksheetNum[0],
            name: `${i18n.t("production.Pr_NormalWorkSheet")}`,
            itemStyle: { color: "#33ff99" },
          },
          {
            type: "Overdue",
            value: this.WorksheetNum[1],
            name: `${i18n.t("production.Pr_OverdueWorkSheet")}`,
            itemStyle: { color: "#ff3300" },
          },
          {
            type: "Overload",
            value: this.WorksheetNum[2],
            name: `${i18n.t("production.Pr_OverloadWorkSheet")}`,
            itemStyle: { color: "#ffcc33" },
          },
        ];
      } else {
        this.chartData = [];
      }
    },
    getDetail(params){
      this.billData = this.WorksheetNum[3].filter(item => item.ApsRemarks === params.data.type);
      this.billData.length !== 0 ? this.billsDetailVisible = true : ""
    },
    drawLine() {
      echarts.dispose(document.getElementById(this.id));
      this.transData();
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById(this.id));

      // 绘制图表
      this.myChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          orient: 'vertical',
          top:'15%',
          right:'8%',
        },
        series: [
          {
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: true,
            data: this.chartData,
            itemStyle: {
              borderColor: "#fff",
              borderWidth: 2,
            },
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      });
      this.myChart.on('click',this.getDetail)
      window.addEventListener("resize", () => {
        setTimeout(() => {
          this.myChart.resize();
        },101)
      });
    },
  },
};
</script>

<style scoped></style>
