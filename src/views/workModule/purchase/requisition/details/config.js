/*
 * @Author: H.
 * @Date: 2021-11-16 14:19:59
 * @LastEditTime: 2022-01-06 09:14:35
 * @Description:
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import {timeFormat} from "~/utils/time";
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
  /*状态*/
  {
    prop: "State",
    label: '状态',
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
    width: "100px",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const detailConfig = [
  /*提交人*/
  {
    prop: "Applicant",
    label: '申请人',
    customFilter(a,b) {
      return b.Submitter
    }
  },
  /*部门*/
  {
    prop: "Department",
    label: '申请部门',
  },
  /*计划交期*/
  {
    prop: "UsageDate",
    label: '使用日期',
    filter: "date",
    customFilter(a, b) {
      return timeFormat(b.DeliveryDate);
    }
  },
  /*来源单据*/
  {
    prop: "RelationId",
    label: '来源单据',
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
    filter: "date",
  },
  {
    // Mrp生成
    prop: "MrpGeneration",
    label: i18n.t("purchase.Pu_MrpGeneration"),
    customFilter: (v) => {
      return v == 1 ? i18n.t("Generality.Ge_Yes") : i18n.t("Generality.Ge_No")
    }
  },
];
