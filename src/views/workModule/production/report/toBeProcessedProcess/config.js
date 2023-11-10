/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-08-24 18:05:59
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '~/class/table'
// 获取客户接口
import { getAllSalesCustomer } from "@/api/workApi/sale/customer";
// 引入模块API接口
import { production_task_process_list } from "@/api/workApi/production/productionTask";
import {ProcessState, } from "@/enum/workModule";
  import { itemList } from "@/api/basicApi/systemSettings/Item";
  import { getAllProcess } from "@/api/workApi/production/baseData";

export class api extends TableAPI {
  // 获取列表
  getData = production_task_process_list;

}
export class Table extends BaseTable {
  constructor() {
    super( {
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema,
      // 行标识
      rowId: 'Id',
      // 表格标题
      title: i18n.t('production.Pr_SummaryProcessesToBeProcessed'),
      // 接口类
      api,
      // 操作列宽度
      operationWidth:110,
      operationCol: false,
      // 打印模块标识
      printMod:'Pr_ToBeProcessedProcess',
    })
  }
}
//  表格配置
export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "ProductionTaskDetails",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
      moreDynamicParameters:[
        {
          keyName:'ItemId',
          valueName:'ItemId'
        }
      ],
    }
  },
  /*产品*/
  {
    prop: "ToolingNo",
    label: '产品',
  },
    /*零件*/
    {
      prop: "PartNo",
      label: '零件编号',
    },
        /*产品*/
  {
    prop: "PartName",
    label: '零件名称',
  },
    /*状态*/
    {
        prop: "ItemState",
        label: '状态',
        customFilter: (value) => {
            if (!value) return "";
            return ProcessState[value].name;
          },

      },
  {
    prop: "Process",
    label: '工序',
  },
  {
    prop: "PlanTime",
    label: '预计工时',
  },
   /*计划开始*/
   {
    prop: "PlanStart",
    label: '计划开始',
    filter: "time",
    width:'150px',

  },
  /*计划结束*/
  {
    prop: "PlanEnd",
    label: '计划结束',
    filter: "time",
    width:'150px',

  },
   /*备注*/
   {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    width:'150px',
  },
]
// 表单配置
export const formSchema = [
  //单号搜索
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
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
        showValue:true,
        valueName: "ItemId",
        params:{
          ItemCategory:'Tooling'
        }
      },
  },
  {
    // 工序
    prop: "Processes",
    cpn: "SyncSelect",
    label: '工序',
    api: getAllProcess,
    type:'multiple',
    apiOptions: {
      immediate: true,
      keyName: "Process",
      valueName: "Process",
    },
  },
  {
     // 状态
    prop: "ItemState",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    options: {
      list: [
        {
          value: "ToBeReceived",
          label: '待入站',
        },
        {
          value: "Received",
          label: '已入站',
        },

      ],
    },
  },

]
