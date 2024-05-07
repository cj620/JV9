<!--
 * @Author: your name
 * @Date: 2021-11-01 15:42:07
 * @LastEditTime: 2022-01-20 17:19:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleQuote\List\c-menu.vue
-->
<!--销售订单-->
<template>
  <PageWrapper :footer="false">
    <!-- 表格 -->
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #TaskType="{ record }">
        <!-- 状态标签 -->
        {{ taskTypeEnum[record].name }}
      </template>
      <!-- operation操作列 -->
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
// 引入表格类
import { Table, formSchema1 } from "./config";
import { Form } from "~/class/form";
import { taskTypeEnum } from "@/enum/workModule";
import { update_record_actual_end } from "@/api/workApi/project/projectTask"
import { timeFormat } from "~/utils/time";
export default {
  // 页面的标识
  // name: "Pm_ProjectTask_Record",
  data() {
    return {
      // 表格实例
      tableObj: {},
      editForm: {},
      editRecordDialogVisible: false,
      taskTypeEnum,
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      // 创建表格实例
      this.tableObj = new Table();
      this.tableObj.formObj.form.TaskType = this.$route.query.TaskType;
      this.tableObj.getData();
    },
    editRecord(row) {
      this.editForm = new Form({
        formSchema: formSchema1,
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
            this.tableObj.getData();
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
};
</script>
