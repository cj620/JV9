/*
 * @Author: C.
 * @Date: 2021-07-20 10:50:11
 * @LastEditTime: 2022-05-30 01:23:29
 * @Description: file content
 */
import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { taskTypeEnum, enumToList } from "@/enum/workModule";

export class MaintenanceTable extends BaseTable {
  constructor() {
    super({
      tableSchema: MaintenanceConfig,
      tableHeaderShow: false,
      pagination: false,
     height: null,
    });
  }
}
export const MaintenanceConfig = [
  // 编号
  {
    prop: "Id",
    label: '编号',
  },
  // 保养类型
  {
    prop: "MaintenanceCcategory",
    label: '保养类型',
  },
  // 保养日期
  {
    prop: "MaintenanceDate",
    label: '保养日期',
    width:'120px',
    filter:'date'
  },
  // 操作者
  {
    prop: "Operator",
    label: '操作者',
  },
];
export const formSchema = [];

export class RepairTable extends BaseTable {
  constructor() {
    super({
      tableSchema: RepairConfig,
      tableHeaderShow: false,
      pagination: false,
     height: null,
    });
  }
}
export const RepairConfig = [
  // 编号
  {
    prop: "Id",
    label: '编号',
  },
  // 类别
  {
    prop: "RepairCategory",
    label: '类别',
  },
  // 状态
  {
    prop: "State",
    label: '状态',
  },
  // 修理厂商
  {
    prop: "Repairer",
    label: '修理厂商',
  },
  // 完成日期
  {
    prop: "CompletionDate",
    label: '完成日期',
  },
  // 报修人
  {
    prop: "RepairApplicant",
    label: '报修人',
  },
  // 保修日期
  {
    prop: "RepairDate",
    label: '保修日期',
    filter:'date',
    width:'120px'
  },
];
export class UseTable extends BaseTable {
  constructor() {
    super({
      tableSchema: UseConfig,
      tableHeaderShow: false,
      pagination: false,
     height: null,
    });
  }
}
export const UseConfig = [
  // 编号
  {
    prop: "Id",
    label: '编号',
  },
  // 类别
  {
    prop: "UseDate",
    label: '日期',
    filter:'date',
    width:'120px'
  },
  // 状态
  {
    prop: "Quantity",
    label: '数量',
  },
  // 修理厂商
  {
    prop: "Operator",
    label: '操作者',
  },
  // 完成日期
  {
    prop: "Category",
    label: '类别',
  },
];

