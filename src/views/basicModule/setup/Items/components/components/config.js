/*
 * @Author: your name
 * @Date: 2021-10-29 13:08:12
 * @LastEditTime: 2022-02-28 14:57:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\views\basicModule\setup\Items\editMaterials\components\config.js
 */
import { materialInfoAttribute } from "@/api/basicApi/systemSettings/Item";
import { getAllUnit } from "@/api/basicApi/systemSettings/unit";
import { getAllItemType } from "@/api/basicApi/systemSettings/ItemType";

export const formSchema = [
  {
    // 字段名
    prop: "code",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_ItemId"),
    rules: [
      {
        required: true,
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "name",
    label: i18n.t("Generality.Ge_ItemsName"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
        trigger: ["change", "blur"],
      },
    ],
  },
  {
    prop: "materialAttribute",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_ItemsAttribute"),
    api: materialInfoAttribute,
    apiOptions: {
      // 立即调接口
      immediate: true,
      keyName: "attributeName",
      valueName: "id",
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
    prop: "materialCategory",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_ItemsCategory"),
    api: getAllItemType,
    apiOptions: {
      // 立即调接口
      immediate: true,
      keyName: "name",
      valueName: "id",
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
    prop: "basicUnit",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_BasicUnit"),
    api: getAllUnit,
    apiOptions: {
      // 立即调接口
      immediate: true,
      keyName: "name",
      valueName: "id",
    },
  },
];
