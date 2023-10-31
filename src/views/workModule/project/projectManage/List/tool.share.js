/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-03-01 16:17:40
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
  getData = itemList;
  // 删除单据
  // del = deleteSalesBill;
}
export class ToolTable extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema:formSchema,
      rowId: "Id",
      title: '',
      importBar: false,
      printMod: "tooling-share",
      fullScreenBar: false,
      // 序号列
      sortCol: true,
      // 选择列
      chooseCol: false,
      height:'400px',
      api,
      // operationCol:false,
      printBar:false
    });
  }
}
//  表格配置
export const tableConfig = [
  // 编号
  {
    prop: "ItemId",
    label: i18n.t("Generality.Ge_ID"),
    // width: "180px",
  },
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    custom: true,
    width: "85px",
  },
  /*名称*/
  {
    prop: "ItemName",
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
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    width: "120px",
    custom: true,
  },
];

const formSchema=[
  {
    prop: "ItemCategory",
    label: '',
    hidden:true,
    default:'Tooling'
  },
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  }
]
