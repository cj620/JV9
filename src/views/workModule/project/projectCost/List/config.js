/*
 * @Author: C.
 * @Date: 2021-12-21 10:00:26
 * @LastEditTime: 2022-01-14 10:49:05
 * @Description: file content
 */
// 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {
  project_cost_list,
  project_cost_chart,
} from "@/api/workApi/project/dataReport";
import { projectTypeEnum } from "@/enum/workModule";
class api extends TableAPI {
  // 获取列表
  getData = project_cost_list;
  getChartData = project_cost_chart;
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
      title: i18n.t("project.Pro_ProjectCostAnalysis"),
      // 接口类
      api,
      // 打印模块标识
      printMod: "Pm_ProjectCost",
      // 分页
      pagination: false,
    });
  }
}
//  表格配置
const tableSchema = [
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  {
    // 模具名称
    prop: "ToolingName",
    label: i18n.t("Generality.Ge_ToolingName"),
  },
  {
    // 项目类别
    prop: "CostType",
    label: i18n.t("project.Pro_ItemType"),
    customFilter: (val) => {
      if (!val) return "";
      return projectTypeEnum[val].name;
    },
  },
  {
    label: i18n.t("project.Pro_PlannedCost"),
    prop: "PlanCost",
    filter: "amount",
    align: "right",
  },
  {
    label: i18n.t("project.Pro_PlannedProportion"),
    prop: "PlanCostRate",
    filter: "rate",
    align: "right",
  },
  {
    label: i18n.t("project.Pro_ActualCost"),
    prop: "ActualCost",
    filter: "amount",
    align: "right",
  },
  {
    label: i18n.t("project.Pro_ActualProportion"),
    prop: "ActualCostRate",
    filter: "rate",
    align: "right",
  },
  {
    label: i18n.t("project.Pro_Overspending"),
    prop: "OverCost",
    filter: "amount",
    align: "right",
  },
  {
    label: i18n.t("project.Pro_ProportionOfOverspending"),
    prop: "OverCostRate",
    filter: "rate",
    align: "right",
  },
];
//  搜索表单配置
const formSchema = [
  {
    prop: "Project",
    label: i18n.t("menu.Pm_Project"),
    cpn: "FormInput",
  },
  {
    prop: "ToolingNo",
    label:  i18n.t("Generality.Ge_MoldId"),
    cpn: "FormInput",
  },
];
