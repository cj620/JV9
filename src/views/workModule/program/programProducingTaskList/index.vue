<template>
  <PageWrapper :footer="false">
    <!--  设计任务明细表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <!--表格操作行-->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
            // 报工记录
            {
              label: $t('project.Pro_ReportToWorkRecord'),
              confirm: reportRecord.bind(null, ''),
            },
            // 删除
            {
              label: $t('Generality.Ge_Delete'),
              disabled: canIsDel,
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: delBills,
              },
            }
          ]"
      >
      </Action>
      <!-- 状态标签 -->
      <template #State="{ record }">
        <TaskState :state="record"></TaskState>
      </template>
      <!--&lt;!&ndash; 结束日期 &ndash;&gt;-->
      <!--<template #ItemPlanEnd="{ record }">-->
      <!--  {{ record }}{{ IsDelay(record) }}-->
      <!--</template>-->
      <!-- 进度 -->
      <template #Progress="{ record }">
        <el-progress :percentage="record"></el-progress>
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            // 编辑
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
              disabled: row.State === 'Processed',//待修改
            },
            // 领用
            {
              label: $t('program.Pr_Receive'),
              popConfirm: {
                title: $t('program.Pr_ReceiveConfirm'),
                confirm: receive.bind(null, row),
              },
              disabled: row.Worker,
            },
            // 删除
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: confirmDel.bind(null, [row.Id]),
              },
              disabled: row.State === 'Processed',
            }
          ]"
        />
      </template>
    </JvTable>
    <!--编辑任务-->
    <!--<addProjectTask-->
    <!--  :visible.sync="addProjectTaskDialogFormVisible"-->
    <!--  v-if="addProjectTaskDialogFormVisible"-->
    <!--  :transferData="transferData"-->
    <!--  :type="type"-->
    <!--  @confirmData="confirmData"-->
    <!--  :confirmText="$t('Generality.Ge_Save')"-->
    <!--&gt;-->
    <!--</addProjectTask>-->
    <!-- 编辑任务 -->
    <editProgramTask
      :visible.sync="addProjectTaskDialogFormVisible"
      v-if="addProjectTaskDialogFormVisible"
      :transferData="transferData"
      @confirmData="confirmData"
      :confirmText="$t('Generality.Ge_Save')">
    </editProgramTask>
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
      width="60%"
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
import { ViewSubtasksTableObj } from "@/views/workModule/design/designTask/DesignTaskList/viewSubtasksTableConfig";
import distributionTaskDialog from "@/views/workModule/design/designTask/DesignTaskList/distributionTaskDialog.vue";
import editProgramTask from "@/views/workModule/program/programProducingTaskList/editProgramTask.vue";
import addProjectTask from "@/views/workModule/design/designTask/DesignTaskList/addProjectTask.vue";
import {
  project_task_get_children_item,
  project_task_delete_item,
  production_programing_task_delete,
} from "@/api/workApi/project/projectTask";
import { update_worker } from "@/api/workApi/production/productionTask"
import TaskState from "@/components/JVInternal/TaskState";

export default {
  name: "Pa_ProgramProducingTaskList",
  components: { TaskState, addProjectTask, editProgramTask, distributionTaskDialog },
  computed: {
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
    // 是否可以批量删除
    canIsDel() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return !["NotStarted", "HaveInHand"].includes(item.State);
      });
    },
  },
  data() {
    return {
      // 表格实例
      tableObj: {},
      type: "add",
      distributionTaskDialogFormVisible: false,
      addProjectTaskDialogFormVisible: false,
      viewSubtasksDialogVisible: false,
      TaskData: {},
      transferData: {},
      viewSubtasksTableObj: {},
      tableTitle:i18n.t('menu.Pa_ProgramProducingTaskList'),
      ProcessType: "Design",
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.props.title = this.tableTitle;
    this.viewSubtasksTableObj = new ViewSubtasksTableObj();
    this.tableObj.getData();
  },
  methods: {
    reportRecord(){
      this.$router.push({
        name: "Pa_ProgramProducingTaskReportRecord",
      });
    },
    dialogConfirm() {
      this.viewSubtasksDialogVisible = false;
    },
    edit(row) {
      this.addProjectTaskDialogFormVisible = true;
      this.type = "edit";
      this.transferData = JSON.parse(JSON.stringify(row));
    },
    // 领用
    receive(row){
      update_worker({ ProgramingTaskId: row.Id }).then((res) => {
        this.tableObj.getData();
      })
    },
    // 确认删除
    confirmDel(Ids){
      production_programing_task_delete({ ItemIds: Ids }).then(() => {
        this.tableObj.getData();
      })
    },
    // 批量删除
    delBills() {
      this.confirmDel(this.tableObj.selectData.keys)
      this.$refs.BillTable.clearSelection();
    },
    //查看子任务
    viewSubTask(row) {
      console.log(row);
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
    },
    //确认编辑
    confirmData() {
      this.addProjectTaskDialogFormVisible = false;
      this.tableObj.getData();
    },
    //删除的子任务
    deleteItem(e) {
      console.log(e.Id);
      project_task_delete_item({ ItemIds: [e.Id] }).then((res) => {
        console.log(res);
        this.getSubData();
      });
    },
  },
};
</script>
<style>

</style>
