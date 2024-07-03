/*
 * @Author: C.
 * @Date: 2024-05-14 08:48:29
 */
export const formSchema = [
  {
    // 字段名
    prop: "Department",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Department"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: "blur",
      },
    ],
  },
  {
    // 字段名
    prop: "Remark",
    cpn: "FormInput",
    label: "备注",
    rules: [
      {
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: "blur",
      },
    ],
  },
];
