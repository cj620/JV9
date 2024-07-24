import i18n from "@/i18n/i18n";
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// import { item_delay_list } from "@/api/workApi/project/projectTask";
import { production_programing_task_items } from "@/api/workApi/project/projectTask";

// import { taskTypeEnum } from "@/enum/workModule";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getProjectQuery } from "@/api/workApi/project/projectManage";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { enumFilter, taskStateEnum, taskTypeEnum } from "@/enum/workModule";

export class api extends TableAPI {
  getData = production_programing_task_items;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema: formSchema,
      rowId: "Id",
      title: "延期编程加工任务",
      api,
      printMod: "Pa_ProgramDelayedTasks",
      // operationWidth: 150,
      operationCol: false,
      printBar: false,
    });
  }
}

export const tableConfig = [
  /*模号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "120px",
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    width: "120px",
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
    width: "120px",
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_TaskStatus"),
    custom: true,
    width: "115px",
    // customFilter: (value) => enumFilter(value, taskStateEnum),
    // width: "100px",
    align: "center",
  },
  /*工序名称*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: "100px",
  },
  // /*工序内容*/
  // {
  //   prop: "ProcessContent",
  //   label: i18n.t("Generality.Ge_TaskContent"),
  //   width: "100px",
  // },
  // 生产工序
  {
    prop: "ProductionProcess",
    label: i18n.t("production.Pr_ProductionProcess"),
    width: "100px",
  },
  // 加工单号
  {
    prop: "TaskBillId",
    label: i18n.t("production.Pr_WorkSheetNo"),
    width: "135px",
  },
  //   任务类型
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    customFilter: (value) => enumFilter(value, taskTypeEnum),
    width: "100px",
  },
  //   负责人
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    width: "100px",
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: "140px",
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "date",
    custom: true,
    width: "100px",
  },
  /*延期天数*/
  {
    prop: "DelayDates",
    label: i18n.t("project.Pro_DelayedDates"),
    custom: true,
  },
  //   预计工时
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "120px",
  },
  //   实际工时
  // {
  //   prop: "ActualTime",
  //   label: i18n.t("Generality.Ge_ActualHour"),
  //   width: "120px",
  // },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    width: "180px",
  },
];

export const formSchema = [
  //单号搜索
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  {
    prop: "isDelay",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
    default: false,
    hidden: true,
  },
  {
    prop: "IsComplete",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
    default: false,
    hidden: true,
  },
  //加工单号搜索
  {
    prop: "PrTaskBillId",
    label: i18n.t("production.Pr_WorkSheetNo"),
    cpn: "FormInput",
  },
  //单号搜索
  {
    prop: "Project",
    label: i18n.t("sale.Sa_ProjectId"),
    cpn: "AsyncSearch",
    api: getProjectQuery,
    apiOptions: {
      keyName: "Project",
      valueName: "Project",
    },
  },
  //模号搜索
  {
    prop: "ToolingNo",
    label:
      i18n.t("Generality.Ge_ToolingNo") +
      "  /  " +
      i18n.t("Generality.Ge_ToolingName"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      showValue: true,
      valueName: "ItemId",
      params: {
        ItemCategory: "Tooling",
      },
    },
  },
  {
    // 销售员
    prop: "Worker",
    cpn: "SyncSelect",
    label: i18n.t("project.Pro_Worker"),
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  {
    prop: "SelctChildrenType",
    label: i18n.t("project.Pro_ViewTaskDetails"),
    cpn: "FormSelect",
    default: 2,
    options: {
      list: [
        {
          value: 0,
          label: i18n.t("project.Pro_ViewParentProjectTasks"),
        },
        {
          value: 1,
          label: i18n.t("project.Pro_ViewSubtasks"),
        },
        {
          value: 2,
          label: i18n.t("project.Pro_ViewAllTasks"),
        },
      ],
    },
  },
];
