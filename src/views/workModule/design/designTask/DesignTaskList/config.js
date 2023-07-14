/*
 * @Author: C.
 * @Date: 2022-02-22 16:21:55
 * @LastEditTime: 2023-06-01 16:52:04
 * @Description: file content
 */
//销售订单明细 配置文件
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getAllUserData } from "@/api/basicApi/systemSettings/user";
import { project_task_item_list } from "@/api/workApi/project/projectTask";
import { taskTypeEnum, ProductionType } from "@/enum/workModule";
import { itemList } from "@/api/basicApi/systemSettings/Item";

import { getProjectQuery } from "@/api/workApi/project/projectManage";
class api extends TableAPI {
  // 获取列表
  getData = project_task_item_list;
}
export class Table extends BaseTable {
  constructor() {
    super({
      // 表格配置
      tableSchema: tableSchema,
      // 表单配置
      formSchema: formSchema,
      // 行标识
      rowId: "Id",
      // 表格标题
      title: "",
      // 接口类
      api,
      // 打印模块标识
      printMod: "De_DesignTaskList",
      operationWidth: 280,
      printBar: false,
    });
  }
}
//  表格配置
const tableSchema = [
  {
    prop: "BillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
    align: "center",
    cpn: "Link",
    width: "150px",
    cpnProps: {
      // 路由名称
      routeName: "Pm_ProjectTask_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    },
  },
  {
    prop: "PrTaskBillId",
    label: "加工单号",
    align: "center",
    cpn: "Link",
    width: "150px",
    cpnProps: {
      // 路由名称
      routeName: "ProductionTaskDetails",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    },
  },
  /*状态*/
  {
    prop: "ItemState",
    label: i18n.t("Generality.Ge_State"),
    custom: true,
    width: "115px",
    align: "center",
    innerSearch: {
      prop: "ItemState",
      label: i18n.t("Generality.Ge_State"),
      cpn: "FormSelect",
      options: {
        list: [
          {
            value: "NotStarted",
            label: i18n.t("project.Pro_NotStarted"),
          },
          {
            value: "HaveInHand",
            label: i18n.t("project.Pro_Ongoing"),
          },
          {
            value: "Completed",
            label: i18n.t("Generality.Ge_Completed"),
          },
        ],
      },
    },
  },
  /*项目*/
  {
    prop: "Project",
    label: i18n.t("systemSetupData.Project"),
  },
  /*产品名称*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  /*任务类别*/
  {
    prop: "TaskType",
    label: "任务类别",
    customFilter: (value) => {
      if (!value) return "";
      return taskTypeEnum[value].name;
    },
  },
    /*生产类别*/
    {
      prop: "ProductionType",
      label: "生产类别",
      width: 120,
      customFilter: (value, row) => {
        if (!value) return "";
        return ProductionType[value] && ProductionType[value].name;
      },
    },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  {
    prop: "HistoryWorker",
    label: "历史负责人",
  },
  /*负责人*/
  {
    prop: "Worker",
    label: "负责人",
    innerSearch: {
      // 销售员
      prop: "Worker",
      cpn: "SyncSelect",
      label: i18n.t("project.Pro_Worker"),
      api: getAllUserData,
      apiOptions: {
        immediate: true,
        keyName: "UserName",
        valueName: "UserName",
      },
    },
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
    width: "140px",
  },
  /*计划结束*/
  {
    prop: "ItemPlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
    width: "140px",
    //custom: true,
  },
  /*备注*/
  {
    prop: "ItemRemarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
//  搜索表单配置
const formSchema = [
  //单号搜索
  {
    prop: "Keyword",
    label: "单号",
    cpn: "FormInput",
  },

  //加工单号搜索
  {
    prop: "PrTaskBillId",
    label: "加工单号",
    cpn: "FormInput",
  },
  //单号搜索
  {
    prop: "Project",
    label: i18n.t("sale.Sa_ProjectId"),
    cpn: "AsyncSearch",
    api: getProjectQuery,
    apiOptions: {
      keyName: "Project",
      valueName: "Project",
    },
  },
  //模号搜索 Ge_ToolingName
  {
    prop: "ToolingNo",
    label:
      i18n.t("Generality.Ge_ToolingNo") +
      "  /  " +
      i18n.t("Generality.Ge_ToolingName"),
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
    // 销售员
    prop: "Worker",
    cpn: "SyncSelect",
    label: i18n.t("project.Pro_Worker"),
    api: getAllUserData,
    apiOptions: {
      immediate: true,
      keyName: "UserName",
      valueName: "UserName",
    },
  },
  {
    prop: "ItemState",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "NotStarted",
          label: i18n.t("project.Pro_NotStarted"),
        },
        {
          value: "HaveInHand",
          label: i18n.t("project.Pro_Ongoing"),
        },
        {
          value: "Completed",
          label: i18n.t("Generality.Ge_Completed"),
        },
      ],
    },
  },
  //分配状态
  {
    prop: "AllocationType",
    label: "分配状态",
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "1",
          label: "已分配",
        },
        {
          value: "2",
          label: "未分配",
        },
      ],
    },
  },
  {
    prop: "SelctChildrenType",
    label: "查看任务明细",
    cpn: "FormSelect",
    default: 2,
    options: {
      list: [
        {
          value: 0,
          label: "查看父级项目任务",
        },
        {
          value: 1,
          label: "查看子任务",
        },
        {
          value: 2,
          label: "查看全部任务",
        },
      ],
    },
  },
  {
    prop: "ProjectType",
    label: "项目类别",
    cpn: "FormRadio",
    options: {
      list: [
        {
          value: "",
          label: "全部",
        },
        {
          value: "Tooling",
          label: "模具",
        },
        {
          value: "Machining",
          label: "机加",
        },
      ],
    },
  },
  // {
  //   prop: "StartDate",
  //   label: i18n.t("Generality.Ge_StartDate"),
  //   cpn: "SingleTime",
  // },
  // {
  //   prop: "EndDate",
  //   label: i18n.t("Generality.Ge_EndDate"),
  //   cpn: "SingleTime",
  // },

  // QueryAll
];
