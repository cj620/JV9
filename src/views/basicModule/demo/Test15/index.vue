<template>
  <page-wrapper :footer="false">
    <!-- 顶部操作行 -->
    <div class="action-header">
      <div class="action-header-left">
        <div style="font-size: 12px; line-height: 0">
          {{ $t("Generality.Ge_Unit") }}：
        </div>
        <div style="margin-right: 20px">
          <el-select
            v-model="unitOfTime"
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
      </div>
      <div class="action-header-right">
      </div>
    </div>
    <CustomGantt
      isTaskHover
      isTaskLeftClick
      :taskRadius="8"
      :tableItemHeight="80"
      :taskHeight="50"
      :menu-components="cMenu"
      :result="result"
      :columns="columns"
      :popoverInnerHtml="popoverInnerHtml"
      :taskInnerHtml="taskInnerHtml"
      :ganttContainerHeight="ganttHeight"
      ref="CustomGantt"
    ></CustomGantt>
    <!-- 分页器 -->
    <div class="custom-pagination">
      <div>
      </div>
      <div class="custom-pagination-box">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total, sizes, prev, pager, next"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          :page-size="20"
          :total="result.Count"
        >
        </el-pagination>
      </div>
    </div>
  </page-wrapper>
</template>

<script>
import { latest_device_gantt_chart } from "@/api/workApi/production/aps";
import CustomGantt from "@/components/CustomGantt";
import { columns } from "./config";
import Action from "~/cpn/JvAction/index.vue";
import timeFormat from '@/jv_doc/utils/time/timeFormat';
import cMenu from './components/c-menu.vue';
export default {
  name: "index",
  components: { Action, CustomGantt },
  data() {
    return {
      cMenu,
      result: {},
      columns,
      ganttHeight: 0,
      unitOfTime: "hour", // 默认时间单位
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
      pageSize: 20,
      current: 1
    };
  },
  created() {
    this.getGanttChart();

  },
  mounted() {
    let mainContent = document.querySelector(".main-content");
    this.ganttHeight = mainContent.clientHeight - 120;
  },
  methods: {
    taskInnerHtml(item) {
      return item.PartNo +'&nbsp;&nbsp;'+ item.ProcessName + `(${item.PlanTime}H)`;
    },
    popoverInnerHtml(item) {
      return `
        <div>生产单号：${item.BillId}</div>
        <div>零件编号：${item.PartNo}</div>
        <div>零件名称：${item.PartName}</div>
        <div>工序名称：${item.ProcessName}</div>
        <div>计划开始：${timeFormat(item.PlanStart, 'yyyy-MM-dd hh:mm:ss')}</div>
        <div>计划结束：${timeFormat(item.PlanEnd, 'yyyy-MM-dd hh:mm:ss')}</div>
      `
    },
    // 切换时间
    setGanttZoom(val) {
      this.$refs.CustomGantt.setGanttZoom(val);
    },
    // 总条数切换
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getGanttChart(this.pageSize, this.current);
    },
    // 分页切换
    handleCurrentChange(current) {
      this.current = current;
      this.getGanttChart(this.pageSize, this.current);
    },
    // 获取甘特图数据
    getGanttChart() {
      latest_device_gantt_chart({
        Keyword: "",
        PageSize: this.pageSize,
        CurrentPage: this.current,
      }).then((res) => {
        console.log(res);
        this.result = res;
      });
    }
  },
};
</script>

<style scoped lang="scss">
.action-header {
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 6px 10px;
  height: 48px;
  border-radius: 4px;
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
