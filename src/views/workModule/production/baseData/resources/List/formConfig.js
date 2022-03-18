/*
 * @Author: H.
 * @Date: 2021-11-19 14:31:16
 * @LastEditTime: 2022-01-24 08:53:37
 * @Description:
 */
import { getAllDevice } from "@/api/workApi/production/baseData";

export const formSchema = [
  {
    // 字段名
    prop: "ResourceId",
    cpn: "FormInput",
    label: i18n.t("menu.Pr_Resources"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "ResourceType",
    label: i18n.t("Generality.Ge_ResourceType"),
    cpn: "FormSelect",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
        trigger: ["change", "blur"],
      },
    ],
    options: {
      list: [
        {
          value: "Default",
          label: i18n.t("production.Pr_Inside"),
        },
        {
          value: "Unlimited",
          label: i18n.t("production.Pr_Outside"),
        },
      ],
    },
  },
];

export const formSchema1 = [
  {
    prop: "DeviceNo",
    cpn: "SyncSelect",
    label: i18n.t("menu.Pr_Resources"),
    api: getAllDevice,
    apiOptions: {
      immediate: true,
      keyName: "DeviceNo",
      valueName: "DeviceNo",
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
    prop: "Master",
    custom: true,
    label: "Master",
  },
];
