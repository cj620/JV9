<template>
  <div>
    <jv-dialog
      :title="$t('production.Pr_EditState')"
      width="30%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirm"
    >
      <JvForm :form-obj="formObj1"></JvForm>
      <JvForm :form-obj="formObj2" v-if="formObj1.form.State === 3"></JvForm>
    </jv-dialog>
  </div>
</template>
<script>
import { Form } from "@/jv_doc/class/form";
export default {
  data() {
    return {
      formObj1: {},
      formObj2: {},
    }
  },
  created() {
    this.formObj1 = new Form({
      formSchema: [
        {
          prop: "State",
          cpn: "FormSelect",
          label: this.$t("Generality.Ge_State"),
          options: {
            list: [
              {
                value: 0,
                label: i18n.t("production.Pr_ToBeProcessed"),
              },
              {
                value: 1,
                label: i18n.t("Generality.Ge_Processing"),
              },
              {
                value: 2,
                label: i18n.t("Generality.Ge_Completed"),
              },
              {
                value: 3,
                label: i18n.t("quality.Qc_Scrapped"),
              },
            ]
          },
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["change", "blur"],
            },
          ],
        },
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    });
    this.formObj2 = new Form({
      formSchema: [
        {
          prop: "ScrapReason",
          cpn: "FormInput",
          label: i18n.t("production.Pr_ScrapReason"),
        }
      ],
      labelPosition: "top",
      baseColProps: {
        span: 24,
      },
      labelWidth: "80px",
    })
  },
  methods:{
    confirm() {
      this.formObj1.form.ScrapReason = this.formObj2.form.ScrapReason
      this.$emit('confirmToEditState', this.formObj1.form)
    }
  },
}
</script>
<style scoped>

</style>
