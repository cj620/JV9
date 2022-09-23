/*
 * @Author: H.
 * @Date: 2021-12-09 15:20:07
 * @LastEditTime: 2022-09-01 19:15:35
 * @Description:
 */
// 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getProductionPlan } from "@/api/workApi/production/plan";
import {
  getAllDevice,
  getAllProcess,
} from "@/api/workApi/production/baseData";
class api extends TableAPI {
  // 获取列表
  getData = getProductionPlan;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 表单配置
      formSchema: formSchema,
      // 行标识
      rowId: "BillId",
      title: i18n.t("menu.Pr_ProductionPlan"),
      // 接口类
      api,
      // 打印模块标识
      printMod: "",
      operationCol: false,
    });
  }
}
//  表格配置
const tableSchema = [
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  {
    prop: "ProcessName",
    label: i18n.t("Generality.Ge_Process"),
    width:'100px',
  },
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width:'100px',
  },
  {
    prop: "PlanDevice",
    label: i18n.t("production.Pr_ScheduledResources"),
    width:'100px',
  },
  {
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: 150,
  },
  {
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: 150,
  },
];
//  搜索表单配置
const formSchema = [
  {
    prop: "PlanDevice",
    label: '设备',
    cpn: "SyncSelect",
    api: getAllDevice,
    apiOptions: {
      keyName: "Device",
      valueName: "DeviceNo",
    },
  },
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    cpn: "SyncSelect",
    api: getAllProcess,
    apiOptions: {
      keyName: "Process",
      valueName: "Process",
    },
  },
];
