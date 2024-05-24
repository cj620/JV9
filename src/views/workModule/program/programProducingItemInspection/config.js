import { TableAPI, Table as BaseTable } from '~/class/table'
import { production_programing_task_item_inspection_list } from "@/api/workApi/project/projectTask";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { timeFormat } from "~/utils/time";
import { enumFilter } from "~/utils/system/enumsPlugin";
import { ProjectTaskItemInspectionStateEnum } from "@/enum/workModule";
import i18n from "@/i18n/i18n";

class api extends TableAPI {
  getData = production_programing_task_item_inspection_list
}

export class Table extends BaseTable {
  constructor() {
    super( {
      tableSchema: tableSchema,
      formSchema,
      rowId: 'Id',
      title: i18n.t("menu.Pa_ProgramProducingTaskItemInspection"),
      api,
      printMod: 'Pa_ProgramProducingTaskItemInspection',
      operationWidth: 140,
      printBar: false,
      sortCol: false,
    })
  }
}

export const tableSchema = [
  {
    // 零件编号
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    width: "120px",
  },
  {
    // 工序
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: "100px",
  },
  {
    // 工序内容
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
    width: "250px",
  },
  {
    // 作业员
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
    width: "100px",
  },
  {
    // 明细计划开始
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    width: "100px",
    filter: "date",
  },
  {
    // 明细计划结束
    prop: "PlanEnd",
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
    width: '120px',
  },
  {
    // 未完成计划原因1
    prop: "ReasonForNotAchievingThePlan1",
    label: i18n.t("Generality.Ge_ReasonForNotAchievingThePlan1"),
    width: '220px',
  },
  {
    // 未完成计划原因2
    prop: "ReasonForNotAchievingThePlan2",
    label: i18n.t("Generality.Ge_ReasonForNotAchievingThePlan2"),
    width: '220px',
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
    prop: "UserName",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_Worker"),
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
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
]
