import { enumFilter } from "~/utils/system/enumsPlugin";
import ProcessState from "@/enum/workModule/production/ProcessState.js";

export const detailConfig = [
  /* 模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  {
    // 加工单号
    prop: "BillId",
    label: i18n.t("production.Pr_WorkSheetNo"),
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
];
export const tableConfig = [
  {
    // 工序名称
    prop: "Process",
    label: i18n.t("Generality.Ge_ProcessName"),
  },
  {
    // 状态
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    customFilter: (value) => enumFilter(value, ProcessState),
  },
  {
    // 计划工时
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlannedTime"),
  },
  {
    // 实际工时
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualHour"),
  },
  {
    // 计划设备
    prop: "PlanDevice",
    label: i18n.t("production.Pr_PlanningDevices"),
  },
  {
    // 实际设备
    prop: "ActualDevice",
    label: i18n.t("production.Pr_ActualDevice"),
  },
  // 计划开始
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    width: "140px",
    filter: "time",
  },
  //   实际开始
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    width: "140px",
    filter: "time",
  },
  // 计划结束
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    width: "140px",
    filter: "time",
  },
  //   实际结束
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    width: "140px",
    filter: "time",
  },
];
