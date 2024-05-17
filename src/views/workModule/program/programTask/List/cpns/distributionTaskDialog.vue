<template>
  <div>
    <jv-dialog
      :title="$t('project.Pro_DistributionTask')"
      width="70%"
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
