/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2024-07-08 10:14:11
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllProjectProcess } from "@/api/workApi/project/baseData";
import { enumFilter, enumToList } from "~/utils/system/enumsPlugin";
import { processTypeEnum } from "@/enum/workModule";
import { PrTaskType } from "@/enum/workModule/production/PrTaskType";
export class api extends TableAPI {
  getData = getAllProjectProcess;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "Id",
      title: i18n.t("menu.Pm_Process"),
      api,
      operationWidth: 110,
      sortCol: false,
      searchBar: false,
      pagination: false,
    });
  }
}

export const tableConfig = [
  /*任务工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: 120,
  },
  /*序号*/
  {
    prop: "SortOrder",
    label: i18n.t("production.Pr_SortOrder"),
    width: 100,
  },
  /*工作内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_WorkContent"),
  },
  /*标准费率*/
  {
    prop: "CostRate",
    label: i18n.t("production.Pr_CostRate"),
    align: "right",
    width: 100,
  },
  /*开始比例*/
  {
    prop: "StartScale",
    label: i18n.t("production.Pr_StartScale"),
    align: "right",
    width: 100,
  },
  /*结束比例*/
  {
    prop: "EndScale",
    label: i18n.t("production.Pr_EndScale"),
    align: "right",
    width: 100,
  },
  /*部门*/
  {
    prop: "BelongingDepartment",
    label: i18n.t("menu.Se_Department"),
    width: 100,
  },
  /*工序类别*/
  {
    prop: "ProcessType",
    label: i18n.t("production.Pr_ProcessType"),
    customFilter: (value) => enumFilter(value, processTypeEnum),
    width: 100,
  },
  { label: "标准费率", prop: "StdRates" },
  { label: "目录权限", prop: "DirectoryPurview" },
  { label: "入站前状态", prop: "InSiteState" },
  { label: "上机后状态", prop: "UpState" },
  { label: "下机后状态", prop: "DownState" },
  { label: "入站后状态", prop: "InSitedBillState" },
  {
    label: "程序加工",
    prop: "NcProgram",
    customFilter: (value) => (Boolean(value) ? "是" : "否"),
  },
  {
    label: "使用电极",
    prop: "IFUsePole",
    customFilter: (value) => (Boolean(value) ? "是" : "否"),
  },
  { label: "工作周", prop: "WorkWeek" },
  { label: "开机时间段", prop: "BootTimeSpan" },
  {
    label: "是否是记录工序",
    prop: "IsRecordCraft",
    customFilter: (value) => (Boolean(value) ? "是" : "否"),
  },
  { label: "外协设备组", prop: "OutsourceEquipmentGroup" },
  {
    label: "允许同时上机",
    prop: "AllowRepetitionMachine",
    customFilter: (value) => (Boolean(value) ? "是" : "否"),
  },
  { label: "默认工时", prop: "DefaultWorkingHours" },
];

export const formSchema = [
  {
    prop: "ProcessType",
    cpn: "FormSelect",
    label: i18n.t("production.Pr_ProcessType"),
    options: {
      list: enumToList(processTypeEnum),
    },
  },
];
