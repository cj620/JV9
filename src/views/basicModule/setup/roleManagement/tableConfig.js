/*
 * @Author: H.
 * @Date: 2021-11-22 10:37:06
 * @LastEditTime: 2022-08-10 17:32:32
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "PermissionId",
      title: i18n.t("menu.Se_Role"),
      stripe: false,
      chooseCol: false,
      border: true,
      defaultExpandAll: false,
      operationCol: false,
      pagination: false,
      freshBar: false,
      printBar: false,
      searchBar: false,
    });
  }
}

export const tableConfig = [
  {
    id: "665487545",
    prop: "BillKey",
    label: i18n.t("Generality.Ge_Menu"),
    fixed: false,
    align: "left",
    filter: "default",
    show: true,
  },
  {
    id: "665487545",
    prop: "PermissionValue",
    label: i18n.t("Generality.Ge_Authority"),
    fixed: false,
    align: "left",
    filter: "default",
    custom: true,
    width: "400",
  },
];
export const formSchema = [
  {
    prop: "BillKey",
    label: i18n.t("Generality.Ge_DepartmentSearch"),
    cpn: "FormInput",
    hidden: true,
  },
];
