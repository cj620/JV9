/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-25 11:03:33
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {taskTypeEnum, enumToList, enumFilter, ProjectTaskItemInspectionStateEnum} from "@/enum/workModule";
import i18n from "@/i18n/i18n";

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
    width: "200px",
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
  {
    // 是否按计划完成
    prop: "IsItCompletedAsPlanned",
    label: i18n.t("Generality.Ge_IsItCompletedAsPlanned"),
    custom: true,
    width: "80px"
  },
  {
    prop: "ReasonForNotAchievingThePlan1",
    label: i18n.t("Generality.Ge_ReasonForNotAchievingThePlan1"),
    width: '120px',
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
  {
    // 点检状态
    prop: "InspectionState",
    label: i18n.t("project.Pro_InspectionState"),
    customFilter: (value) => enumFilter(value, ProjectTaskItemInspectionStateEnum),
    width: '80px',
  },
  {
    // 点检时间
    prop: "InspectionTime",
    label: i18n.t("project.Pro_InspectionTime"),
    filter: "time",
    width: "140px",
  },
  {
    // 点检人
    prop: "InspectionPersonnel",
    label: i18n.t("project.Pro_InspectionPersonnel"),
    width: '95px',
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  }
];
export const formSchema = [];
