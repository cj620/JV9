<template>
  <div>
    <jv-dialog
      :title="title"
      width="35%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmAddProject"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj">
        <template #Project="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            remote
            :disabled="IsDisabled"
            reserve-keyword
            :remote-method="remoteMethod"
            :loading="loading"
          >
            <el-option
              v-for="item in projectDataList"
              :key="item.Project"
              :label="item.Project"
              :value="item.Project"
            >
            </el-option>
          </el-select>
        </template>
        <template #Process="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            :disabled="IsDisabled"
            filterable
            remote
            reserve-keyword
            :remote-method="remoteMethodProcess"
            :loading="loading"
          >
            <el-option
              v-for="item in ProcessList"
              :key="item.Process"
              :label="item.Process"
              :value="item.Process"
            >
            </el-option>
          </el-select>
        </template>
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
import { getProjectQuery } from "@/api/workApi/project/projectManage";
import {
  getAllProjectProcess,
  project_process_get_by_name,
} from "@/api/workApi/project/baseData";
import { get_by_department } from "@/api/basicApi/systemSettings/user";
import { project_task_save_item } from "@/api/workApi/project/projectTask";
export default {
  name: "addProjectTask",
  data() {
    return {
      loading: false,
      IsDisabled: false,
      title: this.$t("Generality.Ge_New"),
      formObj: {},
      BelongingDepartment: "",
      projectDataList: [],
      ProcessList: [],
      WorkerList: [],
    };
  },
  props: {
    type: {
      type: String,
      default: () => "add",
    },
    transferData: {
      type: Object,
      default: () => {},
    },
  },
  async created() {
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      gutter: 30,
      labelWidth: "80px",
    });
    if (this.type === "add") {
      this.formObj.form = {
        Id: "",
        Project: "",
        Process: "",
        Worker: "",
        PlanTime: 1,
        PlanStart: "",
        PlanEnd: "",
        Remarks: "",
      };
    } else {
      this.IsDisabled = true;
      // this.title = "编辑";
      this.title = this.$t("Generality.Ge_Edit");
      this.formObj.form = this.transferData;
      this.formObj.form.PlanStart = this.transferData.ItemPlanStart;
      this.formObj.form.PlanEnd = this.transferData.ItemPlanEnd;
    }

    await this.GetProjectData();
    await this.GetProcessData();
  },
  methods: {
    //获取项目
    async GetProjectData() {
      await getProjectQuery({ Keyword: "" }).then((res) => {
        this.projectDataList = res.Items;
      });
    },
    //获取工序
    async GetProcessData() {
      await getAllProjectProcess({}).then((res) => {
        this.ProcessList = res.Items;
      });
    },
    //搜索项目
    remoteMethod(query) {
      getProjectQuery({ Keyword: query }).then((res) => {
        if (query !== "") {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.projectDataList = res.Items;
          });
        } else {
          this.GetProjectData();
        }
      });
    },
    remoteMethodProcess() {
      getAllProjectProcess({}).then((res) => {
        if (query !== "") {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.ProcessList = res.Items;
          });
        } else {
          this.GetProcessData();
        }
      });
    },

    //获取部门
    changeValue(e) {
      if (e) {
        project_process_get_by_name({
          Process: this.formObj.form.Process,
        }).then((res) => {
          if (res) {
            this.getAllWorker(res.BelongingDepartment);
          } else {
            this.getAllWorker("");
          }
        });
      }
    },
    //根据部门获取负责人
    getAllWorker(e) {
      get_by_department({ Department: e }).then((res) => {
        this.WorkerList = res.Items;
      });
    },

    confirmAddProject() {
      this.formObj.validate((valid) => {
        if (valid) {
          project_task_save_item([this.formObj.form]).then((res) => {
            console.log(res);
            this.$emit("confirmData", false);
          });
        }
      });
    },
  },
};
</script>

<style scoped></style>
