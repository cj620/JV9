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
          },
          // 延期
          {
            label: '延期',
            confirm: delay.bind(null, ''),
          }
        ]"
      >
      </Action>
      <template #IsItCompletedAsPlanned="{ record }">
        {{ record ? '是' : '否' }}
      </template>
      <template #IsSubmit="{ record }">
        {{ record ? '是' : '否' }}
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
              confirm: spotCheck.bind(null, row),
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
  </PageWrapper>
</template>
<script>
import { Table } from "./config";
import { Form } from "@/jv_doc/class/form";
export default {
  name: "De_DesignTaskItemInspection",
  data() {
    return {
      tableObj: {},
      formObj: {},
      editDialogVisible: false,
      isEdit: false,
    }
  },
  created() {
    this.tableObj = new Table();
    this.tableObj.getData();
  },
  methods: {
    edit(row) {
      console.log('row::', row.IsItCompletedAsPlanned)
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
      this.editDialogVisible = true;
    },
    spotCheck() {

    },
    batchSpotCheck() {

    },
    delay() {

    },
    editConfirm() {

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
