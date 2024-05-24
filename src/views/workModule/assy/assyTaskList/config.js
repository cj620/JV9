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
import { taskTypeEnum } from "@/enum/workModule";
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
      printMod: "As_AssyTaskList",
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
    width: "120px",
  },
  /*产品名称*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
    width: "120px",
  },
  /*任务类别*/
  {
    prop: "TaskType",
    label: i18n.t("Generality.Ge_TaskType"),
    width: "120px",
    customFilter: (value) => {
      if (!value) return "";
      return taskTypeEnum[value].name;
    },
  },

  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
    width: "120px",
  },
  /*工序内容*/
  {
    prop: "ProcessContent",
    label: i18n.t("Generality.Ge_TaskContent"),
    width: 300,
  },
  /*负责人*/
  {
    prop: "Worker",
    label: i18n.t("project.Pro_Worker"),
    width: "120px",
    innerSearch: {
      // 销售员
      prop: "Worker",
      cpn: "SyncSelect",
      label: i18n.t("project.Pro_Worker"),
      api: getAllUserData,
      apiOptions: {
        // immediate: true,
        keyName: "UserName",
        valueName: "UserName",
      },
    },
  },
  /*预计工时*/
  {
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
    width: "120px",
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
    width: "180px",
  },
];
//  搜索表单配置
const formSchema = [
  //单号搜索
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },

  //加工单号搜索
  {
    prop: "PrTaskBillId",
    label: i18n.t("production.Pr_WorkSheetNo"),
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
      // immediate: true,
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
    label: i18n.t("design.De_AllocationType"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "1",
          label: i18n.t("design.De_Allocated"),
        },
        {
          value: "2",
          label: i18n.t("design.De_Unallocated"),
        },
      ],
    },
  },
  {
    prop: "SelctChildrenType",
    label: i18n.t("project.Pro_ViewTaskDetails"),
    cpn: "FormSelect",
    default: 2,
    options: {
      list: [
        {
          value: 0,
          label: i18n.t("project.Pro_ViewParentProjectTasks"),
        },
        {
          value: 1,
          label: i18n.t("project.Pro_ViewSubtasks"),
        },
        {
          value: 2,
          label: i18n.t("project.Pro_ViewAllTasks"),
        },
      ],
    },
  },

];
