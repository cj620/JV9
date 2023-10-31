<template>
  <PageWrapper :footer="false">
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
export default {
  name: "index",
  components: { GanttPopover, CustomGantt },
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
    this.ganttContainerHeight = mainContent.clientHeight - 15;
  },
  methods: {
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
  }
};
</script>

<style scoped lang="scss"></style>
