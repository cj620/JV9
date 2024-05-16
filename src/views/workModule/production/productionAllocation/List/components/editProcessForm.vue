<template>
  <jv-dialog
    :title="$t('Generality.Ge_Edit')"
    width="40%"
    :close-on-click-modal="true"
    :modal-append-to-body="false"
    :append-to-body="false"
    v-bind="$attrs"
    v-on="$listeners"
    @confirm="confirmEdit"
  >
    <JvForm :formObj="editProcessObj"> </JvForm>
  </jv-dialog>
</template>
<script>
import { Form } from "@/jv_doc/class/form";
import { timeFormat } from "@/jv_doc/utils/time";
import { getResourceMember } from "@/api/workApi/production/baseData";
export default {
  name: "index",
  data() {
    return {
      editProcessObj: {},
    }
  },
  props: {
    editProcessData: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.editProcessObj = new Form({
      formSchema: [
        {
          prop: "DeviceName",
          label: this.$t("production.Pr_Equipment"),
          cpn: "SyncSelect",
          api: getResourceMember,
          default: this.editProcessData.PlanDevice,
          apiOptions: {
            keyName: "DeviceNo",
            valueName: "DeviceNo",
            params: {
              ResourceId: this.editProcessData.Resource,
            },
            clearCache: true,
          },
        },
        {
          // 计划开始
          prop: "PlanStart",
          cpn: "SingleDateTime",
          label: i18n.t("Generality.Ge_PlanStart"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["change", "blur"],
            },
          ],
        },
        {
          // 计划结束
          prop: "PlanEnd",
          cpn: "SingleDateTime",
          label: i18n.t("Generality.Ge_PlanEnd"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["change", "blur"],
            },
          ],
        },
      ],
      defaultForm: {
        TaskProcessId: this.editProcessData.Id,
        IsModifyDate: true,
        PlanStart: timeFormat(this.editProcessData.PlanStart, "yyyy-MM-dd hh:mm"),
        PlanEnd: timeFormat(this.editProcessData.PlanEnd, "yyyy-MM-dd hh:mm"),
      },
      labelPosition: "top",
    })
  },
  methods: {
    confirmEdit() {
      this.editProcessObj.validate((valid) => {
        if (valid) {
          this.editProcessObj.form.PlanStart = timeFormat(this.editProcessObj.form.PlanStart, "yyyy-MM-dd hh:mm");
          this.editProcessObj.form.PlanEnd = timeFormat(this.editProcessObj.form.PlanEnd, "yyyy-MM-dd hh:mm");
          this.$emit("confirmToEdit", this.editProcessObj.form);
        }
      });
    }
  }
}
</script>
