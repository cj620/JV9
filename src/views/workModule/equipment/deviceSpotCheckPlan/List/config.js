import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import {
  assets_device_spot_check_plan_list,
  assets_device_spot_check_plan_delete,
} from "@/api/workApi/equipment/spotCheckPlan";
import {
  planTypeEnum,
  SpotCheckTypeEnum,
  spotCheckStateEnum,
  afterTimeOutEnum,
  enumFilter,
} from "@/enum/workModule";
export class api extends TableAPI {
  getData = assets_device_spot_check_plan_list;
  del = assets_device_spot_check_plan_delete;
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
      title: '设备点检计划',
      // 接口类
      api,
      // 操作列宽度
      operationWidth:180,
      // 打印模块标识
      printMod:'As_DeviceSpotCheckPlan',
    })
  }
}
export const tableConfig = [
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "As_DeviceSpotCheckPlanDetail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
    }
  },
  {
    prop: "PlanName",
    label: i18n.t("device.De_PlanName1"),
  },
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    // customFilter: (value, row) => enumFilter(value, spotCheckStateEnum),
    custom: true,
    width: "120px",
  },
  {
    prop: "RoleName",
    label: i18n.t("menu.Se_Role"),
  },
  {
    prop: "PlanType",
    label: i18n.t("device.De_PlanType"),
    customFilter: (value, row) => enumFilter(value, planTypeEnum),
  },
  {
    prop: "SpotCheckType",
    label: i18n.t("device.De_SpotCheckType"),
    customFilter: (value, row) => enumFilter(value, SpotCheckTypeEnum),
  },
  {
    prop: "ExecutionTime",
    label: i18n.t("device.De_ExecutionTime"),
  },
  {
    prop: "TimeOut",
    label: i18n.t("device.De_TimeOut"),
  },
  {
    prop: "AfterTimeOut ",
    label: i18n.t("device.De_AfterTimeOut"),
    customFilter: (value, row) => enumFilter(value, afterTimeOutEnum),
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
    width: "95px",
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "150px",
  },


]
export const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
]
