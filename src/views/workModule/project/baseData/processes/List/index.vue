<!--
 * @Author: H.
 * @Date: 2021-11-09 12:56:14
 * @LastEditTime: 2024-07-08 10:18:04
 * @Description: 项目任务工序
-->

<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <template #titleBar>
        <Popover
          @confirm="filterData"
          @reset="resetData"
          style="margin: 0 10px"
        >
          <el-select v-model="selectedType" size="mini" clearable filterable>
            <el-option
              v-for="item in typeArray"
              :key="item.name"
              :label="item.name"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </Popover>
        <span v-if="selectedType"
          >{{ $t("production.Pr_ProcessType") }}：{{
            processTypeEnum[selectedType].name
          }}</span
        >
      </template>
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
      :title="dialogTitle"
      :visible.sync="processDialogVisible"
      v-if="processDialogVisible"
      width="30%"
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
  getAllProjectProcess,
} from "@/api/workApi/project/baseData";
import { processTypeEnum } from "@/enum/workModule";
import Popover from "~/cpn/JvTable/cpn/Popover.vue";
export default {
  name: "Pm_Process",
  data() {
    return {
      processTypeEnum,
      typeArray: Object.values(processTypeEnum),
      tableObj: {},
      formObj: {},
      selectedType: "",
      processDialogVisible: false,
      dialogTitle: "",
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
      this.$nextTick(() => {
        this.formObj.form = JSON.parse(JSON.stringify(row));
      });
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
        BelongingDepartment: "",
        StartScale: "",
        Id: 0,
        StdRates: "",
        DirectoryPurview: "",
        InSiteState: "",
        UpState: "",
        DownState: "",
        InSitedBillState: "",
        NcProgram: "",
        IFUsePole: "",
        WorkWeek: "",
        BootTimeSpan: "",
        IsRecordCraft: "",
        OutsourceEquipmentGroup: "",
        AllowRepetitionMachine: "",
        DefaultWorkingHours: "",
        ProjetctTask: "",
        ProcessContent: "",
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
    filterData() {
      let arr = this.tableObj.tableData.filter(
        (item) => item.ProcessType === this.selectedType
      );
      this.tableObj.setData(arr);
    },
    resetData() {
      this.selectedType = "";
      this.tableObj.getData();
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
  components: { Popover },
};
</script>

<style lang="scss" scoped></style>
