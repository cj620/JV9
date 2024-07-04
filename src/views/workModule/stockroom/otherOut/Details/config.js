/*
 * @Author: your name
 * @Date: 2021-11-12 15:34:15
 * @LastEditTime: 2021-12-30 15:24:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\otherOut\Details\config.js
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
    label: "描述2",
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
  /*库存数*/
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
  // /*模具编号*/
  // {
  //   prop: "ToolingNo",
  //   label: i18n.t("Generality.Ge_ToolingNo"),
  // },
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
