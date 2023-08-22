<template>
  <PageWrapper :footer="false">
    <div class="simulatedCalculate-page" v-loading="loading">
      <!-- tab标签 -->
      <div
        style="
          background: #fff;
          box-sizing: border-box;
          padding: 10px;
          position: relative;
        "
      >
        <!-- 操作行 -->
        <div class="simulatedCalculate-page-form">
          <!-- 算法多选框 -->
          <div class="pleaseSelect">
            {{ $t("production.Pr_PleaseSelectSchedulingAlgorithms") }}:
          </div>
          <el-select
            class="multiple-select"
            v-model="selectedTypes"
            multiple
            size="mini"
            collapse-tags
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
          <el-button
            icon="el-icon-view"
            size="mini"
            :disabled="currentTabName === 'SimulatedAPS'"
            @click="setTableChangeGantt"
          >
            {{
              GanttView
                ? $t("Generality.Ge_TabularShow")
                : $t("Generality.Ge_GanttShow")
            }}
          </el-button>
        </div>

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
            <div
              class="simulatedCalculate-page-charter"
              :style="{ height: boxHeight + 'px' }"
              v-show="currentTabName === 'SimulatedAPS'"
            >
              <ChartWrapper
                v-for="item in AlgorithmTypeEnum.getEnums()"
                :key="item.value"
                :datas="calculatedData[item.value]"
                :id="item.label"
                :boxHeight="boxHeight"
              ></ChartWrapper>
            </div>
          </el-tab-pane>
          <!-- 排程结果 -->
          <el-tab-pane
            v-for="(item, i) in AlgorithmTypeEnum.getEnums()"
            :key="item.name"
            class="simulatedCalculate-page-pane"
            :label="item.label"
            :name="item.name"
          >
            <div
              :style="{ height: boxHeight + 'px' }"
              style=""
              v-show="currentTabName !== 'SimulatedAPS'"
            >
              <JvTable
                :table-obj="tableObj"
                v-show="!GanttView"
                v-if="currentTabName === item.name"
              ></JvTable>
              <div v-if="currentTabName === item.name">
                <!-- 顶部操作行 -->
                <div class="action-header">
                  <div class="action-header-left">
                    <div style="font-size: 12px; line-height: 0">
                      {{ $t("Generality.Ge_Unit") }}：
                    </div>
                    <div style="margin-right: 20px">
                      <el-select
                        v-model="unitOfTime"
                        placeholder="请选择单位"
                        size="mini"
                        style="width: 66px"
                        @change="setGanttZoom"
                      >
                        <el-option
                          v-for="item in unitOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        >
                        </el-option>
                      </el-select>
                    </div>
                    <div>
                      <el-input
                        @change="searchChange"
                        v-model="partNumberValue"
                        :placeholder="$t('Generality.Ge_PleaseEnterkey')"
                        prefix-icon="el-icon-search"
                        size="mini"
                        clearable
                      >
                      </el-input>
                    </div>
                    <div>
                      <el-button
                        size="mini"
                        style="margin-left: 10px"
                        type="primary"
                        >{{ $t("Generality.Ge_Search") }}</el-button
                      >
                    </div>
                  </div>
                  <div class="action-header-right"></div>
                </div>
                <div>
                  <CustomGantt
                    ref="CustomGantt"
                    v-show="GanttView"
                    isTaskHover
                    detailShow
                    padding="6"
                    taskColor="#0960bd"
                    :columns="GanttColumns"
                    :gantt-container-height="boxHeight-88"
                    :loading="loading"
                    :result="result"
                    :popoverOptions="{placement: 'right', width: 670, trigger: 'hover',}"
                    :taskInnerHtml="setTaskInnerHtml"
                    :popoverInnerHtml="setPopoverInnerHtml"
                    :setTaskBackground="setTaskBackground"
                  >
                    <template #popover="{ item }">
                      <gantt-popover :item="item"></gantt-popover>
                    </template>
                  </CustomGantt>
                  <!-- 分页器 -->
                  <div class="custom-pagination">
                    <div></div>

                    <div class="custom-pagination-box">
                      <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout="total, sizes, prev, pager, next"
                        :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
                        :page-size="10"
                        :total="result.Count"
                      >
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </PageWrapper>
</template>

<script>
import ChartWrapper from "./components/chartWrapper.vue";
import { Table } from "./components/resultConfig";
import { GanttColumns } from "./config";
import { pie_chart } from "@/api/workApi/production/aps";
import {
  simulation_calculate,
  gantt_chart,
} from "@/api/workApi/production/aps";
import { AlgorithmTypeEnum } from "@/enum/workModule/production/AlgorithmTypeEnum";
import GanttPopover from "@/views/workModule/production/productionSchedule/List/components/gantt-popover.vue";
import CustomGantt from "@/components/CustomGantt/index.vue";
import Action from "~/cpn/JvAction/index.vue";

export default {
  name: "index",
  components: {
    Action,
    CustomGantt,
    GanttPopover,
    ChartWrapper,
  },
  data() {
    return {
      GanttColumns,
      AlgorithmTypeEnum, // 算法枚举
      selectedTypes: [], // 选中算法
      calculatedData: [], // chartWrapper接收数据
      loading: true, // 加载
      tableObj: {}, // 表格实例
      currentTabName: "SimulatedAPS", //默认选中标签页
      boxHeight: 0,
      tableChangeGantt: false, // 甘特图和表格切换显示隐藏
      GanttView: true, // 切换甘特图表格显示
      result: {}, // GANTT
      unitOptions: [
        {
          value: "week",
          label: i18n.t("Generality.Ge_Week"),
        },
        {
          value: "hour",
          label: i18n.t("Generality.Ge__Hour"),
        },
        {
          value: "minute",
          label: i18n.t("Generality.Ge_Minute"),
        },
      ],
      unitOfTime: "hour", // 默认时间单位
      partNumberValue: "", // 甘特图搜索框
      pageSize: 10,
      current: 1,
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
  },
  mounted() {
    this.getData();
    let mainContent = document.querySelector(".main-content");
    this.boxHeight = mainContent.clientHeight - 100;
    window.onresize = (e) => {
      console.log(e);
      this.debounce(() => {
        if (this.currentTabName === "SimulatedAPS") {
          this.boxHeight = mainContent.clientHeight - 100;
          this.boxHeight < 400 ? (this.boxHeight = 400) : this.boxHeight;
          mainContent.style.overflowY = "auto";
        } else {
          this.boxHeight = mainContent.clientHeight - 100;
          mainContent.style.overflowY = "none";
        }
      }, 100);
    };
  },
  computed: {
    // 是否已选择模拟的方法
    isSelectedTypesEmpty() {
      return this.selectedTypes.length === 0;
    },
  },
  methods: {
    // 设置任务条颜色
    setTaskBackground(item) {
      if(item) {
        return {
          is: item.PlanDevice.indexOf('[Overload]') !== -1,
          color: "#ffcc33"
        }
      }
    },
    // 总条数切换
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // 分页切换
    handleCurrentChange(current) {
      this.current = current;
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // task任务条的文本
    setTaskInnerHtml(item) {
      return `${item.Process}(${item.PlanTime}H) ${item.PlanDevice}`;
    },
    // task悬浮窗的innerHtml
    setPopoverInnerHtml(item) {
      return `
        <div>${i18n.t("Generality.Ge_ProcessName")}：${item.Process}</div>
        <div>${i18n.t("Generality.Ge_PlanTime")}：${item.PlanTime}H</div>
        <div>${i18n.t("production.Pr_PlanningDevices")}：${
        item.PlanDevice
      }</div>
              <div>${i18n.t("Generality.Ge_PlanStart")}：${
        item._PlanStart
      }</div>
              <div>${i18n.t("Generality.Ge_PlanEnd")}：${item._PlanEnd}</div>`;
    },
    searchChange() {
      // 搜索
      this.setAlgorithmType();
    },
    // 切换时间
    setGanttZoom(val) {
      this.$refs.CustomGantt[0].setGanttZoom(val);
    },
    setTableChangeGantt() {
      this.GanttView = !this.GanttView;
      if (this.GanttView) {
        this.setAlgorithmType(); // 调甘特图获取排程结果接口
      } else {
        this.postParams();
      }
    },
    // 获取gantt接口
    setAlgorithmType(size = 10, page = 1) {
      this.loading = true;
      gantt_chart({
        AlgorithmType: this.currentTabName,
        CurrentPage: page,
        PageSize: size,
        Keyword: this.partNumberValue,
        // SortColumn: "PartNo,PlanStart",
        // SortOrder: 1,
      })
        .then((res) => {
          this.result = res;
          this.loading = false;
          this.$refs.CustomGantt[0].setGanttZoom(this.unitOfTime);
        })
        .catch((err) => {
          this.loading = false;
        });
    },
    // 防抖函数
    debounce(func, wait) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(func, wait);
    },
    handleTabClick(tab) {
      if (this.currentTabName === "SimulatedAPS") {
        this.getData();
      } else {
        if (this.GanttView) {
          this.setAlgorithmType(); // 调甘特图获取排程结果接口
        } else {
          this.postParams();
        }
      }
    },
    // 给对应标签页接口传入参
    postParams() {
      this.tableObj.getData({
        AlgorithmType: this.currentTabName,
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
.c-page-wrapper {
  overflow: hidden;
}
.simulatedCalculate-page-form {
  height: 40px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  font-size: 12px;
  //background: #fff;
  position: absolute;
  right: 10px;
  z-index: 10;
}
.pleaseSelect {
  margin-right: 8px;
  font-size: 14px;
  //font-weight: 800;
}
.action-line {
  margin-left: 8px;
}
.simulatedCalculate-page-pane {
  height: 100%;
}
.simulatedCalculate-page-charter {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  background: #fff;
}
::v-deep .el-tabs--border-card > .el-tabs__content {
  padding: 0;
}
::v-deep .el-tabs__header {
  margin: 0;
}
.action-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 6px 10px;
  height: 48px;
  //border-radius: 4px;
  align-items: center;

  &-left,
  &-right {
    display: flex;
    align-items: center;
  }
}
.custom-pagination {
  height: 40px;
  background-color: #fff;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
