/*
 * @Author: H.
 * @Date: 2021-10-29 08:37:23
 * @LastEditTime: 2022-01-13 15:24:20
 * @Description:
 */
import i18n from "@/i18n/i18n";

export const formSchema = [
  {
    prop: "OldPassword",
    label: i18n.t("Generality.Ge_OldPassword"),
    cpn: "FormInput",
    showPassword: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "NewPassword",
    label: i18n.t("Generality.Ge_NewPassword"),
    cpn: "FormInput",
    showPassword: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
