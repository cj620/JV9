<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
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
      v-if="reportDialogVisible"
      @confirm="confirmToReport"
      width="30%"
    >
      <JvForm :formObj="reportForm">

      </JvForm>
    </JvDialog>
  </PageWrapper>
</template>
<script>
import { Table, formSchema1 } from "./config"
import { Form } from "~/class/form";
import { site_collection_programing_time_collection } from "@/api/workApi/quality/siteCollection"
export default {
  name: "Pa_ProgramProducingTaskReport",
  data() {
    return {
      tableObj: {},
      reportForm: {},
      reportDialogVisible: false
    }
  },
  created() {
    this.tableObj = new Table();
    this.reportForm = new Form({
      formSchema : formSchema1,
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    })
    this.tableObj.getData();
  },
  methods: {
    // 报工
    report(row){
      this.reportDialogVisible = true
      this.reportForm.form.ProgramingTaskId = row.Id
      this.reportForm.form.Schedule = row.Schedule
      this.reportForm.form.ActualStart = row.ActualStart
      this.reportForm.form.ActualEnd = row.ActualEnd
    },
    confirmToReport() {
      site_collection_programing_time_collection(this.reportForm.form).then((res) => {
        this.tableObj.getData();
        this.reportDialogVisible = false
      }).catch(() => {
          this.reportDialogVisible = false
        }
      )
    }
  }
}
</script>
