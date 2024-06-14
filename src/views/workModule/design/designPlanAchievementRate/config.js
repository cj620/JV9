import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { daily_plan_achievement_rate } from "@/api/workApi/project/dataReport";
import {timeFormat} from "~/utils/time";
export class api extends TableAPI {
  // 获取列表
  getData = daily_plan_achievement_rate;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.De_DesignPlanAchievementRate"),
      api,
      operationCol: false,
      pagination: false,
    });
  }
}
export const tableConfig = [
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: 'Image',
    width: '60px'
  },
  {
    prop: "UserId",
    label: i18n.t("setup.UserId"),
  },
  {
    prop: "Worker",
    label: i18n.t("DataV.Da_Worker"),
  },
  {
    prop: "DepartmentName",
    label: i18n.t("menu.Se_Department"),
  },
  {
    prop: "TotalPlannedQuantity",
    label: i18n.t("Generality.Ge_TotalPlannedQuantity"),
  },
  {
    prop: "CompletedQuantity",
    label: i18n.t("Generality.Ge_CompletedQuantity"),
  },
  {
    prop: "AchievementRate",
    label: i18n.t("Generality.Ge_AchievementRate"),
    custom: true,
  }
]
export const formSchema = [
  {
    prop: "ProcessType",
    default: 0,
    hidden: true,
  },
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    cpn: "SingleTime",
    default: timeFormat(new Date(), "yyyy-MM-dd")
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
    cpn: "SingleTime",
    default: timeFormat(new Date(), "yyyy-MM-dd")
  },
]
