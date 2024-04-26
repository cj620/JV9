<template>
  <PageWrapper :footer="false">
    <JvTable class="wrapper" ref="BillTable" :table-obj="tableObj">
      <template #Progress="{ record }">
        <el-progress :percentage="record"></el-progress>
      </template>
      <template #TaskType="{ record }">
        {{ taskTypeEnum[record].name }}
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: editRecord.bind(null, row)
            },
          ]"
        />
      </template>
    </JvTable>
    <JvDialog
      :title="$t('Generality.Ge_Edit')"
      :visible.sync="editRecordDialogVisible"
      v-if="editRecordDialogVisible"
      destroy-on-close
      @confirm="confirmToEdit"
      width="30%"
    >
      <JvForm :formObj="editForm"></JvForm>
    </JvDialog>
  </PageWrapper>
</template>
<script>
import { Table, formSchema1 } from "./reportRecordConfig"
import { taskTypeEnum } from "@/enum/workModule";
import { Form } from "~/class/form";
import { timeFormat } from "~/utils/time";
import { update_record_actual_end } from "@/api/workApi/project/projectTask"
export default {
  name: "Pa_ProgramProducingTaskReportRecord",
  data(){
    return {
      taskTypeEnum,
      tableObj: {},
      editForm: {},
      editRecordDialogVisible: false,
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData({ TaskReportWorkType: "ProgramingTask" });
  },
  methods: {
    editRecord(row) {
      this.editForm = new Form({
        formSchema : formSchema1,
        labelPosition: "top",
        baseColProps: {
          span: 24,
        },
        labelWidth: "80px",
      })
      this.editRecordDialogVisible = true;
      this.editForm.form.EndDate = row.ActualEnd;
      this.editForm.form.StartDate = row.ActualStart;
      this.editForm.form.Progress = row.Progress;
      this.editForm.form.WorkHour = row.ActualTime;
      this.editForm.form.Id = row.Id;
    },
    confirmToEdit() {
      this.editForm.validate((valid) => {
        if (valid) {
          this.editForm.form.StartDate =timeFormat(this.editForm.form.StartDate,'yyyy-MM-dd hh:mm:ss')
          this.editForm.form.EndDate =timeFormat(this.editForm.form.EndDate,'yyyy-MM-dd hh:mm:ss')
          update_record_actual_end({
            Id: this.editForm.form.Id,
            ActualStart: this.editForm.form.StartDate,
            ActualEnd: this.editForm.form.EndDate,
            ActualTime: this.editForm.form.WorkHour,
            Progress: this.editForm.form.Progress,
          }).then(() => {
            this.tableObj.getData({ TaskReportWorkType: "ProgramingTask" });
            this.editRecordDialogVisible = false;
          })
        }
      })
    }
  },
  watch:{
    'editForm.form.WorkHour':{
      handler(n,o){
        if(n){
          // n*60*60*1000
          this.editForm.form.StartDate = new Date(new Date(this.editForm.form.EndDate).getTime() - n * 60 * 60 * 1000);
        }
      }
    }
  }
}
</script>
