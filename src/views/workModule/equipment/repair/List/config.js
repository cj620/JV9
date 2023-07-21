/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-06-03 15:47:35
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import { repairEnum, enumToList } from "@/enum/workModule";
// 获取设备接口
import { getAllDevice } from "@/api/workApi/production/baseData";
// 引入模块API接口
import { API } from "@/api/workApi/equipment/repair";
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
      printMod:'As_DeviceRepair',
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
      routeName: "As_DeviceRepairDetail",
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
      /*描述*/
      {
      prop: "Remarks",
      label: i18n.t("Generality.Ge_Describe"),
      },
      {
      prop: "RepairCategory",
        label: i18n.t("Generality.Ge_Category"),
        custom: true,
        innerSearch: {
  //报修类型

    prop: "RepairCategory",
          label: i18n.t("Generality.Ge_Category"),
    cpn: "FormSelect",
    options: {
      list: enumToList(repairEnum)
    },

        }
      },
  //修理厂商
  {
    prop: "Repairer",
    label: i18n.t("device.De_Repairer"),
  },
  //报修人
  {
    prop: "RepairApplicant",
    label: i18n.t("device.De_RepairApplicant"),
  },
      /*报修日期*/
      {
      prop: "RepairDate",
        label: i18n.t("device.De_RepairDate"),
      filter:'date'
      },
      {
        // 制单人
        prop: "Creator",
        label: i18n.t("Generality.Ge_Creator"),
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
//报修类型
{
  prop: "RepairCategory",
  label: i18n.t("Generality.Ge_Category"),
  cpn: "FormSelect",
    options: {
      list: enumToList(repairEnum)
    },
  },
//报修人
{
  prop: "Repairer",
  label: '报修人',
  cpn: "FormInput",
},
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

]
