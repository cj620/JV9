/*
 * @Author: H.
 * @Date: 2021-12-07 13:10:54
 * @LastEditTime: 2023-08-10 11:51:01
 * @Description:
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {
  data_report_personnel_hours_summary,
  personnel_hours_details,
} from "@/api/workApi/production/dataReport";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { timeFormat } from "@/jv_doc/utils/time";
import {
  ProcessingResult,
  ProductionType,
  enumFilter,
} from "@/enum/workModule";
import i18n from "@/i18n/i18n";
export class api extends TableAPI {
  getData = data_report_personnel_hours_summary;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("production.Pr_HoursSummary"),
      api,
      printBar: false,
      printMod: "Pr_PersonnelHoursSummary",
      // searchBar: true,
      // operationCol: false,
    });
  }
}

export const tableConfig = [
  // 部门
  {
    prop: "DepartmentName",
    label: i18n.t("Generality.Ge_Department"),
  },

  /*作业员*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    type: "number",
  },
  /*实际用时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualHour"),
    type: "number",
  },
];

export const formSchema = [
  //作业员搜索
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_Worker"),
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  //部门搜索
  {
    prop: "DepartmentName",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    cpn: "SingleTime",
    default: timeFormat(
      new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)
    ),
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
    cpn: "SingleTime",
    default: timeFormat(new Date()),
  },
];
class WorkRecordApi extends TableAPI {
  getData = personnel_hours_details;
}
export class WorkRecordDetailTable extends BaseTable {
  constructor() {
    super({
      tableSchema: workRecordDetailTableConfig,
      // formSchema: getFormSchema([
      //   ["Worker", { label: "作业员" }],
      //   "StartDate",
      //   "EndDate",
      // ]),
      formSchema: [
        {
          prop: "Worker",
          label: i18n.t("Generality.Ge_Worker"),
          cpn: "SyncSelect",
          api: getAllUserData,
          apiOptions: {
            immediate: true,
            keyName: "UserName",
            valueName: "UserName",
          },
        },
        {
          prop: "StartDate",
          label: i18n.t("Generality.Ge_StartTime"),
          cpn: "SingleTime",
        },
        {
          prop: "EndDate",
          label: i18n.t("Generality.Ge_EndTime"),
          cpn: "SingleTime",
        },
      ],
      rowId: "Id",
      title: i18n.t("menu.Pr_PersonnelHoursSummary") + "  " + i18n.t("Generality.Ge_Details"),
      api: WorkRecordApi,
      height: 300,
      printBar: false,
      printMod: "Pr_PersonnelHoursSummary_Details",
      // searchBar: true,
      operationCol: false,
    });
  }
}
// 工作记录明细
const workRecordDetailTableConfig = [
  // { label: "编号", prop: "Id", width: 170 },
  // 任务单编号
  {
    label: i18n.t("production.Pr_WorkOrderNumber"),
    prop: "BillId",
    width: 120
  },
  // 模具编号
  {
    label: i18n.t("Generality.Ge_ToolingNo"),
    prop: "ToolingNo",
    width: 120
  },
  // 零件编号
  {
    label: i18n.t("Generality.Ge_PartNo"),
    prop: "PartNo",
    width: 120
  },
  // 零件名称
  {
    label: i18n.t("Generality.Ge_PartName"),
    prop: "PartName",
    width: 120
  },
  // 任务工序
  {
    label: i18n.t("production.Pr_TaskProcess"),
    prop: "Process"
  },
  // 数量
  {
    label: i18n.t("Generality.Ge_Quantity"),
    prop: "Quantity"
  },
  // 世纪开始
  {
    label: i18n.t("Generality.Ge_ActualStart"),
    prop: "ActualStart",
    filter: "time",
    width: "150px"
  },
  // 实际结束
  {
    label: i18n.t("Generality.Ge_ActualEnd"),
    prop: "ActualEnd",
    filter: "time",
    width: "150px"
  },
  // 实际用时
  {
    label: i18n.t("Generality.Ge_ActualTime"),
    prop: "ActualTime"
  },
  // 实际设备
  {
    label: i18n.t("production.Pr_ActualDevice"),
    prop: "ActualDevice"
  },
  // 作业者
  {
    label: i18n.t("Generality.Ge_Worker"),
    prop: "Worker"
  },
  // 部门
  {
    label: i18n.t("Generality.Ge_Department"),
    prop: "Department"
  },
  // 预计工时
  {
    label: i18n.t("Generality.Ge_PlanTime"),
    prop: "PlanTime"
  },
  // 是否超出时间段
  {
    label: i18n.t("production.Pr_IsOverstep"),
    prop: "IsOverstep"
  },
];
