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
  // {
  //   // 报价编号
  //   prop: 'BillId',
  //   label: '报价编号',
  // },
  {
    // 客户
    prop: "CustomerName",
    label: i18n.t("menu.Sa_Customer"),
  },
  {
    // 项目
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
  },
  {
    // 模具名称
    prop: "ToolingName",
    label: i18n.t("Generality.Ge_ToolingName"),
  },
  {
    // 预计交期
    prop: "DeliveryDate",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: "date",
  },
  {
    // 报价有效期
    prop: "QuotationExpiredAt",
    label: i18n.t("sale.Sa_ValidityPeriodOfQuotationExpiredAt"),
    filter: "date",
  },
  {
    // 币种
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),
  },


  {
    // 描述
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
];
