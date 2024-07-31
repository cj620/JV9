/*
 * @Author: H.
 * @Date: 2022-01-06 16:37:17
 * @LastEditTime: 2024-07-31 14:59:35
 * @Description:
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: "",
      selectType: "radio",
      printBar: false,
      searchBar: false,
      chooseCol: false,
      operationCol: false,
      tableHeaderShow: false,
      pagination: false,
      height: 350,
    });
  }
}
export const tableConfig = [
  /*任务工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
  },
  /*资源组*/
  {
    prop: "Resource",
    label: i18n.t("Generality.Ge_Resource"),
  },
  /*编程工艺*/
  {
    prop: "ProgramingProcess",
    label: i18n.t("production.Pr_ProgramingProcess"),
  },
  /*是否外协*/
  {
    prop: "IsOutsourced",
    label: i18n.t("production.Pr_IsOutsourced"),
    custom: true,
  },
  /*是否强制检验*/
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    custom: true,
  },
  {
    prop: "IsBlanking",
    label: "是否是下料",
    customFilter: (value) => (!!value ? "是" : "否"),
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
