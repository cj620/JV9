/*
 * @Author: H.
 * @Date: 2021-11-16 11:19:19
 * @LastEditTime: 2022-03-25 13:31:53
 * @Description:采购入库配置文件
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { API } from "@/api/workApi/purchase/stockIn";

export class api extends TableAPI {
  getData = API.api_list;
  del = API.api_delete;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Pu_StockIn"),
      api,
      operationWidth: 160,
      printMod: "Pu_StockIn",
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
      routeName: "Pu_StockIn_Detail",
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
    cpn: "BillStateTags",
    width: "120px",
  },
  /*供应商简称*/
  {
    prop: "SupplierName",
    label: i18n.t("purchase.Pr_SupplierName"),
  },
  /*仓库*/
  {
    prop: "Stockroom",
    label: i18n.t("menu.St_Stockroom"),
    width: "95px",
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
  /*审核人*/
  {
    prop: "Audit",
    label: i18n.t("Generality.Ge_Auditor"),
  },
  // 审核日期
  {
    prop: "AuditDate",
    label: "审核日期",
    filter: "time",
    width: "150px",
  },
  /*合计数量*/
  {
    prop: "TotalQuantity",
    label: i18n.t("Generality.Ge_TotalQuantity"),
    width: "95px",
  },
  /*合计金额*/
  {
    prop: "TotalPrice",
    label: i18n.t("Generality.Ge_TotalPrice"),
    width: "95px",
  },
  /*退货数量*/
  {
    prop: "ReturnQuantity",
    label: i18n.t("Generality.Ge_ReturnQuantity"),
    width: "95px",
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    width: "95px",
  },
];

export const formSchema = [
  {
    prop: "BillId",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_BillId"),
  },
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "Unsubmitted",
          label: i18n.t("Generality.Ge_UnSubmitted"),
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
