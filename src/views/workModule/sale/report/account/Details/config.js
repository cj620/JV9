import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
    });
  }
}
export const tableConfig = [
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    type: "number",
    filter: "amount",
  },
  /*未税单价*/
  {
    prop: "NoTaxPrice",
    label: i18n.t("Generality.Ge_NoTaxPrice"),
    type: "number",
    align: "right",
    width: "120px",
    formCpn: "FormInput",
    filter: "amount",
  },
  /*单价*/
  {
    prop: "Price",
    label: i18n.t("Generality.Ge_Price"),
    type: "number",
    align: "right",
    formCpn: "FormInput",
    filter: "amount",
  },
  /*金额*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    type: "number",
    align: "right",
    formCpn: "FormInput",
    filter: "amount",
  },
  /*税率*/
  {
    prop: "Tax",
    label: i18n.t("Generality.Ge_Tax"),
    align: "right",
  },
  /*未税金额*/
  {
    prop: "TDA",
    label: i18n.t("Generality.Ge_TDA"),
    width: "120px",
    align: "right",
    filter: "amount",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const detailConfig = [
  {
    // 客户简称
    prop: "CustomerName",
    label: i18n.t("sale.Sa_CustomerName"),
  },
  {
    // 开始日期
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    filter: "date",
  },
  {
    // 结束日期
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
    filter: "date",
  },
  {
    // 币种
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),
  },
  {
    // 发票号
    prop: "ReceiptNumber",
    label: i18n.t("sale.Sa_ReceiptNumber"),
  },

  {
    // 制单人
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  {
    // 制单日期
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  },
  {
    // 相关编号
    prop: "RelationId",
    label: i18n.t("sale.Sa_RelationId"),
  },
  {
    // 相关编号
    prop: "Terms",
    label: i18n.t("Generality.Ge_Terms"),
  },
  { label: "发票颜色", prop: "AccountColor" },
  { label: "发票类型", prop: "AccountType" },
  { label: "单据类别", prop: "BillType" },
  { label: "来源单据", prop: "SourceBill" },
  { label: "收款日期", prop: "ReceivablesDate", filter: "date" },
  { label: "报关单号", prop: "CustomsBillId" },
  { label: "汇率", prop: "ExchangeRate" },
];
