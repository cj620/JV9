/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-07 10:31:53
 * @Description: file content
 */
import { Table as BaseTable } from "@/jv_doc/class/table";

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "IdIndex",

      tableHeaderShow: false,
      height: "400",
      exportBar: false,
      searchBar: false,
      stripe: false,
      operationCol: false,
      sortCol: false,
      pagination: false,
    });
  }
}

export const tableConfig = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    align: "center",
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
];
export const formSchema = [];
