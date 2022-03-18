/*
 * @Author: H.
 * @Date: 2021-10-29 11:30:59
 * @LastEditTime: 2022-01-14 14:05:44
 * @Description:
 */
export const formSchema = [
  {
    prop: "RoleName",
    label: i18n.t("Generality.Ge_RoleName"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
