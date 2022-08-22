/*
 * @Author: C.
 * @Date: 2021-12-16 13:13:18
 * @LastEditTime: 2022-01-17 10:06:58
 * @Description: file content
 */
// 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {
  my_todo_task,
  my_todo_audit,
} from "@/api/basicApi/systemSettings/user";
//import { i18n } from "element-ui/lib/locale";
import i18n from "@/i18n/i18n.js";
class api extends TableAPI {
  // 获取列表
  getData = my_todo_audit;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 表单配置
      formSchema: formSchema,
      // 行标识
      rowId: "BillId",
      // 打印按钮
      printBar: false,
      // 表格标题
      title: i18n.t("setup.SheetToBeAudited"),
      // 接口类
      api,
      // 打印模块标识
      printMod: "",
    });
  }
}
//  表格配置
const tableSchema = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    custom: true,
  },
  /*单据类型*/
  {
    prop: "BillKey",
    label: i18n.t("Generality.Ge_DocumentType"),
    custom: true,
  },
  /*制单日期*/
  {
    prop: "BillCreationTime",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "150px",
  },
  /*制单人*/
  {
    prop: "BillCreator",
    label: i18n.t("Generality.Ge_Creator"),
    width: "95px",
  },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    width: "120px",
    cpn: "BillStateTags",
  },
];
//  搜索表单配置
const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
];
