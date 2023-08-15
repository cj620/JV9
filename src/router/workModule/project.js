/*
 * @Author: H.
 * @Date: 2021-11-09 09:08:00
 * @LastEditTime: 2022-03-02 14:55:12
 * @Description:项目模块
 */

import i18n from "@/i18n/i18n.js";
import Layout from "@/layout";
var str = "project/projectManage/List";
var str1 = "/workModule/project/projectManage/mouldDetail";
var arr = [
  {
    key: "Sa_Sale",
    ParentKey: null,
    type: 1,
    Child: [
      {
        key: "Sa_SaleQuote",
        ParentKey: "Sa_Sale",
        type: 2,
      },
    ],
  },
];
var menuList = [];
var menuObject = {};
ChildrenRouter(arr);

function ChildrenRouter(routerData) {
  routerData.forEach((item) => {
    menuObject = {
      key: item.key,
      Parent: item.ParentKey,
      name: item.key,
      path: item.key,
      component: item.ParentKey
        ? (resolve) =>
            require([
              "@/views/workModule/project/" + item.key + "/List",
            ], resolve)
        : Layout,
      title: i18n.t("menu." + item.key),
    };
    menuList.push(menuObject);
    if (item.Child) {
      ChildrenRouter(item.Child);
    }
  });
}
// 项目模块
const project = [
  // 项目
  {
    key: "Pm_Project",
    Parent: null,
    name: "Project",
    path: "project",
    component: Layout,
    title: i18n.t("menu.Pm_Project"),
    icon: "project",
  },
  // 项目管理
  {
    key: "Pm_ProjectManagement",
    component: (resolve) => require(["@/views/workModule/" + str], resolve),
    Parent: "Pm_Project",
    name: "ProjectManage",
    path: "projectManage",
    title: i18n.t("menu.Pm_ProjectManagement"),
  },
  // 项目信息管理
  {
    key: "Pm_ProjectManagement_Msg",
    component: () =>
    import("@/views/workModule/project/projectManage/message"),
    Parent: "Pm_Project",
    name: "Pm_ProjectManagement_Msg",
    path: "pm_ProjectManagement_Msg",
    title: i18n.t("project.Pro_projectMsgManager")
  },
  // 项目分享
  {
    key: "Pm_ProjectManagement_Share",
    component: () =>
    import("@/views/workModule/project/projectManage/share"),
    Parent: "Pm_Project",
    name: "ProjectManage_Share",
    path: "projectManage_Share",
    title: i18n.t("project.Pro_Share")
  },
  // 模具详情
  {
    key: "Pm_ProjectManagement_MouldDetail",
    component: () =>
      import("@/views/workModule/project/projectManage/mouldDetail"),
    Parent: "Pm_Project",
    name: "ProjectManage_MouldDetail",
    path: "projectManage_MouldDetail",
    title: i18n.t("project.Pro_ToolingDetails"),
    hidden: true,
  },
  // 模具技术要求
  {
    key: "Pm_ProjectManagement_skill_req",
    component: () =>
      import(`@/views/workModule/project/projectManage/SkillReq`),
    Parent: "Pm_Project",
    name: "ProjectManage_skill_req",
    path: "projectManage_skill_req",
    title: i18n.t("project.Pro_MoldSpecification"),
    hidden: true,
  },
  // 项目人员和进度
  {
    key: "Pm_ProjectManagement_process_people",
    component: () =>
      import("@/views/workModule/project/projectManage/process_people"),
    Parent: "Pm_Project",
    name: "ProjectManage_process_people",
    path: "projectManage_process_people",
    title: i18n.t("menu.Pm_Project") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 项目任务
  {
    key: "Pm_ProjectTask",
    component: () => import("@/views/workModule/project/projectTask/List"),
    Parent: "Pm_Project",
    name: "Pm_ProjectTask",
    path: "pm_ProjectTask",
    title: i18n.t("menu.Pm_ProjectTask"),
  },
  // 项目任务
  {
    key: "Pm_ProjectTask_Add",
    component: () => import("@/views/workModule/project/projectTask/Add"),
    Parent: "Pm_Project",
    name: "Pm_ProjectTask_Add",
    path: "pm_ProjectTask_Add",
    title: i18n.t("Generality.Ge_New") + "  " + i18n.t("menu.Pm_ProjectTask"),
    hidden: true,
  },
  {
    key: "Pm_ProjectTask_Edit",
    component: () => import("@/views/workModule/project/projectTask/Edit"),
    Parent: "Pm_Project",
    name: "Pm_ProjectTask_Edit",
    path: "pm_ProjectTask_Edit",
    title: i18n.t("Generality.Ge_Edit") + "  " + i18n.t("menu.Pm_ProjectTask"),
    hidden: true,
  },
  // 项目任务详情
  {
    key: "Pm_ProjectTask_Detail",
    component: () => import("@/views/workModule/project/projectTask/Detail"),
    Parent: "Pm_Project",
    name: "Pm_ProjectTask_Detail",
    path: "pm_ProjectTask_Detail",
    title:
      i18n.t("menu.Pm_ProjectTask") + "  " + i18n.t("Generality.Ge_Details"),
    hidden: true,
  },
  // 项目任务
  {
    key: "Pm_ProjectTask_Record",
    component: () =>
      import("@/views/workModule/project/projectTask/TaskRecord"),
    Parent: "Pm_Project",
    name: "Pm_ProjectTask_Record",
    path: "pm_ProjectTask_Record",
    title: i18n.t("project.Pro_ProjectTaskRecord"),
    hidden: true,
  },
  // 项目任务明细
  {
    key: "Pm_ProjectTask_DetailList",
    component: () =>
      import("@/views/workModule/project/projectTask/DetailsList"),
    Parent: "Pm_Project",
    name: "Pm_ProjectTask_DetailList",
    path: "Pm_ProjectTask_DetailList",
    title:
      i18n.t("menu.Pm_ProjectTask") + "  " + i18n.t("Generality.Ge_Details1"),
    hidden: true,
  },
  // 试模任务
  {
    key: "Pm_TestTask",
    component: () => import("@/views/workModule/project/trialTask/List"),
    Parent: "Pm_Project",
    name: "Pm_TestTask",
    path: "pm_TestTask",
    title: i18n.t("menu.Pm_TestTask"),
  },
  // 项目成本
  {
    key: "Pm_ProjectCost",
    component: () => import("@/views/workModule/project/projectCost/List"),
    Parent: "Pm_Project",
    name: "Pm_ProjectCost",
    path: "pm_ProjectCost",
    title: i18n.t("menu.Pm_ProjectCost"),
  },
  // 基础数据
  {
    key: "Pm_BaseData",
    component: () => import("@/views/workModule/project/baseData"),
    Parent: "Pm_Project",
    name: "Pm_BaseData",
    path: "pm_BaseData",
    title: i18n.t("menu.Pm_BaseData"),
  },
  // 项目任务工序
  {
    key: "Pm_Process",
    component: () =>
      import("@/views/workModule/project/baseData/processes/List"),
    Parent: "Pm_BaseData",
    name: "Pm_Process",
    path: "pm_Process",
    title: i18n.t("menu.Pm_Processes"),
  },
  // 成本预算表
  {
    key: "Pm_BudgetCost",
    component: () => import("@/views/workModule/project/budgetCost/List"),
    Parent: "Pm_Project",
    name: "Pm_BudgetCost",
    path: "pm_BudgetCost",
    title: i18n.t("menu.Pm_BudgetCost"),
  },
  // 成本透视表
  {
    key: "Pm_PivotTable",
    component: () => import("@/views/workModule/project/projectCost/PivotTable"),
    Parent: "Pm_Project",
    name: "Pm_PivotTable",
    path: "Pm_PivotTable",
    title: i18n.t("project.Pro_Cost")+i18n.t("project.Pro_PivotTable"),
  },
  // 制造结算表
  {
    key: "Pm_MakeCalculation",
    component: () => import("@/views/workModule/project/makeCalculation/List"),
    Parent: "Pm_Project",
    name: "Pm_MakeCalculation",
    path: "pm_MakeCalculation",
    title: i18n.t("menu.Pm_MakeCalculation"),
  },
];

export default project;
