/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-06-03 17:10:24
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'

// 引入模块API接口
import { API } from "@/api/workApi/equipment/scrap";
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
      title: i18n.t('menu.As_DeviceScrap'),
      // 接口类
      api,
      // 操作列宽度
      operationWidth:110,
      // 打印模块标识
      printMod:'As_DeviceScrap',
    })
  }
}
//  表格配置
export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "As_DeviceScrapDetail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
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
      prop: "ScrapCategory",
        label: i18n.t("Generality.Ge_Category"),
      },
      /*报废日期*/
      {
      prop: "ScrapDate",
        label: i18n.t("device.De_ScrapDate"),
      filter:'time'
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
  cpn: "FormInput",
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
