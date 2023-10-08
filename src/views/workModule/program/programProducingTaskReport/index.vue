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
          ]"
        />
      </template>
    </JvTable>
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
  </PageWrapper>
</template>
<script>
import { Table, formSchema1, detailConfig } from "./config"
import { Form } from "~/class/form";
import Detail from "@/jv_doc/class/detail/Detail";
import { site_collection_programing_time_collection } from "@/api/workApi/quality/siteCollection"
export default {
  name: "Pa_ProgramProducingTaskReport",
  data() {
    return {
      tableObj: {},
      reportForm: {},
      detailObj:{},
      reportDialogVisible: false
    }
  },
  created() {
    this.tableObj = new Table();
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
      this.reportForm.form.ActualStart = row.ActualStart
      this.reportForm.form.ActualEnd = row.ActualEnd
      this.detailObj.detailData.ToolingNo = row.ToolingNo
      this.detailObj.detailData.PlanTime = row.PlanTime
      this.detailObj.detailData.TaskType = row.TaskType
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
    }
  },
  watch:{
    'reportForm.form.ActualTime':{
      handler(n,o){
        if(n){
          // n*60*60*1000
          this.reportForm.form.ActualEnd = new Date(new Date(this.reportForm.form.ActualStart).getTime() + n * 60 * 60 * 1000);
        }
      }
    }
  }
}
</script>
