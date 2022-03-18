/*
 * @Author: H.
 * @Date: 2021-12-16 08:29:01
 * @LastEditTime: 2022-01-12 17:23:58
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
    formCpn: "FormInput",
    align: "right",
    type: "number",
    width: "100px",
    filter: "amount",
  },
  /*领用数量*/
  {
    prop: "ActualPickingCount",
    label: i18n.t("Generality.Ge_TakeAwayQuantity"),
    align: "right",
    type: "number",
    width: "100px",
    filter: "amount",
  },
  /*需求日期*/
  {
    prop: "DemandDate",
    label: i18n.t("Generality.Ge_DemandDate"),
    filter: "date",
    width: "130px",
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const detailConfig = [
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
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
