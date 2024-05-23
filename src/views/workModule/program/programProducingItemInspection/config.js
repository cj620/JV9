import { TableAPI, Table as BaseTable } from '~/class/table'
import { production_programing_task_item_inspection_list } from "@/api/workApi/project/projectTask";
import i18n from "@/i18n/i18n";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import {timeFormat} from "~/utils/time";

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
      printBar: false
    })
  }
}

export const tableSchema = [
  {
    // 加工单号
    prop: "TaskBillId",
    label: i18n.t('production.Pr_WorkSheetNo'),
    width: "150px",
    align: "center",
    cpn: "Link",
    cpnProps: {
      routeName: "ProductionTaskDetails",
      methods: "query",
      parameterKey: "BillId",
    },
  },
  {
    // 项目任务单号
    prop: "PmTaskBillId",
    label: i18n.t('project.Pro_ProjectTaskSheetNo'),
    width: "150px",
    align: "center",
    cpn: "Link",
    cpnProps: {
      routeName: "Pm_ProjectTask_Detail",
      methods: "query",
      parameterKey: "BillId",
    },
  },
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "120px",
  },
  {
    // 零件编号
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    width: "120px",
  },
  // {
  //   prop: "ItemState",
  //   label: i18n.t("Generality.Ge_State"),
  //   custom: true,
  //   align: "center",
  //   width: "115px",
  // },
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
    label: "点检状态",
  },
  {
    // 点检时间
    prop: "InspectionTime",
    label: "点检时间",
  },
  {
    // 点检人
    prop: "Inspectionpersonnel",
    label: "点检人",
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
    label: i18n.t("setup.Time"),
    cpn: "SingleTime",
    default: timeFormat(
      new Date(),
      "yyyy-MM-dd"
    )
  },
  {
    prop: "EndDate",
    hidden: true,
    default: timeFormat(
      new Date(),
      "yyyy-MM-dd"
    )
  },
]
