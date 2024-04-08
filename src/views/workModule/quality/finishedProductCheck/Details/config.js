import { Table as BaseTable } from "@/jv_doc/class/table";
import {
  ProcessingResult,
  enumToList,
  ProcessCheckTypeEnum,
  reasonForFailureEnum,
  enumFilter, AbnormalCategoryEnum,
} from "@/enum/workModule";

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
      height: null,
    });
  }
}

export const tableConfig = [
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },

  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
  },

  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },

  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
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
];
export const detailConfig = [
  {
    // 加工单
    prop: "PrTaskBillId",
    label: i18n.t("Generality.Ge_PrTaskBillId"),
    custom: true,
  },
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  {
    // 零件编号
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    // 返工工序
    prop: "ReworkProcess",
    label: i18n.t("quality.Qc_ReworkProcess"),
  },
  {
    // 检测结果
    prop: "ProcessingResult",
    label: i18n.t("quality.Qc_CheckResult"),
    customFilter: (value, row) => enumFilter(value, ProcessingResult),
    // {

    //   if(!value) return ''
    //   return ProcessingResult?.[value]?.name??value
    // }
  },
  {
    // 负责人
    prop: "PersonInCharge",
    label: i18n.t("project.Pro_Worker"),
  },
  {
    prop: "AbnormalCause",
    label: i18n.t("quality.Qc_AbnormalCause"),
  },
  {
    prop: "Analyst",
    label: i18n.t("quality.Qc_AbnormalCauseAnalyst"),
  },
  {
    prop: "SubmittedForInspectionQty",
    label: i18n.t("quality.Qc_SubmittedForInspectionQty"),
  },
  {
    prop: "InspectionQty",
    label: i18n.t("quality.Qc_InspectionQty"),
  },
  {
    prop: "UnqualifiedQty",
    label: i18n.t("quality.Qc_UnqualifiedQty"),
  },
  {
    // 异常类别
    prop: "AbnormalCategory",
    label: i18n.t("quality.Qc_AbnormalCategory"),
    customFilter: (value, row) => enumFilter(value, AbnormalCategoryEnum),
  },
  // {
  //   prop: "State",
  //   label: "状态",
  // },
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
  // 备注  Remarks
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
