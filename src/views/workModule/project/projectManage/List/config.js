/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-04-06 17:45:43
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 获取列表接口
import {
  getProjectBillList,
  getPartById,
} from "@/api/workApi/project/projectManage";
// 获取用户接口
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
// 删除单据接口
// import { deleteSalesBill } from "@/api/workApi/sale/order";

import { WorkRecordsStateEnum } from "@/enum/workModule";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import {
  getProjectQuery,
} from "@/api/workApi/project/projectManage";
export class api extends TableAPI {
  // 获取列表
  getData = getProjectBillList;
  // 删除单据
  // del = deleteSalesBill;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Pm_ProjectManagement"),
      importBar: true,
      printMod: "Pm_ProjectManagement",
      fullScreenBar: true,
      // 序号列
      sortCol: false,
      // 选择列
      chooseCol: false,
      // operationCol:false,
      'default-expand-all':true,
      api,
      lazy: true,
      load: (tree, treeNode, resolve) => {
        console.log(tree, treeNode);
        getPartById({ ToolingNo: tree.Id }).then((res) => {
          resolve(res);
        });
      },
    });
  }
}
//  表格配置
export const tableConfig = [
  // 编号
  {
    prop: "Id",
    label: i18n.t("Generality.Ge_ID"),
    width: "180px",
  },
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    custom: true,
    width: "85px",
  },
  /*名称*/
  {
    prop: "Name",
    label: i18n.t("Generality.Ge_ItemName"),
    // custom:true,
    width: "150px",
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
    width: "150px",
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "90px",
    align: "right",
    filter: "amount",
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    width: "120px",
    custom: true,
  },
  /*计划交期*/
  {
    prop: "PlanDueDate",
    label: i18n.t("Generality.Ge_DeliveryDate"),
    width: "130px",
    filter: "date",
  },
  /*动态*/
  {
    prop: "Trend",
    label: i18n.t("Generality.Ge_Dynamic"),
    width: "140px",
    showOverflowTooltip: true,
    customFilter: (value, row) => {
      if (value && row.Flag == 2) {
        let target = value.split("-").pop();
        return value.replace(target, WorkRecordsStateEnum[target].name);
      }
      return "";
    },
  },
  /*加工进度*/
  {
    prop: "Progress",
    label: i18n.t("project.Pro_ProcessingProgress"),
    custom: true,
    sortable:true,
    sortBy(row,index){ return row.Progress; }
  },
];
// 表单配置
export const formSchema = [
  //单号搜索
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  //单号搜索
  {
    prop: "Project",
    label: i18n.t("sale.Sa_ProjectId"),
    cpn: "AsyncSearch",
      api: getProjectQuery,
      apiOptions: {
        keyName: "Project",
        valueName: "Project",
      },
  },
  //模号搜索 Ge_ToolingName
  {
    prop: "MoldId",
    label: i18n.t("Generality.Ge_ToolingNo")+'  /  '+ i18n.t("Generality.Ge_ToolingName"),
    cpn: "AsyncSearch",
      api: itemList,
      apiOptions: {
        keyName: "ItemName",
        showValue:true,
        valueName: "ItemId",
        params:{
          ItemCategory:'Tooling'
        }
      },
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
    prop: "StartDate",
    label: i18n.t("Generality.Ge_DeliveryDate")+' '+ i18n.t("Generality.Ge_StartTime"),
    cpn: "SingleTime"
  },
  {
    prop: "EndDate",
    label: i18n.t("Generality.Ge_DeliveryDate")+' '+ i18n.t("Generality.Ge_EndTime"),
    cpn: "SingleTime"
  },

];
