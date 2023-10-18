/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2022-01-12 14:29:32
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getCheckRecord } from "@/api/workApi/quality/checkRecord";
import { enumFilter } from '~/utils/system/enumsPlugin'
import { CheckResulteEnum, ProcessCheckTypeEnum, ProcessingResult } from '@/enum/workModule'

export class api extends TableAPI {
  getData = getCheckRecord;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Qc_QualityRecord"),
      api,
      printMod: "Qc_QualityRecord",
      searchBar: false,
      operationWidth: 210,
    });
  }
}

export const tableConfig = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    custom: true,
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
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    align: "right",
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*部门*/
  {
    prop: "Department",
    label: i18n.t("menu.Se_Department"),
    width: "120",
  },
  /*作业员*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
  /*检验结果*/
  {
    prop: "CheckResult",
    label: i18n.t("quality.Qc_CheckResult"),
    width: "120",
    customFilter: (value) => enumFilter(value, ProcessingResult),
  },
  /*检验结果*/
  {
    prop: "CheckState",
    label: '检验状态',
    width: "120",
    customFilter: (value) => enumFilter(value, CheckResulteEnum),
  },
  /*日期*/
  {
    prop: "CheckDate",
    label: i18n.t("quality.Qc_CheckDate"),
    filter: "time",
  },
  // 任务单号
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    custom: true,
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];

export const formSchema = [];
