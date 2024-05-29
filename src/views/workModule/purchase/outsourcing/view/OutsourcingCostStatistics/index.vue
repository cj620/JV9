<template>
  <PageWrapper :footer="false">
    <div class="SupplierEvaluation">
      <div class="SupplierEvaluation-title">
        <el-date-picker
          v-model="dateValue"
          type="year"
          size="mini"
          :clearable="false"
          :placeholder="$t('Generality.Ge_PleaseSelect')"
        >
        </el-date-picker>
        <el-button
          size="mini"
          style="margin-left: 30px"
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
import { outsourced_cos_statistics } from "@/api/workApi/purchase/outsourcing";
import PageWrapper from "~/cpn/PageWrapper/index.vue";
import * as echarts from "echarts";
import JvTable from "~/cpn/JvTable/index.vue";
import {Table} from './config';
export default {
  components: { JvTable, PageWrapper },
  data() {
    return {
      dateValue: new Date(), // 初始化为一个空数组或当前日期
      myMiddleChartObj: {},
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
    window.addEventListener('resize', this.handleResize);
  },
  // 页面被销毁时，移除 resize 事件监听器
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    if (this.myMiddleChartObj) {
      this.myMiddleChartObj.dispose();
    }
  },
  methods: {
    getSupplierEvaluation() {
      outsourced_cos_statistics({
        YearDate: this.dateValue
      }).then((res) => {
        this.tableObj.setData(res.DetailData,res.DetailData.length);
        const formattedData = this.formatData(res.SummarizeData);
        const option = {
          legend: {},
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
                  item.data.value
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
          },
          series: [
            {
              name: this.$t('purchase.Pu_Cost'),
              data: formattedData,
              type: "bar",
              label: {
                show: true,
                position: "top",
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
    // 格式化数据
    formatData(data) {
      return data.map((item) => ({
        name: item.SupplierName,
        value: parseFloat(item.Cost.toFixed(2)),
      }));
    },
    // 根据浏览器窗口大小变化来重绘图表
    handleResize() {
      if (this.myMiddleChartObj) {
        this.myMiddleChartObj.resize();
      }
    }
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
  ::v-deep.el-date-editor{
    .el-input__inner{
      margin-left: 10px!important;
    }
  }
}

</style>
