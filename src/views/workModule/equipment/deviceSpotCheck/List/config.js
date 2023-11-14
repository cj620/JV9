import { TableAPI, Table as BaseTable } from '@/jv_doc/class/table'
import {
  assets_device_spot_check_list,
  assets_device_spot_check_delete,
} from "@/api/workApi/equipment/spotCheck";

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
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
  },
  {
    prop: "State",
    label: i18n.t("Generality.Ge_State"),
    cpn: "BillStateTags",
    width: "120px",
  },
  {
    prop: "DeviceName",
    label: i18n.t('DataV.Da_DeviceName'),
  },
  {
    prop: "MaintenanceDate",
    label: i18n.t('device.De_MaintenanceDate1'),
    filter: "time",
    width: "150px",
  },
  {
    prop: "Operator",
    label: i18n.t('device.De_Operator'),
  },
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width: "150px",
  },
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]
export const formSchema = [
  {
    prop: "Keyword",
    label: i18n.t("Generality.Ge_KeyWords"),
    cpn: "FormInput",
  },
]
