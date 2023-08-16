/*
 * @Author: H.
 * @Date: 2021-12-06 08:48:54
 * @LastEditTime: 2022-01-18 15:11:51
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getStockRecord } from "@/api/workApi/stockroom/stockSummary";
import { itemList } from '@/api/basicApi/systemSettings/Item'
import { getStockroomList } from '@/api/workApi/stockroom/stockroomInfo'

export class api extends TableAPI {
  getData = getStockRecord;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.St_StockSummary"),
      api,
      operationCol: false,
      printMod: "stockSummary",
    });
  }
}

export const tableConfig = [
  // 物料编号
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
    align: "center",
    cpn: "Link",
    cpnProps: {
      routeName: "Se_Item_Detail",
      methods: "query",
      parameterKey: "ItemId",
      moreDynamicParameters: [
        {
          keyName: "ItemId",
          valueName: "ItemId",
        },
      ],
    },
  },
  /*记账日期*/
  {
    prop: "AccountedDate",
    label: i18n.t("Generality.Ge_AccountingDate"),
    filter: "date",
  },
  /*记账类别*/
  {
    prop: "AccountedType",
    label: i18n.t("Generality.Ge_AccountingCategory"),
    custom: true,
  },
  /*借方数量*/
  {
    prop: "DebitQuantity",
    label: i18n.t("Generality.Ge_DebitsQuantity"),
    align: "right",
  },
  /*借方金额*/
  {
    prop: "DebitAmount",
    label: i18n.t("Generality.Ge_DebitAmount"),
    align: "right",
    filter: "amount",
  },
  /*贷方数量*/
  {
    prop: "CreditQuantity",
    label: i18n.t("Generality.Ge_CreditsQuantity"),
    align: "right",
  },
  /*贷方金额*/
  {
    prop: "CreditAmount",
    label: i18n.t("Generality.Ge_CreditsAmount"),
    align: "right",
    filter: "amount",
  },
  /*仓库*/
  {
    prop: "Stockroom",
    label: i18n.t("setup.Stockroom"),
  },
  /*单据编号*/
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
  },
  /*摘要*/
  {
    prop: "Summary",
    label: i18n.t("Generality.Ge_Summary"),
  },
  /*物料来源*/
  {
    prop: "ItemSource",
    label: i18n.t("Generality.Ge_ItemsSource"),
  },
  {
    prop: "AuxiliaryQty",
    label: i18n.t("Generality.Ge_AuxiliaryQty"),
    align: "right",
    filter: "amount",
  },
  {
    prop: "AuxiliaryPrice",
    label: i18n.t("Generality.Ge_AuxiliaryPrice"),
    align: "right",
    filter: "amount",
  },
];

export const formSchema = [
  //模号搜索 Ge_ToolingName
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ItemId"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      showValue:true,
      valueName: "ItemId",
    },
  },
  {
    // 仓库
    prop: 'Stockroom',
    cpn: "SyncSelect",
    label: i18n.t("setup.Stockroom"),
    api: getStockroomList,
    apiOptions: {
      immediate: true,
      keyName: "Stockroom",
      valueName: "Stockroom"
    },
  },
];
