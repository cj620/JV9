import { Table as BaseTable } from "@/jv_doc/class/table";
import {AccountTypeEnum} from "@/enum/workModule/Purchase/AccountTypeEnum";
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
    // 红蓝字发票
    prop: "AccountColor",
    label: '红蓝字发票',
    customFilter(v) {
      return v === 'Blue' ? "蓝字" : "红字"
    }
  },
  {
    // 发票号
    prop: "InvoiceNo",
    label: '发票号',
  },
  {
    // 是否普通发票
    prop: "OrdinaryInvoice",
    label: '是否普通发票',
    customFilter(v) {
      return v ? "是" : "否";
    }
  },
  {
    // 发票类型
    prop: "AccountType",
    label: '发票类型',
    customFilter(v) {
      return AccountTypeEnum[v] ? AccountTypeEnum[v].name : '--';
    }
  },
  {
    // 开始交期
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    filter: "date",
  },
  {
    // 结束交期
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
    // 汇率
    prop: "ExchangeRate",
    label: '汇率',
  },
  {
    // 来源单据
    prop: "RelationId",
    label: '来源单据',
  },
  {
    // 付款日期
    prop: "PaymentDate",
    label: "付款日期",
    filter: "time",
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
