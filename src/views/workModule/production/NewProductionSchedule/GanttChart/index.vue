<template>
  <PageWrapper :footer="false">
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
          <el-button size="mini" style="margin-left: 10px" type="primary">{{
            $t("Generality.Ge_Search")
          }}</el-button>
        </div>
<!--        <div class="apsVersionNo">-->
<!--          {{ $t("production.Pr_Version") }}：{{ ApsVersionNo }}-->
<!--        </div>-->
      </div>
      <div class="action-header-right">
<!--        <Action-->
<!--          size="mini"-->
<!--          :actions="[-->
<!--            {-->
<!--              label: $t('Generality.Ge_Refresh'),-->
<!--              confirm: _refresh.bind(),-->
<!--            },-->
<!--            {-->
<!--              label: $t('production.Pr_Calculate'),-->
<!--              confirm: calculate.bind(),-->
<!--            },-->
<!--            {-->
<!--              label: $t('production.Pr_SimulatedAPS'),-->
<!--              confirm: simulatedCalculate.bind(),-->
<!--            },-->
<!--            {-->
<!--              label: $t('production.Pr_CheckLoad'),-->
<!--              confirm: equipmentLoad.bind(),-->
<!--            },-->
<!--            {-->
<!--              label: $t('production.Pr_Release'),-->
<!--              confirm: setSchedulingResultsVisible.bind(),-->
<!--            },-->
<!--            {-->
<!--              label: $t('production.Pr_APSLog'),-->
<!--              confirm: openApsLog.bind(),-->
<!--            },-->
<!--            {-->
<!--              icon: 'el-icon-view',-->
<!--              label: tableChangeGantt-->
<!--                ? $t('Generality.Ge_TabularShow')-->
<!--                : $t('Generality.Ge_GanttShow'),-->
<!--              confirm: setTableChangeGantt.bind(),-->
<!--            },-->
<!--          ]"-->
<!--        ></Action>-->
      </div>
    </div>
    <CustomGantt
      ref="CustomGantt"
      isTaskClick
      isTaskHover
      detailShow
      :columns="GanttColumns"
      :loading="loading"
      :result="result"
      :padding="10"
      :floatingWindow="floatingWindow"
      :popoverOptions="popoverOptions"
      :taskInnerHtml="setTaskInnerHtml"
      :ganttContainerHeight="ganttContainerHeight"
      :setTaskBackground="setTaskBackground"
      taskDialogTitle="Process"
      taskRadius="25"
      @taskClick="taskClick"
      @taskDialogConfrim="taskDialogConfrim"
    >
      <template #popover="{ item }">
        <gantt-popover :item="item"></gantt-popover>
      </template>
      <template #taskDialogSlot="{ item }">
        <JvForm :formObj="formObj"> </JvForm>
      </template>
    </CustomGantt>
    <!-- 分页器 -->
    <div class="custom-pagination">
      <div>
<!--        <div class="custom-unfold" @click="setFold">-->
<!--          <i :class="unfold_icon"></i>-->
<!--        </div>-->
      </div>
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
  </PageWrapper>
</template>

<script>
import CustomGantt from "@/components/CustomGantt/index.vue";
import GanttPopover from "@/views/workModule/production/productionSchedule/List/components/gantt-popover.vue";
import { Table, GanttColumns, OldTable, ObsoleteTable } from "./config";
import { simulation_scheduling_list } from "@/api/workApi/production/productionSchedule";
import floatingWindow from "./components/floatingWindow.vue";
import { Form } from "@/jv_doc/class/form";
// 引入表单 配置
import { formSchema } from "./formConfig";
import Action from "~/cpn/JvAction/index.vue";
export default {
  name: "index",
  components: { Action, GanttPopover, CustomGantt },
  data() {
    return {
      floatingWindow: floatingWindow,
      GanttColumns,
      formObj: "", // 表单实例
      loading: false,
      AlgorithmType: "ClassicalAlgorithm",
      partNumberValue: "", // 零件编号查询输入框
      result: {},
      popoverOptions: {
        placement: "right",
        width: 670,
        trigger: "hover",
      },
      ganttContainerHeight: 650,
      tableChangeGantt: true, // 甘特图和表格切换显示隐藏
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
    };
  },
  created() {
    // 创建表单实例
    this.formObj = new Form({
      formSchema: formSchema,
      baseColProps: {
        span: 24,
      },
      // gutter: 30,
      labelWidth: "80px",
    });
    this.setAlgorithmType();
  },
  mounted() {
    let mainContent = document.querySelector(".main-content");
    this.ganttContainerHeight = mainContent.clientHeight - 115;
  },
  methods: {
    // 分页切换
    handleCurrentChange(current) {
      this.current = current;
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // 总条数切换
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.setAlgorithmType(this.pageSize, this.current);
    },
    // 搜索
    searchChange() {
      this.setAlgorithmType(this.pageSize,this.current);
    },
    // 获取排程结果
    setAlgorithmType(size = 10, page = 1) {
      this.loading = true;
      simulation_scheduling_list({
        AlgorithmType: this.AlgorithmType,
        CurrentPage: page,
        PageSize: size,
        Keyword: this.partNumberValue,
        // SortColumn: "PartNo,PlanStart",
        // SortOrder: 1,
      }).then((res) => {
        this.result = res;
        this.loading = false;
        this.ApsVersionNo = res.VersionNo;
      });
    },
    // 切换时间
    setGanttZoom(val) {
      this.$refs.CustomGantt.setGanttZoom(val);
    },
    setTaskInnerHtml(item) {
      return `${item.Process}(${item.PlanTime}H) ${item.PlanDevice}`;
    },
    setTaskBackground(item) {
      if (item) {
        return {
          is: item.PlanDevice.indexOf("[Overload]") !== -1,
          color: "#ffcc33",
        };
      }
    },
    // task点击事件
    taskClick(data) {
      Object.keys(this.formObj.form).forEach((item) => {
        this.formObj.form[item] = data[item];
      });
    },
    // task弹窗确认事件
    taskDialogConfrim(taskDetail) {
      console.log(taskDetail);
    },
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
