/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2022-01-12 14:33:44
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllProcess } from "@/api/workApi/production/baseData";

export class api extends TableAPI {
  getData = getAllProcess;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Pr_Process"),
      api,
      operationWidth: 110,
    });
  }
}

export const tableConfig = [
  /*任务工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*工序代号*/
  {
    prop: "ProcessCode",
    label: i18n.t("production.Pr_ProcessCode"),
  },
  /*资源组*/
  {
    prop: "Resource",
    label: i18n.t("menu.Pr_Resources"),
  },
  /*资源组*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
  },
];

export const formSchema = [
  {
    prop: "BillId",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_BillId"),
  },
];
