import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
    });
  }
}
//工时记录
export const tableConfig2 = [
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("production.Pr_TaskProcess"),
  },
  /*实际开始*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    filter: "time",
  },
  /*实际结束*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    filter: "time",
  },
  /*实际用时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
    align: "right",
    custom: true,
    commonConfig: {
      summary: true,

    },
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  /*实际设备*/
  {
    prop: "ActualDevice",
    label: i18n.t("production.Pr_ActualDevice"),
  },
  /*作业者*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
];


//记录
export const tableConfig = [
  /*作业员*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
  /*日期*/
  {
    prop: "WorkDate",
    label: i18n.t("Generality.Ge_EndDate"),
    filter: "time",
  },
  /*作业类别*/
  {
    prop: "WorkType",
    label: i18n.t("Generality.Ge_WorkType"),
    custom: true,
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*设备*/
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_Equipment"),
  },
];

//零件明细
export const tableConfig1 = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
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
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "100px",
  },
];


//详情
export const detailConfig = [
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  /*任务单号*/
  {
    prop: "PmTaskBillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
  },
  {
    // 零件编号
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    // 零件名称
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  {
    // 描述
    prop: "PartInfo",
    label: i18n.t("Generality.Ge_Describe"),
  },
  {
    // 计划开始
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
  },
  {
    // 计划结束
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
  },
  {
    // 级别
    prop: "Level",
    label: i18n.t("Generality.Ge_Level"),
    custom: true,
  },
  {
    // 数量
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
];
