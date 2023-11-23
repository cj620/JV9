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
      routeName: "As_DeviceSpotCheckDetail",
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
    label: '计划名称',
  },
  {
    prop: "RoleName",
    label: '角色',
  },
  {
    prop: "PlanType",
    label: '计划类型',
    customFilter: (value, row) => enumFilter(value, planTypeEnum),
  },
  {
    prop: "SpotCheckType",
    label: '点检类型',
    customFilter: (value, row) => enumFilter(value, SpotCheckTypeEnum),
  },  {
    prop: "ExecutionTime",
    label: '执行时间',
  },
  {
    prop: "TimeOut",
    label: '超时时间',
  },
  {
    prop: "AfterTimeOut ",
    label: '超时处理',
    customFilter: (value, row) => enumFilter(value, afterTimeOutEnum),
  },
  {
    prop: "State",
    label: '状态',
    customFilter: (value, row) => enumFilter(value, spotCheckStateEnum),
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
