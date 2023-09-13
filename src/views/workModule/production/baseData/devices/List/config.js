/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2022-01-25 10:45:54
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { production_device_list } from "@/api/workApi/production/baseData";

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
      searchBar: false,
      printMod: "Pr_Devices",
    });
  }
}

export const tableConfig = [
  // 图片
  {
    prop: "PhotoUrl",
    label: i18n.t("Generality.Ge_PhotoUrl"),
    cpn: 'Image',
    width: '60px'
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
];

export const formSchema = [];
