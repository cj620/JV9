/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-06-03 16:38:18
 * @Description: file content
 */
// 引入表格表格类和表格API类
import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'


import { API} from "@/api/workApi/equipment/device";
import { deviceStateEnum,machineCategoryEnum,maintenanceEnum, enumToList,inventoryStateEnum } from "@/enum/workModule";
// 结构
let {api_list,api_delete}=API

export class api extends TableAPI {
  getData = api_list;
  // 删除单据
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
      printMod:'As_Assets_List',
    })
  }
}
//  表格配置
export const tableConfig = [
    {
        prop: "PhotoUrl",
        label: i18n.t("Generality.Ge_PhotoUrl"),
        cpn: "Image",
        width: "60px",
        align: "center",
        cpnProps: {
          lazy: false,
        },
        // 导出配置
        exportConfig: {
          // 禁用这个字段的导出功能
          disabled: true,
        },
      },
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),

    align: "center",
    cpn: "Link",
    // innerSearch: {
    //   prop: "DeviceNo",
    //   cpn: "FormInput",
    //   label: i18n.t("production.Pr_DeviceNo")
    // },
    cpnProps: {
      // 路由名称
      routeName: "As_DeviceDetail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "DeviceNo",
      // 补充动态参数
      // moreDynamicParameters:[
      //   {
      //     keyName:'ItemId',
      //     valueName:'ItemId'
      //   }
      // ],
    }
  },
  /*设备名称*/
  {
    prop: "DeviceName",
    label: i18n.t("production.Pr_DeviceName"),
  },
   /*设备厂商*/
   {
    prop: "Manufacture",
    label: i18n.t("production.Pr_Manufacture"),
  },
  // {
  //   prop: "DeviceCategory",
  //   label: i18n.t("Generality.Ge_Category"),
  //   customFilter: (value) => {
  //     if (!value) return "";
  //     return machineCategoryEnum[value].name;
  //   },
  // },
    /*使用部门*/
    {
      prop: "UserDepartment",
      label: '使用部门',
    },
  /*保养方式*/
  {
    prop: "MaintenanceMode",
    label: i18n.t("production.Pr_MaintenanceMode"),
    customFilter: (value) => {
      if (!value) return "";
      return maintenanceEnum[value].name;
    },
  },
  // 状态
  // {
  //   prop: "State",
  //   label: '状态',
  //   customFilter: (value) =>  {
  //     if(!value) return ""
  //     return deviceStateEnum[value].name
  //   }
  // },
  //出入库状态
  {
    prop: "InventoryState",
    label: '出入库状态',
    customFilter: (value) => {
      if (!value) return "";
      return inventoryStateEnum[value].name;
    },
  },
  // 设备保养模板编号
  // {
  //   prop: "MaintenanceTplId",
  //   label: "设备保养模板编号"
  // },
   /*上次保养日期*/
   {
    prop: "LastMaintenanceDate",
     label: i18n.t("production.Pr_LastMaintenanceDate"),
    filter:'date'
  },
  // 购置日期
  {
    prop: "AcquisitionDate",
     label: i18n.t("production.Pr_AcquisitionDate"),
    filter:'date'
  },
  /*累计时间*/
  {
    prop: "CumulativeTime",
    label: i18n.t("production.Pr_CumulativeTime"),
    custom: true,
  },
  // 创建日期
  {
    prop: "CreationDate",
     label: i18n.t("production.Pr_CreationDate"),
    filter:'date'
  },
  // 间隔天数
  {
    prop: "IntervalDays",
    label: i18n.t("production.Pr_IntervalDays"),
  },
  // 寿命设定
  {
    prop: "LifeSetting",
    label: i18n.t("production.Pr_LifeSetting"),
  },
  /*保养进度*/
  // {
  //   prop: "UsageRate",
  //   label: i18n.t("device.De_CumulativeTime"),
  //   width:'150px',
  //   custom:true,
  // },
  /*备注*/
  {
    prop: "Remarks",
    label:'备注',
  },
]
// 表单配置
export const formSchema = [
  {
    prop: "Keyword",
    label: '关键字',
    cpn: "FormInput",
  },
  //报修类型
{
  prop: "DeviceCategory",
  hidden:true,
  label: i18n.t("Generality.Ge_Category"),
  cpn: "FormSelect",
    options: {
      list: enumToList(machineCategoryEnum)
    },
  },

  {
    prop: "ToBeMaintained",
    label: "",
    cpn: "FormRadio",
    options: {
      list: [
        {
          value: true,
          label: "查看待保养的数据",
        },

      ],
    },
  },
]
