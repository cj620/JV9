/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-21 09:02:52
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAll } from "@/api/basicApi/systemSettings/currency";
// import BillState from '../../../components/Jv_cpn/JvColBillState'

export class api extends TableAPI {
  getData = getAll;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Currency",
      title: i18n.t("menu.Se_Currency"),
      api,
      pagination: true,
      searchBar: false,
    });
  }
}

export const tableConfig = [
  {
    id: "665487545",
    prop: "Currency",

    label: i18n.t("Generality.Ge_Currency") /* 货币 */,
    align: "left",
  },
  {
    id: "665487545",
    prop: "ExchangeRate",
    label: i18n.t("Generality.Ge_ExchangeRate") /* 汇率 */,
    align: "left",
  },
  {
    id: "665487545",
    prop: "LocalCurrency",
    custom: true,
    label: i18n.t("Generality.Ge_LocalCurrency") /* 本币 */,
  },
];
export const formSchema = [];
