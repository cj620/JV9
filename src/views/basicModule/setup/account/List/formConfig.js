/*
 * @Author: H.
 * @Date: 2022-01-14 10:34:58
 * @LastEditTime: 2024-07-01 13:47:43
 * @Description:
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
        trigger: "change",
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
