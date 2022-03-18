/*
 * @Author: H.
 * @Date: 2021-11-24 13:57:10
 * @LastEditTime: 2022-01-24 17:27:47
 * @Description:
 */

import { getAll } from "@/api/basicApi/systemSettings/currency";
export const formSchema = [
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
    custom: true,
  },
  {
    prop: "SortOrder",
    label: i18n.t("production.Pr_SortOrder"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "CostRate",
    label: i18n.t("production.Pr_CostRate"),
    cpn: "FormInput",
  },
  {
    prop: "StartScale",
    label: i18n.t("production.Pr_StartScale"),
    cpn: "FormInput",
  },
  {
    prop: "EndScale",
    label: i18n.t("production.Pr_EndScale"),
    cpn: "FormInput",
  },
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "Design",
          label: i18n.t("menu.De_Design"),
        },
        {
          value: "Program",
          label: i18n.t("menu.Pa_Program"),
        },
        {
          value: "Production",
          label: i18n.t("menu.Pr_Production"),
        },
        {
          value: "Other",
          label: i18n.t("production.Pr_Other"),
        },
      ],
    },
  },
];
