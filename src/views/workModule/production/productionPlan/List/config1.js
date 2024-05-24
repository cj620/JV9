/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2024-05-24 11:09:59
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "~/class/table";
// 获取客户接口
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
// 引入模块API接口
import { production_task_process_list } from "@/api/workApi/production/productionTask";
import { itemList } from "@/api/basicApi/systemSettings/Item";
import {
  getAllProcess,
  getAllResource,
  getAllDevice,
} from "@/api/workApi/production/baseData";
import {
  taskTypeEnum,
  enumToList,
  ProcessState,
  ProductionTaskState,
  enumFilter,
} from "@/enum/workModule";

// import { enumFilter } from "~/utils/system/enumsPlugin";
import i18n from "@/i18n/i18n";

export class api extends TableAPI {
  // 获取列表
  getData = production_task_process_list;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema,
      // 行标识
      rowId: "Id",
      // 表格标题
      title: "生产计划",
      // 接口类
      api,
      // 操作列宽度
      operationWidth: 110,
      operationCol: false,
      // 打印模块标识
      printMod: "Pr_TaskProcess",
      sortCol: false,
    });
  }
}
//  表格配置
export const tableConfig = [
  // {
  //   prop: "BillId",
  //   label: i18n.t("Generality.Ge_BillId"),
  //   align: "center",
  //   cpn: "Link",
  //   width: 150,
  //   cpnProps: {
  //     // 路由名称
  //     routeName: "ProductionTaskDetails",
  //     // 路由路径（名称和路径二选一）
  //     // routePath:'/dashboard',
  //     // 路由传参方式 默认query
  //     methods: "query",
  //     // 传参的键名，值为当前数据
  //     parameterKey: "BillId",
  //     // 补充动态参数
  //     moreDynamicParameters: [
  //       {
  //         keyName: "ItemId",
  //         valueName: "ItemId",
  //       },
  //     ],
  //   },
  // },
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: 150,
  },
  /*零件*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    width: 150,
  },
  /*产品*/
  // {
  //   prop: "PartName",
  //   label: i18n.t("Generality.Ge_PartName"),
  //   width: 150,
  // },
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    width: 70,
    customFilter: (value) => enumFilter(value, ProductionTaskState),
  },
  /*任务单号*/
  // {
  //   prop: "PmTaskBillId",
  //   label: i18n.t("project.Pro_TaskSheetNo"),
  //   width: 150,
  // },
  /*任务类别*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    customFilter: (value) => enumFilter(value, taskTypeEnum),
    width: 150,
  },
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: 150,
  },
  /*工序内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_ProcessInfo"),
    width: 150,
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
  },
  /*计划开始*/
  {
    prop: "ItemPlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
    width: "150px",
  },
  /*计划结束*/
  {
    prop: "ItemPlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: "150px",
  },
  /*实际用时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
  },
  /*实际开始*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    filter: "date",
  },
  /*实际结束*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    filter: "date",
  },
  {
    //   计划设备
    prop: "PlanDevice",
    label: i18n.t("production.Pr_PlanningDevices"),
  },
  {
    // 实际设备
    prop: "ActualDevice",
    label: i18n.t("production.Pr_ActualDevice"),
  },
  {
    prop: "IsCompulsoryInspection",
    label: i18n.t("setup.IsCompulsoryInspection"),
    customFilter(item) {
      return item ? i18n.t("Generality.Ge_Yes") : i18n.t("Generality.Ge_No");
    },
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    width: "150px",
  },
];
// 表单配置
export const formSchema = [
  //单号搜索
  // {
  //   prop: "BillId",
  //   label: i18n.t("Generality.Ge_BillId"),
  //   cpn: "FormInput",
  // },
  //零件搜索
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
    cpn: "FormInput",
  },
  //模号搜索 Ge_ToolingName
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    cpn: "AsyncSearch",
    api: itemList,
    apiOptions: {
      keyName: "ItemName",
      showValue: true,
      valueName: "ItemId",
      params: {
        ItemCategory: "Tooling",
      },
    },
  },
  {
    // 工序
    prop: "Processes",
    cpn: "SyncSelect",
    label: i18n.t("Generality.Ge_Process"),
    api: getAllProcess,
    type: "multiple",
    apiOptions: {
      // immediate: true,
      keyName: "Process",
      valueName: "Process",
    },
  },
  {
    // 状态
    prop: "States",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    type: "multiple",
    options: {
      list: enumToList(ProductionTaskState),
    },
  },
  /*资源组*/
  {
    prop: "Resources",
    label: i18n.t("Generality.Ge_Resource"),
    cpn: "SyncSelect",
    api: getAllResource,
    type: "multiple",
    apiOptions: {
      // immediate: true,
      keyName: "ResourceId",
      valueName: "ResourceId",
    },
  },
  /*计划机台*/
  {
    prop: "PlanDevices",
    label: i18n.t("production.Pr_PlanningDevices"),
    cpn: "SyncSelect",
    api: getAllDevice,
    type: "multiple",
    apiOptions: {
      keyName: "Device",
      valueName: "DeviceNo",
      desName: "DeviceNo",
    },
  },
  {
    // 计划开始
    prop: "ItemPlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    cpn: "SingleDateTime",
  },
  {
    // 计划开始
    prop: "ItemPlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    cpn: "SingleDateTime",
  },
];
