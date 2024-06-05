import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";

const testTooling = [
  // 试模
  {
    key: "Tt_TestTooling",
    Parent: null,
    name: "TestTooling",
    path: "testTooling",
    component: Layout,
    title: i18n.t("menu.Tt_TestTooling"),
    icon: "design",
  },
  // 试模计划
  {
    key: "Tt_TestToolingPlan",
    component: () => import("@/views/workModule/testTooling/testToolingPlan/List"),
    Parent: "Tt_TestTooling",
    name: "Tt_TestToolingPlan",
    path: "tt_TestToolingPlan",
    title: i18n.t("menu.Tt_TestToolingPlan"),
  },
  // 试模任务
  {
    key: "Tt_TestToolingTask",
    component: () => import("@/views/workModule/testTooling/testToolingTask/List"),
    Parent: "Tt_TestTooling",
    name: "Tt_TestToolingTask",
    path: "tt_TestToolingTask",
    title: i18n.t("menu.Tt_TestToolingTask"),
  },
  // 试模列表
  {
    key: "Tt_TestToolingBill",
    component: () => import("@/views/workModule/testTooling/testToolingBill/List"),
    Parent: "Tt_TestTooling",
    name: "Tt_TestToolingBill",
    path: "tt_TestToolingBill",
    title: i18n.t("menu.Tt_TestToolingBill"),
  },
  // 新增试模列表
  {
    key: "Tt_TestToolingBill_Add",
    component: () => import("@/views/workModule/testTooling/testToolingBill/Add"),
    Parent: "Tt_TestTooling",
    name: "Tt_TestToolingBill_Add",
    path: "tt_TestToolingBill_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Tt_TestToolingBill"),
    hidden: true,
  },
  // 试模任务详情
  {
    key: "Tt_TestToolingBill_Detail",
    component: () => import("@/views/workModule/testTooling/testToolingBill/Detail"),
    Parent: "Tt_TestTooling",
    name: "Tt_TestToolingBill_Detail",
    path: "tt_TestToolingBill_Detail",
    title:
      i18n.t("menu.Tt_TestToolingBill") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 试模任务编辑
  {
    key: "Tt_TestToolingBill_Edit",
    component: () => import("@/views/workModule/testTooling/testToolingBill/Edit"),
    Parent: "Tt_TestTooling",
    name: "Tt_TestToolingBill_Edit",
    path: "tt_TestToolingBill_Edit",
    title:
      i18n.t("menu.Tt_TestToolingBill") + "  " + i18n.t("Generality.Ge_Edit"),
    hidden: true,
  },
  // 试模任务记录
  {
    key: "Tt_TestToolingTask_Record",
    component: () => import("@/views/workModule/testTooling/testToolingTask/TaskRecord"),
    Parent: "Tt_TestTooling",
    name: "TestToolingTask_Record",
    path: "testToolingTask_Record",
    title: i18n.t("menu.Tt_TestToolingTaskRecord"),
    hidden: true,
  },
  // 分发试模任务
  {
    key: "Tt_TestToolingDistributeTask",
    component: () => import("@/views/workModule/testTooling/testToolingTask/DistributeTask"),
    Parent: "Tt_TestTooling",
    name: "Tt_TestToolingDistributeTask",
    path: "tt_TestToolingDistributeTask",
    title: i18n.t("project.Pro_DistributionTask"),
  },
  // 延期试模任务
  {
    key: "Tt_TestToolingDelayedTasks",
    component: () => import("@/views/workModule/testTooling/testToolingPlan/testToolingDelayedTasks"),
    Parent: "Tt_TestTooling",
    name: "Tt_TestToolingDelayedTasks",
    path: "tt_TestToolingDelayedTasks",
    title: i18n.t("menu.Tt_TestToolingDelayedTasks"),
  },
  // 试模任务周看板
  {
    key: "Tt_TestToolingWeeklyDashboard",
    component: () => import("@/views/workModule/testTooling/testToolingWeeklyDashboard"),
    Parent: "Tt_TestTooling",
    name: "Tt_TestToolingWeeklyDashboard",
    path: "tt_TestToolingWeeklyDashboard",
    title: i18n.t("menu.Tt_TestToolingWeeklyDashboard"),
  }
]

export default testTooling;
