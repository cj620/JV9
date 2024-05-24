import { TableAPI, Table as BaseTable } from '~/class/table'
import { item_inspection_list } from "@/api/workApi/project/projectTask";
import { getProjectQuery } from "@/api/workApi/project/projectManage";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { timeFormat } from "~/utils/time";
import { enumFilter, ProjectTaskItemInspectionStateEnum } from "@/enum/workModule";
import i18n from "@/i18n/i18n";

class api extends TableAPI {
  getData = item_inspection_list
}

export class Table extends BaseTable {
  constructor() {
    super( {
      tableSchema: tableSchema,
      formSchema,
      rowId: 'Id',
      title: i18n.t("menu.As_AssyTaskItemInspection"),
      api,
      printMod: 'As_AssyTaskItemInspection',
      operationWidth: 140,
      printBar: false,
      sortCol: false,
    })
  }
}

export const tableSchema = [
  {
    // 项目任务单号
    prop: "BillId",
    label: i18n.t('project.Pro_ProjectTaskSheetNo'),
    width: "120px",
  },
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "120px",
  },
  {
    // 工序
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: "75px",
  },
  {
    // 工序内容
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
    width: "230px",
  },
  {
    // 作业员
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
    width: "80px",
  },
  {
    // 明细计划开始
    prop: "ItemPlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    width: "100px",
    filter: "date",
  },
  {
    // 明细计划结束
    prop: "ItemPlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    width: "100px",
    filter: "date",
  },
  {
    // 预计工时
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "100px",
  },
  {
    // 实际工时
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
    width: "100px",
  },
  {
    // 实际开始
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    filter: "time",
    width: "150px",
  },
  {
    // 实际结束
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    filter: "time",
    width: "150px",
  },
  {
    // 是否提交
    prop: "IsSubmit",
    label: i18n.t("Generality.Ge_IsSubmit"),
    custom: true,
    width: '90px',
  },
  {
    // 计划是否完成
    prop: "IsItCompletedAsPlanned",
    label: i18n.t("Generality.Ge_IsItCompletedAsPlanned"),
    custom: true,
    width: '90px',
  },
  {
    // 未完成计划原因1
    prop: "ReasonForNotAchievingThePlan1",
    label: i18n.t("Generality.Ge_ReasonForNotAchievingThePlan1"),
    width: '140px',
  },
  {
    // 未完成计划原因2
    prop: "ReasonForNotAchievingThePlan2",
    label: i18n.t("Generality.Ge_ReasonForNotAchievingThePlan2"),
    width: '140px',
  },
  {
    // 点检状态
    prop: "InspectionState",
    label: i18n.t("project.Pro_InspectionState"),
    customFilter: (value) => enumFilter(value, ProjectTaskItemInspectionStateEnum),
    width: '90px',
  },
  {
    // 点检时间
    prop: "InspectionTime",
    label: i18n.t("project.Pro_InspectionTime"),
    width: '90px',
  },
  {
    // 点检人
    prop: "Inspectionpersonnel",
    label: i18n.t("project.Pro_InspectionPersonnel"),
    width: '90px',
  }
]

export const formSchema = [
  //加工单号搜索
  {
    prop: "PrTaskBillId",
    label: i18n.t("production.Pr_WorkSheetNo"),
    cpn: "FormInput",
  },
  // 项目编号搜索
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
  // 模号搜索
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
    // 作业员
    prop: "Worker",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_Worker"),
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  {
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
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    cpn: "SingleTime",
    default: timeFormat(
      new Date(),
      "yyyy-MM-dd"
    )
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
    cpn: "SingleTime",
    default: timeFormat(
      new Date(),
      "yyyy-MM-dd"
    )
  },
  {
    prop: "ProcessType",
    default: 'Assy',
    hidden: true,
  },
]
