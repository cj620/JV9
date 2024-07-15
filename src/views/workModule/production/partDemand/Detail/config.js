/*
 * @Author: H.
 * @Date: 2021-12-16 08:29:01
 * @LastEditTime: 2024-07-15 13:40:01
 * @Description:
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { enumFilter } from "~/utils/system/enumsPlugin";
import { taskTypeEnum } from "@/enum/workModule";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
    });
  }
}
export const tableConfig = [
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*描述2*/
  {
    prop: "Description2",
    label: i18n.t("design.De_Description2"),
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "70px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    formCpn: "FormInput",
    align: "right",
    type: "number",
    width: "100px",
    filter: "amount",
  },
  /*领用数量*/
  // {
  //   prop: "ActualPickingCount",
  //   label: i18n.t("Generality.Ge_TakeAwayQuantity"),
  //   align: "right",
  //   type: "number",
  //   width: "100px",
  //   filter: "amount",
  // },
  /*需求日期*/
  // {
  //   prop: "DemandDate",
  //   label: i18n.t("Generality.Ge_DemandDate"),
  //   filter: "date",
  //   width: "130px",
  // },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
  // 零件编号
  // {
  //   prop: "PartNo",
  //   label: i18n.t("Generality.Ge_PartNo"),
  // },
];
export const detailConfig = [
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  {
    // 制单人
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  {
    // 制单日期
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  },
  {
    // 任务单号
    prop: "PmTaskBillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
  },
  {
    // 任务类别
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    customFilter: (value) => enumFilter(value, taskTypeEnum),
  },
  {
    // 需求类别     Ge_RequirementCategory: "需求类别",
    prop: "RequirementCategory",
    label: "需求类别",
  },
  {
    // 任务类别     Ge_RequirementCategory: "需求类别",
    prop: "DemandDate",
    label: "需求日期",
    filter: "date",
  },
];
