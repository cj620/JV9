<template>
  <div>
    <jv-dialog
      :title="$t('Generality.Ge_Edit')"
      width="35%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmEdit"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj">
        <template #Worker="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            allow-create
            size="mini"
            default-first-option
            @visible-change="changeValue($event)"
          >
            <el-option
              v-for="item in WorkerList"
              :key="item.UserId"
              :label="item.UserName"
              :value="item.UserName"
            >
            </el-option>
          </el-select>
        </template>
      </JvForm>
    </jv-dialog>
  </div>
</template>
<script>
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { project_process_get_by_name } from "@/api/workApi/project/baseData";
import { get_by_department } from "@/api/basicApi/systemSettings/user";
import { production_programing_task_edit } from "@/api/workApi/project/projectTask";
export default {
  name: "editProgramTask",
  data() {
    return {
      formObj: {},
      WorkerList: [],
    }
  },
  props: {
    transferData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    console.log(this.transferData);
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    this.formObj.form = this.transferData;
  },
  methods: {
    changeValue(e) {
      if (e) {
        if (this.transferData.BelongingDepartment) {
          get_by_department({ Department: this.transferData.BelongingDepartment }).then((res) => {
            this.WorkerList = res.Items;
          });
        } else {
          get_by_department({ Department: '' }).then((res) => {
            this.WorkerList = res.Items;
          });
        }
      }
    },
    confirmEdit(){
      this.formObj.form.Id = parseInt(this.formObj.form.Id);
      this.formObj.form.ParentId = parseInt(this.formObj.form.ParentId);
      production_programing_task_edit(this.formObj.form).then((res) => {
        this.$emit("confirmData", false);
      });
    }
  },
  // watch:{
  //   'formObj.form.PlanTime':{
  //     handler(n,o){
  //       if(n){
  //         // n*60*60*1000
  //         this.formObj.form.PlanEnd = new Date(new Date(this.formObj.form.PlanStart).getTime() + n * 60 * 60 * 1000);
  //       }
  //     }
  //   }
  // }
}
</script>
