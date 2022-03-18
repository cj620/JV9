/*
 * @Author: H.
 * @Date: 2021-12-09 13:30:30
 * @LastEditTime: 2022-01-12 14:44:57
 * @Description:
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getPurchaseStockinAndReturnItem } from "@/api/workApi/purchase/account";

export class api extends TableAPI {
  getData = getPurchaseStockinAndReturnItem;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "IdIndex",
      api,
      tableHeaderShow: false,
      height: "400",
      exportBar: false,
      searchBar: false,
      stripe: false,
      operationCol: false,
      sortCol: false,
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
  /*物料编号*/
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
  },
  /*物料名称*/
  {
    prop: "ItemName",
    label: i18n.t("Generality.Ge_ItemName"),
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
  /*单据类型*/
  {
    prop: "BillType",
    label: i18n.t("Generality.Ge_DocumentType"),
    custom: true,
  },
];

export const formSchema = [];
