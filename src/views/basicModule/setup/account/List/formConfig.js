/*
 * @Author: H.
 * @Date: 2022-01-14 10:34:58
 * @LastEditTime: 2022-01-20 14:51:46
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
];
