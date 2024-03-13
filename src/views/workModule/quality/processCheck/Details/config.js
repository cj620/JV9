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
  // 序号
  {
    prop: "SortOrder",
    label: i18n.t("production.Pr_SortOrder"),
    align: "center",
    width: '100'
  },
  /*理论值*/
  {
    prop: "TheoreticalValue",
    label: i18n.t("quality.Qc_TheoreticalValue"),
  },
  /*上公差*/
  {
    prop: "UpperTolerance",
    label: i18n.t("quality.Qc_UpperTolerance"),
  },
  /*下公差*/
  {
    prop: "LowerTolerance",
    label: i18n.t("quality.Qc_LowerTolerance"),
  },
  /*实测值*/
  {
    prop: "MeasuredValue",
    label: i18n.t("quality.Qc_MeasuredValue"),
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
  },
  // ReasonOfUnqualified
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
    // 零件编号
    prop: "ItemId",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    // 自检工序
    prop: "SelfCheckProcess",
    label: i18n.t("quality.Qc_SelfCheckProcess"),
  },
  {
    // 检验类型
    prop: "ProcessCheckType",
    label: i18n.t("quality.Qc_ProcessCheckType"),
    customFilter: (value, row) => enumFilter(value, ProcessCheckTypeEnum),
    // {
    //   if(!value) return ''
    //   return ProcessCheckTypeEnum?.[value]?.name??value
    // }
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
    // 检验人
    prop: "Operator",
    label: i18n.t("quality.Qc_Operator"),
  },
  {
    // 检验日期
    prop: "OperationDate",
    label: i18n.t("quality.Qc_CheckDate"),
    filter: "date",
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
