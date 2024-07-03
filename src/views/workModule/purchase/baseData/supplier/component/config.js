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
  { label: "公司主页", prop: "CompanyIndex", cpn: "FormInput" },
  { label: "发票地址", prop: "InvoiceAddress", cpn: "FormInput" },
  { label: "开户行", prop: "ParentBank", cpn: "FormInput" },
  { label: "银行帐号", prop: "BankNumber", cpn: "FormInput" },
  { label: "传真", prop: "Fax", cpn: "FormInput" },
  { label: "账期", prop: "AccountPeriod", cpn: "FormInput", type: "number" },
  {
    label: "状态",
    prop: "Estate",
    cpn: "FormRadio",
    default: "Enabled",
    options: {
      list: [
        {
          label: "禁用",
          value: "Forbidden",
        },
        {
          label: "启用",
          value: "Enabled",
        },
      ],
    },
  },
  { label: "备注", prop: "Remarks", cpn: "FormInput" },
  {
    label: "类别",
    prop: "Type",
    cpn: "FormSelect",
    default: "Supplier",
    options: {
      list: [
        {
          label: "供应商",
          value: "Supplier",
        },
        {
          label: "客户兼供应商",
          value: "CAndS",
        },
      ],
    },
  },
  // Supplier|CAndS|Client
  // {
  //   label: "往来单位类别",
  //   prop: "SmallType",
  // },
  {
    label: "本公司",
    prop: "IsMy",
    cpn: "FormRadio",
    default: false,
    options: {
      list: [
        {
          label: "是",
          value: true,
        },
        {
          label: "否",
          value: false,
        },
      ],
    },
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
