/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2022-03-24 09:57:09
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllProjectProcess } from "@/api/workApi/project/baseData";
import {enumFilter, enumToList} from "~/utils/system/enumsPlugin";
import { processTypeEnum } from "@/enum/workModule";

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
      searchBar: false,
      pagination: false,
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
  /*工序内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_ProcessInfo"),
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
  /*部门*/
  {
    prop: "BelongingDepartment",
    label: i18n.t("menu.Se_Department"),
  },
  /*工序类别*/
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    customFilter: (value) => enumFilter(value, processTypeEnum),
  },
];

export const formSchema = [
  {
    prop: "ProcessType",
    cpn: "FormSelect",
    label: i18n.t("production.Pr_ProcessType"),
    options: {
      list: enumToList(processTypeEnum),
    },
  }
];
