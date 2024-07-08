/*
 * @Author: H.
 * @Date: 2021-11-17 09:28:39
 * @LastEditTime: 2022-01-07 10:37:34
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
    label: "描述2",
  },
  /*状态*/
  {
    prop: "State",
    label: "状态",
    customFilter(v){
      return v === 'in' ? "装" : "拆"
    }
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
    width: "100px",
  },
  /*批号*/
  {
    prop: "BatchNo",
    label: '批号',
  },
  /*生产日期*/
  {
    prop: "ProductionDate",
    label: '生产日期',
    filter: "time"
  },
  /*有效期*/
  {
    prop: "Effective",
    label: '有效期',
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
  // {
  //   // 单据类型
  //   prop: "BillType",
  //   label: i18n.t("Generality.Ge_DocumentType"),
  //   custom: true,
  // },
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
