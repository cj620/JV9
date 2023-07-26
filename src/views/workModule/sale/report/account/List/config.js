/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-03-25 13:27:02
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
/*import { getSalesAccountList } from "@/api/workApi/sale/account";*/
import { API as account } from "@/api/workApi/sale/account";
// 获取客户接口
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
export class api extends TableAPI {
  getData = account.api_list;
  del = account.api_delete;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Sa_Account"),
      api,
      operationWidth: 110,
      printMod: "Sa_Account",
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
      routeName: "Sa_AccountChecking_Detail",
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
  /*开始日期*/
  {
    prop: "StartDate",
    label: i18n.t("Generality.Ge_StartDate"),
    filter: "date",
  },
  /*结束日期*/
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
  /*发票号*/
  {
    prop: "ReceiptNumber",
    label: i18n.t("sale.Sa_ReceiptNumber"),
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
