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
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
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
    filter: "amount",
    width: "100px",
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
    width: "120px",
  },

  /*税率*/
  {
    prop: "Tax",
    label: i18n.t("Generality.Ge_Tax"),
    align: "right",
    width: "70px",
  },
  /*金额*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    type: "number",
    align: "right",
    formCpn: "FormInput",
    filter: "amount",
    width: "120px",
  },
  /*未税金额*/
  {
    prop: "TDA",
    label: i18n.t("Generality.Ge_TDA"),
    width: "120px",
    align: "right",
    filter: "amount",
  },
  /*其它费用*/
  {
    prop: "OtherExpenses",
    label: '其它费用',
  },
  /*辅助数量*/
  {
    prop: "AuxiliaryQty",
    label: i18n.t("Generality.Ge_AuxiliaryQty"),
    width: "100px",
    align: "right",
  },
  /*辅助单价*/
  {
    prop: "AuxiliaryPrice",
    label: i18n.t("Generality.Ge_AuxiliaryPrice"),
    width: "100px",
    filter: "amount",
    align: "right",
  },
  /*入库数量*/
  {
    prop: "StockInQuantity",
    label: i18n.t("Generality.Ge_StockInQuantity"),
    formCpn: "FormInput",
    align: "right",
    type: "number",
    filter: "amount",
    width: "100px",
  },
  /*交货日期*/
  {
    prop: "DeliveryDate",
    label: i18n.t("production.Pr_DeliveryDate"),
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const detailConfig = [
  {
    // 供应商简称
    prop: "SupplierName",
    label: i18n.t("purchase.Pr_SupplierName"),
  },
  {
    // 计划交期
    prop: "DeliveryDate",
    label: '交货日期',
    filter: "date",
  },
  {
    // 币种
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),
  },
  /*汇率*/
  {
    prop: "ExchangeRate",
    label: i18n.t("Generality.Ge_ExchangeRate"),
  },
  /*预付款*/
  {
    prop: "AdvanceCharge",
    label: i18n.t("Generality.Ge_AdvanceCharge"),
  },
  /*落款*/
  {
    prop: "SignOff",
    label: i18n.t("Generality.Ge_Signature")
  },
  /*来源单据*/
  {
    prop: "RelationId",
    label:  i18n.t("Generality.Ge_SourceDocuments"),
  },
  /*Mrp生成*/
  {
    prop: "MrpGeneration",
    label:  i18n.t("purchase.Pu_MrpGeneration"),
    customFilter(v) {
      return v ? i18n.t("Generality.Ge_Yes") : i18n.t("Generality.Ge_No")
    }
  },
  /*确认人*/
  {
    prop: "ConfirmPeople",
    label: i18n.t("Generality.Ge_ConfirmPeople"),
  },
  /*确认日期*/
  {
    prop: "ConfirmDate",
    label: i18n.t("Generality.Ge_ConfirmDate"),
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
];
