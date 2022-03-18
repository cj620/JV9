/*
 * @Author: H.
 * @Date: 2021-12-16 08:39:58
 * @LastEditTime: 2022-01-13 10:27:08
 * @Description:
 */
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-09 09:28:46
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getOutsourcingAccountDetails } from "@/api/workApi/purchase/outsourcingAccount";
export class api extends TableAPI {
  getData = getOutsourcingAccountDetails;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "IdIndex",
      title: "",
      api,
      operationWidth: 110,
      exportBar: false,
      searchBar: false,
      printBar: false,
      operationCol: false,
      settingBar: false,
      // freshBar: false,
      densityBar: false,
      colBar: false,
      height: "400px",
    });
  }
}

export const tableConfig = [
  /*单据编号*/
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_ID"),
  },
  /*客户简称*/
  {
    prop: "SupplierName",
    label: i18n.t("purchase.Pr_SupplierName"),
  },
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*客户简称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*单位*/
  {
    prop: "Unit",
    label: i18n.t("Generality.Ge_Unit"),
    width: "70px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "90px",
    align: "right",
  },
  /*单价*/
  {
    prop: "Price",
    label: i18n.t("Generality.Ge_Price"),
    width: "90px",
    align: "right",
  },
  /*金额*/
  {
    prop: "Amount",
    label: i18n.t("Generality.Ge_Amount"),
    width: "100px",
    align: "right",
  },
  /*税率*/
  {
    prop: "Tax",
    label: i18n.t("sale.Sa_Tax"),
    width: "70px",
    align: "right",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const formSchema = [];
