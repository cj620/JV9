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
import { assets_device_list } from "@/api/workApi/equipment/device"
// 引入模块API接口
import { API } from "@/api/workApi/equipment/maintenance";
import { maintenanceStateEnum, maintenanceEnum, enumToList } from "@/enum/workModule";
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
      title: i18n.t('menu.As_DeviceMaintain'),
      // 接口类
      api,
      // 操作列宽度
      operationWidth: 280,
      // 打印模块标识
      printMod:'As_DeviceMaintain',
    })
  }
}
//  表格配置
export const tableConfig = [
  //   单据编号
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    width: '200px',
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
    width:'120px',
    custom: true,
    // customFilter: (value) => {
    //     if (!value) return "";
    //     return maintenanceStateEnum[value].name;
    // },
  },
  //   方案名称
  {
    prop: "PlanName",
    label: i18n.t("device.De_PlanName"),
    width:'100px',
  },
  //   设备编号
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
    width:'100px',
  },
  /*设备名称*/
  {
    prop: "DeviceName",
    label: i18n.t("production.Pr_DeviceName"),
    width:'100px',
  },
  //   关联编号
  {
    prop: "AssociatedNo",
    label: i18n.t("Generality.Ge_AssociatedNo"),
    width:'160px',
  },
  //   保养方式
  {
    prop: "MaintenanceMode",
    label: i18n.t("device.De_MaintenanceMode"),
    customFilter: (value) => {
      if (!value) return "";
      return maintenanceEnum[value].name;
    },
    width:'100px',
  },
  //   保养人
  {
    prop: "Operator",
    label: i18n.t("device.De_Operator1"),
    width:'100px',
  },
  /*保养开始日期*/
  {
    prop: "MaintenanceStartDate",
    label: i18n.t("device.De_MaintenanceStartDate"),
    filter:'time',
    width: "140px",
  },
  /*保养结束日期*/
  {
    prop: "MaintenanceEndDate",
    label: i18n.t("device.De_MaintenanceEndDate"),
    filter:'time',
    width: "140px",
  },
  //   保养用时(分钟)
  {
    prop: "MaintenanceTime",
    label: i18n.t("device.De_MaintenanceTime"),
    width: "120px",
  },
  {
    // 制单人
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
    width:'100px',
  },
  {
    // 制单日期
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "140px",
  },
  {
  //   备注
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
    width:'200px',
  }
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
    cpn: "AsyncSearch",
    api: assets_device_list,
    apiOptions: {
      keyName: "DeviceNo",
      showValue: true,
      valueName: "DeviceNo",
      params: {
        PageSize: 20,
        CurrentPage: 1,
      },
    },
  },
  {
    prop: "States",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    type: "multiple",
    options: {
      list: enumToList(maintenanceStateEnum),
    },
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
