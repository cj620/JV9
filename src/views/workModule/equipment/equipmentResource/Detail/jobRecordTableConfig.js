/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-06-01 14:43:10
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";

// 引入模块API接口
import { API as Repair } from "@/api/workApi/equipment/repair"
// 引入模块API接口
import { API as Scrap } from "@/api/workApi/equipment/scrap";
// 引入模块API接口
import { API as Maintenance } from "@/api/workApi/equipment/maintenance";
// 使用记录的接口
import { API as Record,assets_device_stock_ops_list } from "@/api/workApi/equipment/record";
import { inventoryStateEnum, maintenanceEnum, repairEnum } from "@/enum/workModule";
export class maintenanceAPI extends TableAPI {
  // 获取列表
  getData = Maintenance.api_list;
  // // 删除单据
  // del=api_delete
}

export class scrapAPI extends TableAPI {
  // 获取列表
  getData = Scrap.api_list;
}
export class repairAPI extends TableAPI {
  // 获取列表
  getData = Repair.api_list;
}
export class recordAPI extends TableAPI {
  // 获取列表
  getData = Record.api_list;
}

export class stockOpsAPI extends TableAPI {
  // 获取出入库列表
  getData = assets_device_stock_ops_list
}
export class MaintenanceTable extends BaseTable {
  constructor() {
    super({
      tableSchema: MaintenanceConfig,
      tableHeaderShow: false,
      // 表单配置
      formSchema:[],
      // 行标识
      rowId: 'BillId',
      // 表格标题
      title: i18n.t("menu.As_DeviceMaintain"),
      // 接口类
      api:maintenanceAPI,
      // 操作列宽度
      operationWidth:110,
      // 打印模块标识
      printMod:'As_DeviceMaintain_MaintenanceTable',
      height:null,
      operationCol:false
    });
  }
}
export const MaintenanceConfig = [
  // 编号
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    width:'140px',
    cpnProps: {
      // 路由名称
      routeName: "As_DeviceMaintenanceDetail",
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
    width:'120px',
    custom: true,
  },
  // 保养方案
  {
    prop: "PlanName",
    label: i18n.t("menu.As_MaintenancePlan")
  },
  // 保养类型
  {
    prop: "MaintenanceMode",
    label: i18n.t("production.Pr_MaintenanceMode"),
    customFilter: (value) => {
      if(!value) return;
      return maintenanceEnum[value].name;
    }
  },
  // 保养日期
  {
    prop: "MaintenanceDate",
    label: i18n.t("device.De_MaintenanceDate"),
    filter:'time'
  },
  // 操作者
  {
    prop: "Creator",
    label: i18n.t("device.De_Handlers"),
  },
  // 备注
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];
export const formSchema = [];

export class RepairTable extends BaseTable {
  constructor() {
    super({
      tableSchema: RepairConfig,
      tableHeaderShow: false,
      // 表单配置
      formSchema:[],
      // 行标识
      rowId: 'BillId',
      // 表格标题
      title: i18n.t("menu.As_DeviceRepair"),
      // 接口类
      api:repairAPI,
      // 操作列宽度
      operationWidth:110,
      // 打印模块标识
      printMod:'As_DeviceMaintain_RepairTable',
      height:null,
      operationCol:false
    });
  }
}
export const RepairConfig = [
  // 编号
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    width:'140px',
    cpnProps: {
      // 路由名称
      routeName: "As_DeviceRepairDetail",
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
    width:'120px',
    custom: true,
  },
  // 类别
  {
    prop: "RepairCategory",
    label: i18n.t("Generality.Ge_Category"),
    customFilter: (value) => {
      if(!value) return;
      return repairEnum[value].name;
    }
  },
  // 修理人
  {
    // 维修人
    prop: "MaintenancePersonnel",
    label: i18n.t("device.De_MaintenancePersonnel"),
  },
  // 修理厂商
  {
    prop: "Repairer",
    label: i18n.t("device.De_Repairer"),
  },
  // 完成日期
  {
    prop: "CompletionDate",
    label: i18n.t("device.De_CompletionDate"),
    filter:'time'
  },
  // 报修人
  {
    prop: "RepairApplicant",
    label: i18n.t("device.De_RepairApplicant"),
  },
  // 保修日期
  {
    prop: "RepairDate",
    label: i18n.t("device.De_RepairDate"),
    filter:'time',
    width:'120px'
  },
];
//使用记录列表
export class UseTable extends BaseTable {
  constructor() {
    super({
      tableSchema: UseConfig,
      tableHeaderShow: false,
      // 表单配置
      formSchema:[],
      // 行标识
      rowId: 'Id',
      // 表格标题
      title: i18n.t("device.De_UsageRecord"),
      // 接口类
      api:recordAPI,
      // 操作列宽度
      operationWidth:110,
      // 打印模块标识
      printMod:'As_DeviceMaintain_UseTable',
      height:null,
      operationCol:true
    });
  }
}
export const UseConfig = [
  // 编号
  {
    prop: "Id",
    label: i18n.t("Generality.Ge_ID"),
  },
  // 日期
  {
    prop: "UseDate",
    label: i18n.t("Generality.Ge_Date"),
    filter: 'time',
    width:'200px'
  },
  // 数量
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  // 操作者
  {
    prop: "Operator",
    label: i18n.t("device.De_Handlers"),
  },
  // 备注
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
];

export class StockOpsTable extends BaseTable {
  constructor() {
    super({
      tableSchema: StockOpsConfig,
      tableHeaderShow: false,
      // 表单配置
      formSchema:[],
      // 行标识
      rowId: 'Id',
      // 表格标题
      title: i18n.t("device.De_StockOpsRecord"),
      // 接口类
      api:stockOpsAPI,
      // 操作列宽度
      // operationWidth:110,
      // 打印模块标识
      printMod:'As_DeviceMaintain_StockOpsTable',
      height:null,
      operationCol: false
    });
  }
}
export const StockOpsConfig = [
  // 编号
  {
    prop: "StockOpsInfo",
    label: i18n.t("device.De_StockOpsInfo"),
  },
  // 操作者
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Describe"),
  },
  //出入库状态
  {
    prop: "StockOpsType",
    label: i18n.t("device.De_StorageStatus"),
    customFilter: (value) => {
      if (!value) return "";
      return inventoryStateEnum[value].name;
    },
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
    width:'95px',
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
    width:'150px',
  },
];
