/*
 * @Author: H.
 * @Date: 2021-11-19 10:25:28
 * @LastEditTime: 2024-07-05 14:45:45
 * @Description:
 */
import { getAllResource } from "@/api/workApi/production/baseData";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import {
  MachineType,
  EquipmenType,
} from "@/enum/workModule/equipment/machineType";
export const formSchema = [
  {
    prop: "DeviceNo",
    cpn: "FormInput",
    label: i18n.t("production.Pr_DeviceNo"),
    rules: [
      {
        required: true,
        message: i18n.t("Generality.Ge_PleaseEnter"),
        trigger: "submit",
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
        trigger: "submit",
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
        trigger: "submit",
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
        trigger: "submit",
      },
    ],
  },
  {
    prop: "ShowInProdSchedule",
    label: i18n.t("Generality.Ge_ShowInProdSchedule"),
    custom: true,
  },

  { label: "工作周", prop: "WorkWeek", cpn: "FormInput" },
  {
    label: "无限资源",
    prop: "InfinitiResource",
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
    label: "后置时间",
    prop: "PostpositionBufferTime",
    cpn: "FormInput",
    type: "number",
  },
  { label: "可用开始结束时间段", prop: "AvailableTimeSpan", cpn: "FormInput" },
  {
    label: "外协",
    prop: "IsOutsource",
    cpn: "FormRadio",
    default: false,
    options: {
      list: [
        { label: "是", value: true },
        { label: "否", value: false },
      ],
    },
  },
  { label: "效率", prop: "Efficiency", cpn: "FormInput", type: "number" },
  { label: "加班时间段", prop: "OverTimePeriods", cpn: "FormInput" },
  {
    label: "部门",
    prop: "Dept",
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
    label: "不参与自动排程",
    prop: "IsCustomSchedule",
    cpn: "FormRadio",
    default: false,
    options: {
      list: [
        { label: "是", value: true },
        { label: "否", value: false },
      ],
    },
  },
  { label: "采集编号", prop: "DeviceId", cpn: "FormInput" },
  {
    label: "资源类别",
    prop: "EquipmenType",
    cpn: "FormSelect",
    options: {
      list: EquipmenType.getEnums(),
    },
  },
  {
    label: "设备类型",
    prop: "MachineType",
    cpn: "FormSelect",
    options: {
      list: MachineType.getEnums(),
    },
  },
];
