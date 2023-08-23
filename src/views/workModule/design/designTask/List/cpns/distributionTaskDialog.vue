<template>
  <div>
    <jv-dialog :title="$t('Generality.Ge_SelectItems')" width="70%" :close-on-click-modal="true"
      :modal-append-to-body="false" :append-to-body="false" v-bind="$attrs" v-on="$listeners" @confirm="confirmData">
      <div style="margin-left:10px;margin-bottom:10px">
        <el-button type="primary" size=mini @click="add">
          {{ $t("Generality.Ge_Add") }}
        </el-button>
      </div>

      <JvEditTable :tableObj="eTableObj">
        <template #Worker="{ formBlur, row, cdata }">
          <span v-if="row[cdata.prop].edit">

            <el-select v-model="row.Worker.value" style="width: 100%" filterable allow-create size='mini'
              :id="getPrefixId" default-first-option @visible-change="changeValue($event, row, formBlur)">
              <el-option v-for="item in WorkerList" :key="item.UserId" :label="item.UserName" :value="item.UserName">
              </el-option>
            </el-select>
          </span>

          <span v-else style="line-height: 28px">
            {{ row[cdata.prop].value }}
          </span>

        </template>
        <template #operation="{ row_index }">
          <TableAction :actions="[
            {
              icon: 'el-icon-delete',
              confirm: delItem.bind(null, row_index),
            },
          ]" />
        </template>
      </JvEditTable>
    </jv-dialog>

  </div>
</template>

<script>
import { EditTable } from "./editConfig";
import { get_by_department } from "@/api/basicApi/systemSettings/user";
import { project_task_save_item } from "@/api/workApi/project/projectTask";

export default {
  data() {
    return {
      eTableObj: {},
      WorkerList: [],
      BillItems: {
        Id: 0,
        Project: '',
        BelongingDepartment: '',
        Process: '',
        Worker: '',
        PlanTime: '',
        PlanStart: '',
        PlanEnd: '',
        Remarks: '',
        ParentId: '',
      }
    }
  },
  props: {
    TaskData: {
      type: Object,
      default: () => { },
    },
  },
  computed: {
    getPrefixId() {
      return 'edit-form-item';
    },
  },
  created() {
    console.log(this.TaskData)
    this.eTableObj = new EditTable();
  },
  methods: {

    //根据部门查找部门人员
    changeValue(e, row, cb) {
      console.log(e, row, row.BelongingDepartment);
      if (e) {
        get_by_department({ Department: row.BelongingDepartment.value }).then(res => {
          console.log(res.Items);
          this.WorkerList = res.Items
        })
      } else {

        cb()
        this.prefix = ''

      }

      console.log(e, row);
    },
    //新增数据
    add() {
      this.BillItems.Id = 0
      this.BillItems.Project = this.TaskData.Project
      this.BillItems.Process = this.TaskData.Process
      this.BillItems.ParentId = this.TaskData.Id
      this.BillItems.BelongingDepartment = this.TaskData.BelongingDepartment
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
          project_task_save_item(this.BillItems).then(res => {
            console.log(res)
            this.$emit("confirmData", false);
          })

        }
      })


    },

  }

}
</script>

<style></style>
