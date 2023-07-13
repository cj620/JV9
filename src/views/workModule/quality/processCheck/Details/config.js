import { Table as BaseTable } from "@/jv_doc/class/table";
import {
  ProcessingResult,
  enumToList,
  ProcessCheckTypeEnum,
  reasonForFailureEnum,
  enumFilter,
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
    label: "序号",
  },
  /*理论值*/
  {
    prop: "TheoreticalValue",
    label: "理论值",
  },
  /*上公差*/
  {
    prop: "UpperTolerance",
    label: "上公差",
  },
  /*下公差*/
  {
    prop: "LowerTolerance",
    label: "下公差",
  },
  /*实测值*/
  {
    prop: "MeasuredValue",
    label: "实测值",
  },
  /*状态*/
  {
    prop: "State",
    label: "状态",
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
    label: "加工单",
    custom: true,
  },
  {
    // 零件编号
    prop: "ItemId",
    label: "零件编号",
  },
  {
    // 自检工序
    prop: "SelfCheckProcess",
    label: "自检工序",
  },
  {
    // 检验类型
    prop: "ProcessCheckType",
    label: "检验类型",
    customFilter: (value, row) => enumFilter(value, ProcessCheckTypeEnum),
    // {
    //   if(!value) return ''
    //   return ProcessCheckTypeEnum?.[value]?.name??value
    // }
  },
  {
    // 检测结果
    prop: "ProcessingResult",
    label: "检测结果",
    customFilter: (value, row) => enumFilter(value, ProcessingResult),
    // {

    //   if(!value) return ''
    //   return ProcessingResult?.[value]?.name??value
    // }
  },
  {
    // 检验人
    prop: "Operator",
    label: "检验人",
  },
  {
    // 检验日期
    prop: "OperationDate",
    label: "检验日期",
    filter: "date",
  },
  {
    // 负责人
    prop: "PersonInCharge",
    label: "负责人",
  },
  {
    prop: "AbnormalCause",
    label: "不合格原因",
  },
  {
    prop: "SubmittedForInspectionQty",
    label: "送检数量",
  },
  {
    prop: "InspectionQty",
    label: "检验数量",
  },
  {
    prop: "UnqualifiedQty",
    label: "不合格数量",
  },
  {
    prop: "AssociatedNo",
    label: "关联编号",
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
    label: "备注",
  },
];
