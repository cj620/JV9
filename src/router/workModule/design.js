/*
 * @Author: H.
 * @Date: 2021-11-09 09:08:00
 * @LastEditTime: 2022-01-14 11:32:31
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
    key: "De_ItemsDemand",
    component: () => import("@/views/workModule/design/itemsDemand/List"),
    Parent: "De_Design",
    name: "ItemsDemand",
    path: "itemsDemand",
    title: i18n.t("menu.De_ItemsDemand"),
  },
  // 新增物料需求
  {
    key: "De_ItemsDemand_Add",
    component: () => import("@/views/workModule/design/itemsDemand/Add"),
    Parent: "De_Design",
    name: "De_ItemsDemand_Add",
    path: "De_ItemsDemand_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.De_ItemsDemand"),
    hidden: true,
  },
  // 编辑物料需求
  {
    key: "De_ItemsDemand_Edit",
    component: () => import("@/views/workModule/design/itemsDemand/Edit"),
    Parent: "De_Design",
    name: "De_ItemsDemand_Edit",
    path: "De_ItemsDemand_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.De_ItemsDemand"),
    hidden: true,
  },
  // 物料需求详情
  {
    key: "De_ItemsDemand_Details",
    component: () => import("@/views/workModule/design/itemsDemand/Details"),
    Parent: "De_Design",
    name: "De_ItemsDemand_Details",
    path: "De_ItemsDemand_Details",
    title:
      i18n.t("menu.De_ItemsDemand") + "  " + i18n.t("Generality.Ge_Details"),
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
];

export default design;
