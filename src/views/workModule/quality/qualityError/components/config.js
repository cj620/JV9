/*
 * @Author: H.
 * @Date: 2021-12-10 10:45:16
 * @LastEditTime: 2022-01-14 15:17:07
 * @Description:
 */
// 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { productionTaskList } from "@/api/workApi/production/productionTask";
class api extends TableAPI {
  // 获取列表
  getData = productionTaskList;
  // 删除单据
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
      // 表格标题
      title: "",
      height: 500,
      // 接口类
      api,
      operationCol: false,
      printBar: false,
      importBar: false,
      searchBar: false,
      pagination: true,
      tableHeaderShow: false,
      freshBar: false,
      settingBar: false,
      colBar: false,
      exportBar: false,
    });
  }
}
//  表格配置
const tableSchema = [
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  {
    // 零件编号
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    // 零件名称
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },

  {
    // 作业员
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },

  {
    // 数量
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
];
//  搜索表单配置
const formSchema = [];
