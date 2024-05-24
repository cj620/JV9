/*
 * @Author: your name
 * @Date: 2021-11-05 10:19:55
 * @LastEditTime: 2022-03-23 17:51:56
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
    name: i18n.t("systemSetupData.Design"),
    value: "Design",
  },
  Program: {
    name: i18n.t("menu.Pa_Program"),
    value: "Program",
  },
  Production: {
    name: i18n.t("systemSetupData.Production"),
    value: "Production",
  },
  Assy: {
    name: i18n.t("production.Pr_Assy"),
    value: "Assy",
  },
  TrialTooling: {
    name: i18n.t("production.Pr_TestTooling"),
    value: "TrialTooling",
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
// 模具状态枚举
export const ItemToolingStateEnum = {
  Started: {
    name: i18n.t("project.Pro_Started"),
    value: "Started"
  },
  Locked: {
    name: i18n.t("project.Pro_Locked"),
    value: "Locked"
  },
  Designing: {
    name: i18n.t("project.Pro_Designing"),
    value: "Designing"
  },
  Processing: {
    name: i18n.t("project.Pro_Processing"),
    value: "Processing"
  },
  TrialTooling: {
    name: i18n.t("project.Pro_TrialTooling"),
    value: "TrialTooling"
  },
  Completed: {
    name: i18n.t("project.Pro_Completed"),
    value: "Completed"
  }
}
// 项目任务明细点检状态枚举
export const ProjectTaskItemInspectionStateEnum = {
  Unchecked: {
    name: i18n.t("project.Pro_Unchecked"),
    value: "Unchecked",
  },
  Checked: {
    name: i18n.t("project.Pro_Checked"),
    value: "Checked",
  }
}
