/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-02 10:25:05
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { StockPickingItemList } from "@/api/workApi/stockroom/picking";


export class api extends TableAPI {
  getData = StockPickingItemList;
}

export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "IdIndex",
      api,
      tableHeaderShow:false,
      height:'400',
      exportBar:false,
      searchBar:true,
      stripe:false,
      operationCol:false,
      sortCol:false,
    });
  }
}

export const tableConfig = [
  /*单据编号*/
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_ID"),
    align: "center",



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
    width:'70px',
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width:'90px',
    align:'right',
  },

  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },

];
export const formSchema = [

];
