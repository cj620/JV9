<!--生成模具物料-->
<template>
  <div>
    <jv-dialog
      :title="$t('Generality.Ge_GenerateItems')"
      width="35%"
      :close-on-click-modal="true"
      :modal-append-to-body="false"
      :append-to-body="false"
      v-bind="$attrs"
      v-on="$listeners"
      @confirm="confirmGenerateItems"
      :autoFocus="true"
    >
      <JvForm :formObj="formObj"> </JvForm>
    </jv-dialog>
  </div>
</template>

<script>
import { Form } from "@/jv_doc/class/form";
import { getAllUnit } from "@/api/basicApi/systemSettings/unit";
export default {
  name: "addProject",
  data() {
    return {
      formObj: {},
    };
  },
  props: {
    value: {
      type: String,
      default: () => "",
    },
  },
  async created() {
    this.formObj = new Form({
      formSchema: [
        {
          // 编号
          prop: "ItemId",
          cpn: "FormInput",
          label: i18n.t("Generality.Ge_ID"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["blur"],
            },
          ],
        },
        {
          // 名称
          prop: "ItemName",
          cpn: "FormInput",
          label: i18n.t("Generality.Ge_ItemName"),
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["blur"],
            },
          ],
        },
        {
          // 单位
          prop: "Unit",
          cpn: "SyncSelect",
          label: i18n.t("Generality.Ge_Unit"),
          api: getAllUnit,
          apiOptions: {
            immediate: true,
            keyName: "Unit",
            valueName: "Unit",
          },
          rules: [
            {
              required: true,
              message: i18n.t("Generality.Ge_PleaseEnter"),
              trigger: ["blur"],
            },
          ],
        },
        {
          // 名称
          prop: "Description",
          cpn: "FormInput",
          label: i18n.t("Generality.Ge_Describe"),
        },
      ],
      baseColProps: {
        span: 24,
      },

      labelWidth: "80px",
    });
  },
  methods: {
    //确认保存项目
    confirmGenerateItems() {
      this.formObj.validate((valid) => {
        if (valid) {
          this.$emit("confirmGenerateItems", this.formObj.form);
        } else {
          return false;
        }
      });
    },
  },
};
</script>

<style scoped></style>
