/*
 * @Author: H.
 * @Date: 2021-12-16 08:29:01
 * @LastEditTime: 2022-01-12 17:21:20
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
  /*描述2*/
  {
    prop: "Description2",
    label:i18n.t("design.De_Description2"),
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
    formCpn: "FormInput",
    align: "right",
    width: "100px",
    type: "number",
    filter: "amount",
  },
  {
    // 电极关联零件
    prop: "AssociationPartNo",
    label: i18n.t("program.Pr_AssociationPartNo"),
    formCpn: "FormInput"
  },
  {
    //材质（精）
    prop: "ElectrodeDescription1",
    label: i18n.t("program.Pr_ElectrodeDescription1"),
    formCpn: "FormInput",
  },
  {
    //材质（精）
    prop: "ElectrodeDescription2",
    label: i18n.t("program.Pr_ElectrodeDescription2"),
    formCpn: "FormInput",
  },
  {
    //材质（精）
    prop: "ElectrodeDescription3",
    label: i18n.t("program.Pr_ElectrodeDescription3"),
    formCpn: "FormInput",
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
