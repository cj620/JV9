import i18n from "@/i18n/i18n";
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {enumFilter, enumToList} from "~/utils/system/enumsPlugin";
import {ProjectTaskItemInspectionStateEnum, taskTypeEnum} from "@/enum/workModule";
import { getProject_task_log } from "@/api/workApi/project/projectTask";

export class api extends TableAPI {
  getData = getProject_task_log;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("dashboard.Da_MyTaskReport"),
      api,
      printMod: "Se_MyTaskReport",
      operationCol: false,
      printBar: false,
    });
  }
}

export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    width: '120px'
  },

  /*项目*/
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
    width: "120px",
    innerSearch: {
      prop: "Project",
      cpn: "FormInput",
      label: i18n.t("menu.Pm_Project"),
    },
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "120px",
    innerSearch: {
      prop: "ToolingNo",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_ToolingNo"),
    },
  },
  /*任务类别*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    width: "120px",
    custom: true,
    innerSearch: {
      prop: "TaskType",
      cpn: "FormSelect",
      label: i18n.t("Generality.Ge_TaskType"),
      options: {
        list: enumToList(taskTypeEnum),
      },
    },
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: "90px",
  },
  /*工作内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
    width: "200px",
  },
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
    width: "180px",
  },
  // 计划工时
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "90px",
  },
  /*开始时间*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    filter: "time",
    width: "140px",
    innerSearch: {
      prop: "StartDate",
      label: i18n.t("Generality.Ge_ActualStart"),
      cpn: "SingleTime",
    },
  },

  /*结束时间*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    filter: "time",
    width: "140px",
    innerSearch: {
      prop: "EndDate",
      label: i18n.t("Generality.Ge_ActualEnd"),
      cpn: "SingleTime",
    },
  },
  /*实际工时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
    width: "90px",
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
  /*制单人*/
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    width: "95px",
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("program.Pr_CreationDate"),
    filter: "time",
    width: "140px",
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
    width: "140px",

  }
];

export const formSchema = [
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
    cpn: "FormInput",
  },
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
  },
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(taskTypeEnum),
    },
  },
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    hidden: true,
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
];
