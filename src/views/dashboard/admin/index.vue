<!--
 * @Author: H.
 * @Date: 2021-12-22 13:08:44
 * @LastEditTime: 2022-01-25 15:59:49
 * @Description:
-->
<template>
  <div class="dashboard-components">
    <el-row :gutter="32" class="panel-group">
      <el-col
        v-for="item in countUpData"
        :key="item.title"
        :xs="12"
        :sm="12"
        :lg="6"
        class="dasboard-card-col"
      >
        <CountUp :countUpData="item" />
      </el-col>
    </el-row>
    <el-row :gutter="32">
      <el-col
        :xs="12"
        :sm="12"
        :lg="6"
        class="dasboard-card-col"
        v-for="(item, index) in pieData"
        :key="index"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ pieDataEnum[index] }}</span>
          </div>
          <div class="text item">
            <template
              v-if="
                ['QualityErrorOfLast3Month', 'ReworkOfLast3Month'].includes(
                  index
                )
              "
            >
              <rose-chart :roseData="item"></rose-chart>
            </template>
            <template v-else>
              <pie-chart :pieData="item"></pie-chart>
            </template>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="32" v-if="series.length !== 0">
      <el-col :xs="24" :sm="24" :lg="24" class="dasboard-card-col">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>{{ $t("dashboard.Da_MonthlyQualityTrendChart") }}</span>
          </div>
          <div class="text item">
            <line-chart
              :xData="xData"
              :series="series"
              :legendData="legendData"
            ></line-chart>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import CountUp from "./components/CountUp.vue";
import PieChart from "./components/pie-chart.vue";
import RoseChart from "./components/rose-echart.vue";
import LineChart from "./components/line-chart.vue";

import { getBoardData } from "@/api/basicApi/homePage";
import { transformData } from "./utils/transformData";
export default {
  components: {
    CountUp,
    PieChart,
    RoseChart,
    LineChart,
  },
  data() {
    return {
      countUpData: [],
      pieData: {},
      pieDataEnum: {
        CapacityOfCurrentMonth: this.$t("dashboard.Da_WorkingLoadThisMonth"),
        LoadOfLastMonth: this.$t("dashboard.Da_WorkingLoadLastMonth"),
        QualityErrorOfLast3Month: this.$t(
          "dashboard.Da_AbnormalOfTheDepartmentQualityLast90Days"
        ),
        ReworkOfLast3Month: this.$t("dashboard.Da_ProcessReworkLast90Days"),
      },
      xData: [],
      legendData: [],
      series: [],
      LineChartEnum: {
        ReworkRate: this.$t("Generality.Ge_ReworkRate"),
        AbnormalRate: this.$t("Generality.Ge_AbnormalRate"),
        QualifiedRate: this.$t("Generality.Ge_QualifiedRate"),
        UnqualifiedRate: this.$t("Generality.Ge_UnqualifiedRate"),
      },
    };
  },
  methods: {
    getData() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.1)",
      });
      getBoardData()
        .then((res) => {
          this.getCountUpData(res);
          this.getLineChartData(res);
          this.getPieData(res);
          loading.close();
        })
        .catch((error) => {
          loading.close();
        });
    },
    // 折线图数据
    getLineChartData(res) {
      res.MonthlyTrendOfQuality.forEach((item) => {
        if (item[0] !== "Time") {
          this.legendData.push(this.LineChartEnum[item[0]]);
          this.series.push({
            name: this.LineChartEnum[item[0]],
            type: "line",
            smooth: true,
            data: item.slice(1),
          });
        }
      });
      this.xData = res.MonthlyTrendOfQuality[0].slice(1);
    },
    // 饼图、玫瑰图数据
    getPieData(res) {
      this.pieData = {
        CapacityOfCurrentMonth: transformData(res.CapacityOfCurrentMonth),
        LoadOfLastMonth: transformData(res.LoadOfLastMonth),
        QualityErrorOfLast3Month: transformData(res.QualityErrorOfLast3Month),
        ReworkOfLast3Month: transformData(res.ReworkOfLast3Month),
      };
    },
    // 顶部卡片数据
    getCountUpData(res) {
      this.countUpData.push(
        {
          endVal: res.NewToolingQuantityOfCurrentMonth,
          title: this.$t("dashboard.Da_NewMoldThisMonth"),
          duration: 3000,
          type: "NewToolingQuantityOfCurrentMonth",
        },
        {
          endVal: res.DesignChangeQuantityOfCurrentMonth,
          title: this.$t("dashboard.Da_ECNThisMonth"),
          type: "DesignChangeQuantityOfCurrentMonth",
        },

        {
          endVal: res.ToolCorrectionQuantityOfCurrentMonth,
          title: this.$t("dashboard.Da_MoldCorrectionThisMonth"),
          duration: 3200,
          type: "ToolCorrectionQuantityOfCurrentMonth",
        },
        {
          endVal: res.TrialToolingQuantityOfCurrentMonth,
          title: this.$t("dashboard.Da_MoldTrialThisMonth"),
          duration: 3600,
          type: "TrialToolingQuantityOfCurrentMonth",
        }
      );
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style lang="scss" scoped>
.dashboard-components {
  padding: 16px;
  .dasboard-card-col {
    margin-bottom: 16px;
  }
}
</style>
