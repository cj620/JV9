import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import { project_task_item_list } from "@/api/workApi/project/projectTask";
import { getProjectQuery } from "@/api/workApi/project/projectManage";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
class api extends TableAPI {
  getData=project_task_item_list
}
export class Table extends BaseTable {
  constructor() {
    super( {
      tableSchema: tableSchema,
      formSchema: formSchema,
      rowId: 'Id',
      title: i18n.t("menu.Tt_TestToolingPlanList"),
      api,
      printMod:'Tt_TestToolingPlanList',
      operationWidth:240,
      printBar:false
    })
  }
}
const tableSchema = [
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    align: "center",
    cpn: "Link",
    width: '130px',
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
    align: "center",
    width: "115px",
  },
  /*项目*/
  {
    prop: "Project",
    label: i18n.t("systemSetupData.Project"),
    width: '130px',
  },
  /*任务类别*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    custom: true,
    width: '90px',
  },
  /*产品名称*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: '130px',
  },
  /*加工内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
    width: '250px'
  },
  /*负责人*/
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    width: '90px',
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: '90px',
  },
  /*计划开始*/
  {
    prop: "ItemPlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: "140px",
  },
  /*计划结束*/
  {
    prop: "ItemPlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: "140px",
  },
  /*备注*/
  {
    prop: "ItemRemarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]
const formSchema = [
  //单号搜索
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
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
  //模号搜索 Ge_ToolingName
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo")+'  /  '+ i18n.t("Generality.Ge_ToolingName"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      descriptionOnly:true,
      valueName: "ItemId",
      params:{
        ItemCategory:'Tooling'
      }
    },
  },
  {
    // 工序
    prop: "ProcessType",
    default: "TrialTooling",
    label: i18n.t("Generality.Ge_Process"),
    hidden: true,
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
    prop: "ItemStates",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    type: "multiple",
    default: ["NotStarted", "HaveInHand"],
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
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    cpn: "SingleTime",
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
    cpn: "SingleTime",
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
