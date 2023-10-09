<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <template #Schedule="{ record }">
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
        <template #Schedule="{ record }">
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
      this.reportForm.form.ProgramingTaskId = row.Id
      this.reportForm.form.Schedule = row.Schedule
      this.reportForm.form.ActualEnd = new Date()
      this.detailObj.detailData = row
    },
    confirmToReport() {
      this.reportForm.validate((valid) => {
          if (valid) {
            site_collection_programing_time_collection(this.reportForm.form).then((res) => {
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
      this.recordTableObj.getData({
        BillId: row.TaskBillId,
        // Worker: row.Worker
      })
    },
  },
  watch:{
    'reportForm.form.ActualTime':{
      handler(n,o){
        if(n){
          // n*60*60*1000
          this.reportForm.form.ActualStart = new Date(new Date(this.reportForm.form.ActualEnd).getTime() - n * 60 * 60 * 1000);
        }
      }
    }
  }
}
</script>
