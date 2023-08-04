/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-03-25 13:20:06
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { table_list } from "@/api/workApi/production/aps";
export class api extends TableAPI {
  getData = table_list;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema,
      // 行标识
      rowId: "Id",
      // 数据
      api,
      // 表格标题
      // title: i18n.t("production.Pr_ConventionalAlgorithm"),
      // 打印模块标识（需更改）
      printMod: "Pr_ConventionalAlgorithm",
      operationCol: false,
      sortCol: false,
      chooseCol: false,
      height: 675,
    });
  }
}
//  表格配置
export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "120px",
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    // width: "90px",
  },
  /*工序*/
  {
    prop: "ProcessName",
    label: i18n.t("Generality.Ge_Process"),
    // width: "110px",
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
  },
  /*计划资源*/
  {
    prop: "ResourceGroup",
    label: i18n.t("Generality.Ge_Resource"),
    // width: "95px",
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    // width: "150px",
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    // width: "150px",
  },
];
// 表单配置
export const formSchema = [
  //单号搜索
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "FormInput",
  },
];
