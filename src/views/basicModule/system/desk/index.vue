<!--
 * @Author: C.
 * @Date: 2021-12-16 11:05:37
 * @LastEditTime: 2022-08-22 10:50:50
 * @Description: file content
-->
<!--  页面-->
<template>
  <PageWrapper>
    <div style="height: 50%; padding-bottom: 15px">
      <!-- 表格 -->
      <JvTable class="wrapper" ref="BillTable" :table-obj="taskTableObj">
        <Action
          size="mini"
          slot="btn-list"
          :actions="[
            {
              label: $t('setup.ShowRecords'),
              confirm: scanRecord.bind(null, ''),
            },
          ]"
        >
        </Action>
        <template #Progress="{ record }">
          <el-progress :percentage="record"></el-progress>
        </template>
        <!-- operation操作列 -->
        <template #operation="{ row }">
          <TableAction
            :actions="[
              {
                label: $t('setup.ReportWork'),
                confirm: reporWork.bind(null, row.Id),
              },
              {
                label: $t('setup.ShowRecords'),
                confirm: scanRecord.bind(null, row.Id),
              },
            ]"
          />
        </template>
      </JvTable>
    </div>
    <div style="height: 50%">
      <!-- 表格 -->
      <JvTable class="wrapper" ref="BillTable" :table-obj="auditTableObj">
        <Action
          size="mini"
          slot="btn-list"
          :actions="[
            {
              disabled: auditTableObj.selectData.datas.length == 0,
              label: $t('Generality.Ge_Approve'),
              confirm: allAudit,
            },
            {
              label: $t('setup.MyAuditingRecords'),
              confirm: scanAuditRecord,
            },
          ]"
        >
        </Action>
        <template #BillKey="{ record }">
          {{ $t("menu." + record) }}
        </template>
        <template #BillId="{ record, row }">
          <el-link type="primary" @click="linkTo(row)">{{ record }}</el-link>
        </template>
        <!-- operation操作列 -->
        <template #operation="{ row }">
          <TableAction
            :actions="[
              {
                label: $t('Generality.Ge_Approve'),
                confirm: billAudit.bind(null, row),
              },
            ]"
          />
        </template>
      </JvTable>
    </div>
    <JvDialog
      :title="$t('setup.ReportWork')"
      :visible.sync="reporWorkVisible"
      v-if="reporWorkVisible"
      width="30%"
      @confirm="reporWorkConfirm"
    >
      <JvForm :formObj="taskFormObj"></JvForm>
    </JvDialog>
    <JvDialog
      :title="$t('project.Pro_ReportToWorkRecord')"
      :visible.sync="taskRecordVisible"
      v-if="taskRecordVisible"
      width="50%"
    >
      <JvTable :table-obj="taskRecordTable"></JvTable>
    </JvDialog>
    <JvDialog
      :title="$t('setup.MyAuditingRecords')"
      :visible.sync="auditRecordVisible"
      v-if="auditRecordVisible"
      width="50%"
      @confirm="auditRecordVisible = false"
    >
      <JvTable :table-obj="auditRecordTable">
        <template #BillId="{ record, row }">
          <el-link type="primary" @click="linkTo(row)">{{ record }}</el-link>
        </template>
        <!-- AuditState -->
        <template #AuditState="{ record }">
          <MapBox :state="record" :map="auditEnum"></MapBox>
        </template>
        <template #BillKey="{ record }">
          {{ $t("menu." + record) }}
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table as TaskTable, TaskForm } from "./task.config";
import { ReportWorkTable } from "./task.record";
import { Table as AuditTable } from "./audit.config";
import { AuditRecordTable } from "./audit.record";
import MapBox from "@/components/BasicModule/mapBox";
import { auditEnum } from "@/enum/baseModule/auditEnum";
import { unified_audit_bill } from "@/api/basicApi/systemSettings/user";
export default {
  // 页面的标识
  name: "Se_Desk",
  components: {
    MapBox,
  },
  props: {},
  data() {
    return {
      // 表格实例
      taskTableObj: {},
      auditTableObj: {},
      taskFormObj: {},
      taskRecordTable: {},
      auditRecordTable: {},
      auditEnum,
      // 编辑路由
      EditRoute: "",
      // 新增路由
      AddRoute: "",
      reporWorkVisible: false,
      taskRecordVisible: false,
      auditRecordVisible: false,
    };
  },
  created() {
    // 创建表格实例
    this.taskTableObj = new TaskTable();
    this.auditTableObj = new AuditTable();
    this.taskFormObj = new TaskForm();
    this.taskRecordTable = new ReportWorkTable();
    this.auditRecordTable = new AuditRecordTable();
    this.taskTableObj.getData();
    this.auditTableObj.getData();
  },
  computed: {},
  methods: {
    test() {
      this.reporWorkVisible = true;
    },
    reporWorkConfirm() {
      this.taskFormObj.validate((valid) => {
        if (valid) {
          this.taskTableObj.api
            .report_work(this.taskFormObj.form)
            .then((res) => {
              this.reporWorkVisible = false;
              this.taskFormObj.reset();
              this.taskTableObj.getData();
            });
        }
      });
    },
    reporWork(Id) {
      this.taskFormObj.form.ProjectTaskItemId = Id;
      this.reporWorkVisible = true;
    },
    scanRecord(Id) {
      this.taskRecordTable.formObj.form.TaskItemId = Id;
      this.taskRecordTable.getData();
      this.taskRecordVisible = true;
    },
    scanAuditRecord() {
      this.auditRecordTable.getData();
      this.auditRecordVisible = true;
    },
    billAudit(row) {
      unified_audit_bill({
        ...row,
        Remarks: this.$t("setup.Approve"),
      }).then((res) => {
        this.auditTableObj.getData();
      });
    },
    allAudit() {
      // this.auditTableObj.selectData.datas
      Promise.all(
        this.auditTableObj.selectData.datas.map((item) => {
          return unified_audit_bill({
            ...item,
            Remarks: this.$t("setup.Approve"),
          });
        })
      ).then((res) => {
        this.auditTableObj.getData();
      });
    },
    linkTo(row) {
      this.$router.push({
        name: `${row.BillKey}_Detail`,
        query: {
          BillId: row.BillId,
        },
      });
    },
  },
  watch: {
    $route(to, from) {
      this.reporWorkVisible = false;
      this.taskRecordVisible = false;
      this.auditRecordVisible = false;
    },
  },
};
</script>
