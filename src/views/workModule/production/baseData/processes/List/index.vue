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
          {
            label: $t('design.De_DownloadTemplate'),
            confirm: downLoadTemplate.bind(),
          },
          {
            label: $t('Generality.Ge_Import'),
            confirm: importProcesses.bind(),
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
        <template #ProgramingProcess="{ prop }">
          <el-select
            v-model="formObj.form[prop]"
            filterable
            size="mini"
          >
            <el-option
              v-for="item in ProcessList"
              :key="item.Process"
              :label="item.Process"
              :value="item.Process"
            ></el-option>
          </el-select>
        </template>
      </JvForm>
    </JvDialog>
    <!-- 导入数据 -->
    <Import
      :visible.sync="importShow"
      width="420px"
      :title="$t('Generality.Ge_Import')"
      @complete="importComplete"
    ></Import>
    <JvDialog
      v-if="editTableShow"
      :visible.sync="editTableShow"
      width="70%"
      :title="$t('Generality.Ge_Import')"
      @confirm="confirmImport"
    >
      <JvEditTable :tableObj="editTableObj">
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
        <template #IsOutsourced="{ row }">
          <el-checkbox v-model="row.IsOutsourced.value"></el-checkbox>
        </template>
        <template #IsCompulsoryInspection="{ row }">
          <el-checkbox v-model="row.IsCompulsoryInspection.value"></el-checkbox>
        </template>
      </JvEditTable>
    </JvDialog>
  </PageWrapper>
</template>

<script>
import { deleteProcess, editProcess, batchSaveProcess } from "@/api/workApi/production/baseData";
import { export2Excel } from "@/jv_doc/cpn/JvTable/utils/export2Excel";
import { format2source } from "@/jv_doc/class/utils/dataFormat";
import { Table } from "./config";
import { EditTable } from "./editConfig"
import { formSchema } from "./formConfig";
import { Form } from "@/jv_doc/class/form";
import { editLock } from "@/api/basicApi/systemSettings/billEditLock";
export default {
  data() {
    return {
      tableObj: {},
      formObj: {},
      editTableObj: {},
      ProcessList: [],
      dialogVisible: false,
      importShow: false,
      editTableShow: false,
      isEdit: false,
      processDialogTitle: "",
      exportTemplate: [
        {
          prop: "Process",
          label: i18n.t("Generality.Ge_Process"),
        },
        {
          prop: "ProcessCode",
          label: i18n.t("production.Pr_ProcessCode"),
        },
        {
          prop: "Department",
          label: i18n.t("Generality.Ge_Department")
        },
        {
          prop: "ProcessContent",
          label: i18n.t("Generality.Ge_TaskContent"),
        },
        {
          prop: "Resource",
          label: i18n.t("menu.Pr_Resources"),
        },
        {
          prop: "LeadTimeOfProcess",
          label: i18n.t("Generality.Ge_LeadTimeOfProcess"),
        },
        {
          prop: "PostTimeOfProcess",
          label: i18n.t("Generality.Ge_PostTimeOfProcess"),
        },
        {
          prop: "ProgramingProcess",
          label: i18n.t("production.Pr_ProgramingProcess"),
        }
      ],
      exportTemplateData: {
        checkData: [],
        checkedFields: [],
        sourceType: "editTable",
        dataType: "TEMPLATE",
        saveType: "xlsx",
        title: "",
        fileName: this.$t("menu.Pr_Process"),
      },
    };
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
  methods: {
    deleteProcess(ids) {
      deleteProcess(ids).then(() => this.tableObj.getData());
    },
    edit(row) {
      this.processDialogTitle = this.$t("Generality.Ge_Edit");
      this.dialogVisible = true;
      this.isEdit = true;
      this.formObj.form = JSON.parse(JSON.stringify(row));
      let arr1 = this.tableObj.tableData
      this.ProcessList = arr1.filter(obj => obj.Process !== row.Process)
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
        Department: "",
        Resource: "",
        ProcessContent: "",
        LeadTimeOfProcess: "",
        PostTimeOfProcess: "",
        Id: 0,
      };
      this.isEdit = false;
    },
    downLoadTemplate() {
      var arr = [];
      this.tableObj.props.tableSchema.forEach((item) =>
        this.exportTemplate.forEach((Titem) => {
          if (item.label === Titem.label) {
            arr.push(item);
          }
        })
      );
      this.exportTemplateData.checkedFields = arr;
      export2Excel(this.exportTemplateData);
    },
    importProcesses() {
      this.importShow = true;
      this.editTableObj = new EditTable()
    },
    delItem(index) {
      this.editTableObj.delItem(index);
    },
    //导入成功
    importComplete(e) {
      this.importShow = false;

      var arr = [];
      e.forEach((Titem) => {
        var str = {
          Process: "",
          ProcessCode: "",
          Department: "",
          ProcessContent: "",
          Resource: "",
          LeadTimeOfProcess: 0,
          PostTimeOfProcess: 0,
          IsOutsourced: false,
          IsCompulsoryInspection: false,
          ProgramingProcess: "",
        };
        this.exportTemplate.forEach((item) => {
          if (Titem[item.label]) {
            str[item.prop] = Titem[item.label];
          }
        });
        arr.push(str);
      });

      this.editTableShow = true;
      this.editTableObj.setData(arr);
    },
    confirmImport() {
      this.editTableObj.validate((valid) => {
        if (valid) {
          batchSaveProcess(format2source(this.editTableObj.tableData)).then(() => {
            this.tableObj.getData();
            this.editTableShow = false;
          })
        }
      })
    }
  },
};
</script>

<style lang="scss" scoped></style>
