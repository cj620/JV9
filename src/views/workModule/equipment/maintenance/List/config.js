/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-06-03 15:30:01
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
// 获取设备接口
import { getAllDevice } from "@/api/workApi/production/baseData";
// 引入模块API接口
import { API } from "@/api/workApi/equipment/maintenance";
import { maintenanceEnum } from "@/enum/workModule";
// 结构
let {api_list,api_delete}=API
export class api extends TableAPI {
  // 获取列表
  getData = api_list;
  // // 删除单据
   del=api_delete
}
export class Table extends BaseTable {
  constructor() {
    super( {
      // 表格配置
      tableSchema: tableConfig,
      // 表单配置
      formSchema,
      // 行标识
      rowId: 'BillId',
      // 表格标题
      title: '',
      // 接口类
      api,
      // 操作列宽度
      operationWidth:110,
      // 打印模块标识
      printMod:'As_DeviceMaintain',
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
    innerSearch: {
      prop: "BillId",
      cpn: "FormInput",
      label: i18n.t("Generality.Ge_BillId")
    },
    cpnProps: {
      // 路由名称
      routeName: "As_DeviceMaintenanceDetail",
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
  /*状态*/
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    custom:true,
    width:'115px',
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

      {
      prop: "MaintenanceCategory",
        label: i18n.t("Generality.Ge_Category"),
        customFilter: (value) => {
          if (!value) return "";
          return maintenanceEnum[value].name;
        },
      },
      /*上次保养日期*/
      {
      prop: "MaintenanceDate",
        label: i18n.t("device.De_MaintenanceDate"),
      filter:'date'
      },
      {
        // 制单人
        prop: "Creator",
        label: i18n.t("Generality.Ge_Creator"),
      },
  {
    // 制单日期
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
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
{
  prop: "Keyword",
  label: i18n.t("Generality.Ge_KeyWords"),
  cpn: "FormInput",
},
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
    cpn: "SyncSelect",
    api: getAllDevice,
    apiOptions: {
      keyName: "DeviceNo",
      valueName: "DeviceNo",
    },
  },
//单号搜索
// {
//   prop: "BillId",
//   label: i18n.t("Generality.Ge_BillId"),
//   cpn: "FormInput",
// },
{
  // 计划开始
  prop: "StartDate",
  cpn: "SingleTime",
  label: i18n.t("Generality.Ge_StartTime"),
},
{
  // 计划开始
  prop: "EndDate",
  cpn: "SingleTime",
  label: i18n.t("Generality.Ge_EndTime"),
},
  //报修类型
  {
    prop: "DeviceCategory",
    hidden:true,
    label: i18n.t("Generality.Ge_Category"),
    cpn: "FormSelect",
    options: {
      list: []
    },
  },
]
