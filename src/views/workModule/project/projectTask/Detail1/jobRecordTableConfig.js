/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-25 11:03:33
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { taskTypeEnum, enumToList } from "@/enum/workModule";

export class JobRecordTable extends BaseTable {
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
      operationCol: false,
      height: 500,
    });
  }
}
export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
  },

  /*项目*/
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
    width: "120px",
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  /*任务类别*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    width: "120px",
    custom: true,
  },

  /*开始时间*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_StartTime"),
    filter: "date",
    width: "120px",
  },

  /*结束时间*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_EndTime"),
    filter: "date",
    width: "120px",
  },
  /*工时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_WorkHours"),
    width: "90px",
  },

  /*制单人*/
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    width: "95px",
  },
  /*日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_Date"),
    filter: "date",
    width: "120px",
  },
];
export const formSchema = [];
