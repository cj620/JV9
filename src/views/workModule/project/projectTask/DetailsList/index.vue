<!--
 * @Author: C.
 * @Date: 2022-02-22 16:12:01
 * @LastEditTime: 2022-09-06 08:53:04
 * @Description: file content
-->
<!-- 销售订单 明细 页面-->
<template>
  <PageWrapper :footer="false">
    <!-- 销售订单 明细表格 -->
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <!-- 状态标签 -->
      <template #ItemState="{ record }">
        <div>
          {{ stateMap[record].name }}
        </div>
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
              disabled: row.IsemState === 'NotStarted',
            },
            {
              label: $t('project.Pro_TaskRecord'),
              confirm: taskRecord.bind(null, row),
            },
          ]"
        />
      </template>
      <!-- 表格操作行 -->
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_New'),
            confirm: add,
          },

        ]"
      >
      </Action>
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
    <JvDialog
      :visible.sync="dialogVisible"
      :title="$t('project.Pro_ReportToWorkRecord')"
      v-if="dialogVisible"
      @confirm="dialogConfirm"
      width="60%"
    >
      <JvTable :tableObj="jobRecordTableObj">
        <template #TaskType="{ record }">
          <!-- 状态标签 -->
          {{ taskTypeEnum[record].name }}
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table } from "./config";
import addProjectTask from "./addProjectTask";
// 单据状态组件
import BillStateTags from "@/components/WorkModule/BillStateTags";
import { taskStateEnum } from "@/enum/workModule";
import { JobRecordTable } from "../Detail/jobRecordTableConfig";
import { getJobRecord } from "@/api/workApi/project/projectTask";
export default {
  // 页面的标识
  name: "Sa_SaleOrder_Detail_list",
  components: {
    // 单据状态组件
    BillStateTags,
    addProjectTask,
  },
  computed: {
    stateMap() {
      return taskStateEnum;
    },
  },
  props: {},
  data() {
    return {
      // 表格实例
      tableObj: {},
      // 编辑路由
      EditRoute: "",
      // 新增路由
      AddRoute: "",
      type: "add",
      addProjectTaskDialogFormVisible: false,
      dialogVisible: false,
      transferData: {},
      jobRecordTableObj: {},
    };
  },
  created() {
    // 创建表格实例
    this.tableObj = new Table();
    this.jobRecordTableObj = new JobRecordTable();
    this.tableObj.formObj.form.States = ["Approved", "Completed"];
    console.log(this.tableObj, 65656);
    this.tableObj.getData();
  },
  methods: {
    //新增临时任务
    add() {
      this.addProjectTaskDialogFormVisible = true;
      this.type = "add";
    },
    taskRecord(row) {
      getJobRecord({ ItemId: row.Id }).then((res) => {
        this.dialogVisible = true;
        this.jobRecordTableObj.setData(res.Items);
      });
    },
    dialogConfirm() {
      this.dialogVisible = false;
    },
    //编辑临时任务
    edit(row) {
      this.addProjectTaskDialogFormVisible = true;
      this.type = "edit";
      this.transferData = JSON.parse(JSON.stringify(row));
    },
    confirmData() {
      this.addProjectTaskDialogFormVisible = false;
      this.tableObj.getData();
    },
  },
};
</script>
