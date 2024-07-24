<!--
 * @Author: C.
 * @Date: 2024-06-07 11:05:35
-->
<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: '完成',
            disabled: isCanComplete,
            popConfirm: {
              // doDelete
              title: `是否完成选中的任务？`,
              confirm: toComplete.bind(null),
            },
          },
        ]"
      >
      </Action>
      <template #State="{ record }">
        <TaskState :state="record"></TaskState>
      </template>
      <template #PlanEnd="{ record }">
        <span style="color: red; font-weight: bold">
          {{ timeFormat(record, "yyyy-MM-dd") }}
        </span>
      </template>
      <template #DelayDates="{ row }">
        {{ getDelayDates(row.PlanEnd, new Date()) }}
      </template>
      <!-- 状态标签 -->
      <!-- <template #ItemState="{ record }">
        <TaskState :state="record"></TaskState>
      </template>
      <template #ItemPlanEnd="{ record }">
        <span style="color: red; font-weight: bold">
          {{ timeFormat(record, "yyyy-MM-dd") }}
        </span>
      </template>
      <template #DelayDates="{ row }">
        {{ getDelayDates(row.ItemPlanEnd, new Date()) }}
      </template> -->
    </JvTable>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { timeFormat } from "@/jv_doc/utils/time";
import TaskState from "@/components/JVInternal/TaskState/index.vue";
import { production_programing_task_complete_delay_list } from "@/api/workApi/project/projectTask";
export default {
  name: "Pa_ProgramDelayedTasks",
  components: { TaskState },
  data() {
    return {
      tableObj: {},
    };
  },
  created() {
    this.tableObj = new Table();
    // this.tableObj.formObj.form.ProcessType = "program";
    this.tableObj.getData();
  },
  methods: {
    timeFormat,
    getDelayDates(f, n) {
      const timeDiff = new Date().getTime() - new Date(f).getTime();
      return (timeDiff / (1000 * 3600 * 24)).toFixed(1);
    },
    async toComplete() {
      const { keys } = this.tableObj.selectData;
      await production_programing_task_complete_delay_list(keys);
      this.tableObj.tableRef.clearSelection();
      this.tableObj.getData();
    },
  },
  computed: {
    isCanComplete() {
      const { datas } = this.tableObj.selectData;
      if (datas.length == 0) return true;
      if (datas.some((item) => item.State == "Completed")) return true;
      return false;
    },
  },
};
</script>
<style scoped lang="scss"></style>
