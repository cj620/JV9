/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-01-12 16:16:10
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
// 获取列表接口
import { query_latest_aps_result } from "@/api/workApi/production/aps";
import { overdue_and_obsolete_list } from "@/api/workApi/production/productionSchedule";
import { enumFilter } from "@/enum/workModule";

const IsPartakeAPS = {
  Normal: {
    name: i18n.t("production.Pr_Tagged"),
    value: "Normal",
    color: "red",
  },
  ObsoleteWorkOrder: {
    name: i18n.t("production.Pr_Unlabeled"),
    value: "ObsoleteWorkOrder",
    color: "red",
  },
};
export class api1 extends TableAPI {
  // 获取列表
  getData = overdue_and_obsolete_list;
  // 删除单据
  // del = api_delete;
}
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
// 陈旧工单
export class OldTable extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: OldTableConfig,
      // 表单配置
      formSchema: formSchema1,
      // 行标识
      rowId: "BillId",
      // 表格标题
      title: i18n.t("production.Pr_StaleWorkOrder"),
      // 接口类
      api: api1,
      // tableHeaderShow: false,
      // 操作列宽度
      operationWidth: 0,
      operationCol: false,
      // 打印模块标识
      printMod: "Pr_StaleWorkOrder",
    });
  }
}
// 超期工单
export class ObsoleteTable extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: ObsoleteTableConfig,
      // 表单配置
      formSchema: formSchema1,
      // 行标识
      rowId: "BillId",
      // 表格标题
      title: i18n.t("production.Pr_OverdueWorkOrder"),
      // 接口类
      api: api1,
      // tableHeaderShow: false,
      // 操作列宽度
      // operationCol: false,
      operationWidth: 150,
      // 打印模块标识
      printMod: "Pr_OverdueWorkOrder",
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
// 陈旧表格配置
//  表格配置
export const OldTableConfig = [
  {
    prop: "BillId",
    label: i18n.t("production.Pr_WorkOrderNumber"),
    align: "center",
    cpn: "Link",
    innerSearch: {
      prop: "BillId",
      cpn: "FormInput",
      label: i18n.t("production.Pr_WorkOrderNumber"),
    },
    cpnProps: {
      // 路由名称
      routeName: "Pr_ProductionSchedule",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
      //   moreDynamicParameters: [
      //     {
      //       keyName: "ItemId",
      //       valueName: "ItemId",
      //     },
      //   ],
    },
  },
  /*加工信息*/
  // {
  //   prop: "PartInfo",
  //   label: i18n.t("production.Pr_ProcessInformation"),
  // },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
  },
  /*最后报工日期*/
  {
    prop: "LastReportingDate",
    label: i18n.t("production.Pr_LastReportedDate"),
    filter: "time",
  },
  /*未报工天数*/
  {
    prop: "LastReportingDays",
    label: i18n.t("production.Pr_DaysNotReported"),
  },
  // 陈旧工单标记
  {
    prop: "IsPartakeAPS",
    label: i18n.t("production.Pr_OldWorkOrderMark"),
    customFilter: (value) => enumFilter(value, IsPartakeAPS),
  },
];
// 超期表格配置
export const ObsoleteTableConfig = [
  {
    prop: "BillId",
    label: i18n.t("production.Pr_WorkOrderNumber"),
    align: "center",
    cpn: "Link",
    innerSearch: {
      prop: "BillId",
      cpn: "FormInput",
      label: i18n.t("production.Pr_WorkOrderNumber"),
    },
    cpnProps: {
      // 路由名称
      routeName: "Pr_ProductionSchedule",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    },
  },
  /*加工信息*/
  {
    prop: "PartInfo",
    label: i18n.t("production.Pr_ProcessInformation"),
  },
  /*计划开始*/
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
  },
  /*超交期天数*/
  {
    prop: "LastReportingDays",
    label: i18n.t("production.Pr_DaysOverdue"),
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

// 陈旧及超期工单表单配置
export const formSchema1 = [
  //工单编号
  {
    prop: "BillId",
    label: i18n.t("production.Pr_WorkOrderNumber"),
    cpn: "FormInput",
  },
  // 加工信息
  {
    prop: "PartInfo",
    label: i18n.t("production.Pr_ProcessInformation"),
    cpn: "FormInput",
  },
  // // 模具编号
  // {
  //   prop: "ToolingNo",
  //   label: i18n.t("Generality.Ge_ToolingNo"),
  //   cpn: "FormInput",
  // },
  // // 零件编号
  // {
  //   prop: "PartNo",
  //   label: i18n.t("Generality.Ge_PartNo"),
  //   cpn: "FormInput",
  // },
];

// 甘特图表格配置
export const GanttColumns = [
  {
    name: "PartNo",
    width: 100,
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    name: "PhotoUrl",
    width: 100,
    label: i18n.t("Generality.Ge_PhotoUrl"),
  },
  {
    name: "PlanStart",
    width: 120,
    label: i18n.t("Generality.Ge_PlanStart"),
  },
  {
    name: "PlanEnd",
    width: 120,
    label: i18n.t("Generality.Ge_PlanEnd"),
  },
];
