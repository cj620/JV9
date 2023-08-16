/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-04-27 12:24:54
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";

import { API } from "@/api/workApi/stockroom/returnPicking";
import { itemList } from "@/api/basicApi/systemSettings/Item";

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
      title: i18n.t("menu.St_ReturnPicking"),
      api,
      operationWidth: 150,
      printMod: "St_ReturnPicking",
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
      routeName: "St_ReturnPicking_Details",
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
  /*提交人*/
  {
    prop: "Submitter",
    label: i18n.t("stockroom.St_Submitter"),
  },
  /*部门*/
  {
    prop: "Department",
    label: i18n.t("Generality.Ge_Department"),
  },
  /*仓库*/
  {
    prop: "Stockroom",
    label: i18n.t("setup.Stockroom"),
    width: "105px",
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
  //模号搜索 Ge_ToolingName
  {
    prop: "ToolingNo",
    label:
      i18n.t("Generality.Ge_ToolingNo") +
      "  /  " +
      i18n.t("Generality.Ge_ToolingName"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      showValue: true,
      valueName: "ItemId",
      params: {
        ItemCategory: "Tooling",
      },
    },
  },
];
