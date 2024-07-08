/*
 * @Author: H.
 * @Date: 2021-11-16 14:47:35
 * @LastEditTime: 2022-01-12 13:26:01
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
  /*数量 	账面数量*/
  {
    prop: "AccountQuantity",
    label: i18n.t("Generality.Ge_Quantity"),
    align: "right",
    width: "100px",
  },
  /*盘点数量 实盘数量*/
  {
    prop: "CheckQuantity",
    label: i18n.t("stockroom.St_CheckQuantity"),
    align: "right",

    width: "150px",
  },
  // 盘差数
  {
    prop: "DiskDifference",
    label: "盘差数",
    align: "right",
    customFilter(a,b,c) {
      console.log(a,b,c,59595959)
      return Math.abs(b.AccountQuantity - b.CheckQuantity);
    },
    width: "150px",
  },
  /*批号*/
  {
    prop: "BatchNo",
    label: '批号',
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
