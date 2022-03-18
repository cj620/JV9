/*
 * @Author: your name
 * @Date: 2021-11-05 10:19:55
 * @LastEditTime: 2022-01-17 11:25:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\enum\workModule\Generality\stateEnum.js
 */
import i18n from "@/i18n/i18n.js";
// 项目类别枚举
export const projectTypeEnum = {
  Production: {
    name: i18n.t("project.Pro_Production"),
    value: "Production",
  },
  Material: {
    name: i18n.t("Generality.Ge_Items"),
    value: "Material",
  },
  Outsourcing: {
    name: i18n.t("project.Pro_Outsource"),
    value: "Outsourcing",
  },
  TrialTooling: {
    name: i18n.t("stockroom.St_TrialMold"),
    value: "TrialTooling",
  },
};

// 工序类别枚举
export const processTypeEnum = {
  Design: {
    name: "设计",
    value: "Design",
  },
  Program: {
    name: "编程",
    value: "Program",
  },
  Production: {
    name: "生产",
    value: "Production",
  },
  Other: {
    name: i18n.t("production.Pr_Other"),
    value: "Other",
  },
};
// 任务类别枚举
export const taskTypeEnum = {
  NewTooling: {
    name: i18n.t("project.Pro_NewTooling"),
    value: "NewTooling",
  },
  DesignChange: {
    name: i18n.t("project.Pro_DesignChange"),
    value: "DesignChange",
  },
  TrialTooling: {
    name: i18n.t("stockroom.St_TrialMold"),
    value: "TrialTooling",
  },
  ToolCorrection: {
    name: i18n.t("project.Pro_CorrectingTooling"),
    value: "ToolCorrection",
  },
};
// 任务状态枚举
export const taskStateEnum = {
  NotStarted: {
    name: i18n.t("project.Pro_NotStarted"),
    value: "NotStarted",
    color: "#C0C4CC",
  },
  HaveInHand: {
    name: i18n.t("project.Pro_Ongoing"),
    value: "HaveInHand",
    color: "#E6A23C",
  },
  Completed: {
    name: i18n.t("Generality.Ge_Completed"),
    value: "Completed",
    color: "#67C23A",
  },
};
