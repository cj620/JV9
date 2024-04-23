<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <template #Progress="{ record }">
        <el-progress :percentage="record"></el-progress>
      </template>
      <!-- operation操作列 -->
      <template #operation="{ row }">
        <TableAction
          :actions="[
            // 报工
            {
              label: $t('setup.ReportWork'),
              confirm: report.bind(null, row),
            },
            // 报工记录
            {
              label: $t('project.Pro_ReportToWorkRecord'),
              confirm: reportRecord.bind(null, row),
            }
          ]"
        />
      </template>
    </JvTable>
    <!--报工-->
    <JvDialog
      :visible.sync="reportDialogVisible"
      :title="$t('setup.ReportWork')"
      destroy-on-close
      v-if="reportDialogVisible"
      @confirm="confirmToReport"
      width="40%"
    >
      <JvDetail :detailObj="detailObj"></JvDetail>
      <el-divider></el-divider>
      <JvForm :formObj="reportForm"></JvForm>
    </JvDialog>
    <!-- 报工记录 -->
    <JvDialog
      :visible.sync="reportRecordDialogVisible"
      :title="$t('project.Pro_ReportToWorkRecord')"
      destroy-on-close
      v-if="reportRecordDialogVisible"
      :IsShowFooterBtn="false"
      width="50%">
      <JvTable :table-obj="recordTableObj">
        <template #Progress="{ record }">
          <el-progress :percentage="record"></el-progress>
        </template>
      </JvTable>
    </JvDialog>
  </PageWrapper>
</template>
<script>
import { Table, RecordTable, formSchema1, detailConfig } from "./config"
import { Form } from "~/class/form";
import Detail from "@/jv_doc/class/detail/Detail";
import { timeFormat } from "@/jv_doc/utils/time";
import { report_work } from "@/api/basicApi/systemSettings/user";
import { getJobRecord } from "@/api/workApi/project/projectTask";
import { site_collection_programing_time_collection } from "@/api/workApi/quality/siteCollection"
export default {
  name: "Pa_ProgramProducingTaskReport",
  data() {
    return {
      tableObj: {},
      recordTableObj: {},
      reportForm: {},
      detailObj:{},
      reportDialogVisible: false,
      reportRecordDialogVisible: false,
    }
  },
  created() {
    this.tableObj = new Table();
    this.recordTableObj = new RecordTable();
    this.detailObj = new Detail({
      data: {},
      schema: detailConfig,
      direction: "horizontal",
      column: 3,
    })
    this.reportForm = new Form({
      formSchema : formSchema1,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    })
    this.tableObj.getData({ UserName:this.$store.state.user.name });
  },
  methods: {
    // 报工
    report(row){
      this.reportDialogVisible = true
      this.reportForm.form.ProjectTaskItemId = row.Id
      this.reportForm.form.Progress = row.Progress
      this.reportForm.form.Remarks = row.Remarks
      this.reportForm.form.TaskReportWorkType = 'ProgramingTask'
      this.reportForm.form.EndDate = new Date()
      this.detailObj.detailData = row
    },
    confirmToReport() {
      this.reportForm.validate((valid) => {
          if (valid) {
              //element 自带bug，时区不在东八区，要加八个小时
            this.reportForm.form.StartDate =timeFormat(this.reportForm.form.StartDate,'yyyy-MM-dd hh:mm:ss')
            this.reportForm.form.EndDate =timeFormat(this.reportForm.form.EndDate,'yyyy-MM-dd hh:mm:ss')

            report_work(this.reportForm.form).then((res) => {
              this.tableObj.getData();
              this.reportDialogVisible = false
            }).catch(() => {
                this.reportDialogVisible = false
              }
            )
          }
      })
    },
    reportRecord(row) {
      this.reportRecordDialogVisible = true
      getJobRecord({
        ItemId: row.Id,
        TaskReportWorkType: 'ProgramingTask',
      }).then(res=>{
        console.log(res.Items)
        this.recordTableObj.setData(res.Items);
      })
    },
  },
  watch:{
    'reportForm.form.WorkHour':{
      handler(n,o){
        if(n){
          // n*60*60*1000
          this.reportForm.form.StartDate = new Date(new Date(this.reportForm.form.EndDate).getTime() - n * 60 * 60 * 1000);
        }
      }
    }
  }
}
</script>
