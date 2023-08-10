/*
 * @Author: H.
 * @Date: 2021-11-09 10:10:13
 * @LastEditTime: 2023-08-10 11:11:17
 * @Description:生产模块
 */

import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

// 生产模块
const production = [
  // 生产
  {
    key: "Pr_Production",
    Parent: null,
    name: "Production",
    path: "production",
    component: Layout,
    title: i18n.t("menu.Pr_Production"),
    icon: "production",
  },
  // 生产任务
  {
    key: "Pr_ProductionTask",
    component: () =>
      import("@/views/workModule/production/productionTask/List"),
    Parent: "Pr_Production",
    name: "ProductionTask",
    path: "productionTask",
    title: i18n.t("menu.Pr_ProductionTask"),
  },
  // 按模号打印生产任务
  {
    key: "Pr_ProductionTask_print_by_tooling",
    component: () =>
      import("@/views/workModule/production/productionTask/printByTooling"),
    Parent: "Pr_Production",
    name: "Pr_ProductionTask_print_by_tooling",
    path: "pr_ProductionTask_print_by_tooling",
    title: "打印",
  },
  // 新增生产任务
  {
    key: "Pr_addProductionTask",
    component: () => import("@/views/workModule/production/productionTask/Add"),
    Parent: "Pr_Production",
    name: "AddProductionTask",
    path: "addProductionTask",
    title:
      i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Pr_ProductionTask"),
    hidden: true,
  },
  // 编辑生产任务
  {
    key: "Pr_editProductionTask",
    component: () =>
      import("@/views/workModule/production/productionTask/Edit"),
    Parent: "Pr_Production",
    name: "EditProductionTask",
    path: "editProductionTask",
    title:
      i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Pr_ProductionTask"),
    hidden: true,
  },
  // 生产任务详情
  {
    key: "Pr_productionTaskDetails",
    component: () =>
      import("@/views/workModule/production/productionTask/Details"),
    Parent: "Pr_Production",
    name: "ProductionTaskDetails",
    path: "productionTaskDetails",
    title:
      i18n.t("menu.Pr_ProductionTask") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 生产排程
  {
    key: "Pr_ProductionSchedule",
    component: () =>
      import("@/views/workModule/production/productionSchedule/List/index.vue"),
    Parent: "Pr_Production",
    name: "ProductionSchedule",
    path: "productionSchedule",
    title: i18n.t("menu.Pr_ProductionSchedule"),
  },
  // 模拟计算
  {
    key: "Pr_ProductionSimulatedCalculate",
    component: () =>
      import(
        "@/views/workModule/production/productionSchedule/simulatedCalculate"
      ),
    Parent: "Pr_Production",
    name: "ProductionSimulatedCalculate",
    path: "productionSimulatedCalculate",
    title: i18n.t("production.Pr_SimulatedCalculate"),
  },
  // 排程结果
  {
    key: "Pr_ProductionScheduleCalculate",
    component: () =>
      import("@/views/workModule/production/productionSchedule/calculate"),
    Parent: "Pr_Production",
    name: "ProductionScheduleCalculate",
    path: "productionScheduleCalculate",
    title: i18n.t("production.Pr_SchedulingResults"),
  },
  // 明细负荷
  {
    key: "Pr_ProductionDetailedLoad",
    component: () =>
      import("@/views/workModule/production/productionSchedule/detailedLoad"),
    Parent: "Pr_Production",
    name: "ProductionDetailedLoad",
    path: "ProductionDetailedLoad",
    title: i18n.t("production.Pr_DetailedLoad"),
  },
  // 生产调度
  {
    key: "Pr_ProductionDispatch",
    component: () =>
      import("@/views/workModule/production/productionDispatch/List"),
    Parent: "Pr_Production",
    name: "ProductionDispatch",
    path: "productionDispatch",
    title: i18n.t("menu.Pr_ProductionDispatch"),
  },
  // 生产报工
  {
    key: "Pr_WorkReport",
    component: () =>
      import("@/views/workModule/production/productionReport/List"),
    Parent: "Pr_Production",
    name: "ProductionReport",
    path: "productionReport",
    title: i18n.t("menu.Pr_WorkReport"),
  },

  // 生产计划
  {
    key: "Pr_ProductionPlan",
    component: () =>
      import("@/views/workModule/production/productionPlan/List"),
    Parent: "Pr_Production",
    name: "ProductionPlan",
    path: "productionPlan",
    title: i18n.t("menu.Pr_ProductionPlan"),
  },

  /*  // 编程任务
  {
    key: "Pr_ProgramTask",
    component: () => import("@/views/workModule/production/programTask/List"),
    Parent: "Pr_Production",
    name: "ProgramTask",
    path: "programTask",
    title: i18n.t("menu.Pr_ProgramTask"),
  },
  // 品质异常
  {
    key: "Pr_Quality",
    component: () => import("@/views/workModule/production/quality/List"),
    Parent: "Pr_Production",
    name: "Quality",
    path: "quality",
    title: i18n.t("menu.Pr_Quality"),
  },*/
  // 统计报表
  {
    key: "Pr_Report",
    component: () => import("@/views/workModule/production/report"),
    Parent: "Pr_Production",
    name: "Pr_Report",
    path: "report",
    title: i18n.t("menu.Pr_Report"),
  },
  // 产能分析
  {
    key: "Pr_CapacityAnalyse",
    component: () =>
      import("@/views/workModule/production/report/capacityAnalyse"),
    Parent: "Pr_Report",
    name: "CapacityAnalyse",
    path: "capacityAnalyse",
    title: i18n.t("menu.Pr_CapacityAnalyse"),
  },
  // 负荷分析
  {
    key: "Pr_ProductionLoad",
    component: () =>
      import("@/views/workModule/production/report/productionLoad"),
    Parent: "Pr_Report",
    name: "ProductionLoad",
    path: "productionLoad",
    title: i18n.t("menu.Pr_ProductionLoad"),
  },

  // 加工计划图
  {
    key: "Pr_ProductionChart",
    component: () =>
      import("@/views/workModule/production/report/productionChart"),
    Parent: "Pr_Report",
    name: "ProductionChart",
    path: "productionChart",
    title: i18n.t("menu.Pr_ProductionChart"),
  },

  // 员工生产报表
  {
    key: "Pr_EmployeesChart",
    component: () =>
      import("@/views/workModule/production/report/employeesChart"),
    Parent: "Pr_Report",
    name: "EmployeesChart",
    path: "employeesChart",
    title: i18n.t("menu.Pr_EmployeesChart"),
  },
  // 工时汇总
  {
    key: "Pr_PersonnelHoursSummary",
    component: () =>
      import("@/views/workModule/production/report/personnelHoursSummary"),
    Parent: "Pr_Report",
    name: "Pr_PersonnelHoursSummary",
    path: "Pr_PersonnelHoursSummary",
    title: "员工工时汇总",
  },
  // 零件生产报表
  {
    key: "Pr_PartChart",
    component: () => import("@/views/workModule/production/report/partChart"),
    Parent: "Pr_Report",
    name: "PartChart",
    path: "partChart",
    title: i18n.t("menu.Pr_PartChart"),
  },

  // 生产报表
  /*  {
    key: "Pr_ProductionReport",
    component: () =>
      import("@/views/workModule/production/report/productionReport"),
    Parent: "Pr_Report",
    name: "ProductionReport",
    path: "productionReport",
    title: i18n.t("menu.Pr_ProductionReport"),
  },*/
  /*  // 品质报表
  {
    key: "Pr_QualityReport",
    component: () =>
      import("@/views/workModule/production/report/qualityReport"),
    Parent: "Pr_Report",
    name: "QualityReport",
    path: "qualityReport",
    title: i18n.t("menu.Pr_QualityReport"),
  },
  // 返工报表
  {
    key: "Pr_ReworkReport",
    component: () =>
      import("@/views/workModule/production/report/reworkReport"),
    Parent: "Pr_Report",
    name: "ReworkReport",
    path: "reworkReport",
    title: i18n.t("menu.Pr_ReworkReport"),
  },*/
  // 基础数据
  {
    key: "Pr_BaseData",
    component: () => import("@/views/workModule/production/baseData"),
    Parent: "Pr_Production",
    name: "Pr_BaseData",
    path: "Pr_BaseData",
    title: i18n.t("menu.Pm_BaseData"),
  },
  // 加工工序

  {
    key: "Pr_Process",
    component: () =>
      import("@/views/workModule/production/baseData/processes/List"),
    Parent: "Pr_BaseData",
    name: "Processes",
    path: "processes",
    title: i18n.t("menu.Pr_Process"),
  },
  // 设备信息
  {
    key: "Pr_Devices",
    component: () =>
      import("@/views/workModule/production/baseData/devices/List"),
    Parent: "Pr_BaseData",
    name: "Devices",
    path: "devices",
    title: i18n.t("menu.Pr_Devices"),
  },
  // 资源组
  {
    key: "Pr_Resources",
    component: () =>
      import("@/views/workModule/production/baseData/resources/List"),
    Parent: "Pr_BaseData",
    name: "Resources",
    path: "resources",
    title: i18n.t("menu.Pr_Resources"),
  },
  // 工厂日历
  {
    key: "Pr_Calendar",
    component: () =>
      import("@/views/workModule/production/baseData/calendar/List"),
    Parent: "Pr_BaseData",
    name: "Calendar",
    path: "calendar",
    title: i18n.t("menu.Pr_Calendar"),
  },
  // 工艺模板
  {
    key: "De_ProcessTemplate",
    component: () =>
      import("@/views/workModule/production/baseData/partProcessTemplate/List"),
    Parent: "Pr_BaseData",
    name: "ProcessTemplate",
    path: "processTemplate",
    title: i18n.t("production.Pr_ProcessTemplate"),
  },
  // 新增工艺模板
  {
    key: "Pr_AddProcessTemplate",
    component: () =>
      import("@/views/workModule/production/baseData/partProcessTemplate/add"),
    Parent: "Pr_BaseData",
    name: "AddProcessTemplate",
    path: "addProcessTemplate",
    title:
      i18n.t("Generality.Ge_New") +
      "  " +
      i18n.t("production.Pr_ProcessTemplate"),
    hidden: true,
  },
  // 编辑工艺模板
  {
    key: "Pr_EditProcessTemplate",
    component: () =>
      import("@/views/workModule/production/baseData/partProcessTemplate/edit"),
    Parent: "Pr_BaseData",
    name: "EditProcessTemplate",
    path: "editProcessTemplate",
    title:
      i18n.t("Generality.Ge_Edit") +
      "  " +
      i18n.t("production.Pr_ProcessTemplate"),
    hidden: true,
  },
  // 工艺模板详情
  {
    key: "Pr_ProcessTemplateDetails",
    component: () =>
      import(
        "@/views/workModule/production/baseData/partProcessTemplate/details"
      ),
    Parent: "Pr_BaseData",
    name: "ProcessTemplateDetails",
    path: "ProcessTemplateDetails",
    title:
      i18n.t("production.Pr_ProcessTemplate") +
      "  " +
      i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
];

export default production;
