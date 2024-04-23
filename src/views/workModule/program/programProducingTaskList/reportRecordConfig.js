import { TableAPI, Table as BaseTable } from "~/class/table";
import { getProject_task_log } from "@/api/workApi/project/projectTask"
import { enumToList } from "~/utils/system/enumsPlugin";
import { taskTypeEnum } from "@/enum/workModule";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
class api extends TableAPI{
  getData = getProject_task_log
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableSchema,
      formSchema: formSchema,
      rowId: "Id",
      title: i18n.t('menu.Pa_ProgramProducingTaskReportRecord'),
      api,
      printMod: "Pa_ProgramProducingTaskReportRecord",
      operationCol: false,
      printBar: false,
      // searchBar: false,
    })
  }}
const tableSchema = [
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
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
  /*工序名称*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  //   负责人
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
  },
  // 进度
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    custom: true,
  },
  /*开始时间*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_StartTime"),
    filter: "date",
    width: "120px",
    innerSearch: {
      prop: "StartDate",
      label: i18n.t("Generality.Ge_StartTime"),
      cpn: "SingleTime",
    },
  },

  /*结束时间*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_EndTime"),
    filter: "date",
    width: "120px",
    innerSearch: {
      prop: "EndDate",
      label: i18n.t("Generality.Ge_EndTime"),
      cpn: "SingleTime",
    },
  },
  /*工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_WorkHours"),
    width: "90px",
  },
  /*日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_Date"),
    filter: "date",
    width: "120px",
  },
]
const formSchema = [
  // 模具编号
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
  },
  // 负责人
  {
    prop: "UserName",
    cpn: "SyncSelect",
    label: i18n.t("project.Pro_Worker"),
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
  }
]
