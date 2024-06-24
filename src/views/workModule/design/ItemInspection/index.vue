<template>
  <PageWrapper :footer="false">
    <JvTable ref="BillTable" :table-obj="tableObj">
      <Action
        size="mini"
        slot="btn-list"
        :actions="[
          // 点检
          {
            label: $t('device.De_SpotCheck'),
            confirm: batchSpotCheck.bind(null, ''),
            disabled: canBatchCheck,
          },
          // // 延期
          // {
          //   label: '延期',
          //   confirm: delay.bind(null, ''),
          // }
        ]"
      >
      </Action>
      <template #LogIsItCompletedAsPlanned="{ record }">
        {{ record ? $t('Generality.Ge_Yes') : $t('Generality.Ge_No') }}
      </template>
      <template #IsSubmit="{ record }">
        {{ record ? $t('Generality.Ge_Yes') : $t('Generality.Ge_No') }}
      </template>
      <template #operation="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('Generality.Ge_Edit'),
              confirm: edit.bind(null, row),
            },
            {
              label: $t('device.De_SpotCheck'),
              disabled: row.InspectionState === 'Checked' || !row.IsSubmit,
              popConfirm: {
                title: $t('project.Pro_ConfirmToSpotCheckThisItem'),
                confirm: confirmSpotCheck.bind(null, [row.Id]),
              },
            },
          ]"
        />
      </template>
    </JvTable>
    <JvDialog
      :title="$t('Generality.Ge_Edit')"
      :visible.sync="editDialogVisible"
      v-if="editDialogVisible"
      @confirm="editConfirm"
      width="40%"
    >
      <JvForm :formObj="formObj">
        <template #ReasonForNotAchievingThePlan2="{ prop }">
          <el-input :disabled="isEdit" v-model="formObj.form[prop]"></el-input>
        </template>
      </JvForm>
    </JvDialog>
    <JvDialog
      :title="$t('Generality.Ge_Remind')"
      :visible.sync="confirmCheckDialogVisible"
      v-if="confirmCheckDialogVisible"
      @confirm="batchCheckConfirm"
      width="400px"
    >
      {{ $t('project.Pro_ConfirmToSpotCheckThisItem') }}
    </JvDialog>
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { Form } from "@/jv_doc/class/form";
import { item_inspection_handle, item_inspection } from "@/api/workApi/project/projectTask";
export default {
  name: "De_DesignTaskItemInspection",
  data() {
    return {
      tableObj: {},
      formObj: {},
      selectedId: "",
      editDialogVisible: false,
      confirmCheckDialogVisible: false,
      isEdit: false,
    }
  },
  computed: {
    // 批量点检
    canBatchCheck() {
      let { datas } = this.tableObj.selectData;
      if (datas.length === 0) return true;
      return datas.some((item) => {
        return ["Checked"].includes(item.InspectionState) || !item.IsSubmit;
      });
    },
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    edit(row) {
      this.selectedId = row.Id
      this.formObj = new Form({
        formSchema: [
          {
            // 是否按计划完成
            prop: "IsItCompletedAsPlanned",
            label: i18n.t("Generality.Ge_IsItCompletedAsPlanned"),
            cpn: "FormRadio",
            type: "button",
            default: false,
            options: {
              list: [
                {
                  value: false,
                  label: i18n.t("Generality.Ge_Incomplete"),
                },
                {
                  value: true,
                  label: i18n.t("Generality.Ge_Completed"),
                },
              ],
            },
          },
          {
            prop: "ReasonForNotAchievingThePlan2",
            label: i18n.t("Generality.Ge_ReasonForNotAchievingThePlan2"),
            cpn: "FormInput",
            custom: true,
          },
        ],
        baseColProps: {
          span: 24,
        },
      })
      this.formObj.form.IsItCompletedAsPlanned = row.IsItCompletedAsPlanned;
      if (row.IsItCompletedAsPlanned) {
        this.formObj.form.ReasonForNotAchievingThePlan2 = row.ReasonForNotAchievingThePlan2;
      }
      this.editDialogVisible = true;
    },
    editConfirm() {
      item_inspection_handle({
        Id: this.selectedId,
        ...this.formObj.form
      }).then(() => {
        this.tableObj.getData();
        this.editDialogVisible = false;
      })
    },
    batchSpotCheck() {
      this.confirmCheckDialogVisible = true;
    },
    batchCheckConfirm() {
      const arr = this.tableObj.selectData.datas.map(item => item.Id)
      this.confirmSpotCheck(arr)
    },
    confirmSpotCheck(e) {
      item_inspection({ Ids: e }).then(() => {
        this.tableObj.getData();
        this.confirmCheckDialogVisible = false;
        this.$refs.BillTable.clearSelection();
      })
    },
    delay() {

    },
  },
  watch: {
    'formObj.form.IsItCompletedAsPlanned':{
      handler(n,o){
        this.formObj.form.ReasonForNotAchievingThePlan2 = '';
        this.isEdit = !!n;
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
