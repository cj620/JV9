import i18n from "@/i18n/i18n";
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { item_delay_list } from "@/api/workApi/project/projectTask";
import { taskTypeEnum } from "@/enum/workModule";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { getProjectQuery } from "@/api/workApi/project/projectManage";
import { itemList } from "@/api/basicApi/systemSettings/Item";

export class api extends TableAPI {
  getData = item_delay_list;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema: formSchema,
      rowId: "Id",
      title: i18n.t("menu.De_DesignDelayedTasks"),
      api,
      printMod: "De_DesignDelayedTasks",
      // operationWidth: 150,
      operationCol: false,
      printBar: false,
    });
  }
}

export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    align: "center",
    cpn: "Link",
    width: "150px",
    cpnProps: {
      routeName: "Pm_ProjectTask_Detail",
      methods: "query",
      parameterKey: "BillId",
    },
  },
  /*状态*/
  {
    prop: "ItemState",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
    width: "115px",
    align: "center",
    innerSearch: {
      prop: "ItemState",
      label: i18n.t("Generality.Ge_State"),
      cpn: "FormSelect",
      options: {
        list: [
          {
            value: "NotStarted",
            label: i18n.t("project.Pro_NotStarted"),
          },
          {
            value: "HaveInHand",
            label: i18n.t("project.Pro_Ongoing"),
          },
          {
            value: "Completed",
            label: i18n.t("Generality.Ge_Completed"),
          },
        ],
      },
    },
  },
  /*项目*/
  {
    prop: "Project",
    label: i18n.t("systemSetupData.Project"),
    width: "120px",
  },
  /*产品名称*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "120px",
  },
  /*任务类别*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    customFilter: (value) => {
      if (!value) return "";
      return taskTypeEnum[value].name;
    },
    width: "90px",
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: "120px",
  },
  /*工序内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
    width: 300
  },
  /*负责人*/
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    width: "100px",
    innerSearch: {
      // 销售员
      prop: "Worker",
      cpn: "SyncSelect",
      label: i18n.t("project.Pro_Worker"),
      api: getAllUserData,
      apiOptions: {
        // immediate: true,
        keyName: "UserName",
        valueName: "UserName",
      },
    },
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "80px",
  },
  /*计划开始*/
  {
    prop: "ItemPlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "date",
    width: "100px",
  },
  /*计划结束*/
  {
    prop: "ItemPlanEnd",
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
  /*备注*/
  {
    prop: "ItemRemarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]

export const formSchema = [
  //单号搜索
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
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
]
