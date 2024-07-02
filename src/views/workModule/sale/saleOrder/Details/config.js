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
    width: "70px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    type: "number",
    width: "100px",
    filter: "amount",
  },
  // 发货数量
  {
    prop: "DeliveryQuantity",
    label: i18n.t("Generality.Ge_DeliveryQuantity"),
    formCpn: "FormInput",
    align: "right",
    type: "number",
    width: "100px",
    filter: "amount",
  },
  // 退货数量
  {
    prop: "ReturnQuantity",
    label: i18n.t("Generality.Ge_ReturnQuantity"),
    formCpn: "FormInput",
    align: "right",
    type: "number",
    width: "100px",
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
    width: "120px",
    formCpn: "FormInput",
    filter: "amount",
  },
  /*金额*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    type: "number",
    width: "120px",
    align: "right",
    formCpn: "FormInput",
    filter: "amount",
  },
  /*税率*/
  {
    prop: "Tax",
    label: i18n.t("Generality.Ge_Tax"),
    align: "right",
    width: "70px",
  },
  /*未税金额*/
  {
    prop: "TDA",
    label: i18n.t("Generality.Ge_TDA"),
    width: "160px",
    align: "right",
    filter: "amount",
  },
  /*首样日期*/
  {
    prop: "SampleDate",
    label: i18n.t("Generality.Ge_SampleDate"),
    filter: "date",
    width: "130px",
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
    // 计划交期
    prop: "DeliveryDate",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: "date",
  },
  {
    // 币种
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),
  },
  {
    // 销售员
    prop: "SalesReps",
    label: i18n.t("sale.Sa_SalesReps"),
  },
  {
    // 项目编号
    prop: "ProjectId",
    label: i18n.t("sale.Sa_ProjectId"),
  },
  {
    // 相关编号
    prop: "RelationId",
    label: i18n.t("sale.Sa_RelationId"),
  },
  { label: "客户地址", prop: "Address" },
  { label: "描述", prop: "Description" },
  { label: "汇率", prop: "ExchangeRate" },
  { label: "部门", prop: "Dept" },
  { label: "预收款", prop: "AdvanceCollections" },
  { label: "相关数据", prop: "RelevantData" },
  { label: "销售类别", prop: "SaleType" },
  { label: "提交状态", prop: "SubmissionState" },
  { label: "贸易类型", prop: "TradeType" },
  { label: "开票日期", prop: "InvoicingDate", filter: "time" },
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
];
