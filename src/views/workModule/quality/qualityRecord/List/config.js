/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2022-01-12 14:29:32
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getCheckRecord } from "@/api/workApi/quality/checkRecord";
import {enumFilter, enumToList} from '~/utils/system/enumsPlugin'
import { CheckResulteEnum, ProcessCheckTypeEnum, ProcessingResult } from '@/enum/workModule'
import {itemList} from "@/api/basicApi/systemSettings/Item";
import {getAllUserData} from "@/api/basicApi/systemSettings/user";

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
      // searchBar: false,
      operationWidth: 240,
    });
  }
}

export const tableConfig = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    custom: true,
    width: "130px",
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    width: "130px",
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
    width: "130px",
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
  /*检验状态*/
  {
    prop: "CheckState",
    label: i18n.t("quality.Qc_CheckState"),
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
    width: "130px",
    custom: true,
  },
  {
    prop: "QcRelationBillId",
    label: i18n.t("quality.Qc_QualityCheckBillId"),
    width: "130px",
    custom: true,
  },
  {
    prop: "BillKey",
    label: i18n.t("quality.Qc_QualityCheckType"),
    width: "115px",
    custom: true,
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];

export const formSchema = [
  //模具搜索
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      valueName: "ItemId",
      params:{
        ItemCategory:'Tooling'
      }
    },
  },
  //零件编号
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    cpn: "FormInput",
  },
  // 检验人
  {
    prop: "Worker",
    label: i18n.t("quality.Qc_Operator"),
    cpn: "SyncSelect",
    api: getAllUserData,
    apiOptions: {
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  // 检测状态
  {
    prop: "CheckState",
    label: i18n.t("quality.Qc_CheckState"),
    cpn: "FormSelect",
    type: "multiple",
    options: {
      list: enumToList(CheckResulteEnum).slice(0,4),
    },
  },
  // // 检测结果
  // {
  //   prop: "ProcessingResult",
  //   label: i18n.t("quality.Qc_CheckResult"),
  //   cpn: "FormSelect",
  //   type: "multiple",
  //   options: {
  //     list: enumToList(ProcessingResult),
  //   },
  // },
  // 开始时间
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartTime"),
    cpn: "SingleTime"
  },
  // 结束时间
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndTime"),
    cpn: "SingleTime"
  },
];
