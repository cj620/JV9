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
  {
    prop: "ItemId",
    label: "物料编号",
  },

  {
    prop: "ItemName",
    label: "名称",
  },

  {
    prop: "Description",
    label: "描述",
  },

  {
    prop: "Quantity",
    label: "数量",
  },
  /*状态*/
  {
    prop: "State",
    label: "状态",
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
    label: "加工单",
  },
  {
    // 返工工序
    prop: "ReworkProcess",
    label: "返工工序",
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
    // 负责人
    prop: "PersonInCharge",
    label: "负责人",
  },
  {
    prop: "AbnormalCause",
    label: "不合格原因",
  },
  {
    prop: "Analyst",
    label: "不合格原因分析人	",
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
    label: "备注",
  },
];
