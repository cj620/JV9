/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-12-29 16:37:31
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { API } from "@/api/workApi/purchase/return";
import { getAllSupplier } from "@/api/workApi/purchase/supplier";
export class api extends TableAPI {
  getData = API.api_list;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Pu_Return"),
      api,
      operationWidth: 110,
      printMod: "Pu_Return",
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
      // 路由名称
      routeName: "Pu_Return_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
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
    width: "115px",
  },
  /*供应商简称*/
  {
    prop: "SupplierName",
    label: i18n.t("purchase.Pr_SupplierName"),
    innerSearch: {
      prop: "SupplierName",
      cpn: "SyncSelect",
      api: getAllSupplier,
      label: i18n.t("Generality.Ge_ItemType"),
      apiOptions: {
        immediate: true,
        keyName: "ShortName",
        valueName: "ShortName",
      },
    },
  },
  /*币种*/
  {
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),
    width: "95px",
  },
  /*仓库*/
  {
    prop: "Stockroom",
    label: i18n.t("setup.Stockroom"),
    width: "110px",
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
    width: "95px",
  },
];
export const formSchema = [
  //单号搜索
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "FormInput",
  },
  //供应商搜索
  {
    prop: "SupplierName",
    label: i18n.t("purchase.Pr_SupplierName"),
    cpn: "SyncSelect",
    api: getAllSupplier,
    apiOptions: {
      keyName: "ShortName",
      valueName: "ShortName",
    },
  },
];
