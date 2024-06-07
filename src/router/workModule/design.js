/*
 * @Author: H.
 * @Date: 2021-11-09 09:08:00
 * @LastEditTime: 2024-06-07 11:12:18
 * @Description:设计模块
 */

import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

// 设计模块
const design = [
  // 设计
  {
    key: "De_Design",
    Parent: null,
    name: "Design",
    path: "design",
    component: Layout,
    title: i18n.t("menu.De_Design"),
    icon: "design",
  },
  // 设计任务
  {
    key: "De_DesignTask",
    component: () => import("@/views/workModule/design/designTask/List"),
    Parent: "De_Design",
    name: "DesignTask",
    path: "designTask",
    title: i18n.t("menu.De_DesignTask"),
  },
  // 设计任务记录
  {
    key: "De_DesignTask_Record",
    component: () => import("@/views/workModule/design/designTask/TaskRecord"),
    Parent: "De_Design",
    name: "DesignTask_Record",
    path: "designTask_Record",
    title: i18n.t("design.De_DesignTaskRecord"),
    hidden: true,
  },
  // 设计任务列表
  {
    key: "De_DesignTaskList",
    component: () =>
      import("@/views/workModule/design/designTask/DesignTaskList"),
    Parent: "De_Design",
    name: "De_DesignTaskList",
    path: "De_DesignTaskList",
    title: i18n.t("menu.De_DesignTaskList"),
  },
  {
    key: "De_DesignTask_PersonnelHoursSummary",
    component: () => import("@/views/workModule/design/designTask/HourSummary"),
    Parent: "Pr_Report",
    name: "De_DesignTask_PersonnelHoursSummary",
    path: "De_DesignTask_PersonnelHoursSummary",
    title: "设计工时汇总",
  },
  // 模具BOM
  {
    key: "De_ToolingBOM",
    component: () => import("@/views/workModule/design/toolingBOM/List"),
    Parent: "De_Design",
    name: "ToolingBOM",
    path: "toolingBOM",
    title: i18n.t("menu.De_ToolingBOM"),
  },
  // 工艺设计
  {
    key: "De_CraftDesign",
    component: () => import("@/views/workModule/design/toolingBOM/craftDesign"),
    Parent: "De_Design",
    name: "CraftDesign",
    path: "craftDesign",
    title: i18n.t("program.Pr_ProcessPlanning"),
    hidden: true,
  },

  // 物料需求
  {
    key: "De_MaterialRequirement",
    component: () => import("@/views/workModule/design/itemsDemand/List"),
    Parent: "De_Design",
    name: "ItemsDemand",
    path: "itemsDemand",
    title: i18n.t("menu.De_MaterialRequirement"),
  },
  // 新增物料需求
  {
    key: "De_MaterialRequirement_Add",
    component: () => import("@/views/workModule/design/itemsDemand/Add"),
    Parent: "De_Design",
    name: "De_MaterialRequirement_Add",
    path: "De_MaterialRequirement_Add",
    title:
      i18n.t("Generality.Ge_New") +
      "  " +
      i18n.t("menu.De_MaterialRequirement"),
    hidden: true,
  },
  // 编辑物料需求
  {
    key: "De_MaterialRequirementuirement_Edit",
    component: () => import("@/views/workModule/design/itemsDemand/Edit"),
    Parent: "De_Design",
    name: "De_MaterialRequirement_Edit",
    path: "De_MaterialRequirement_Edit",
    title:
      i18n.t("Generality.Ge_Edit") +
      "  " +
      i18n.t("menu.De_MaterialRequirement"),
    hidden: true,
  },
  // 物料需求详情
  {
    key: "De_MaterialRequirement_Detail",
    component: () => import("@/views/workModule/design/itemsDemand/Details"),
    Parent: "De_Design",
    name: "De_MaterialRequirement_Detail",
    path: "De_MaterialRequirement_Detail",
    title:
      i18n.t("menu.De_MaterialRequirement") +
      "  " +
      i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  //物料需求明细
  {
    key: "De_MaterialRequirement_Detail_list",
    component: () =>
      import("@/views/workModule/design/itemsDemand/DetailsList"),
    Parent: "De_Design",
    name: "De_MaterialRequirement_Detail_list",
    path: "De_MaterialRequirement_Detail_list",
    title:
      i18n.t("menu.De_MaterialRequirement") +
      "   " +
      i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 生产需求
  {
    key: "De_ProductionDemand",
    component: () => import("@/views/workModule/design/productionDemand/List"),
    Parent: "De_Design",
    name: "ProductionDemand",
    path: "productionDemand",
    title: i18n.t("menu.De_ProductionDemand"),
  },
  // 设计任务明细点检
  {
    key: "De_DesignTaskItemInspection",
    component: () => import("@/views/workModule/design/ItemInspection"),
    Parent: "De_Design",
    name: "De_DesignTaskItemInspection",
    path: "De_DesignTaskItemInspection",
    title: i18n.t("menu.De_DesignTaskItemInspection"),
  },
  // 分发设计任务
  {
    key: "De_DesignDistributeTask",
    component: () =>
      import("@/views/workModule/design/designTask/DistributeTask"),
    Parent: "De_Design",
    name: "De_DesignDistributeTask",
    path: "De_DesignDistributeTask",
    title: i18n.t("project.Pro_DistributionTask"),
  },
  // 延期设计任务
  {
    key: "De_DesignDelayedTasks",
    component: () =>
      import("@/views/workModule/design/designTask/DesignDelayedTasks"),
    Parent: "De_Design",
    name: "De_DesignDelayedTasks",
    path: "De_DesignDelayedTasks",
    title: i18n.t("menu.De_DesignDelayedTasks"),
  },
  // 设计任务周看板
  {
    key: "De_DesignWeeklyDashboard",
    component: () => import("@/views/workModule/design/designWeeklyDashboard"),
    Parent: "De_Design",
    name: "De_DesignWeeklyDashboard",
    path: "De_DesignWeeklyDashboard",
    title: i18n.t("menu.De_DesignWeeklyDashboard"),
  },
];

export default design;
