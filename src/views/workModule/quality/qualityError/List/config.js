/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2022-01-17 10:38:12
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getCheckErr } from "@/api/workApi/quality/checkErr";

export class api extends TableAPI {
  getData = getCheckErr;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Qc_QualityError"),
      api,
      operationWidth: 110,
      printMod: "Qc_QualityError",
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
    custom: true,
  },
  /*日期*/
  {
    prop: "CheckDate",
    label: i18n.t("quality.Qc_CheckDate"),
    filter: "time",
  },

  /*预估损失*/
  {
    prop: "EstimatedLoss",
    label: i18n.t("quality.Qc_EstimatedLoss"),
    width: "130",
    align: "right",
    filter: "amount",
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "140",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];

export const formSchema = [
  {
    prop: "TooolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "FormInput",
  },
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    cpn: "FormInput",
  },
  {
    prop: "CheckResult",
    label: i18n.t("quality.Qc_CheckResult"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "Rework",
          label: i18n.t("quality.Qc_Rework"),
        },
        {
          value: "Scrap",
          label: i18n.t("setup.ReportWork"),
        },
      ],
    },
  },
];
