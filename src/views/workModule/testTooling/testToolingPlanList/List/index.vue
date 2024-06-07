<template>
  <PageWrapper :footer="false">
    <div class="custom-button">
      <el-button size="mini" @click="toRecord">
        {{ $t("project.Pro_TaskRecord") }}
      </el-button>
      <el-button size="mini" @click="ToHoursSummary"> 工时汇总 </el-button>

      <el-badge
        v-if="DelayCount && DelayCount !== 0"
        :value="DelayCount"
        class="button-badge"
      >
        <el-button size="mini" @click="delayedTasks">
          {{ $t("project.Pro_DelayedTasks") }}
        </el-button>
      </el-badge>
      <el-button v-else size="mini" @click="delayedTasks">
        {{ $t("project.Pro_DelayedTasks") }}
      </el-button>
    </div>
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #ItemState="{ record }">
        <TaskState :state="record"></TaskState>
      </template>
      <template #TaskType="{ record }">
        <!-- 状态标签 -->
        {{ taskTypeEnum[record].name }}
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('testTooling.Tt_StartTrial'),
              confirm: startTrial.bind(null, row),
              disabled: row.ItemState !== 'NotStarted',
            },
            {
              label: $t('project.Pro_DistributionTask'),
              confirm: distributionTask.bind(null, row),
              disabled: row.ItemState === 'Completed' || row.ParentId !== 0,
            },
            {
              label: $t('project.Pro_ViewSubtasks'),
              confirm: viewSubTask.bind(null, row),
              disabled: row.ParentId !== 0,
            },
          ]"
        />
      </template>
    </JvTable>
    <JvDialog
      :visible.sync="viewSubtasksDialogVisible"
      :title="$t('project.Pro_ViewSubtasks')"
      v-if="viewSubtasksDialogVisible"
      @confirm="viewSubtasksDialogVisible = false"
      width="80%"
    >
      <JvTable :tableObj="viewSubtasksTableObj">
        <!-- operation操作列 -->
        <template #operation="{ row }">
          <TableAction
            :actions="[
              {
                label: $t('Generality.Ge_Delete'),
                popConfirm: {
                  title: $t('Generality.Ge_DeleteConfirm'),
                  confirm: deleteItem.bind(null, row),
                },
              },
            ]"
          />
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { ViewSubtasksTableObj } from "./viewSubtasksTableConfig";
import { taskTypeEnum } from "@/enum/workModule";
import {
  item_delay_list,
  project_task_delete_item,
  project_task_get_children_item,
} from "@/api/workApi/project/projectTask";
import TaskState from "@/components/JVInternal/TaskState/index.vue";

export default {
  name: "Tt_TestToolingPlanList",
  components: { TaskState },
  data() {
    return {
      taskTypeEnum,
      tableObj: {},
      viewSubtasksTableObj: {},
      recordRouteName: "TestToolingTask_Record",
      DelayCount: null,
      viewSubtasksDialogVisible: false,
    };
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.formObj.form.States = ["Approved", "Completed"];
    this.getDelayCount();
    this.tableObj.getData();
  },
  methods: {
    getDelayCount() {
      item_delay_list({
        SelctChildrenType: 2,
        ProcessType: "TrialTooling",
        PageSize: 1,
        CurrentPage: 1,
      }).then((res) => {
        this.DelayCount = res.Count;
      });
    },
    toRecord() {
      this.$router.push({
        name: this.recordRouteName,
      });
    },
    delayedTasks() {
      this.$router.push({
        name: "Tt_TestToolingDelayedTasks",
      });
    },
    startTrial(row) {
      this.$router.push({
        name: "Tt_TestToolingTask_Add",
        query: row,
      });
    },
    //分发任务
    distributionTask(row) {
      this.$router.push({
        name: "Tt_TestToolingDistributeTask",
        query: {
          TaskData: row,
          BillId: row.BillId,
          BackPath: "tt_TestToolingPlanList",
        },
      });
    },
    //查看子任务
    viewSubTask(row) {
      this.viewSubtasksTableObj = new ViewSubtasksTableObj();
      this.viewSubtasksDialogVisible = true;
      this.TaskData = row;
      this.getSubData();
    },
    //获取子任务数据
    getSubData() {
      project_task_get_children_item({ Id: this.TaskData.Id }).then((res) => {
        this.viewSubtasksTableObj.setData(res.Items);
      });
    },
    //删除子任务
    deleteItem(e) {
      project_task_delete_item({ ItemIds: [e.Id] }).then((res) => {
        this.getSubData();
      });
    },
    ToHoursSummary() {
      this.$router.push({
        name: "De_DesignTask_PersonnelHoursSummary",
        query: {
          ProcessType: "TrialTooling",
        },
      });
    },
  },
};
</script>
<style scoped lang="scss">
.custom-button {
  position: absolute;
  height: 45px;
  display: flex;
  align-items: center;
  right: 220px;
}
</style>
