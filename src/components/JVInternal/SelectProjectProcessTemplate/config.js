/*
 * @Author: H.
 * @Date: 2022-01-06 16:37:17
 * @LastEditTime: 2022-01-14 10:32:29
 * @Description:
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
import { enumFilter } from "~/utils/system/enumsPlugin";
import { processTypeEnum } from "@/enum/workModule";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      data: [],
      title: "",
      rowId: "Id",
      height: 350,
      searchBar: false,
      chooseCol: false,
      pagination: false,
      operationCol: false,
      tableHeaderShow: false,
    });
  }
}
export const tableConfig = [
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*工序类型*/
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    customFilter: (value) => enumFilter(value, processTypeEnum),
  },
  /*工作内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
  },
  /*部门*/
  {
    prop: "BelongingDepartment",
    label: i18n.t("menu.Se_Department"),
  },
  /*开始比例*/
  {
    prop: 'StartScale',
    label: i18n.t("production.Pr_StartScale"),
  },
  /*结束比例*/
  {
    prop: "EndScale",
    label: i18n.t("production.Pr_EndScale"),
  },
  /*标准费率*/
  {
    prop: "CostRate",
    label: i18n.t("production.Pr_CostRate"),
  }
];
