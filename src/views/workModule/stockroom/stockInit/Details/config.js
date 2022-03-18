/*
 * @Author: H.
 * @Date: 2022-01-05 11:11:18
 * @LastEditTime: 2022-01-12 13:26:55
 * @Description:
 */
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
    align: "right",
    type: "number",
    filter: "amount",
    width: "100px",
  },
  /*单价*/
  {
    prop: "Price",
    label: i18n.t("Generality.Ge_Price"),
    align: "right",
    type: "number",
    filter: "amount",
    width: "100px",
  },
  /*金额*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    align: "right",
    type: "number",
    filter: "amount",
    width: "100px",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const detailConfig = [
  {
    // 仓库
    prop: "Stockroom",
    label: i18n.t("setup.Stockroom"),
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
