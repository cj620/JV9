<template>
  <div>
    <jv-dialog
      :title="$t('project.Pro_DistributionTask')"
      width="80%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmData"
    >
      <div style="margin-left: 10px; margin-bottom: 10px">
        <el-button type="primary" size="mini" @click="add">
          {{ $t('Generality.Ge_Add') }}
        </el-button>
      </div>

      <JvEditTable :tableObj="eTableObj">
        <template #ProcessContent="{ row }">
          <el-select
            v-model="row.customData.value"
            style="width: 100%"
            multiple
            filterable
            allow-create
            default-first-option
            @visible-change="changeValue($event, row)"
          >
            <el-option
              v-for="item in row.ProcessContentList.value"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
        <template #operation="{ row_index }">
          <TableAction
            :actions="[
              {
                icon: 'el-icon-delete',
                confirm: delItem.bind(null, row_index),
              },
            ]"
          />
        </template>
      </JvEditTable>
    </jv-dialog>
  </div>
</template>

<script>
import { EditTable } from "./editConfig";
import { project_task_save_item } from "@/api/workApi/project/projectTask";
import {getAllProjectProcess} from "@/api/workApi/project/baseData";

export default {
  data() {
    return {
      eTableObj: {},
      BillItems: {
        Id: 0,
        Project: "",
        BelongingDepartment: "",
        Process: "",
        Worker: "",
        PlanTime: "",
        PlanStart: "",
        PlanEnd: "",
        Remarks: "",
        ParentId: "",
        ProcessContent: "",
        ProcessContentList: [],
        customData: [],
      },
    };
  },
  props: {
    TaskData: {
      type: Object,
      default: () => {},
    },
  },
  created() {
    this.eTableObj = new EditTable();
  },
  methods: {
    changeValue(e, row) {
      var arr = [];
      if (e) {
        getAllProjectProcess({Process: row.Process.value}).then((res) => {
          if(res.Items.length) {
            if(res.Items[0].ProcessContent !== null) {
              console.log(res.Items[0].ProcessContent.split(/[,，]/), 312)
              res.Items[0].ProcessContent.split(/[,，]/).forEach((item) => {
                arr.push({
                  value: item,
                  label: item,
                });
              });
            }
          }
          row.ProcessContentList.value = arr;
        });
      }
    },
    //新增数据
    add() {
      this.BillItems.Id = 0;
      this.BillItems.Project = this.TaskData.Project;
      this.BillItems.Process = this.TaskData.Process;
      this.BillItems.ParentId = this.TaskData.Id;
      this.BillItems.BelongingDepartment = this.TaskData.BelongingDepartment;
      this.eTableObj.push([this.BillItems]);
    },
    //删除物料
    delItem(index) {
      this.eTableObj.delItem(index);
    },
    //保存
    confirmData() {
      this.eTableObj.validate((valid) => {
        this.BillItems = this.eTableObj.getTableData();
        this.BillItems.forEach(item => {
          item.ProcessContent = item.customData.join();
        })
        if (valid) {
          project_task_save_item(this.BillItems).then((res) => {
            this.$emit("confirmData", false);
          });
        }
      });
    },
  },
};
</script>

<style></style>
