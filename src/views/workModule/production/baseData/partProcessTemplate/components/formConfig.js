/*
 * @Author: H.
 * @Date: 2021-12-01 16:26:01
 * @LastEditTime: 2022-01-14 10:32:42
 * @Description:
 */

export const formSchema = [
  {
    // 模板名称
    prop: "Template",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_TemplateName"),
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 备注
    prop: "Remarks",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
