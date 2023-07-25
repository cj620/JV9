/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-03-25 13:20:23
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { API as delivery } from "@/api/workApi/sale/delivery";
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
export class api extends TableAPI {
  getData = delivery.api_list;
  del = delivery.api_delete;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Sa_SaleDelivery"),
      api,
      operationWidth: 150,
      // 打印模块标识
      printMod: "Sa_SaleDelivery",
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
      routeName: "Sa_SaleDelivery_Detail",
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
    cpn: "BillStateTags",
    width: "115px",
  },
  /*客户简称*/
  {
    prop: "CustomerName",
    label: i18n.t("sale.Sa_CustomerName"),
    innerSearch: {
      prop: "CustomerName",
      cpn: "SyncSelect",
      api: getAllSalesCustomer,
      label: i18n.t("Generality.Ge_ItemType"),
      apiOptions: {
        immediate: true,
        keyName: "ShortName",
        valueName: "ShortName",
      },
    },
  },
  /*出货日期*/
  {
    prop: "OutDate",
    label: i18n.t("sale.Sa_OutDate"),
    filter: "date",
    width: "115px",
  },
  /*币种*/
  {
    prop: "Currency",
    label: i18n.t("Generality.Ge_Currency"),
    width: "95px",
  },
  /*销售员*/
  {
    prop: "SalesReps",
    label: i18n.t("sale.Sa_SalesReps"),
    width: "110px",
  },
  /*仓库*/
  {
    prop: "Stockroom",
    label: i18n.t("setup.Stockroom"),
    width: "115px",
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
    width: "150px",
  },
];
export const formSchema = [
  //单号搜索
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "FormInput",
  },
  //客户搜索
  {
    prop: "CustomerName",
    label: i18n.t("sale.Sa_CustomerName"),
    cpn: "SyncSelect",
    api: getAllSalesCustomer,
    apiOptions: {
      keyName: "ShortName",
      valueName: "ShortName",
    },
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
