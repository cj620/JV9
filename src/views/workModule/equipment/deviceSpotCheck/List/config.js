import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import {
  assets_device_spot_check_list,
  assets_device_spot_check_delete,
} from "@/api/workApi/equipment/spotCheck";
import {enumFilter, enumToList} from "~/utils/system/enumsPlugin";
import {
  afterTimeOutEnum,
  planTypeEnum,
  SpotCheckTypeEnum,
  spotCheckListStateEnum,
} from "@/enum/workModule";

export class api extends TableAPI {
  getData = assets_device_spot_check_list;
  del = assets_device_spot_check_delete;
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
      title: i18n.t("menu.As_DeviceSpotCheck"),
      // 接口类
      api,
      // 操作列宽度
      operationWidth:180,
      // 打印模块标识
      printMod:'As_DeviceSpotCheck',
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
    // 点检计划名称
    prop: "PlanName",
    label: i18n.t("device.De_PlanName1"),
  },
  {
    // 状态
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    width: "120px",
    custom: true,
    // customFilter: (value, row) => enumFilter(value, spotCheckListStateEnum),
  },
  {
    // 计划类型
    prop: "PlanType",
    label: i18n.t("device.De_PlanType"),
    customFilter: (value, row) => enumFilter(value, planTypeEnum),
  },
  {
    // 点检类型
    prop: "SpotCheckType",
    label: i18n.t("device.De_SpotCheckType"),
    customFilter: (value, row) => enumFilter(value, SpotCheckTypeEnum),
  },
  {
    // 关联编号
    prop: "AssociatedNo",
    label: i18n.t('Generality.Ge_AssociatedNo'),
  },
  {
    // 角色
    prop: "RoleName",
    label: i18n.t("menu.Se_Role"),
  },
  {
    // 超时时间
    prop: "TimeOut",
    label: i18n.t("device.De_TimeOut"),
  },
  {
    // 超时处理
    prop: "AfterTimeOut",
    label: i18n.t("device.De_AfterTimeOut"),
    customFilter: (value, row) => enumFilter(value, afterTimeOutEnum),
  },
  {
    // 应开始时间
    prop: "ShouldBeginTime",
    label: i18n.t("device.De_ShouldBeginTime"),
    filter:'time',
    width: "140px",
  },
  {
    // 检验开始时间
    prop: "CheckStartDate",
    label: i18n.t("device.De_CheckStartDate"),
    filter:'time',
    width: "140px",
  },
  {
    // 检验结束时间
    prop: "CheckEndDate",
    label: i18n.t("device.De_CheckEndDate"),
    filter:'time',
    width: "140px",
  }
]
export const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
  {
    prop: "PlanType",
    label: i18n.t("device.De_PlanType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(planTypeEnum)
    }
  },
  {
    prop: "SpotCheckType",
    label: i18n.t("device.De_SpotCheckType"),
    cpn: "FormSelect",
    options: {
      list: enumToList(SpotCheckTypeEnum)
    }
  },
  {
    prop: "States",
    label: i18n.t("Generality.Ge_State"),
    cpn: "FormSelect",
    type: "multiple",
    options: {
      list: enumToList(spotCheckListStateEnum)
    }
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
