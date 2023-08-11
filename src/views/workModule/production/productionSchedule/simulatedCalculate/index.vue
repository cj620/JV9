<template>
  <PageWrapper :footer="false">
    <div class="simulatedCalculate-page" v-loading="loading">
      <!-- 操作行 -->
      <div class="simulatedCalculate-page-form">
        <!-- 算法多选框 -->
        <div class="pleaseSelect">
          {{ $t("production.Pr_PleaseSelectSchedulingAlgorithms") }}
        </div>
        <el-select
          class="multiple-select"
          v-model="selectedTypes"
          multiple
          size="small"
          style="width: 400px"
        >
          <el-option
            v-for="(option, index) in AlgorithmTypeEnum.getEnums()"
            :key="index"
            :label="option.label"
            :value="option.value"
          ></el-option>
        </el-select>
        <Action
          class="action-line"
          size="mini"
          :actions="[
            {
              label: $t('production.Pr_SimulatedCalculate'),
              confirm: simulatedCalculate.bind(null),
              disabled: isSelectedTypesEmpty,
            },
          ]"
        >
        </Action>
      </div>
      <!-- tab标签 -->
      <el-tabs
        v-model="currentTabName"
        type="border-card"
        @tab-click="handleTabClick"
      >

        <!-- 排程图表 -->
        <el-tab-pane
          :label="$t('production.Pr_SimulatedAPS')"
          class="simulatedCalculate-page-pane"
          name="SimulatedAPS"
        >
          <div class="simulatedCalculate-page-charter">
            <ChartWrapper
              v-for="item in AlgorithmTypeEnum.getEnums()"
              :key="item.value"
              :datas="calculatedData[item.value]"
              :id="item.label"
            ></ChartWrapper>
          </div>
        </el-tab-pane>

        <!-- 排程结果 -->
        <el-tab-pane
          v-for="item in AlgorithmTypeEnum.getEnums()"
          :key="item.name"
          class="simulatedCalculate-page-pane"
          :label="item.label"
          :name="item.name"
        >
          <div class="simulatedCalculate-page-pane-form">
            <JvTable :table-obj="tableObj"> </JvTable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </PageWrapper>
</template>

<script>
import ChartWrapper from "./components/chartWrapper.vue";
import { Table } from "./components/resultConfig";
import { pie_chart } from "@/api/workApi/production/aps";
import { simulation_calculate } from "@/api/workApi/production/aps";
import { AlgorithmTypeEnum } from "@/enum/workModule/production/AlgorithmTypeEnum";

export default {
  name: "index",
  components: {
    ChartWrapper,
  },
  data() {
    return {
      // 算法枚举
      AlgorithmTypeEnum,
      // 选中算法
      selectedTypes: [],
      // chartWrapper接收数据
      calculatedData: [],
      // 加载
      loading: true,
      // 表格实例
      tableObj: {},
      //默认选中标签页
      currentTabName: "SimulatedAPS",
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
  },
  mounted() {
    this.getData();
  },
  computed: {
    // 是否已选择模拟的方法
    isSelectedTypesEmpty() {
      return this.selectedTypes.length === 0;
    },
  },
  methods: {
    handleTabClick() {
      this.currentTabName == "SimulatedAPS"
        ? this.getData()
        : this.postParams(this.currentTabName);
    },
    // 给对应标签页接口传入参
    postParams(name) {
      this.tableObj.getData({
        Keyword: "",
        AlgorithmType: name,
      });
    },
    getData() {
      pie_chart()
        .then((res) => {
          this.loading = false;
          this.calculatedData = res;
        })
        .catch(() => {
          this.loading = false;
        });
    },
    // 刷新
    refresh() {
      this.getData();
      this.selectedTypes = [];
    },
    // 赋值
    simulatedCalculate() {
      this.loading = true;
      simulation_calculate({
        StartDate: new Date(),
        AlgorithmTypes: [...this.selectedTypes],
      })
        .then(() => {
          this.loading = false;
          this.refresh();
        })
        .catch(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped lang="scss">
.simulatedCalculate-page-form {
  height: 32px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
}
.pleaseSelect {
  margin-right: 8px;
  font-size: 16px;
  font-weight: 500;
}
.action-line {
  margin-left: 20px;
}
.simulatedCalculate-page-pane {
  height: 100%;
}
.simulatedCalculate-page-charter {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: space-around;
}
::v-deep .el-tabs--border-card > .el-tabs__content {
  padding-top: 0 !important;
}
// .simulatedCalculate-page-pane {
//   height: calc(100vh - 240px);
//   // height: 600px;
// }
</style>
