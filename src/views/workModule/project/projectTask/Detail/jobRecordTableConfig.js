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
  /*进度*/
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
    width: "250px",
  },
  /*实际开始*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    filter: "time",
    width: "140px",
  },
  /*实际结束*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    filter: "time",
    width: "140px",
  },
  /*工时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_WorkHours"),
    width: "120px",
  },
  /*作业员*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
    width: "120px",
  },
  /*报工时间*/
  {
    prop: "CreationDate",
    label: i18n.t("setup.ReportedAt"),
    filter: "time",
    width: "150px",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  }
];
export const formSchema = [];
