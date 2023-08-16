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
export class api extends TableAPI {
  getData = data_report_personnel_hours_summary;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: "工时汇总",
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
    label: "部门",
  },

  /*作业员*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: "预计工时",
    type: "number",
  },
  /*实际用时*/
  {
    prop: "ActualTime",
    label: "实际用时",
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
          label: "作业员",
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
          label: "开始时间",
          cpn: "SingleTime",
        },
        {
          prop: "EndDate",
          label: "结束时间",
          cpn: "SingleTime",
        },
      ],
      rowId: "Id",
      title: "人员工作记录明细",
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

  { label: "任务单编号", prop: "BillId", width: 120 },

  { label: "模具编号", prop: "ToolingNo", width: 120 },

  { label: "零件编号", prop: "PartNo", width: 120 },

  { label: "零件名称", prop: "PartName", width: 120 },

  { label: "任务工序", prop: "Process" },

  { label: "数量", prop: "Quantity" },

  { label: "实际开始", prop: "ActualStart", filter: "time", width: "150px" },

  { label: "实际结束", prop: "ActualEnd", filter: "time", width: "150px" },

  { label: "实际用时", prop: "ActualTime" },

  { label: "实际设备", prop: "ActualDevice" },

  { label: "作业者", prop: "Worker" },

  { label: "部门", prop: "Department" },

  { label: "预计工时 ", prop: "PlanTime" },

  { label: "是否超出时间段", prop: "IsOverstep" },
];
