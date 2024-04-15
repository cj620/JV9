/*
 * @Author: H.
 * @Date: 2021-11-19 10:25:28
 * @LastEditTime: 2022-01-24 17:21:58
 * @Description:
 */
import { getAllResource } from "@/api/workApi/production/baseData";

export const formSchema = [
  {
    prop: "DeviceNo",
    cpn: "FormInput",
    label: i18n.t("production.Pr_DeviceNo"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: 'submit',
      },
    ],
    custom: true,
  },
  {
    prop: "Device",
    cpn: "FormInput",
    label: i18n.t("production.Pr_DeviceName"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: 'submit',
      },
    ],
    custom: true,
  },
  {
    prop: "TimeSpan",
    custom: true,
    label: i18n.t("production.Pr_TimeSpan"),
    cpnProps: {
      isRange: true,
      valueFormat: "HH:dd:ss",
    },
  },
  {
    prop: "CostRate",
    cpn: "FormInput",
    label: i18n.t("production.Pr_CostRate"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: 'submit',
      },
    ],
  },
  {
    prop: "MaxQuantiyUpMachine",
    label: i18n.t("production.Pr_MaximumNumberOfWorkSheet"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: 'submit',
      },
    ],
  },
  {
    prop: "ShowInProdSchedule",
    label: i18n.t("Generality.Ge_ShowInProdSchedule"),
    custom: true,

  },
];
