import { TableAPI, Table as BaseTable } from "~/class/table";
import { getProject_task_log } from "@/api/workApi/project/projectTask";
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
      operationWidth: '120',
      printBar: false,
      // operationCol: false,
      // searchBar: false,
    })
  }}
const tableSchema = [
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    width: '120px',
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
  },
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    width: "120px",
  },
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
    width: "120px",
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
  /*加工工序*/
  {
    prop: "ProductionProcess",
    label: i18n.t("production.Pr_ProductionProcess"),
    width: "90px",
  },
  //   负责人
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    width: "90px",
  },
  // 进度
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    width: "150px",
    custom: true,
  },
  /*实际开始*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    filter: "time",
    width: "135px",
  },
  /*实际结束*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    filter: "time",
    width: "135px",
  },
  /*实际用时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
    width: "90px",
  },
  /*计划工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "90px",
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "135px",
  },
  {
    prop: "Remarks",
    label:i18n.t("Generality.Ge_Remarks"),
    width: "180px",
  }
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
  },
  {
    prop: "TaskReportWorkType",
    default: "ProgramingTask",
    hidden: true,
  }
]
export const formSchema1 = [
  {
    prop: "WorkHour",
    label: i18n.t("Generality.Ge_ActualTime"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Progress",
    label: i18n.t("Generality.Ge_Schedule"),
    cpn: "Slider",
    default: 0,
  },
  {
    prop: "StartDate",
    label: i18n.t("program.Pr_ActualStart"),
    cpn: "SingleDateTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "EndDate",
    label: i18n.t("program.Pr_ActualEnd"),
    cpn: "SingleDateTime",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
];
