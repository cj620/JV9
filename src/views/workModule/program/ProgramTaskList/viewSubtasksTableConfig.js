/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-08-22 09:54:25
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { taskStateEnum, enumToList } from "@/enum/workModule";

export class ViewSubtasksTableObj extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      printBar: false,
      searchBar: false,
      exportBar: false,
      colBar: false,
      densityBar: false,
      tableHeaderShow: false,
      pagination: false,
      chooseCol: false,
      height: 500,
    });
  }
}
export const tableConfig = [
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    customFilter: (value) => {
      if (!value) return "";
      return taskStateEnum[value].name;
    },
  },
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
  },
  /*计划工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "date",
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "date",

  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const formSchema = [];
