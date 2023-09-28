<template>
  <PageWrapper :footer="false">
    <!--  设计任务明细表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <!-- 状态标签 -->
      <template #State="{ record }">
        {{ record }}
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
              disabled: row.State === 'Processed',//待修改
            },
             {
              label: '领用',
              confirm: reception.bind(null, row),
              disabled: row.State === 'Processed',//待修改
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
import addProjectTask from "@/views/workModule/design/designTask/DesignTaskList/addProjectTask.vue";
import {
  project_task_get_children_item,
  project_task_delete_item,
} from "@/api/workApi/project/projectTask";

export default {
  name: "Pa_ProgramProducingTaskList",
  components: { addProjectTask, distributionTaskDialog },
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
    console.log(this.$route.name)
    // 创建表格实例
    this.tableObj = new Table();
    this.tableObj.props.title = this.tableTitle;
    this.viewSubtasksTableObj = new ViewSubtasksTableObj();
    this.tableObj.getData();
  },
  methods: {
    dialogConfirm() {
      this.viewSubtasksDialogVisible = false;
    },
    //编辑临时任务
    edit(row) {
      console.log('row::: ', row);
      this.addProjectTaskDialogFormVisible = true;
      this.type = "edit";
      this.transferData = JSON.parse(JSON.stringify(row));
    },
      //领用任务

	  reception(){

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
