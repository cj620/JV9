/*
 * @Author: H.
 * @Date: 2021-11-18 15:08:18
 * @LastEditTime: 2024-07-17 10:31:01
 * @Description:
 */

import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import {
  getAllResource,
  productionProcessList,
} from "@/api/workApi/production/baseData";
import { getDepartmentList } from "@/api/basicApi/systemSettings/department";
import { PrTaskType } from "@/enum/workModule/production/PrTaskType";
export class api extends TableAPI {
  getData = productionProcessList;
}
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      formSchema,
      rowId: "BillId",
      title: i18n.t("menu.Pr_Process"),
      api,
      operationWidth: 110,
    });
  }
}

export const tableConfig = [
  /*任务工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*工序代号*/
  {
    prop: "ProcessCode",
    label: i18n.t("production.Pr_ProcessCode"),
  },
  /*部门*/
  {
    prop: "Department",
    label: i18n.t("Generality.Ge_Department"),
  },
  /*资源组*/
  {
    prop: "Resource",
    label: i18n.t("menu.Pr_Resources"),
  },
  /*加工内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
  },
  // 前置时间
  {
    prop: "LeadTimeOfProcess",
    label: i18n.t("Generality.Ge_LeadTimeOfProcess"),
  },
  // 后置时间
  {
    prop: "PostTimeOfProcess",
    label: i18n.t("Generality.Ge_PostTimeOfProcess"),
  },
  // 是否强制检验
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    customFilter(item) {
      return item ? i18n.t("Generality.Ge_Yes") : i18n.t("Generality.Ge_No");
    },
  },
  // 编程工艺
  {
    prop: "ProgramingProcess",
    label: i18n.t("production.Pr_ProgramingProcess"),
  },
  // {
  //   label: "任务类别",
  //   prop: "ResType",
  //   customFilter: (value) => PrTaskType.getLabel(value),
  // },
  { label: "标准费率", prop: "StdRates" },
  // { label: "目录权限", prop: "DirectoryPurview" },
  // { label: "入站前状态", prop: "InSiteState" },
  // { label: "上机后状态", prop: "UpState" },
  // { label: "下机后状态", prop: "DownState" },
  // { label: "入站后状态", prop: "InSitedBillState" },
  // {
  //   label: "程序加工",
  //   prop: "NcProgram",
  //   customFilter: (value) => (Boolean(value) ? "是" : "否"),
  // },
  // {
  //   label: "使用电极",
  //   prop: "IFUsePole",
  //   customFilter: (value) => (Boolean(value) ? "是" : "否"),
  // },
  // { label: "工作周", prop: "WorkWeek" },
  // { label: "开机时间段", prop: "BootTimeSpan" },
  // {
  //   label: "是否是记录工序",
  //   prop: "IsRecordCraft",
  //   customFilter: (value) => (Boolean(value) ? "是" : "否"),
  // },
  // { label: "外协设备组", prop: "OutsourceEquipmentGroup" },
  // {
  //   label: "允许同时上机",
  //   prop: "AllowRepetitionMachine",
  //   customFilter: (value) => (Boolean(value) ? "是" : "否"),
  // },
  { label: "默认工时", prop: "DefaultWorkingHours" },
  // { label: "项目任务", prop: "ProjetctTask" },
];

export const formSchema = [
  {
    prop: "Keyword",
    cpn: "FormInput",
    label: i18n.t("Generality.Ge_KeyWords"),
  },
  {
    prop: "ResourceId",
    label: i18n.t("menu.Pr_Resources"),
    cpn: "SyncSelect",
    api: getAllResource,
    apiOptions: {
      keyName: "ResourceGroup",
      valueName: "GroupName",
    },
  },
  //部门搜索
  {
    prop: "Department",
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
];
