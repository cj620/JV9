/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-06-03 15:47:35
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import {repairEnum1, enumToList, repairStateEnum, repairResultEnum } from "@/enum/workModule";
// 获取设备接口
import { assets_device_list } from "@/api/workApi/equipment/device"
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
      title: i18n.t("menu.As_DeviceRepair"),
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
    cpnProps: {
      // 路由名称
      routeName: "As_DeviceRepairDetail",
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
  },
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
  },
  /*设备名称*/
  {
    prop: "DeviceName",
    label: i18n.t("production.Pr_DeviceName"),
  },
  {
    prop: "RepairCategory",
    label: i18n.t("device.De_RepairCategory"),
    customFilter: (value) => {
      if (!value) return "";
      return repairEnum1[value].name;
    },
  },
  //修理厂商
  {
    prop: "Repairer",
    label: i18n.t("device.De_Repairer"),
  },
  //维修结果
  {
    prop: "RepairResults",
    label: i18n.t("device.De_RepairResults"),
    customFilter: (value) => {
      if (!value) return "";
      return repairResultEnum[value].name;
    },
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
    filter:'time'
  },
  /*备注*/
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]

// 表单配置
export const formSchema = [
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
  //报修类型
  {
    prop: "RepairCategory",
    label: i18n.t("Generality.Ge_Category"),
    cpn: "FormSelect",
    options: {
      list: enumToList(repairEnum1)
    },
  },
  {
    prop: "States",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    type: "multiple",
    options: {
      list: enumToList(repairStateEnum),
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
