/*
 * @Author: H.
 * @Date: 2021-11-29 15:23:33
 * @LastEditTime: 2022-01-19 09:17:38
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getCalendar } from "@/api/workApi/production/baseData";

export class api extends TableAPI {
  getData = getCalendar;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Pr_Calendar"),
      api,
      operationWidth: 110,
      pagination: false,
      searchBar: false,
    });
  }
}

export const tableConfig = [
  /*日历类别*/
  {
    prop: "WorkType",
    label: i18n.t("Generality.Ge_UsageStatus"),
    custom: true,
  },
  /*重复类型*/
  {
    prop: "RepeatType",
    label: i18n.t("production.Pr_RepetitionType"),
    custom: true,
  },
  /*开始时间*/
  {
    prop: "StartTime",
    label: i18n.t("Generality.Ge_StartDate"),
    custom: true,
  },
  /*结束时间*/
  {
    prop: "EndTime",
    label: i18n.t("Generality.Ge_EndDate"),
    custom: true,
  },
  /*创建时间*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreateDate"),
    filter: "time",
  },
  /*设备列表*/
  {
    prop: "EquipmentList",
    label: i18n.t("production.Pr_DevicesList"),
  },
  /*是否启用*/
  {
    prop: "Enable",
    label: i18n.t("Generality.Ge_Enable"),
    custom: true,
  },
];

export const formSchema = [];
