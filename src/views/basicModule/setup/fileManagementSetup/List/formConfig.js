/*
 * @Author: your name
 * @Date: 2021-11-01 14:35:10
 * @LastEditTime: 2021-11-01 15:11:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\views\basicModule\setup\currency\formConfig.js
 */

import { getAllRole } from "@/api/basicApi/systemSettings/role";
export const formSchema = [
  {
    prop: "FolderName",
    label: i18n.t("setup.FolderName"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
      },
    ],
  },
  {
    prop: "SubFolder",
    label: i18n.t("setup.SubfolderName"),
    cpn: "FormInput",
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseFillIn"),
      },
    ],
  },
  {
    prop: "PopedomRead",
    cpn: "SyncSelect",
    label: i18n.t("setup.ReadOnlyRights"),
    api: getAllRole,
    apiOptions: {
      // 立即调接口
      immediate: true,
      keyName: "RoleName",
      valueName: "RoleId",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
      },
    ],
  },
  {
    prop: "PopedomWrite",
    cpn: "SyncSelect",
    label: i18n.t("setup.EditPermissions"),
    api: getAllRole,
    apiOptions: {
      // 立即调接口
      immediate: true,
      keyName: "RoleName",
      valueName: "RoleId",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
      },
    ],
  },
  {
    prop: "ApproveName",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_AuditAuthority"),
    api: getAllRole,
    apiOptions: {
      // 立即调接口
      immediate: true,
      keyName: "RoleName",
      valueName: "RoleId",
    },
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseSelect"),
      },
    ],
  },
];
