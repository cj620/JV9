/*
 * @Author: H.
 * @Date: 2021-12-21 14:03:36
 * @LastEditTime: 2022-01-20 16:27:06
 * @Description:
 */
// 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllNumberRules } from "@/api/basicApi/systemSettings/sysSettings";
class api extends TableAPI {
  // 获取列表
  getData = getAllNumberRules;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 表单配置
      formSchema: formSchema,
      // 行标识
      rowId: "BillKey",
      // 表格标题
      title: i18n.t("menu.Se_CodeRule"),
      // 接口类
      api,
      pagination: false,
      printBar: false,
      searchBar: false,
    });
  }
}
//  表格配置
const tableSchema = [
  {
    prop: "BillKey",
    label: i18n.t("menu.Se_CodeRule"),
  },
  {
    prop: "BillName",
    label: i18n.t("Generality.Ge_DocumentName"),
    custom: true,
  },
  {
    prop: "Prefixstring",
    label: i18n.t("Generality.Ge_PrefixCharacter"),
  },
  {
    prop: "StSpace",
    label: i18n.t("Generality.Ge_FirstSpacer"),
  },
  {
    prop: "DateFormat",
    label: i18n.t("Generality.Ge_DateFormat"),
  },
  {
    prop: "NdSpace",
    label: i18n.t("Generality.Ge_SecondSpacer"),
  },
  {
    prop: "IncrementFormat",
    label: i18n.t("Generality.Ge_SelfIncreasing"),
  },
];
//  搜索表单配置
const formSchema = [];
