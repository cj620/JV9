/*
 * @Author: H.
 * @Date: 2021-11-17 13:01:43
 * @LastEditTime: 2021-12-29 16:24:21
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { API } from "@/api/workApi/purchase/outsourcingAccount";
export class api extends TableAPI {
  getData = API.api_list;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Pu_OutsourcingAccount"),
      api,
      operationWidth: 110,
      printMod: "Pu_OutsourcingAccount",
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
      routeName: "Pu_OutsourcingAccount_Detail",
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
  },
  /*开始交期*/
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    filter: "date",
  },
  /*结束交期*/
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_EndDate"),
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
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];

export const formSchema = [
  {
    prop: "BillId",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_BillId"),
  },
];
