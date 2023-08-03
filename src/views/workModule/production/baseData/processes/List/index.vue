<!--
 * @Author: H.
 * @Date: 2021-11-09 12:58:07
 * @LastEditTime: 2022-01-24 17:26:46
 * @Description: 加工工序
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
      :visible.sync="dialogVisible"
      :title="processDialogTitle"
      @confirm="dialogConfirm"
      width="30%"
      autoFocus
      v-if="dialogVisible"
    >
      <JvForm :formObj="formObj">
        <template #Process="{ prop }">
          <el-input :disabled="isEdit" v-model="formObj.form[prop]"></el-input>
        </template>
        <template #ProcessCode="{ prop }">
          <el-input :disabled="isEdit" v-model="formObj.form[prop]"></el-input>
        </template>
      </JvForm>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { deleteProcess, editProcess } from "@/api/workApi/production/baseData";
import { Table } from "./config";
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
export default {
  data() {
    return {
      tableObj: {},
      formObj: {},
      dialogVisible: false,
      isEdit: false,
      processDialogTitle: "",
    };
  },
  methods: {
    deleteProcess(ids) {
      deleteProcess(ids).then(() => this.tableObj.getData());
    },
    edit(row) {
      this.processDialogTitle = this.$t("Generality.Ge_Edit");
      this.dialogVisible = true;
      this.isEdit = true;
      this.formObj.form = JSON.parse(JSON.stringify(row));
    },
    dialogConfirm() {
      this.formObj.validate((validate) => {
        if (validate) {
          editProcess(this.formObj.form).then(() => {
            this.dialogVisible = false;
            this.tableObj.getData();
          });
        }
      });
    },
    add() {
      this.processDialogTitle = this.$t("Generality.Ge_New");
      this.dialogVisible = true;
      this.formObj.form = {
        Process: "",
        ProcessCode: "",
        Resource: "",
        ProcessContent: "",
        LeadTimeOfProcess: "",
        PostTimeOfProcess: "",
        Id: 0,
      };
      this.isEdit = false;
    },
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
    });
  },
  mounted() {},
  computed: {},
  components: {},
};
</script>

<style lang="scss" scoped></style>
