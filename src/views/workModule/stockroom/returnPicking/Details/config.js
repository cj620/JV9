/*
 * @Author: H.
 * @Date: 2021-12-22 13:09:11
 * @LastEditTime: 2022-04-27 12:20:53
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
    label: i18n.t("design.De_Description2"),
    formCpn: "FormInput",
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
  /*批号*/
  {
    prop: "BatchNo",
    label: '批号',
  },
 /*模具编号*/
//  {
//   prop: "ToolingNo",
//   label: i18n.t("Generality.Ge_ToolingNo"),
// },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const detailConfig = [
  {
    // 提交人
    prop: "Submitter",
    label: i18n.t("stockroom.St_Submitter"),
  },
  {
    // 部门
    prop: "Department",
    label: i18n.t("Generality.Ge_Department"),
  },
  {
    // 仓库
    prop: "Stockroom",
    label: i18n.t("setup.Stockroom"),
  },

  {
    // 领料类别
    prop: "PickingType",
    label: i18n.t("stockroom.St_PickingType"),
    custom: true,
  },
  /*生产信息*/
  {
    prop: "ProductionInfo",
    label: '生产信息',
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
