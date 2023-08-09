// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 获取列表接口
import { query_latest_aps_result } from "@/api/workApi/production/aps";

export class api extends TableAPI {
  // 获取列表
  getData = query_latest_aps_result;
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
      // 表格标题
      title: i18n.t("menu.Pr_ProductionSchedule"),
      // 接口类
      api,
      // 操作列宽度
      operationCol: false,
      // 打印模块标识
      printMod: "Pr_ProductionSchedule",
    });
  }
}
//  表格配置
export const tableConfig = [
  /*加工单号*/
  {
    prop: "BillId",
    label: i18n.t("production.Pr_WorkSheetNo"),
  },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*工序*/
  {
    prop: "ProcessName",
    label: i18n.t("Generality.Ge_Process"),
    width: 100,
  },

  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    align: "right",
    width: 100,
  },
  /*预定资源*/
  {
    prop: "PlanDevice",
    label: i18n.t("Generality.Ge_Resource"),
    width: 120,
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: 140,
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: 140,
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
