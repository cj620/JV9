<!--
 * @Author: H.
 * @Date: 2021-11-09 12:56:14
 * @LastEditTime: 2022-01-24 17:28:12
 * @Description: 项目任务工序
-->

<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
            },
            {
              label: $t('Generality.Ge_Delete'),
              popConfirm: {
                title: $t('Generality.Ge_DeleteConfirm'),
                confirm: deleteProcess.bind(null, [row.Id]),
              },
            },
          ]"
        ></TableAction
      ></template>
      <template #ProcessType="{ row }">
        <div>
          {{ ProcessTypeEnum[row.ProcessType] }}
        </div>
      </template>
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          {
            label: $t('Generality.Ge_New'),
            confirm: add.bind(),
          },
        ]"
      >
      </Action>
    </JvTable>
    <JvDialog
      :title="dialogTitle"
      :visible.sync="processDialogVisible"
      v-if="processDialogVisible"
      width="40%"
      @confirm="confirm"
    >
      <JvForm :formObj="formObj">
        <template #Process="{ prop }">
          <el-input :disabled="isEdit" v-model="formObj.form[prop]"></el-input>
        </template>
      </JvForm>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { formSchema } from "./formConfig";
import { Table } from "./config";
import {
  editProjectProcess,
  deleteProjectProcess,
  updateSort,
} from "@/api/workApi/project/baseData";
export default {
  data() {
    return {
      tableObj: {},
      formObj: {},
      processDialogVisible: false,
      dialogTitle: "",
      ProcessTypeEnum: {
        Design: this.$t("menu.De_Design"),
        Program: this.$t("menu.Pa_Program"),
        Production: this.$t("menu.Pr_Production"),
        Other: this.$t("production.Pr_Other"),
      },
      isEdit: false,
    };
  },
  methods: {
    deleteProcess(id) {
      deleteProjectProcess(id).then(() => this.tableObj.getData());
    },
    edit(row) {
      this.processDialogVisible = true;
      this.isEdit = true;
      this.dialogTitle = this.$t("Generality.Ge_Edit");
      this.formObj.form = JSON.parse(JSON.stringify(row));
    },
    add() {
      this.dialogTitle = this.$t("Generality.Ge_New");
      this.isEdit = false;
      this.formObj.form = {
        CostRate: "",
        EndScale: "",
        Process: "",
        ProcessType: "",
        SortOrder: "",
        StartScale: "",
        Id: 0,
      };
      this.processDialogVisible = true;
    },
    confirm() {
      this.formObj.validate((valid) => {
        if (valid) {
          editProjectProcess(this.formObj.form).then(() => {
            this.processDialogVisible = false;
            this.tableObj.getData();
          });
        }
      });
    },
    /*    asc() {
      this.move(true);
    },
    desc() {
      this.move(false);
    },
    move(IsmoveUp) {
      const { datas } = this.tableObj.selectData;
      if (datas.length > 1) {
        this.$message.warning("只能选择一条工序");
        return;
      }
      updateSort({
        Id: datas[0].Id,
        IsmoveUp,
      }).then(() => this.tableObj.getData());
    },*/
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
    this.formObj = new Form({
      formSchema,
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
      labelPosition: "top",
    });
  },
  mounted() {},
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped></style>
