/*
 * @Author: H.
 * @Date: 2021-11-30 15:53:59
 * @LastEditTime: 2022-01-14 13:17:19
 * @Description:
 */
import { getAllProcess } from "@/api/workApi/production/baseData";

export const formSchema = [
  {
    // 模具编号
    prop: "ToolingNo",
    custom: true,
    label: i18n.t("Generality.Ge_ToolingNo"),
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
    custom: true,
    label: i18n.t("Generality.Ge_PartNo"),
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
    cpn: "SyncSelect",
    api: getAllProcess,
    apiOptions: {
      keyName: "Process",
      valueName: "ProcessCode",
    },
  },

  {
    // 作业员
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
    custom: true,
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
  },

  {
    // 检验结果
    prop: "CheckResult",
    cpn: "FormSelect",
    label: i18n.t("quality.Qc_CheckResult"),
    options: {
      list: [
        {
          value: "Qualified",
          label: i18n.t("quality.Qc_Qualified"),
        },
        {
          value: "Unqualified",
          label: i18n.t("quality.Qc_Unqualified"),
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
];
