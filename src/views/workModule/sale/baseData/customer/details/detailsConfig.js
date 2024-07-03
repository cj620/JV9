/*
 * @Author: H.
 * @Date: 2021-11-04 15:52:15
 * @LastEditTime: 2024-07-03 10:32:49
 * @Description:
 */

export const detailConfig = [
  {
    prop: "CustomerId",
    label: i18n.t("sale.Sa_CustomerId"),
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
      return value == "Client" ? "客户" : "客户兼供应商";
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

export const detailItemConfig = [
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

  {
    prop: "Code",
    label: i18n.t("sale.Sa_Code"),
  },
];
