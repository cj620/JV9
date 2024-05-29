
<template>
  <PageWrapper :footer="false">
    <!--  设计任务明细表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <!-- 状态标签 -->
      <template #ItemState="{ record }">
        <TaskState :state="record"></TaskState>
      </template>
      <!-- 结束日期 -->
      <template #ItemPlanEnd="{ record }">
        {{ record }}{{ IsDelay(record) }}
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
              disabled: row.ItemState === 'Completed',
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
    <!--父级物料弹窗-->
    <addProjectTask
      :visible.sync="addProjectTaskDialogFormVisible"
      v-if="addProjectTaskDialogFormVisible"
      :transferData="transferData"
      :type="type"
      @confirmData="confirmData"
      :confirmText="$t('Generality.Ge_Save')"
    >
    </addProjectTask>
    <!-- //分发任务页面 -->
    <distributionTaskDialog
      :visible.sync="distributionTaskDialogFormVisible"
      v-if="distributionTaskDialogFormVisible"
      :TaskData="TaskData"
      @confirmData="confirmDistributionTask"
    >
    </distributionTaskDialog>
    <JvDialog
      :visible.sync="viewSubtasksDialogVisible"
      :title="$t('project.Pro_ViewSubtasks')"
      v-if="viewSubtasksDialogVisible"
      @confirm="dialogConfirm"
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
import { taskStateEnum } from "@/enum/workModule";
import addProjectTask from "./addProjectTask";
import distributionTaskDialog from "./distributionTaskDialog";
import { ViewSubtasksTableObj } from "./viewSubtasksTableConfig";
import TaskState from "@/components/JVInternal/TaskState";
import {
  project_task_get_children_item,
  project_task_delete_item,
} from "@/api/workApi/project/projectTask";
export default {
  name: "Pa_ProgramTaskList",
  components: {
    distributionTaskDialog,
    addProjectTask,
    TaskState,
  },
  computed: {
    stateMap() {
      return taskStateEnum;
    },
    IsDelay() {
      return (e) => {
        var ss = this.DayDelay * 24 * 60 * 60 * 1000; //一天的毫秒数86400
        if (new Date(e).getTime() < new Date().getTime()) {
          return "Postponed";
        } else if (new Date(e).getTime() > new Date().getTime()) {
          return "Postponing";
        }
      };
    },
  },
  data(){
    return{
      tableObj: {},
      type: "add",
      distributionTaskDialogFormVisible: false,
      addProjectTaskDialogFormVisible: false,
      viewSubtasksDialogVisible: false,
      TaskData: {},
      transferData: {},
      viewSubtasksTableObj: {},
      tableTitle:i18n.t('menu.Pa_ProgramTaskList'),
      ProcessType:'Program',
    }
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.props.title = this.tableTitle;
    this.tableObj.formObj.form.ProcessType = this.ProcessType;
    this.tableObj.formObj.form.States = ["Approved", "Completed"];
    this.viewSubtasksTableObj = new ViewSubtasksTableObj();
    this.tableObj.formObj.setForm(this.$route.params);
    this.tableObj.getData();
  },
  methods: {
    dialogConfirm() {
      this.viewSubtasksDialogVisible = false;
    },
    //编辑临时任务
    edit(row) {
      this.addProjectTaskDialogFormVisible = true;
      this.type = "edit";
      this.transferData = JSON.parse(JSON.stringify(row));
    },
    //分发任务
    distributionTask(row) {
      // this.distributionTaskDialogFormVisible = true;
      // this.TaskData = row;
      this.$router.push({
        name: "Pa_ProgramDistributeTask",
        query: {
          TaskData: row,
          BillId: row.BillId,
          BackPath: "Pa_ProgramTaskList",
        },
      });
    },
    //查看子任务
    viewSubTask(row) {
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
    confirmDistributionTask() {
      this.distributionTaskDialogFormVisible = false;
      this.tableObj.getData();
    },
    //修改人员
    confirmData() {
      this.addProjectTaskDialogFormVisible = false;
      this.tableObj.getData();
    },
    //删除的子任务
    deleteItem(e) {
      project_task_delete_item({ ItemIds: [e.Id] }).then((res) => {
        this.getSubData();
      });
    },
  },
}
</script>
<style></style>
