/*
 * @Author: H.
 * @Date: 2021-11-04 15:52:15
 * @LastEditTime: 2024-07-03 10:33:05
 * @Description:
 */

export const detailConfig = [
  {
    prop: "SupplierId",
    label: i18n.t("purchase.Pr_SupplierId"),
    // custom:true,
    cpnProps: {
      // span
    },
  },
  {
    prop: "ShortName",
    label: i18n.t("sale.Sa_ShortName"),
  },
  {
    prop: "FullName",
    label: i18n.t("sale.Sa_FullName"),
  },
  {
    prop: "Tax",
    label: i18n.t("sale.Sa_Tax"),
  },
  {
    prop: "Currency",
    label: i18n.t("sale.Sa_Currency"),
  },
  {
    prop: "Address",
    label: i18n.t("sale.Sa_Address"),
  },
  {
    prop: "Contact",
    label: i18n.t("sale.Sa_Contact"),
  },
  {
    prop: "Tel",
    label: i18n.t("setup.Tel"),
  },
  {
    prop: "Email",
    label: i18n.t("setup.Mail"),
  },
  {
    prop: "Phone",
    label: i18n.t("setup.Phone"),
  },
  { label: "公司主页", prop: "CompanyIndex" },
  { label: "发票地址", prop: "InvoiceAddress" },
  { label: "开户行", prop: "ParentBank" },
  { label: "银行帐号", prop: "BankNumber" },
  { label: "传真", prop: "Fax" },
  { label: "账期", prop: "AccountPeriod" },
  {
    label: "状态",
    prop: "Estate",
    customFilter: (value) => {
      return value == "Forbidden" ? "禁用" : "启用";
    },
  },
  { label: "备注", prop: "Remarks" },
  {
    label: "类别",
    prop: "Type",
    customFilter: (value) => {
      return value == "Supplier" ? "供应商" : "客户兼供应商";
    },
  },
  // Supplier|CAndS|Client
  {
    label: "往来单位类别",
    prop: "SmallType",
  },
  {
    label: "本公司",
    prop: "IsMy",
    customFilter: (value) => {
      return Boolean(value) ? "是" : "否";
    },
  },
];
