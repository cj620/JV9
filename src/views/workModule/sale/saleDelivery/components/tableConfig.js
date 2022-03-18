/*
 * @Author: H.
 * @Date: 2021-12-16 08:39:58
 * @LastEditTime: 2022-01-11 15:55:29
 * @Description:
 */
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-09 09:28:46
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getSaleOrderDetails } from "@/api/workApi/sale/order";
export class api extends TableAPI {
  getData = getSaleOrderDetails;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: "",
      api,
      operationWidth: 110,
      exportBar: false,
      searchBar: false,
      printBar: false,
      operationCol: false,
      settingBar: false,
      height: 500,
    });
  }
}

export const tableConfig = [
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
  },
  /*客户简称*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*出货日期*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
  },
  /*币种*/
  {
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),
    width: "95px",
  },
  /*销售员*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },

  /*制单日期*/
  {
    prop: "Price",
    label: i18n.t("Generality.Ge_Price"),
  },
  /*制单日期*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
  },
  /*制单日期*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
  /*制单日期*/
  {
    prop: "ItemType",
    label: i18n.t("project.Pro_ItemType"),
  },
];
export const formSchema = [];

