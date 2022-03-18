import { getAll } from "@/api/basicApi/systemSettings/currency";
import { numberFormatter } from "@/filters";
import { checkPhone } from "@/utils/validate";
export const formSchema = [
  {
    prop: "SupplierId",
    label: i18n.t("purchase.Pr_SupplierId"),
    cpn: "FormInput",
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
    cpn: "FormInput",
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
    type: "number",
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

  },
];
