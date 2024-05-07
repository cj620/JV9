/*
 * @Author: H.
 * @Date: 2022-01-06 16:37:17
 * @LastEditTime: 2022-01-14 10:32:29
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
    label: i18n.t("Generality.Ge_Process")
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
  /*是否强制检验*/
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    custom: true
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
