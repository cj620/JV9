/*
 * @Author: H.
 * @Date: 2021-12-29 14:21:35
 * @LastEditTime: 2022-01-12 16:45:27
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
export const tableConfig1 = [
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*作业者*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
  /*日期*/
  {
    prop: "CheckDate",
    label: i18n.t("Generality.Ge_Date"),
    filter: "time",
    width: "150px",
  },
];
export const tableConfig2 = [
  /*模具零件*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*部门*/
  {
    prop: "Department",
    label: i18n.t("Generality.Ge_Department"),
  },
  /*作业者*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
  /*日期*/
  {
    prop: "CheckDate",
    label: i18n.t("Generality.Ge_Date"),
    filter: "time",
    width: "150px",
  },
];
