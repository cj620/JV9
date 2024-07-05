/*
 * @Author: H.
 * @Date: 2021-11-19 10:25:28
 * @LastEditTime: 2024-07-05 15:14:50
 * @Description:
 */
import { getAllResource } from "@/api/workApi/production/baseData";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { PrTaskType } from "@/enum/workModule/production/PrTaskType";
export const formSchema = [
  //   工序
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
  // 工序代号
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
  //部门搜索
  {
    prop: "Department",
    label: i18n.t("menu.Se_Department"),
    cpn: "SyncSelect",
    api: getDepartmentList,
    apiOptions: {
      immediate: true,
      tree: true,
      treeProps: {
        children: "Children",
        keyName: "Department",
        valueName: "Department",
      },
    },
  },
  // 加工内容
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
  // 资源组
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
  // 前置时间
  {
    prop: "LeadTimeOfProcess",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_LeadTimeOfProcess"),
  },
  // 后置时间
  {
    prop: "PostTimeOfProcess",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_PostTimeOfProcess"),
  },
  // 是否强制检验
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    cpn: "FormSingleCheckBox",
    options: {
      CheckBoxlabel: "",
    },
  },
  // 加工工艺
  {
    prop: "ProgramingProcess",
    cpn: "FormSelect",
    label: i18n.t("production.Pr_ProgramingProcess"),
    custom: true,
  },

  {
    label: "任务类别",
    prop: "ResType",
    cpn: "FormSelect",
    options: {
      list: PrTaskType.getEnums(),
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
  // { label: "项目任务", prop: "ProjetctTask", cpn: "FormInput" },
];
