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
      printMod:'As_DeviceMaintain',
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
  },
  // 保养类型
  {
    prop: "MaintenanceCategory",
    label: i18n.t("Generality.Ge_Category"),
    customFilter: (value) => {
      if(!value) return;
      return maintenanceEnum[value].name;
    }
  },
  // 保养日期
  {
    prop: "MaintenanceDate",
    label: i18n.t("device.De_MaintenanceDate"),
    width:'120px',
    filter:'date'
  },
  // 操作者
  {
    prop: "Creator",
    label: i18n.t("device.De_Handlers"),
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
      printMod:'As_DeviceMaintain',
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

  // 修理厂商
  {
    prop: "Repairer",
    label: i18n.t("device.De_Repairer"),
  },
  // 完成日期
  {
    prop: "CompletionDate",
    label: i18n.t("device.De_CompletionDate"),
    filter:'date'
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
    filter:'date',
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
      title: '使用记录',
      // 接口类
      api:recordAPI,
      // 操作列宽度
      operationWidth:110,
      // 打印模块标识
      printMod:'As_DeviceMaintain',
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
    filter:'date',
    width:'120px'
  },
  // 数量
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  // 操作者
  {
    prop: "Operator",
    label: '操作者',
  },
  // 类别
  {
    prop: "Category",
    label: i18n.t("Generality.Ge_Category"),
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
      title: '使用记录',
      // 接口类
      api:stockOpsAPI,
      // 操作列宽度
      operationWidth:110,
      // 打印模块标识
      printMod:'As_DeviceMaintain',
      height:null,
      operationCol:true
    });
  }
}
export const StockOpsConfig = [
  // 编号
  {
    prop: "StockOpsInfo",
    label: '目的地/来源地',
  },
  // 操作者
  {
    prop: "Remarks",
    label: '描述',
  },
  //出入库状态
  {
    prop: "StockOpsType",
    label: '出入库状态',
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
