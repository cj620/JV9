/*
 * @Author: H.
 * @Date: 2021-11-30 15:53:59
 * @LastEditTime: 2022-01-17 10:38:59
 * @Description:
 */
import { getAllProcess } from "@/api/workApi/production/baseData";

export const formSchema = [
  {
    // 模具编号
    prop: "ToolingNo",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpnProps: {
      disabled: true,
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
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
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 零件名称
    prop: "PartName",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_PartName"),
    cpnProps: {
      disabled: true,
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    custom: true,
  },

  {
    // 作业员
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
    custom: true,
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    // 部门
    prop: "Department",
    cpn: "FormInput",
    label: i18n.t("menu.Se_Department"),
    cpnProps: {
      disabled: true,
    },
  },
  {
    // 数量
    prop: "Quantity",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_Quantity"),
    type: "number",
    cpnProps: {
      disabled: true,
    },
  },

  {
    // 处理结果
    prop: "CheckResult",
    cpn: "FormSelect",
    label: i18n.t("quality.Qc_CheckResult"),
    options: {
      list: [
        {
          value: "Rework",
          label: i18n.t("quality.Qc_Rework"),
        },
        {
          value: "Scrap",
          label: i18n.t("quality.Qc_Scrapped"),
        },
      ],
    },
  },
  /*日期*/
  {
    prop: "CheckDate",
    label: i18n.t("quality.Qc_CheckDate"),
    filter: "time",
    cpn: "SingleTime",
  },
  /*预估损失*/
  {
    prop: "EstimatedLoss",
    label: i18n.t("quality.Qc_EstimatedLoss"),
    cpn: "FormInput",
    type: "number",
    rules: [
      {
        required: true,
        trigger: ["change", "blur"],
      },
    ],
  },
];
