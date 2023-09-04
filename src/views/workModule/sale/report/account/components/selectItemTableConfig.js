/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-07 10:37:17
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { listDeliveryAndReturnItem } from "@/api/workApi/sale/account";

export class api extends TableAPI {
  getData = listDeliveryAndReturnItem;
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
      searchBar: true,
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
    align: "center",

    innerSearch: {
      prop: "Keyword",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_ID"),
    },
  },
  /*客户简称*/
  {
    prop: "CustomerName",
    label: i18n.t("sale.Sa_CustomerName"),
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
export const formSchema = [
  /*  {
    prop: "BillId",
    label: "部搜索",
  },
  {
    prop: "CustomerName",
    label: "部搜索",
  },
  {
    prop: "DateType",
    label: "部搜索",
  },
  {
    prop: "IsCheck",
    label: "部搜索",
  },
  {
    prop: "StartDate",
    label: "部搜索",
  },
  {
    prop: "EndDate",
    label: "部搜索",
  }*/
];
