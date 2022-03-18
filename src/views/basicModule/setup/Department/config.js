/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-14 10:52:59
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
// import BillState from '../../../components/Jv_cpn/JvColBillState'

export class api extends TableAPI {
  getData = getDepartmentList;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Department",
      title: "",
      api,
      stripe: false,
      border: false,
    });
  }
}

export const tableConfig = [
  {
    id: "665487545",
    prop: "Department",
    label: i18n.t("Generality.Ge_Department"),
    fixed: false,
    align: "left",
    filter: "default",
    show: true,
  },
];
export const formSchema = [
  {
    prop: "Department",
    label: i18n.t("Generality.Ge_DepartmentSearch"),
    cpn: "FormInput",
    hidden: true,
  },
];
