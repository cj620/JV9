/*
 * @Author: H.
 * @Date: 2021-11-24 13:57:10
 * @LastEditTime: 2024-07-08 10:15:27
 * @Description:
 */
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { getAll } from "@/api/basicApi/systemSettings/currency";
import { enumToList } from "~/utils/system/enumsPlugin";
import { processTypeEnum } from "@/enum/workModule";
import { PrTaskType } from "@/enum/workModule/production/PrTaskType";

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
    prop: "BelongingDepartment",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(processTypeEnum),
    },
  },
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
    cpn: "FormInput",
    cpnProps: {
      type: "textarea",
    },
  },
  { label: "标准费率", prop: "StdRates", cpn: "FormInput", type: "number" },
  { label: "目录权限", prop: "DirectoryPurview", cpn: "FormInput" },
  { label: "入站前状态", prop: "InSiteState", cpn: "FormInput" },
  { label: "上机后状态", prop: "UpState", cpn: "FormInput" },
  { label: "下机后状态", prop: "DownState", cpn: "FormInput" },
  { label: "入站后状态", prop: "InSitedBillState", cpn: "FormInput" },
  {
    label: "程序加工",
    prop: "NcProgram",
    cpn: "FormRadio",
    default: false,
    options: {
      list: [
        { label: "是", value: true },
        { label: "否", value: false },
      ],
    },
  },
  {
    label: "使用电极",
    prop: "IFUsePole",
    cpn: "FormRadio",
    default: false,
    options: {
      list: [
        { label: "是", value: true },
        { label: "否", value: false },
      ],
    },
  },
  { label: "工作周", prop: "WorkWeek", cpn: "FormInput" },
  { label: "开机时间段", prop: "BootTimeSpan", cpn: "FormInput" },
  {
    label: "是否是记录工序",
    prop: "IsRecordCraft",
    cpn: "FormRadio",
    default: false,
    options: {
      list: [
        { label: "是", value: true },
        { label: "否", value: false },
      ],
    },
  },
  { label: "外协设备组", prop: "OutsourceEquipmentGroup", cpn: "FormInput" },
  {
    label: "允许同时上机",
    prop: "AllowRepetitionMachine",
    cpn: "FormRadio",
    default: false,
    options: {
      list: [
        { label: "是", value: true },
        { label: "否", value: false },
      ],
    },
  },
  {
    label: "默认工时",
    prop: "DefaultWorkingHours",
    cpn: "FormInput",
    type: "number",
  },
];
