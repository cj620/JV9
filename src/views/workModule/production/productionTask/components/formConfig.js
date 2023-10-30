/*
 * @Author: your name
 * @Date: 2021-11-08 13:26:31
 * @LastEditTime: 2022-01-14 14:06:05
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \V9_Dev\src\views\workModule\sale\saleOrder\components\formConfig.js
 */
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
export const formSchema = [
  {
    // 模具编号
    prop: "ToolingNo",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_ToolingNo"),
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 任务单号
    prop: "PmTaskBillId",
    cpn: "SyncSelect",
    label: i18n.t("project.Pro_TaskSheetNo"),

    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 零件编号
    prop: "PartNo",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_PartNo"),
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 零件名称
    prop: "PartName",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_PartName"),
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 描述
    prop: "PartInfo",
    cpn: "FormInput",
    cpnProps: {
      disabled: true,
    },
    label: i18n.t("Generality.Ge_Describe"),
  },

  {
    // 计划开始
    prop: "PlanStart",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_PlanStart"),
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 计划结束
    prop: "PlanEnd",
    cpn: "SingleTime",
    label: i18n.t("Generality.Ge_PlanEnd"),
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 级别
    prop: "Level",
    label: i18n.t("Generality.Ge_Level"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "Ordinary",
          label: i18n.t("Generality.Ge_Ordinary"),
        },
        {
          value: "Urgent",
          label: i18n.t("Generality.Ge_Urgent"),
        },
        {
          value: "ExtraUrgent",
          label: i18n.t("Generality.Ge_ExtraUrgent"),
        },
      ],
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 数量
    prop: "Quantity",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Quantity"),
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 是否需要成品检测
    prop: "IsFinishedProductInspection",
    label: '是否需要成品检测',
    cpn: "FormSingleCheckBox",
    options: {
      CheckBoxlabel: ''
    },
  }
];
