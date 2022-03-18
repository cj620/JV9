/*
 * @Author: H.
 * @Date: 2021-11-04 14:11:37
 * @LastEditTime: 2022-01-13 14:19:14
 * @Description:
 */

import { getAll } from "@/api/basicApi/systemSettings/currency";
import { checkPhone } from "@/utils/validate";
export const formSchema = [
  {
    prop: "SupplierId",
    label: i18n.t("purchase.Pr_SupplierId"),
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "ShortName",
    label: i18n.t("sale.Sa_ShortName"),
    custom: true,
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
    prop: "Tax",
    label: i18n.t("sale.Sa_Tax"),
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
    prop: "Currency",
    label: i18n.t("sale.Sa_Currency"),
    cpn: "SyncSelect",
    api: getAll,
    apiOptions: {
      // 立即调接口
      immediate: true,
      keyName: "Currency",
      valueName: "Currency",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
];

export const formSchema1 = [
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

  {
    prop: "Code",
    label: i18n.t("sale.Sa_Code"),
    cpn: "FormInput",
  },
];
