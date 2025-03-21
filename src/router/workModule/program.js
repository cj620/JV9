/*
 * @Author: your name
 * @Date: 2021-11-18 10:45:50
 * @LastEditTime: 2024-07-24 13:49:03
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\router\workModule\program.js
 */
import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";
import production from "./production";

// 编程模块
const program = [
  // 编程
  {
    key: "Pa_Program",
    Parent: null,
    name: "Program",
    path: "program",
    component: Layout,
    title: i18n.t("menu.Pa_Program"),
    icon: "program",
  },
  // 编程任务
  {
    key: "Pa_ProgramTask",
    component: () => import("@/views/workModule/program/programTask/List"),
    Parent: "Pa_Program",
    name: "ProgramTask",
    path: "programTask",
    title: i18n.t("menu.Pa_ProgramTask"),
  },
  // 编程任务列表
  {
    key: "Pa_ProgramTaskList",
    component: () => import("@/views/workModule/program/ProgramTaskList"),
    Parent: "Pa_Program",
    name: "Pa_ProgramTaskList",
    path: "Pa_ProgramTaskList",
    title: i18n.t("menu.Pa_ProgramTaskList"),
  },
  // 编程加工任务
  {
    key: "Pa_ProgramProducingTask",
    component: () =>
      import("@/views/workModule/program/programProducingTask/List"),
    Parent: "Pa_Program",
    name: "ProgramProducingTask",
    path: "programProducingTask",
    title: i18n.t("menu.Pa_ProgramProducingTask"),
  },
  // 编程加工任务列表
  {
    key: "Pa_ProgramProducingTaskList",
    component: () =>
      import("@/views/workModule/program/programProducingTaskList"),
    Parent: "Pa_Program",
    name: "Pa_ProgramProducingTaskList",
    path: "Pa_ProgramProducingTaskList",
    title: i18n.t("menu.Pa_ProgramProducingTaskList"),
  },
  {
    key: "ProgramProducingDelayedTasks",
    component: () =>
      import(
        "@/views/workModule/program/programProducingTaskList/ProgramProducingDelayedTasks"
      ),
    Parent: "Pa_Program",
    name: "ProgramProducingDelayedTasks",
    path: "ProgramProducingDelayedTasks",
    title: "延期编程加工任务",
    hidden: true,
  },
  // 编程加工任务报工
  {
    key: "Pa_ProgramProducingTaskReport",
    component: () =>
      import("@/views/workModule/program/programProducingTaskReport"),
    Parent: "Pa_Program",
    name: "Pa_ProgramProducingTaskReport",
    path: "Pa_ProgramProducingTaskReport",
    title: i18n.t("menu.Pa_ProgramProducingTaskReport"),
  },
  // 编程加工任务记录
  {
    key: "Pa_ProgramProducingTaskReportRecord",
    component: () =>
      import(
        "@/views/workModule/program/programProducingTaskList/programProducingTaskReportRecord.vue"
      ),
    Parent: "Pa_Program",
    name: "Pa_ProgramProducingTaskReportRecord",
    path: "Pa_ProgramProducingTaskReportRecord",
    title: i18n.t("menu.Pa_ProgramProducingTaskReportRecord"),
  },
  // 编程任务记录
  {
    key: "Pa_ProgramTask_Record",
    component: () =>
      import("@/views/workModule/program/programTask/TaskRecord"),
    Parent: "Pa_Program",
    name: "ProgramTask_Record",
    path: "programTask_Record",
    title: i18n.t("program.Pr_CAMTaskRecord"),
    hidden: true,
  },
  // 电极BOM表
  {
    key: "Pa_ElectrodeBom",
    component: () => import("@/views/workModule/program/electrodeBom/List"),
    Parent: "Pa_Program",
    name: "ElectrodeBom",
    path: "electrodeBom",
    title: i18n.t("menu.Pa_ElectrodeBom"),
  },
  // 工艺设计
  {
    key: "De_ElectrodeCraftDesign",
    component: () =>
      import("@/views/workModule/program/electrodeBom/craftDesign"),
    Parent: "De_Design",
    name: "ElectrodeCraftDesign",
    path: "electrodeCraftDesign",
    title: i18n.t("program.Pr_ProcessPlanning"),
    hidden: true,
  },
  // 电极物料需求
  {
    key: "Pa_ElectrodeDemand",
    component: () => import("@/views/workModule/program/electrodeDemand/List"),
    Parent: "Pa_Program",
    name: "ElectrodeDemand",
    path: "electrodeDemand",
    title: i18n.t("menu.Pa_ElectrodeDemand"),
  },
  // 新增电极物料需求
  {
    key: "Pa_ElectrodeDemand_Add",
    component: () => import("@/views/workModule/program/electrodeDemand/Add"),
    Parent: "Pa_Program",
    name: "Pa_ElectrodeDemand_Add",
    path: "Pa_ElectrodeDemand_Add",
    title:
      i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Pa_ElectrodeDemand"),
    hidden: true,
  },
  // 编辑电极物料需求
  {
    key: "Pa_ElectrodeDemand_Edit",
    component: () => import("@/views/workModule/program/electrodeDemand/Edit"),
    Parent: "Pa_Program",
    name: "Pa_ElectrodeDemand_Edit",
    path: "Pa_ElectrodeDemand_Edit",
    title:
      i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Pa_ElectrodeDemand"),
    hidden: true,
  },
  // 电极物料需求详情
  {
    key: "Pa_ElectrodeDemand_Detail",
    component: () =>
      import("@/views/workModule/program/electrodeDemand/Details"),
    Parent: "De_Design",
    name: "Pa_ElectrodeDemand_Detail",
    path: "Pa_ElectrodeDemand_Detail",
    title:
      i18n.t("menu.Pa_ElectrodeDemand") +
      "  " +
      i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 电极物料需求明细
  {
    key: "Pa_ElectrodeDemand_Details_list",
    component: () =>
      import("@/views/workModule/program/electrodeDemand/DetailsList"),
    Parent: "Pa_Program",
    name: "Pa_ElectrodeDemand_Details_list",
    path: "Pa_ElectrodeDemand_Details_list",
    title:
      i18n.t("menu.Pa_ElectrodeDemand") +
      " " +
      i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 编程任务明细点检
  {
    key: "Pa_ProgramTaskItemInspection",
    component: () => import("@/views/workModule/program/programItemInspection"),
    Parent: "Pa_Program",
    name: "Pa_ProgramTaskItemInspection",
    path: "Pa_ProgramTaskItemInspection",
    title: i18n.t("menu.Pa_ProgramTaskItemInspection"),
  },
  // 编程加工任务明细点检
  {
    key: "Pa_ProgramProducingTaskItemInspection",
    component: () =>
      import("@/views/workModule/program/programProducingItemInspection"),
    Parent: "Pa_Program",
    name: "Pa_ProgramProducingTaskItemInspection",
    path: "Pa_ProgramProducingTaskItemInspection",
    title: i18n.t("menu.Pa_ProgramProducingTaskItemInspection"),
  },
  // 分发编程任务
  {
    key: "Pa_ProgramDistributeTask",
    component: () =>
      import("@/views/workModule/program/programTask/DistributeTask"),
    Parent: "Pa_Program",
    name: "Pa_ProgramDistributeTask",
    path: "Pa_ProgramDistributeTask",
    title: i18n.t("project.Pro_DistributionTask"),
  },
  // 延期编程任务
  {
    key: "Pa_ProgramDelayedTasks",
    component: () =>
      import("@/views/workModule/program/ProgramTaskList/ProgramDelayedTasks"),
    Parent: "Pa_Program",
    name: "Pa_ProgramDelayedTasks",
    path: "Pa_ProgramDelayedTasks",
    title: i18n.t("menu.Pa_ProgramDelayedTasks"),
  },
  // 编程任务周看板
  {
    key: "Pa_ProgramWeeklyDashboard",
    component: () =>
      import("@/views/workModule/program/programWeeklyDashboard"),
    Parent: "Pa_Program",
    name: "Pa_ProgramWeeklyDashboard",
    path: "Pa_ProgramWeeklyDashboard",
    title: i18n.t("menu.Pa_ProgramWeeklyDashboard"),
  },
  // 编程计划达成率
  {
    key: "Pa_ProgramPlanAchievementRate",
    component: () =>
      import("@/views/workModule/program/programPlanAchievementRate"),
    Parent: "Pa_Program",
    name: "Pa_ProgramPlanAchievementRate",
    path: "Pa_ProgramPlanAchievementRate",
    title: i18n.t("menu.Pa_ProgramPlanAchievementRate"),
  },
];
export default program;
