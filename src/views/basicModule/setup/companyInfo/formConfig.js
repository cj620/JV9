/*
 * @Author: H.
 * @Date: 2021-11-08 09:19:14
 * @LastEditTime: 2022-01-13 14:18:33
 * @Description:
 */

import { checkPhone } from "@/utils/validate";
export const formSchema = [
  {
    prop: "ShortName",
    label: i18n.t("sale.Sa_ShortName"),
    cpn: "FormInput",
    show: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "FullName",
    label: i18n.t("sale.Sa_FullName"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Address",
    label: i18n.t("sale.Sa_Address"),
    cpn: "FormInput",
  },
  {
    prop: "Contact",
    label: i18n.t("sale.Sa_Contact"),
    cpn: "FormInput",
  },
  {
    prop: "Tel",
    label: i18n.t("setup.Tel"),
    cpn: "FormInput",
  },
  {
    prop: "Email",
    label: i18n.t("setup.Mail"),
    cpn: "FormInput",
    rules: [
      {
        type: "email",
        message: i18n.t(
          "Generality.Ge_PleaseInputEmailAddressWithCorrectFormat"
        ),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Phone",
    label: i18n.t("setup.Phone"),
    cpn: "FormInput",
    rules: [
      {
        validator: checkPhone,
        trigger: ["change", "blur"],
      },
    ],
  },
];
