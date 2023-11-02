/*
 * @Author: H.
 * @Date: 2022-01-06 16:37:17
 * @LastEditTime: 2022-01-14 10:32:29
 * @Description:
 */
import { Table as BaseTable } from "@/jv_doc/class/table";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
      pagination: false,
      sortCol: true,
      chooseCol: true,
      data: [],
      title: "",
      selectType: "radio",
      operationCol: false,
      height: 350,
    });
  }
}
export const tableConfig = [
  /*模板名称*/
  {
    prop: "Template",
    label: i18n.t("Generality.Ge_TemplateName"),
  },
  /*制单人*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
