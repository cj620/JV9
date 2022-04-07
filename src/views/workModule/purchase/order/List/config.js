/*
 * @Author: H.
 * @Date: 2021-11-10 09:01:19
 * @LastEditTime: 2022-04-07 17:27:19
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// import { getPurchaseOrderList } from "@/api/workApi/purchase/order";
import { API } from "@/api/workApi/purchase/order";
import {
  getAllSupplier,
} from "@/api/workApi/purchase/supplier";
export class api extends TableAPI {
  getData = API.api_list;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Pu_Order"),
      api,
      operationWidth: 110,
      printMod: "Pu_Order",
    });
  }
}

export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",

    innerSearch: {
      prop: "BillId",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_BillId"),
    },
    cpnProps: {
      routeName: "Pu_Order_Detail",
      methods: "query",
      parameterKey: "BillId",
      moreDynamicParameters: [
        {
          keyName: "ItemId",
          valueName: "ItemId",
        },
      ],
    },
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
    width: "120px",
  },
  /*供应商id*/
  {
    prop: "SupplierId",
    label: i18n.t("purchase.Pr_SupplierId"),
  },
  /*供应商简称*/
  {
    prop: "SupplierName",
    label: i18n.t("purchase.Pr_SupplierName"),
    innerSearch:{
      prop: "SupplierName",
      label: i18n.t("purchase.Pr_SupplierName"),
      cpn: "SyncSelect",
      api: getAllSupplier,
      apiOptions: {
        keyName: "ShortName",
        valueName: "ShortName"
      }
    }
  },
  /*计划交期*/
  {
    prop: "DeliveryDate",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    filter: "date",
  },
  /*币种*/
  {
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),
    width: "95px",
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
    width: "95px",
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "150px",
  },
];

export const formSchema = [
  {
    prop: "BillId",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_BillId"),
  },
    //供应商搜索
    {
      prop: "SupplierName",
      label: i18n.t("purchase.Pr_SupplierName"),
      cpn: "SyncSelect",
      api: getAllSupplier,
      apiOptions: {
        keyName: "ShortName",
        valueName: "ShortName"
      }
    },
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "Unsubmitted",
          label: i18n.t("Generality.Ge_Unsubmitted"),
        },
        {
          value: "Submitted",
          label: i18n.t("Generality.Ge_Submitted"),
        },
        {
          value: "Approving",
          label: i18n.t("Generality.Ge_Approving"),
        },
        {
          value: "Approved",
          label: i18n.t("Generality.Ge_Approved"),
        },
        {
          value: "Rejected",
          label: i18n.t("Generality.Ge_Rejected"),
        },
        {
          value: "Completed",
          label: i18n.t("Generality.Ge_Completed"),
        },
        {
          value: "Discarded",
          label: i18n.t("Generality.Ge_Discarded"),
        },
      ],
    },
  },
];
