<template>
  <PageWrapper :footer="false">
    <div class="SupplierEvaluation">
      <div class="SupplierEvaluation-title">
        <span style="margin-right: 10px">日期范围</span>
        <el-date-picker
          v-model="dateTimeRangeValue"
          type="datetimerange"
          size="mini"
          :clearable="false"
          range-separator="-"
          :start-placeholder="$t('Generality.Ge_StartDate')"
          :end-placeholder="$t('Generality.Ge_EndDate')"
        >
        </el-date-picker>
        <el-button
          size="mini"
          style="margin-left: 10px"
          @click="getSupplierEvaluation"
          >{{ $t("sale.Sa_Evaluation") }}</el-button
        >
      </div>
      <div class="SupplierEvaluation-content">
        <!--柱状图-->
        <div class="SupplierEvaluation-content-charts">
          <div
            id="myMiddleChart"
            :style="{ width: '100%', height: '100%' }"
          ></div>
        </div>
        <!--表格-->
        <div class="SupplierEvaluation-content-table">
          <JvTable :table-obj="tableObj"></JvTable>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script>
import { supplier_evaluation } from "@/api/workApi/purchase/outsourcing";
import PageWrapper from "~/cpn/PageWrapper/index.vue";
import * as echarts from "echarts";
import JvTable from "~/cpn/JvTable/index.vue";
import {Table} from './config';
export default {
  components: { JvTable, PageWrapper },
  data() {
    return {
      dateTimeRangeValue: [new Date(), new Date()], // 初始化为一个空数组或当前日期
      chartData: [],
      tableObj: {}
    };
  },
  created() {
    this.setDefaultDateTimeRangeValue(); // 设置日期范围
    this.getSupplierEvaluation(); // 进来评估一次
    this.tableObj = new Table();
  },
  mounted() {
    this.drawMiddleChart(); // 初始化图表
  },
  methods: {
    getSupplierEvaluation() {
      supplier_evaluation({
        StartDate: this.dateTimeRangeValue[0],
        EndDate: this.dateTimeRangeValue[1],
      }).then((res) => {
        this.tableObj.setData(res.Items);
        const formattedData = this.formatData(res.Items);
        const option = {
          tooltip: {
            trigger: "axis",
            formatter: function (params) {
              let result = "";
              params.forEach(function (item) {
                result +=
                  item.marker +
                  " " +
                  item.data.name +
                  "：" +
                  item.data.value +
                  "%<br>";
              });
              return result;
            },
          },
          xAxis: {
            type: "category",
            data: formattedData.map((item) => item.name),
          },
          yAxis: {
            type: "value",
            axisLabel: {
              formatter: "{value} %",
            },
          },
          series: [
            {
              data: formattedData,
              type: "bar",
              label: {
                show: true,
                position: "top",
                formatter: "{c} %",
              },
            },
          ],
        };
        //将图表配置项赋给图表,true参数表示不和之前的数据合并
        this.myMiddleChartObj.setOption(option);
      });
    },
    setDefaultDateTimeRangeValue() {
      const endDate = new Date(); // 当前日期
      const startDate = new Date(
        new Date().setFullYear(endDate.getFullYear() - 1)
      ); // 当前日期减去一年
      this.dateTimeRangeValue = [startDate, endDate]; // 设置最近一年的时间范围
    },
    drawMiddleChart() {
      //绘制图表方法
      this.myMiddleChartObj = echarts.init(
        document.getElementById("myMiddleChart")
      );
    },
    formatData(data) {
      return data.map((item) => ({
        name: item.SupplierName,
        value: parseFloat(item.DeliveryAchievementRate.toFixed(2)),
      }));
    },
  },
};
</script>

<style scoped lang="scss">
.SupplierEvaluation {
  width: 100%;
  height: 100%;
  background: #fff;
  &-title {
    height: 50px;
    display: flex;
    align-items: center;
    text-indent: 1em;
  }
  &-content {
    height: calc(100% - 50px);
    &-charts {
      height: 50%;
    }
    &-table {
      height: 50%;
    }
  }
}
</style>
