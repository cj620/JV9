/*
 * @Author: your name
 * @Date: 2021-11-12 15:34:15
 * @LastEditTime: 2022-03-25 13:46:28
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \JvMmsV9Front\src\views\workModule\stockroom\otherIn\List\config.js
 */
/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2021-11-09 09:28:46
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";

import { API } from "@/api/workApi/stockroom/stockInit";
let { api_list, api_delete } = API;
export class api extends TableAPI {
  getData = api_list;
  // 删除单据
  del = api_delete;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.St_StockInit"),
      api,
      // 操作列宽度
      operationWidth: 160,
      printMod: "St_StockInit",
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
      routeName: "St_StockInit_Details",
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
  /*仓库*/
  {
    prop: "Stockroom",
    label: i18n.t("setup.Stockroom"),
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
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
