/*
 * @Author: H.
 * @Date: 2021-11-19 10:25:28
 * @LastEditTime: 2022-01-24 17:25:01
 * @Description:
 */
import { getAllResource } from "@/api/workApi/production/baseData";

export const formSchema = [
  {
    prop: "Process",
    cpn: "FormInput",

    label: i18n.t("Generality.Ge_Process"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
    custom: true,
  },
  {
    prop: "ProcessCode",
    cpn: "FormInput",
    label: i18n.t("production.Pr_ProcessCode"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
    custom: true,
  },
  {
    prop: "ProcessContent",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_TaskContent"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "Resource",
    cpn: "SyncSelect",
    label: i18n.t("menu.Pr_Resources"),
    api: getAllResource,
    apiOptions: {
      immediate: true,
      keyName: "Resource",
      valueName: "ResourceId",
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
    prop: "LeadTimeOfProcess",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_LeadTimeOfProcess"),
  },
  {
    prop: "PostTimeOfProcess",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_PostTimeOfProcess"),
  },
];
