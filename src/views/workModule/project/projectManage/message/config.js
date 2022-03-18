/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-03-02 17:12:03
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 获取列表接口
import {
  get_basic_info_list,
  projectDelete,
  saveProjectInfo
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
  getData = get_basic_info_list;
  // 删除单据
  del = projectDelete;
  // 保存单据
  save=saveProjectInfo
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("project.Pro_projectMsgManager"),
      importBar: true,
      printMod: "sales",
      fullScreenBar: true,
      // 'default-expand-all':true,
      // 序号列
      sortCol: false,
      // 选择列
      chooseCol: false,
      printBar:false,
      treeProps: { children: "null", hasChildren: "null" },
      api,
    });
  }
}
//  表格配置
export const tableConfig = [
  // 编号
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
  },
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
];
// 表单配置
export const formSchema = [
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
  }

];
