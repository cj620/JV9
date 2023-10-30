import { Table as BaseTable } from "@/jv_doc/class/table";
import {
  ProcessingResult,
  ProcessCheckTypeEnum,
  enumFilter,
} from "@/enum/workModule";
export class Table extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig,
      tableHeaderShow: false,
    });
  }
}
//工时记录
export const tableConfig2 = [
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("production.Pr_TaskProcess"),
  },
  /*实际开始*/
  {
    prop: "ActualStart",
    label: i18n.t("Generality.Ge_ActualStart"),
    filter: "time",
  },
  /*实际结束*/
  {
    prop: "ActualEnd",
    label: i18n.t("Generality.Ge_ActualEnd"),
    filter: "time",
  },
  /*实际用时*/
  {
    prop: "ActualTime",
    label: i18n.t("Generality.Ge_ActualTime"),
    align: "right",
    custom: true,
    commonConfig: {
      summary: true,

    },
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  /*实际设备*/
  {
    prop: "ActualDevice",
    label: i18n.t("production.Pr_ActualDevice"),
  },
  /*作业者*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
];


//记录
export const tableConfig = [
  /*作业员*/
  {
    prop: "Worker",
    label: i18n.t("Generality.Ge_Worker"),
  },
  /*日期*/
  {
    prop: "WorkDate",
    label: i18n.t("Generality.Ge_EndDate"),
    filter: "time",
  },
  /*作业类别*/
  {
    prop: "WorkType",
    label: i18n.t("Generality.Ge_WorkType"),
    custom: true,
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  /*工序*/
  {
    prop: "Process",
    label: i18n.t("Generality.Ge_Process"),
  },
  /*设备*/
  {
    prop: "DeviceNo",
    label: i18n.t("production.Pr_Equipment"),
  },
];

//零件明细
export const tableConfig1 = [
  /*模具编号*/
  {
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },

  /*零件编号*/
  {
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  /*零件名称*/
  {
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  /*描述*/
  {
    prop: "Description",
    label: i18n.t("Generality.Ge_Describe"),
  },
  /*数量*/
  {
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
    width: "100px",
  },
];


//详情
export const detailConfig = [
  {
    // 模具编号
    prop: "ToolingNo",
    label: i18n.t("Generality.Ge_ToolingNo"),
  },
  /*任务单号*/
  {
    prop: "PmTaskBillId",
    label: i18n.t("project.Pro_TaskSheetNo"),
  },
  {
    // 零件编号
    prop: "PartNo",
    label: i18n.t("Generality.Ge_PartNo"),
  },
  {
    // 零件名称
    prop: "PartName",
    label: i18n.t("Generality.Ge_PartName"),
  },
  {
    // 描述
    prop: "PartInfo",
    label: i18n.t("Generality.Ge_Describe"),
  },
  {
    // 计划开始
    prop: "PlanStart",
    label: i18n.t("Generality.Ge_PlanStart"),
    filter: "time",
  },
  {
    // 计划结束
    prop: "PlanEnd",
    label: i18n.t("Generality.Ge_PlanEnd"),
    filter: "time",
  },
  {
    // 级别
    prop: "Level",
    label: i18n.t("Generality.Ge_Level"),
    custom: true,
  },
  {
    // 数量
    prop: "Quantity",
    label: i18n.t("Generality.Ge_Quantity"),
  },
  {
    // 是否需要成品检测
    prop: "IsFinishedProductInspection",
    label: "是否需要成品检测",
    customFilter:(value,row)=>{
      if(value){
        return '是'
      }else  if(value===false){
        return '否'
      }
    },
  }
];

export const Qc_ProcessCheckTableConfig=[
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "Qc_ProcessCheck_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
      moreDynamicParameters: [
        {
          keyName: "ItemId",
          valueName: "ItemId",
        },
      ],
    },
  },
  {
    // 自检工序
    prop: "SelfCheckProcess",
    label: i18n.t("quality.Qc_SelfCheckProcess"),
  },
  {
    // 检验类型
    prop: "ProcessCheckType",
    label: i18n.t("quality.Qc_ProcessCheckType"),
    customFilter: (value, row) => enumFilter(value, ProcessCheckTypeEnum),
  },
  {
    // 处理结果
    prop: "ProcessingResult",
    label: i18n.t("quality.Qc_CheckResult"),
    customFilter: (value, row) => {
      if (!value) return "";
      return ProcessingResult?.[value]?.name ?? value;
    },
  },
  {
    // 检验人
    prop: "Operator",
    label: i18n.t("quality.Qc_Operator"),
  },
  {
    // 检验日期
    prop: "OperationDate",
    label: i18n.t("quality.Qc_CheckDate"),
    filter: "date",
    width: "150px",
  },
  {
    // 负责人
    prop: "PersonInCharge",
    label: i18n.t("project.Pro_Worker"),
  },
  {
    // 不合格原因
    prop: "AbnormalCause",
    label: i18n.t("quality.Qc_AbnormalCause"),
  },
  {
    prop: "SubmittedForInspectionQty",
    label: i18n.t("quality.Qc_SubmittedForInspectionQty"),
  },
  {
    // 检验数量
    prop: "InspectionQty",
    label: i18n.t("quality.Qc_InspectionQty"),
  },
  {
    // 不合格数量
    prop: "UnqualifiedQty",
    label: i18n.t("quality.Qc_UnqualifiedQty"),
  },
  {
    // 制单人
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  /*制单日期*/
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
export const Qc_FinishedProductTableConfig=[
  {
    prop: "BillId",
    label: i18n.t("Generality.Ge_BillId"),
    align: "center",
    cpn: "Link",
    cpnProps: {
      // 路由名称
      routeName: "Qc_FinishedProduct_Detail",
      // 路由路径（名称和路径二选一）
      // routePath:'/dashboard',
      // 路由传参方式 默认query
      methods: "query",
      // 传参的键名，值为当前数据
      parameterKey: "BillId",
      // 补充动态参数
      moreDynamicParameters: [
        {
          keyName: "ItemId",
          valueName: "ItemId",
        },
      ],
    },
  },
  {
    // 加工单
    prop: "PrTaskBillId",
    label: i18n.t("Generality.Ge_PrTaskBillId"),
  },
  {
    // 返工工序
    prop: "ReworkProcess",
    label: i18n.t("quality.Qc_ReworkProcess"),
  },
  {
    // 检测结果
    prop: "ProcessingResult",
    label: i18n.t("quality.Qc_CheckResult"),
    customFilter: (value, row) => {
      if (!value) return "";
      return ProcessingResult?.[value]?.name ?? value;
    },
  },
  {
    // 负责人
    prop: "PersonInCharge",
    label: i18n.t("project.Pro_Worker"),
  },
  {
    // 不合格原因
    prop: "AbnormalCause",
    label: i18n.t("quality.Qc_AbnormalCause"),
  },
  {
    prop: "Analyst",
    label: i18n.t("quality.Qc_AbnormalCauseAnalyst"),
  },
  {
    prop: "SubmittedForInspectionQty",
    label: i18n.t("quality.Qc_SubmittedForInspectionQty"),
  },
  {
    // 检验数量
    prop: "InspectionQty",
    label: i18n.t("quality.Qc_InspectionQty"),
  },
  {
    // 不合格数量
    prop: "UnqualifiedQty",
    label: i18n.t("quality.Qc_UnqualifiedQty"),
  },
  {
    // 关联编号
    prop: "AssociatedNo",
    label: i18n.t("Generality.Ge_AssociatedNo"),
  },
  /*制单人*/
  {
    prop: "Creator",
    label: i18n.t("Generality.Ge_Creator"),
  },
  /*制单日期*/
  {
    prop: "CreationDate",
    label: i18n.t("Generality.Ge_CreationDate"),
    filter: "time",
  },
  {
    prop: "Remarks",
    label: i18n.t("Generality.Ge_Remarks"),
  },
]
export class tableObj2 extends BaseTable {
  constructor() {
    super({
      tableSchema: tableConfig2,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: true,
      height: 1650,
    });
  }
}
export class Qc_FinishedProductTable extends BaseTable {
  constructor() {
    super({
      tableSchema: Qc_FinishedProductTableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 1650,
    });
  }
}
export class Qc_ProcessCheckTable extends BaseTable {
  constructor() {
    super({
      tableSchema: Qc_ProcessCheckTableConfig,
      pagination: false,
      sortCol: false,
      chooseCol: false,
      data: [],
      title: "",
      tableHeaderShow: false,
      operationCol: false,
      height: 1650,
    });
  }
}
