/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2024-07-05 14:30:07
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {
  getAllResource,
  production_device_list,
} from "@/api/workApi/production/baseData";
import {
  MachineType,
  EquipmenType,
} from "@/enum/workModule/equipment/machineType";
export class api extends TableAPI {
  getData = production_device_list;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "DeviceNo",
      title: i18n.t("menu.Pr_Devices"),
      api,
      operationWidth: 110,
      // searchBar: false,
      printMod: "Pr_Devices",
    });
  }
}

export const tableConfig = [
  // 图片
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: "Image",
    width: "60px",
  },
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
  },
  /*设备名称*/
  {
    prop: "Device",
    label: i18n.t("production.Pr_DeviceName"),
  },
  /*有效时间范围*/
  {
    prop: "TimeSpan",
    label: i18n.t("production.Pr_TimeSpan"),
  },
  /*标准费率*/
  {
    prop: "CostRate",
    label: i18n.t("production.Pr_CostRate"),
    align: "right",
  },
  {
    prop: "MaxQuantiyUpMachine",
    label: i18n.t("production.Pr_MaximumNumberOfWorkSheet"),
    align: "right",
  },
  {
    prop: "ShowInProdSchedule",
    label: i18n.t("Generality.Ge_ShowInProdSchedule"),
    custom: true,
  },
  { label: "工作周", prop: "WorkWeek" },
  {
    label: "无限资源",
    prop: "InfinitiResource",
    customFilter: (value) => (Boolean(value) ? "是" : "否"),
  },
  { label: "后置时间", prop: "PostpositionBufferTime" },
  { label: "可用开始结束时间段", prop: "AvailableTimeSpan" },
  {
    label: "外协",
    prop: "IsOutsource",
    customFilter: (value) => (Boolean(value) ? "是" : "否"),
  },
  { label: "效率", prop: "Efficiency" },
  { label: "加班时间段", prop: "OverTimePeriods" },
  // { label: "部门", prop: "Dept" },
  {
    label: "不参与自动排程",
    prop: "IsCustomSchedule",
    customFilter: (value) => (Boolean(value) ? "是" : "否"),
  },
  { label: "采集编号", prop: "DeviceId" },
  {
    label: "资源类别",
    prop: "EquipmenType",
    customFilter: (value) => EquipmenType.getLabel(value),
  },
  {
    label: "设备类型",
    prop: "MachineType",
    customFilter: (value) => MachineType.getLabel(value),
  },
];

export const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  {
    prop: "ResourceId",
    label: i18n.t("menu.Pr_Resources"),
    cpn: "SyncSelect",
    api: getAllResource,
    apiOptions: {
      keyName: "ResourceGroup",
      valueName: "ResourceId",
    },
  },
];
