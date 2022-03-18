/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-14 13:04:09
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getSalesCustomerList } from "@/api/workApi/sale/customer";
// import BillState from '../../../components/Jv_cpn/JvColBillState'
export class api extends TableAPI {
  getData = getSalesCustomerList;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "CustomerId",
      title: i18n.t("menu.Sa_Customer"),
      api,
      stripe: false,
      // searchBar: false,
    });
  }
}

export const tableConfig = [
  {
    id: "665487545",
    prop: "CustomerId",
    label: i18n.t("sale.Sa_CustomerId") /* 客户编号 */,
    align: "left",
    innerSearch: {
      prop: "keyword",
      cpn: "FormInput",
      label: i18n.t("sale.Sa_CustomerId"),
    },
    show: true,
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "Sa_Customer_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "CustomerId",
      // 补充动态参数
      moreDynamicParameters: [
        {
          keyName: "CustomerId",
          valueName: "CustomerId",
        },
      ],
    },
  },
  {
    id: "665487545",
    prop: "ShortName",
    label: i18n.t("sale.Sa_ShortName") /* 简称 */,
    innerSearch: {
      prop: "keyword",
      cpn: "FormInput",
      label: i18n.t("sale.Sa_ShortName"),
    },
  },
  {
    id: "665487545",
    prop: "FullName",
    label: i18n.t("sale.Sa_FullName") /* 全称 */,
    innerSearch: {
      prop: "keyword",
      cpn: "FormInput",
      label: i18n.t("sale.Sa_FullName "),
    },
  },
  {
    id: "665487545",
    prop: "Address",
    label: i18n.t("sale.Sa_Address") /* 地址 */,
  },
  {
    id: "665487545",
    prop: "Contact",
    label: i18n.t("sale.Sa_Contact") /* 联系人 */,
  },
  {
    id: "665487545",
    prop: "Tel",
    label: i18n.t("setup.Tel") /* 电话 */,
  },
  {
    id: "665487545",
    prop: "Email",
    label: i18n.t("setup.Mail") /* 邮箱 */,
  },
  {
    id: "665487545",
    prop: "Phone",
    label: i18n.t("setup.Phone") /* 手机 */,
  },
  {
    id: "665487545",
    prop: "Tax",
    label: i18n.t("sale.Sa_Tax") /* 税率 */,
    align: "right",
  },
  {
    id: "665487545",
    prop: "Currency",
    label: i18n.t("sale.Sa_Currency") /* 货币 */,
  },
  {
    id: "665487545",
    prop: "Code",
    label: i18n.t("sale.Sa_Code") /* 简码 */,
  },
];
export const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  // {
  //   prop: "keyword",
  //   label: "分类名称",
  // },
];
