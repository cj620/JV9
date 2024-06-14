import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

// 钳工模块
const assy = [
  // 钳工
  {
    key: "As_Assy",
    Parent: null,
    name: "Assy",
    path: "assy",
    component: Layout,
    title: i18n.t("menu.As_Assy"),
    icon: "production",
  },
  // 钳工任务
  {
    key: "As_AssyTask",
    component: () => import("@/views/workModule/assy/assyTask/List"),
    Parent: "As_Assy",
    name: "AssyTask",
    path: "assyTask",
    title: i18n.t("menu.As_AssyTask"),
  },
  // 钳工任务记录
  {
    key: "As_AssyTaskRecord",
    component: () => import("@/views/workModule/assy/assyTask/TaskRecord"),
    Parent: "As_Assy",
    name: "AssyTaskRecord",
    path: "assyTaskRecord",
    title: i18n.t("menu.As_AssyTaskRecord"),
    hidden: true,
  },
  // 钳工任务列表
  {
    key: "As_AssyTaskList",
    component: () => import("@/views/workModule/assy/assyTaskList"),
    Parent: "As_Assy",
    name: "AssyTaskList",
    path: "assyTaskList",
    title: i18n.t("menu.As_AssyTaskList"),
  },
  // 装配计划
  {
    key: "As_ProductionAssemblyPlan",
    component: () => import("@/views/workModule/assy/productionAssemblyPlan"),
    Parent: "As_Assy",
    name: "ProductionAssemblyPlan",
    path: "productionAssemblyPlan",
    title: i18n.t("menu.As_ProductionAssemblyPlan"),
  },
  // 钳工收料
  {
    key: "As_ProductionFitterReceive",
    component: () => import("@/views/workModule/assy/productionFitterReceive"),
    Parent: "As_Assy",
    name: "ProductionFitterReceive",
    path: "productionFitterReceive",
    title: i18n.t("menu.As_ProductionFitterReceive"),
  },
  // 钳工收料记录
  {
    key: "As_ProductionFitterReceiveRecord",
    component: () => import("@/views/workModule/assy/productionFitterReceive/productionFitterReceiveRecord.vue"),
    Parent: "As_Assy",
    name: "ProductionFitterReceiveRecord",
    path: "productionFitterReceiveRecord",
    title: i18n.t("menu.As_ProductionFitterReceiveRecord"),
  },
  // 钳工任务明细点检
  {
    key: "As_AssyTaskItemInspection",
    component: () => import("@/views/workModule/assy/ItemInspection"),
    Parent: "As_Assy",
    name: "As_AssyTaskItemInspection",
    path: "As_AssyTaskItemInspection",
    title: i18n.t("menu.As_AssyTaskItemInspection"),
  },
  // 分发点检任务
  {
    key: "As_AssyDistributeTask",
    component: () => import("@/views/workModule/assy/assyTask/DistributeTask"),
    Parent: "As_Assy",
    name: "As_AssyDistributeTask",
    path: "As_AssyDistributeTask",
    title: i18n.t("project.Pro_DistributionTask"),
  },
  // 延期钳工任务
  {
    key: "As_AssyDelayedTasks",
    component: () => import("@/views/workModule/assy/assyTaskList/AssyDelayedTasks"),
    Parent: "As_Assy",
    name: "As_AssyDelayedTasks",
    path: "As_AssyDelayedTasks",
    title: i18n.t("menu.As_AssyDelayedTasks"),
  },
  // 钳工任务周看板
  {
    key: "As_AssyWeeklyDashboard",
    component: () => import("@/views/workModule/assy/assyWeeklyDashboard"),
    Parent: "As_Assy",
    name: "As_AssyWeeklyDashboard",
    path: "As_AssyWeeklyDashboard",
    title: i18n.t("menu.As_AssyWeeklyDashboard"),
  },
  // 钳工计划达成率
  {
    key: "As_AssyPlanAchievementRate",
    component: () => import("@/views/workModule/assy/assyPlanAchievementRate"),
    Parent: "As_Assy",
    name: "As_AssyPlanAchievementRate",
    path: "As_AssyPlanAchievementRate",
    title: i18n.t("menu.As_AssyPlanAchievementRate"),
  },
]
export default assy;
