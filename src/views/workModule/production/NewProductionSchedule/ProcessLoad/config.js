import { Table as BaseTable } from "@/jv_doc/class/table";
import { enumFilter } from '~/utils/system/enumsPlugin';
import { LevelEnum } from "@/enum/workModule/production"

export class leftTable extends BaseTable {
  constructor() {
    super({
      tableSchema: leftTableConfig,
      formSchema: [],
      rowId: "Id",
      title: "",
      printMod: "resourcesTable",
      printBar: false,
      tableHeaderShow: false,
      sortCol: false,
      chooseCol: false,
      operationCol: false,
      pagination: false,
    })
  }
}
export const leftTableConfig = [
  {
  //   资源组
    prop: "ResourceGroup",
    label: i18n.t("menu.Pr_Resources"),
  },
  {
  //   设备信息
    prop: "DeviceInfo",
    label: i18n.t("menu.Pr_Devices"),
  },
  {
  //   可用时间
    prop: "TotalAvailableTime",
    label: i18n.t("sale.Sa_TotalAvailableTime"),
  },
  {
  //   是否超负荷
    prop: "IsOverload",
    label: i18n.t("production.Pr_IsOverload"),
    customFilter(item) {
      return item ? i18n.t("Generality.Ge_Yes") : i18n.t("Generality.Ge_No")
    }
  }
]

export class rightTable extends BaseTable {
  constructor() {
    super({
      tableSchema: rightTableConfig,
      formSchema: [],
      rowId: "Id",
      title: "",
      printMod: "devicesTable",
      printBar: false,
      tableHeaderShow: false,
      sortCol: false,
      chooseCol: false,
      operationCol: false,
      pagination: false,
    })
  }
}
export const rightTableConfig = [
  {
    //   设备编号
    prop: "DeviceNo",
    label: i18n.t("production.Pr_DeviceNo"),
  },
  {
    //   设备名称
    prop: "DeviceName",
    label: i18n.t("production.Pr_DeviceName"),
  },
  {
    //   可用工时
    prop: "AvailableTime",
    label: i18n.t("production.Pr_AvailableHours"),
  },
  {
    //   预计工时
    prop: "UsedTime",
    label: i18n.t("Generality.Ge_PlanTime"),
  },
  {
    //   设备负荷
    prop: "UtilizationRate",
    label: i18n.t("production.Pr_EquipmentLoad"),
    custom: true,
  },
]

export class bottomTable extends BaseTable {
  constructor() {
    super({
      tableSchema: bottomTableConfig,
      formSchema: [],
      rowId: "Id",
      title: "",
      printMod: "taskBillTable",
      printBar: false,
      tableHeaderShow: false,
      sortCol: false,
      chooseCol: false,
      operationCol: false,
      pagination: false,
    })
  }
}
export const bottomTableConfig = [
  {
    //   单号
    prop: "BillId",
    label: i18n.t("Generality.Ge_OddNumbers"),
    align: "center",
    cpn: "Link",
    cpnProps: {
      routeName: "ProductionTaskDetails",
      methods: "query",
      parameterKey: "BillId",
    },
  },
  {
    //   零件编号
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    //   工序
    prop: "ProcessName",
    label: i18n.t("production.Pr_EquipmentLoad"),
  },
  {
    //   计划设备
    prop: "PlanDevice",
    label: i18n.t("production.Pr_PlanningDevices"),
  },
  {
    //   预计工时
    prop: "PlanTime",
    label: i18n.t("Generality.Ge_PlanTime"),
  },
  {
    //   工序计划开始
    prop: "PlanStart",
    label: i18n.t("production.Pr_PlanStart"),
    filter: "time",
  },
  {
    //   工序计划结束
    prop: "PlanEnd",
    label: i18n.t("production.Pr_PlanEnd"),
    filter: "time",
  },
  {
    //   到料时间
    prop: "ArrivalTime",
    label: i18n.t("production.Pr_ArrivalTime"),
    filter: "time",
  },
  {
    //   任务级别
    prop: "Level",
    label: i18n.t("production.Pr_Level"),
    customFilter: (value) => enumFilter(value, LevelEnum)
  },
  {
    //   工单计划结束
    prop: "TaskPlanEnd",
    label: i18n.t("production.Pr_TaskPlanEnd"),
    filter: "time",
  },
]

