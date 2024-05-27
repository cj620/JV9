<!--
 * @Author: C.
 * @Date: 2021-12-16 11:05:37
 * @LastEditTime: 2022-09-23 14:08:36
 * @Description: file content
-->
<!--  页面-->
<template>
  <PageWrapper :footer="false">
    <div style="height: 100%; padding-bottom: 15px">
      <!-- 表格 -->
      <JvTable class="wrapper" ref="BillTable" :table-obj="taskTableObj">
        <Action
          size="mini"
          slot="btn-list"
          :actions="[
            {
              label: $t('setup.ShowRecords'),
              confirm: toProjectRecord.bind(null, ''),
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
                confirm: reporWork.bind(null, row),
              },
              {
                label: $t('setup.ShowRecords'),
                confirm: scanRecord.bind(null, row.Id),
                badge: true,
                badgeValue: row.TaskLogCount,
              },
            ]"
          />
        </template>
      </JvTable>
    </div>
<!--    <div style="height: 50%">-->
<!--      &lt;!&ndash; 表格 &ndash;&gt;-->
<!--      <JvTable class="wrapper" ref="BillTable" :table-obj="auditTableObj">-->
<!--        <Action-->
<!--          size="mini"-->
<!--          slot="btn-list"-->
<!--          :actions="[-->
<!--            {-->
<!--              disabled: auditTableObj.selectData.datas.length == 0,-->
<!--              label: $t('Generality.Ge_Approve'),-->
<!--              confirm: allAudit,-->
<!--            },-->
<!--            {-->
<!--              label: $t('setup.MyAuditingRecords'),-->
<!--              confirm: scanAuditRecord,-->
<!--            },-->
<!--          ]"-->
<!--        >-->
<!--        </Action>-->
<!--        <template #BillKey="{ record,row }">-->
<!--          <span v-if="row.DynamicData==='Part'">{{'零件'}}{{ $t("menu." + record) }}</span>-->
<!--          <span v-else-if="row.DynamicData==='Electrode'">{{'电极'}}{{ $t("menu." + record) }}</span>-->
<!--          <span v-else>{{ $t("menu." + record) }}</span>-->
<!--        </template>-->
<!--        <template #BillId="{ record, row }">-->
<!--          <el-link type="primary" @click="linkTo(row)">{{ record }}</el-link>-->
<!--        </template>-->
<!--        &lt;!&ndash; operation操作列 &ndash;&gt;-->
<!--        <template #operation="{ row }">-->
<!--          <TableAction-->
<!--            :actions="[-->
<!--              {-->
<!--                label: $t('Generality.Ge_Approve'),-->
<!--                confirm: billAudit.bind(null, row),-->
<!--              },-->
<!--            ]"-->
<!--          />-->
<!--        </template>-->
<!--      </JvTable>-->
<!--    </div>-->
    <!-- 报工 -->
    <JvDialog
      :title="$t('setup.ReportWork')"
      :visible.sync="reporWorkVisible"
      v-if="reporWorkVisible"
      width="60%"
      @confirm="reporWorkConfirm"
    >
    <JvDetail :detailObj="detailObj"> </JvDetail>
     <el-divider></el-divider>
      <JvForm :formObj="taskFormObj">
        <template #ReasonForNotAchievingThePlan1="{ prop }">
          <el-input :disabled="isEdit" v-model="taskFormObj.form[prop]"></el-input>
        </template>
      </JvForm>
    </JvDialog>
    <JvDialog
      :title="$t('project.Pro_ReportToWorkRecord')"
      :visible.sync="taskRecordVisible"
      v-if="taskRecordVisible"
      width="80%"
    >
      <JvTable :table-obj="taskRecordTable">
        <template #Progress="{ row }">
          <el-progress
            :text-inside="true"
            :stroke-width="14"
            :percentage="row.Progress"
          ></el-progress>
        </template>
      </JvTable>
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
        <template #BillKey="{ record,row }">
          <span v-if="row.DynamicData==='Part'">{{'零件'}}{{ $t("menu." + record) }}</span>
          <span v-else-if="row.DynamicData==='Electrode'">{{'电极'}}{{ $t("menu." + record) }}</span>
          <span v-else>{{ $t("menu." + record) }}</span>
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>
<script>
// 引入表格类
import { Table as TaskTable, TaskForm,detailConfig } from "./task.config";
import { ReportWorkTable } from "./task.record";
import { Table as AuditTable } from "./audit.config";
import { AuditRecordTable } from "./audit.record";
import MapBox from "@/components/BasicModule/mapBox";
import { auditEnum } from "@/enum/baseModule/auditEnum";
import { unified_audit_bill } from "@/api/basicApi/systemSettings/user";
import Detail from "@/jv_doc/class/detail/Detail";
import { timeFormat } from "@/jv_doc/utils/time";
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
      detailObj:{},
      TaskType: "",
      auditEnum,
      // 编辑路由
      EditRoute: "",
      // 新增路由
      AddRoute: "",
      reporWorkVisible: false,
      taskRecordVisible: false,
      auditRecordVisible: false,
      isEdit: true,
    };
  },
  created() {
    // 创建表格实例
    this.taskTableObj = new TaskTable();
    this.auditTableObj = new AuditTable();
    this.taskFormObj = new TaskForm();
    this.taskRecordTable = new ReportWorkTable();
    this.auditRecordTable = new AuditRecordTable();
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      // border: true,
      direction: "horizontal",
      column: 4,

    });
    this.taskTableObj.getData();
    // this.auditTableObj.getData();
  },
  computed: {},
  methods: {
    test() {
      this.reporWorkVisible = true;
    },
    reporWorkConfirm() {
      this.taskFormObj.validate((valid) => {
        if (valid) {
          //element 自带bug，时区不在东八区，要加八个小时
          this.taskFormObj.form.StartDate =timeFormat(this.taskFormObj.form.StartDate,'yyyy-MM-dd hh:mm:ss')
          this.taskFormObj.form.EndDate =timeFormat(this.taskFormObj.form.EndDate,'yyyy-MM-dd hh:mm:ss')

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
    reporWork(row) {
      this.taskFormObj.reset()
      this.detailObj.detailData = row
      this.taskFormObj.form.WorkHour = '';
      this.taskFormObj.form.ProjectTaskItemId = row.Id;
      this.taskFormObj.form.Progress=row.Progress
      this.reporWorkVisible = true;
    },
    scanRecord(Id) {
      this.taskRecordTable.formObj.form.TaskItemId = Id;
      this.taskRecordTable.getData();
      this.taskRecordVisible = true;
    },
    toProjectRecord() {
      this.$router.push({
        name: "Pm_ProjectTask_Record",
        query: { TaskType: this.TaskType },
      });
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
      if(row.BillKey==='De_PartBomTable'){
        console.log(1);
        this.$router.push({
        name:'ToolingBOM',
        params: {
          PartNo: row.DynamicData,
        },
      });

      }else if(row.BillKey==='De_MaterialRequirement'){
        if(row.DynamicData==='Part'){
          this.$router.push({
        name:'De_MaterialRequirement_Detail',
        query: {
          BillId: row.BillId,
        },
      });
        }else if(row.DynamicData==='Electrode'){
 this.$router.push({
        name:'Pa_ElectrodeDemand_Detail',
        query: {
          BillId: row.BillId,
        },
      });
        }

      }else{
        console.log(`${row.BillKey}_Detail`);
      const str =`${row.BillKey}_Detail`
      this.$router.push({
        name:str,
        query: {
          BillId: row.BillId,
        },
      });
      }

    },
  },
  watch: {
    $route(to, from) {
      this.reporWorkVisible = false;
      this.taskRecordVisible = false;
      this.auditRecordVisible = false;
    },
    'taskFormObj.form.WorkHour':{
      handler(n,o){
        if(n){
            // n*60*60*1000
            this.taskFormObj.form.StartDate = new Date(new Date(this.taskFormObj.form.EndDate).getTime() - n * 60 * 60 * 1000);
          // this.taskFormObj.form.StartDate EndDate

        }
      }
    },
    'taskFormObj.form.IsItCompletedAsPlanned':{
      handler(n,o){
        this.taskFormObj.form.ReasonForNotAchievingThePlan1 = '';
        this.isEdit = !!n;
      }
    }
  },
};
</script>
