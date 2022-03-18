/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2022-01-06 13:33:38
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllProjectProcess } from "@/api/workApi/project/baseData";

export class api extends TableAPI {
  getData = getAllProjectProcess;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Pm_Process"),
      api,
      operationWidth: 110,
      sortCol: false,
    });
  }
}

export const tableConfig = [
  /*任务工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*序号*/
  {
    prop: "SortOrder",
    label: i18n.t("production.Pr_SortOrder"),
  },
  /*标准费率*/
  {
    prop: "CostRate",
    label: i18n.t("production.Pr_CostRate"),
    align: "right",
  },
  /*开始比例*/
  {
    prop: "StartScale",
    label: i18n.t("production.Pr_StartScale"),
    align: "right",
  },
  /*结束比例*/
  {
    prop: "EndScale",
    label: i18n.t("production.Pr_EndScale"),
    align: "right",
  },
  /*工序类别*/
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    custom: true,
  },
];

export const formSchema = [
  {
    prop: "Process",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_BillId"),
  },
];
