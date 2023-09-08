/*
 * @Author: your name
 * @Date: 2021-10-28 13:34:11
 * @LastEditTime: 2023-08-18 10:55:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \JvMmsV9Front\src\i18n\lang\cn\index.js
 */

import zhLocale from "element-ui/lib/locale/lang/zh-CN";
const cn = {
  menu: {
    Pa_ProgramTaskList: "编程任务列表",
    De_DesignTaskList: "设计任务列表",
    De_ProcessTemplate: "工序模板",
    Pu_Supplier: "供应商",
    Sa_Sale: "销售",
    Sa_SaleQuote: "销售报价",
    Sa_SaleOrder: "销售订单",
    Sa_SaleDelivery: "销售发货",
    Sa_SaleReturn: "销售退货",
    Sa_Report: "统计报表",
    Sa_Account: "销售对账",
    Sa_SaleAnalysis: "销售分析",
    Sa_BaseData: "基础数据",
    Sa_Customer: "客户",
    Pm_Project: "项目",
    Pm_Process: "项目任务工序",
    Pm_ProjectManagement: "项目管理",
    Pm_ProjectToolingList: "模具列表",
    Pm_ProjectTask: "项目任务",
    Pm_TestTask: "试模任务",
    Pm_ProjectCost: "项目成本",
    Pm_BaseData: "基础数据",
    Pu_BaseData: "基础数据",
    Pm_Processes: "项目任务工序 ",
    Pm_BudgetCost: "成本预算表 ",
    Pm_MakeCalculation: "制造结算表 ",
    Pm_Estimate: "评审单 ",
    De_Design: "设计",
    De_ToolingBOM: "模具BOM",
    De_ItemsDemand: "物料需求",
    De_ProductionDemand: "生产需求",
    De_DesignTask: "设计任务",
    Pa_Program: "编程",
    Pa_ProgramTask: "编程任务",
    Pa_ElectrodeBom: "电极BOM表",
    Pa_ElectrodeDemand: "电极物料需求",
    Pu_Purchase: "采购",
    Pu_Requisition: "采购申请",
    Pu_Order: "采购订单",
    Pu_StockIn: "采购入库",
    Pu_Return: "采购退货",
    Pu_Account: "采购对账",
    Pu_Outsourcing: "委外加工",
    Pu_Order_PR: "询价单",
    Pu_OutsourcingAccount: "委外对账",
    Pu_OutsourcingRequirement: "委外需求",
    Pr_Production: "生产",
    Pr_ProductionTask: "生产任务",
    Pr_ProductionSchedule: "生产排程",
    Pr_ProductionDispatch: "生产调度",
    Pr_WorkReport: "生产报工",
    Pr_ProductionPlan: "生产计划",

    Pr_Reports: "统计报表",
    Pr_ProgramTask: "编程任务",
    Pr_Quality: "品质异常",
    Pr_ProductionReport: "生产报表",
    Pr_Report: "统计报表",
    Pr_CapacityAnalyse: "产能分析",
    Pr_ProductionLoad: "负荷分析",
    Pr_ProductionChart: "加工计划图",
    Pr_EmployeesChart: "员工生产报表",
    Pr_PartChart: "零件生产报表",
    Pr_PersonnelHoursSummary: "员工工时汇总",
    Qc_Quality: "品质",
    Qc_ProductionCheck: "加工检验",
    Qc_FinishedProduct: "成品检验",
    Qc_ProcessCheck: "过程检验",
    Qc_QualityReport: "品质报表",
    Qc_QualityRecord: "检验记录",
    Qc_QualityError: "品质异常",
    Pr_QualityReport: "品质报表",
    Pr_ReworkReport: "返工报表",
    Pr_BaseData: "基础数据",
    Pr_Process: "加工工序",
    Pr_Devices: "设备信息",
    Pr_Resources: "资源组",
    Pr_Calendar: "工厂日历",
    St_Stockroom: "仓库",
    St_OtherOut: "其它出库",
    St_OtherIn: "其它入库",
    St_Picking: "生产领料",
    St_ReturnPicking: "生产退料",
    St_ProduceIn: "生产入库",
    St_StockSummary: "结存汇总",
    St_StockInit: "库存期初",
    St_StockCheck: "库存盘点",
    St_CostChange: "成本调整",
    St_SplitAssemble: "物料拆装",
    St_StockroomInfo: "仓库信息",
    St_Dispatch: "调拨",
    St_WasteOut: "报损",
    St_SurplusIn: "报溢",
    St_Report: "统计报表",
    St_BaseData: "基础数据",
    StockroomInfo: "仓库",
    Se_Setup: "设置",
    Se_Item: "物料",
    Se_ItemType: "物料类别",
    Se_Unit: "计量单位",
    Se_Currency: "货币",
    Se_Users: "用户",
    Se_UserLog: "用户日志",
    Se_Role: "角色",
    Se_Department: "部门",
    Se_CompanyInfo: "公司信息",
    Se_SystemSetup: "系统设置",
    Se_AuditFlowSetup: "审核",
    Se_CodeRule: "编号规则",
    Se_FileManagementSetup: "文件夹管理权限",
    De_MaterialRequirement: "物料需求",
    Pr_Task: "生产任务",
    Qc_Error: "质检异常",
    Pr_LabelPrint: "标签打印",
    Se_DeleteItemList: "已删除物料",
    As_AssetsManage: "资产管理",
    As_DeviceList: "设备列表",
    As_DeviceMaintain: "设备保养",
    As_DeviceScrap: "设备报废",
    As_DeviceRepair: "设备报修",
    As_MaintenanceTPL: "保养模板",
  },
  login: {
    l_LogIn: "登录",
  },
  //项目
  project: {
    Pm_MoldList: "模具列表",
    Pr_PartSchedule: "零件进度",
    Pro_ItemType: "项目类别",
    Pro_UpdateDate: "更新日期",
    Pro_CalculationMonth: "结算月份",
    Pro_Worker: "负责人",
    Pro_ProcessingProgress: "加工进度",
    Pro_TaskSheetNo: "任务单号",
    Pro_AddProcedure: "增加工序",
    Pro_SelectTemplate: "选择模板",
    Pro_LoadingProcedure: "加载工序",
    Pro_SettlementItem: "结算项目",
    Pro_TotalQuantity: "总数量",
    Pro_TotalAmount: "总金额",
    Pro_SettlementRatio: "已结算比例",
    Pro_SettlementAmount: "已结算金额",
    Pro_SettlementRatioForThisMonth: "本月结算比例",
    Pro_SettlementAmountForThisMonth: "本月结算金额",
    Pro_Cost: "成本",
    Pro_PivotTable: "透视表",
    Pro_TechnicalRequirement: "技术要求",
    Pro_RelevantPersonnel: "相关人员",
    Pro_TaskRecord: "任务记录",
    Pro_FromQuotation: "来自报价单",
    Pro_CheckWorkSheet: "查看工单",
    Pro_ProjectSchedule: "项目进度",
    Pro_ProjectPersonnel: "项目人员",
    Pro_ProjectCostAnalysis: "项目成本分析",
    Pro_PlannedCost: "计划成本",
    Pro_PlannedProportion: "计划占比",
    Pro_ActualCost: "实际成本",
    Pro_ActualProportion: "实际占比",
    Pro_Overspending: "超支",
    Pro_ProportionOfOverspending: "超支占比",
    Pro_CheckDetails: "查看明细",
    Pro_MoldDetails: "模具明细",
    Pro_Task: "任务",
    Pro_FileManagement: "文件管理",
    Pro_MoldSpecification: "模具技术要求",
    Pro_ProjectTaskRecord: "项目任务记录",
    Pro_TheSumOfTheCurrentMonthSettlementProportionAndTheSettledProportionCannotBeGreaterThan1:
      "本月结算比例与已结算比例的和不能大于1",
    Pro_ReportToWorkRecord: "报工记录",
    Pro_Production: "制造",
    Pro_Outsource: "委外",
    Pro_DesignChange: "设变",
    Pro_NewTooling: "新模",
    Pro_CorrectingTooling: "修模",
    Pro_NotStarted: "未开始",
    Pro_Ongoing: "进行中",
    Pro_QuantityShouldBeGreaterThan1: "数量不能小于1",
    Pro_QuotationList: "报价单列表",
    Pro_Month: "月份",
    Pro_ChooseMonth: "选择月",
    Pro_PlanTimeShouldBeGreaterThan0: "预计工时不能小于0",
    Pro_ToolingDetails: "模具详情",
    Pro_RequirementItem: "需求项目",
    Pro_AddNewToolingTask: "新增新模任务",
    Pro_AddDesignChangeTask: "新增设变任务",
    Pro_AddTrialMoldTask: "新增试模任务",
    Pro_ExpirationTime: "过期时间",
    Pro_Share: "分享",
    Pro_CreateLink: "生成链接",
    Pro_projectMsgManager: "项目信息",
    Pro_ViewTaskDetails: "查看任务明细",
    Pro_ViewParentProjectTasks: "查看父级项目任务",
    Pro_ViewSubtasks: "查看子任务",
    Pro_MoreInformation: "更多信息",
    Pro_ViewAllTasks: "查看全部任务",
    Pro_DistributionTask: "分发任务",
    Pro_TestMouldProblemPoints: "试模问题点",
    Pro_TestMouldReason: "试模原因",
    Pro_TestMouldResult: "试模结果",
    Pro_TestMouldColor: "试模颜色",
    Pro_TestMouldMachine: "试模机台",
    Pro_TestMouldLocation: "试模地点",
    Pro_TestMouldDate: "试模日期",
    Pro_TestMouldUseTime: "试模用时",
    Pro_TestMouldInfo: "试模信息",
    Pro_ProblemPoints: "问题点",
    Pro_SuggestionsImprovement: "改善建议",
    Pro_VersionCode:"版本编号",
  },
  //设置
  setup: {
    Stockroom: "仓库",
    SafetyStock: "安全库存",
    MaxStock: "最大库存",
    UserId: "用户编号",
    UserName: "用户名",
    ActiveState: "激活状态",
    Mail: "邮箱",
    Sex: "性别",
    Birthday: "出生日期",
    FamilyAddress: "家庭地址",
    Tel: "电话",
    Phone: "手机",
    Male: "男",
    Female: "女",
    WithTheAuditor: "审核人配置",
    RecordCategory: "记录类别",
    Active: "已激活",
    Deactive: "未激活",
    PleaseInputNumbers: "请输入数字值",
    PleaseInputPhoneNumberWithCorrectFormat: "请输入正确的手机号码",
    SheetToBeAudited: "待审单据",
    ResultOfAuditing: "审核结果",
    AuditTime: "审核时间",
    ShowRecords: "查看记录",
    ReportWork: "报工",
    MyAuditingRecords: "我的审核记录",
    Approve: "审核通过",
    ReportedAt: "报工时间",
    Password: "密码",
    Account: "账号",
    RememberMe: "记住我",
    PleaseInputAccount: "请输入账号",
    PleaseInputPassword: "请输入密码",
    SaveDataFailedAsMissingSomeFiledPleaseCheckTheDataYouSubmitted:
      "字段缺失!插入数据失败！请确保字段完整",
    CurrentPageData: "当前页数据",
    SelectedDataOfCurrentPage: "当前页选中的数据",
    ExportTemplate: "导出模板",
    ThousandSeparatorAndKeepTwoDecimalPlaces: "千分符+保留两位小数",
    Time: "时间",
    Percentage: "百分比",
    Thousands: "千分符",
    Density: "密度",
    FullScreen: "全屏",
    Medium: "中等",
    Loose: "宽松",
    ChooseFile: "请选择文件",
    FileFormatErrorPleaseCheckAndTryAgain: "文件格式错误！请确认后重试！",
    DataToBeExportedIsEmpty: "导出数据为空，请重新确认",
    Left: "左",
    Middle: "中",
    Right: "右",
    Bold: "加粗",
    IsResetCache: "此操作将清空已保存的布局信息, 是否继续?",
    Profile: "个人信息",
    DeletedUsers: "已删除的用户",
    Recover: "恢复",
    FolderName: "文件夹名",
    SubfolderName: "子文件夹名",
    ReadOnlyRights: "只读权限",
    EditPermissions: "编辑权限",
    PrintPreview: "打印预览",
    ConfirmPasswordReset: "是否确认重置密码",
    Preview: "预览",
  },
  //销售
  sale: {
    Sa_DownTime: "停机时间",
    Sa_TotalAvailableTime: "可用时间",
    Sa_PlannedLoad: "计划负荷",
    Sa_HoldingTime: "占用时间",
    Sa_QuotationTime: "报价时间",
    Sa_EvaluationTime: "评估时间",
    Sa_Evaluation: "评估",
    Sa_OrderEvaluation: "订单评估",
    Sa_CustomerId: "客户编号",
    Sa_ShortName: "简称",
    Sa_FullName: "全称",
    Sa_Address: "地址",
    Sa_Contact: "联系人",
    Sa_Tax: "税率",
    Sa_Currency: "货币",
    Sa_Code: "简码",
    Sa_CustomerName: "客户简称",
    Sa_SalesReps: "销售员",
    Sa_ProjectId: "项目编号",
    Sa_RelationId: "相关编号",
    Sa_OutDate: "出货日期",
    Sa_ReturnDate: "退货日期",
    Sa_ReceiptNumber: "发票号",
    Sa_ValidityPeriodOfQuotationExpiredAt: "报价有效期",
    Sa_QuotationItems: "报价项目",
    Sa_Specifications: "规格",
    Sa_MoldQuotation: "模具报价单",
    Sa_AdditionalCharges: "附加费用",
    Sa_Subtotal: "成本合计",
    Sa_MaterialCost: "材料费用",
    Sa_ProjectCost: "项目费用",
    Sa_ProcessingCost: "加工费用",
    Sa_TotalQuotation: "报价合计",
    Sa_Scale: "比例",
    Sa_UserInformation: "用户信息",
    Sa_Sum: "合计",
    Sa_PleaseInput1: "请输入物料编号、名称",
  },
  // 采购
  purchase: {
    Pr_SupplierId: "供应商ID",
    Pr_SupplierName: "供应商简称",
    Pu_Supplier: "供应商",
    Pr_Unreconciled: "未对账",
    Pu_BaseData: "基础数据",
    Pu_RequiredCategory: "需要类别",
    Pu_SupplierInformation: "供应商信息",
    Pu_EnterStorage: "入库",
    Pu_OutStorage: "出库",
    Pu_PleaseSelectTheOutsourcingRequirements: "请选择委外需求",
    Pu_RequirementType: "需求类别",
    Pu_PleaseChooseTheNeededSheetFirst: "请先勾选需要添加的单据",
    Pu_Outsourced: "已委外",
  },
  // 仓库
  stockroom: {
    St_Submitter: "提交人",
    St_PickingType: "领料类别",
    St_Picking: "领料",
    St_Supplement: "补料",
    St_TrialMold: "试模",
    St_StockroomOut: "仓库-出",
    St_StockroomIn: "仓库-入",
    St_CheckQuantity: "盘点数量",
    St_Direction: "方向",
    St_Assembly: "装配",
    St_Split: "拆分",
  },
  design: {
    De_ShowInProjectManagementPage: "在项目管理页面展示",
    De_DoesnShowInProjectManagementPage: "在项目管理页面不展示",
    De_DownloadTemplate: "下载导入模板",
    De_LeadingInBOM: "导入BOM",
    De_CheckItem: "对照物料",
    De_SearchItem: "搜索物料",
    De_SubmitDemand: "提交物料需求",
    De_InfoLinkage: "同步零件信息",
    De_ProcessTemplate: "工序模板",
    De_SetLevel: "设置级别",
    De_DesignTaskRecord: "设计任务记录",
    De_AllocationType: "分配状态",
    De_Allocated: "已分配",
    De_Unallocated: "未分配",
  },
  // 看板 （数据可视化）
  DataV: {
    Da_IntegratedSignage: "综合看板",
    Da_EquipmentSignage: "设备看板",
    Da_DepartmentSignage: "部门综合看板",
    Da_SaleSignage: "销售大数据看板",
    Da_EquipmentStatus: "设备状态",
    Da_AlarmSituation: "报警情况",
    Da_ShutdownCondition: "停机情况",
    Da_OverallEfficiency: "设备综合效率",
    Da_EquipmentDynamicCurve: "设备稼动曲线",
    Da_HUT: "开机率",
    Da_Alarm: "报警",
    Da_Operation: "运行",
    Da_Leisure: "空闲",
    Da_Shutdown: "关机",
    Da_StartingUp: "开机",
    Da_NotCollected: "未采集",
    Da_Area: "区域",
    Da_Equipment: "设备",
    Da_AlarmTime: "报警时间",
    Da_AlarmInfo: "报警信息",
    Da_State: "状态",
    Da_DownTime: "停机时间",
    Da_StartTime: "开始时间",
    Da_Above: "以上",
    Da_Under: "以下",
    Da_TotalProcessingQuantity: "当日加工件总数",
    Da_AccumulatedProcessingTime: "当日累计加工时间",
    Da_OEE: "当日平均OEE",
    Da_FaultAlarmQuantity: "故障报警数",
    Da_SerialNumber: "序号",
    Da_DeviceName: "设备名称",
    Da_LastWeekCapacity: "过去一周产能负荷",
    Da_NextWeekCapacity: "未来一周产能负荷",
    Da_PlannedHours: "计划工时",
    Da_ActualHours: "实际工时",
    Da_AvailableHours: "可用工时",
    Da_PlannedCompletion: "计划内完成",
    Da_UnplannedCompletion: "计划外完成",
    Da_PlannedQuantity: "计划完成数",
    Da_ActualCompletion: "实际完成数",
    Da_DailyRatedHours: "日额定工时",
    Da_DailyPlannedHours: "日计划工时",
  },
  //通用
  Generality: {
    Ge_SaveEdits: "保存编辑",
    Ge_Chart: "图表",
    Ge_Gantt: "甘特图",
    Ge_GanttShow: "甘特图显示",
    Ge_TabularShow: "表格显示",
    Ge_tagClose: "清除",
    Ge_New: "新增",
    Ge_Add: "添加",
    Ge_Refresh: "刷新",
    Ge_Import: "导入",
    Ge_Export: "导出",
    Ge_Print: "打印",
    Ge_Settings: "设置",
    Ge_Frame: "边框",
    Ge_DottedLine: "斑马线",
    Ge_Fit: "自适应",
    Ge_NumberColumn: "序号列",
    Ge_SelectCol: "勾选列",
    Ge_Reset: "重置",
    Ge_OK: "确定",
    Ge_Cancel: "取消",
    Ge_Delete: "删除",
    Ge_Save: "保存",
    Ge_Approve: "审核",
    Ge_Withdraw: "撤回",
    Ge_Edit: "编辑",
    Ge_Filter: "筛选",
    Ge_Search: "搜索",
    Ge_DeleteData: "删除数据",
    Ge_DeleteConfirm: "是否确实要删除此项目？",
    Ge_Login: "登录",
    Ge_Logout: "注销",
    Ge_Operate: "操作",
    Ge_AddChild: "新增下级",
    Ge_CreateDate: "创建日期",
    Ge_Details: "详情",
    Ge_Describe: "描述",
    Ge_ID: "编号",
    Ge_ItemId: "物料编号",
    Ge_Unit: "单位",
    Ge_Quantity: "数量",
    Ge_Price: "单价",
    Ge_NoTaxPrice: "未税单价",
    Ge_Amount: "金额",
    Ge_Tax: "税率",
    Ge_SampleDate: "首样日期",
    Ge_PhotoUrl: "图片",
    Ge_ItemType: "标签",
    Ge_ItemName: "名称",
    Ge_ToolingName: "模具名称",
    Ge_LocalCurrency: "本币",
    Ge_ExchangeRate: "汇率",
    Ge_Department: "部门",
    Ge_BillId: "单据编号",
    Ge_BillGui: "单据GUI",
    Ge_State: "状态",
    Ge_DeliveryDate: "计划交期",
    Ge_Currency: "币种",
    Ge_Creator: "制单人",
    Ge_CreationDate: "制单日期",
    Ge_Remarks: "备注",
    Ge_Disable: "禁用",
    Ge_Enable: "启用",
    Ge_Copy: "复制",
    Ge_PleaseEnterkey: "输入关键字",
    Ge_PleaseEnter: "请输入",
    Ge_SelectItems: "选择物料",
    Ge_ItemCategory: "物料类别",
    Ge_Submit: "提交",
    Ge_BillInfo: "单据信息",
    Ge_CustomerInfo: "客户信息",
    Ge_ItemsInfo: "物料信息",
    Ge_Annex: "附件",
    Ge_PleaseAddItems: "请添加明细",
    Ge_FileName: "文件名称",
    Ge_Submitter: "上传人",
    Ge_UploadDate: "上传时间",
    Ge_Download: "下载",
    Ge_ChangePassword: "修改密码",
    Ge_OldPassword: "原密码",
    Ge_NewPassword: "新密码",
    Ge_Setup: "配置",
    Ge_Upload: "上传",
    Ge_MassUpload: "批量上传",
    Ge_RemarksIsNull: "暂无备注",
    Ge_UnSubmitted: "未提交",
    Ge_Submitted: "已提交",
    Ge_Approving: "审核中",
    Ge_Approved: "已审核 ",
    Ge_Rejected: "已拒绝",
    Ge_Reject: "拒绝",
    Ge_Deferred: "已延期",
    Ge_Completed: "已完成",
    Ge_ApproveProcess: "审核流程",
    Ge_MultipleSetup: "批量设置",
    Ge_SelectAll: "全选",
    Ge_Items: "物料",
    Ge_SaveType: "保存类型",
    Ge_SelectData: "选择数据",
    Ge_SelectColumn: "选择字段",
    Ge_StartDate: "开始日期",
    Ge_EndDate: "结束日期",
    Ge_ToolingNo: "模具编号",
    Ge_NewToolingNo: "目标模具编号",
    Ge_Process: "工序",
    Ge_TaskContent: "加工内容",
    Ge_Resource: "计划资源",
    Ge_PartNo: "零件编号",
    Ge_NewPartNo: "目标零件编号",
    Ge_PartName: "零件名称",
    Ge_Worker: "作业员",
    Ge_WorkType: "作业类别",
    Ge_ActualStart: "实际开始",
    Ge_ActualEnd: "实际结束",
    Ge_ActualTime: "实际用时",
    Ge_PlanTime: "预计工时",
    Ge_OverTime: "超时",
    Ge_PlannedTime: "计划工时",
    Ge_ActualHour: "实际工时",
    Ge_PlanStart: "计划开始",
    Ge_PlanEnd: "计划结束",
    Ge_Level: "级别",
    Ge_Close: "关闭",
    Ge_CloseOthers: "关闭其他",
    Ge_CloseAll: "关闭全部",
    Ge_TaskType: "任务类别",
    Ge_CostType: "成本类别",
    Ge_LeadTimeOfProcess: "前置时间 / 分钟",
    Ge_PostTimeOfProcess: "后置时间 / 分钟",

    Ge_Pending: "待处理",
    Ge_Processed: "已处理",
    Ge_InProcurement: "采购中",
    Ge_Stored: "已入库",
    Ge_HaveRecipients: "已领用",
    Ge_Ordinary: "普通",
    Ge_Urgent: "紧急",
    Ge_ExtraUrgent: "特急",
    Ge_ToBeReceived: "待入站",
    Ge_Processing: "加工中",
    Ge_Pausing: "暂停中",
    Ge_Outsourcing: "外协中",
    Ge_OutsourcingApplying: "外协申请中",
    Ge_Revoked: "已撤审",
    Ge_TDA: "未税金额",
    Ge_AuxiliaryQty: "辅助数量",
    Ge_AuxiliaryPrice: "辅助单价",
    Ge_DeliverGoods: "发货",
    Ge_ReturnGoods: "退货",
    Ge_DeliveryQuantity: "发货数量",
    Ge_ReturnQuantity: "退货数量",
    Ge_StockInQuantity: "入库数量",
    Ge_SaveAndSubmit: "保存并提交",
    Ge_GenerateItems: "生成模具物料",
    Ge_Dynamic: "动态",
    Ge_Record: "记录",
    Ge_ProcessInfo: "工序信息",
    Ge_DocumentType: "单据类型",
    Ge_Date: "日期",
    Ge_ContinueOrNot: "已提交需求, 是否继续?",
    Ge_Insert: "插入",
    Ge_Paste: "粘贴",
    Ge_Part: "零件",
    Ge_Electrode: "电极",
    Ge_PleaseSelect: "请选择",
    Ge_Type: "类型",
    Ge_Dashboard: "仪表盘",
    Ge_LogOut: "登出",
    Ge_ProcessPicture: "工艺图片",
    Ge_TakeAwayQuantity: "领用数量",
    Ge_DemandDate: "需求日期",
    Ge_PleaseAddData: "请添加数据",
    Ge_SelectTask: "选择任务",
    Ge_PleaseSelectTask: "请选择任务",
    Ge_NoSupportPaste: "当前浏览器不支持本地粘贴",
    Ge_NeedPicture: "粘贴内容非图片",
    Ge_Week: "周",
    Ge_Today: "今天",
    Ge_Year: "年",
    Ge_Month: "月",
    Ge_Selected: "已选",
    Ge_RememberPassword: "记住密码",
    Ge_All: "全部",
    Ge_AddNewPicture: "新增图片",
    Ge_ClickUploadPicture: "点击上传图片",
    Ge_UploadPicture: "将图片拖到此处，或点击上传",
    Ge_ClickPaste: "点击然后粘贴",
    Ge_InventoryInfo: "库存信息",
    Ge_SearchUnitName: "搜索单位名称",
    Ge_WhetherToActivate: "是否激活",
    Ge_UserDetails: "用户详情",
    Ge_UserConfig: "用户配置",
    Ge_RelatedDocumentNo: "关联单号",
    Ge_MessageLog: "登录已过期，请重新登录",
    Ge_ConfigurationValue: "配置值",
    Ge_TimeRange: "时间范围必须在0-24",
    Ge_Purchased: "已采购",
    Ge_NotPurchased: "未采购",
    Ge_IncludePurchased: "包含已采购",
    Ge_IncludeProcessed: "包含已处理",
    Ge_MarkAsProcessed: "标记为已处理",
    Ge_MarkAsPending: "标记为待处理",
    Ge_IsDisabled: "是否禁用？",
    Ge_Remind: "提示",
    Ge_PleaseFillIn: "请填写",
    Ge_Yes: "是",
    Ge_No: "否",
    Ge_Menu: "菜单",
    Ge_Authority: "权限",
    Ge_AuditAuthority: "审核权限",
    Ge_NoAuthority: "无权",
    Ge_Readable: "可读",
    Ge_ReadWrite: "可读写",
    Ge_RoleName: "角色名称",
    Ge_Auditor: "审核人",
    Ge_DocumentName: "单据名称",
    Ge_SelectPersonal: "选择人员",
    Ge_PrefixCharacter: "前缀字符",
    Ge_FirstSpacer: "第一间隔符",
    Ge_DateFormat: "日期格式",

    Ge_SecondSpacer: "第二间隔符",
    Ge_SelfIncreasing: "自增位数",
    Ge_AccountingDate: "记账日期",
    Ge_AccountingCategory: "记账类别",
    Ge_DebitsQuantity: "借方数量",
    Ge_DebitAmount: "借方金额",
    Ge_CreditsQuantity: "贷方数量",
    Ge_CreditsAmount: "贷方金额",
    Ge_DocumentDetailNo: "单据明细编号",
    Ge_Summary: "摘要",
    Ge_ItemsSource: "物料来源",
    Ge_SearchForm: "表单搜索",
    Ge_PickingDetails: "领料明细",
    Ge_BasicUnit: "基本单位",
    Ge_ItemsCategory: "物料分类",
    Ge_ItemsAttribute: "物料属性",
    Ge_ItemsName: "物料名称",
    Ge_1Month: "近1个月",
    Ge_2Month: "近2个月",
    Ge_3Month: "近3个月",
    Ge_6Month: "近6个月",
    Ge_12Month: "近12个月",
    Ge_To: "至",
    Ge_More: "更多",
    Ge_SelectTimeRange: "选择时间范围",
    Ge_DateComparison: "计划结束日期不能大于计划开始日期",
    Ge_TemplateInfo: "模板信息",
    Ge_TaskStatus: "任务状态",
    Ge_MoldId: "模号",
    Ge_MyTask: "我的任务",
    Ge_Default: "默认",
    Ge_ResourceGroupMembers: "资源组成员",
    Ge_MainEquipment: "主设备",
    Ge_DeviceExists: "当前设备已存在",
    Ge_EquipmentPicture: "设备图片",
    Ge_ZoomOut: "缩小",
    Ge_ZoomIn: "放大",
    Ge_ProcessSearch: "工序搜索",
    Ge_Category: "类别",
    Ge_ProcessList: "工序列表",
    Ge_ReworkRate: "返工率",
    Ge_AbnormalRate: "异常率",
    Ge_QualifiedRate: "合格率",
    Ge_UnqualifiedRate: "检测不合格率",
    Ge_ProcessId: "工序编号",
    Ge_ProcessName: "工序名称",
    Ge_SelectInboundProcess: "请选择进站的工序",
    Ge_ResultDescription: "结果描述",
    Ge_FinishSchedule: "结束排程",
    Ge_CheckDetails: "请勾选明细",
    Ge_EditDeliveryDate: "修改交期",
    Ge_WhetherReleaseSchedulingResults: "是否发布排程结果",
    Ge_CheckSameMoldDetails: "请勾选相同模具的明细",
    Ge_SelectNextOne: "零件已选择，请选择下一个",
    Ge_SheetIsAlreadyCreated: "已有创建加工单，是否继续创建",

    Ge_Schedule: "进度",
    Ge_WhetherInvalid: "是否作废？",
    Ge_Discarded: "已作废",
    Ge_Discard: "作废",
    Ge_Back: "返回",
    Ge_SelectTheDetails: "选择明细",
    Ge_BasicInformation: "基础信息",
    Ge_DetailedInformation: "详细信息",
    Ge_TemplateName: "模板名称",
    Ge_StartTime: "开始时间",
    Ge_EndTime: "结束时间",
    Ge_WorkHours: "工时",
    Ge_DepartmentSearch: "部门搜索",
    Ge_Finished: "完成",
    Ge_Start: "开始",
    Ge_End: "结束",
    Ge_SearchByNumber: "根据编号搜索",
    Ge_FileType: "文件类型",
    Ge_SelectFile: "选择文件",
    Ge_FileSize: "文件大小",
    Ge_KeyWords: "关键字",
    Ge_PleaseCompleteTheFormAsRequired: "请按要求完成表单",
    Ge_WhetherToStartUsing: "是否启用？",
    Ge_PrintEditor: "打印编辑器",
    Ge_EditingMode: "编辑模式",
    Ge_QRCode: "二维码",
    Ge_EditorMode: "编辑器模式",
    Ge_PaperSettings: "纸张设置",
    Ge_FontStyle: "字体样式",
    Ge_Header: "页眉",
    Ge_Table: "表格",
    Ge_Footer: "页尾",
    Ge_Direction: "方向",
    Ge_Horizontal: "横向",
    Ge_Paper: "纸张",
    Ge_NewText: "添加文字",
    Ge_AddField: "添加字段",
    Ge_RemoveElement: "删除元素",
    Ge_InsertPicture: "插入图片",
    Ge_ChooseType: "请选择类型",
    Ge_DataField: "数据字段",
    Ge_Prefix: "前缀",
    Ge_Format: "格式化",
    Ge_ChooseFormatType: "请选择格式化类型",
    Ge_BindField: "绑定字段",
    Ge_FieldDescription: "字段描述",
    Ge_PleaseInputFieldsToBeBound: "请输入需要绑定的字段",
    Ge_PleaseInputFieldDescription: "请输入字段描述",
    Ge_InsertImg: "插图",
    Ge_Day: "天",
    Ge_Hour: "小时",
    Ge__Hour: "时",
    Ge_Minute: "分",
    Ge_Second: "秒",
    Ge_Quarter: "季度",
    Ge_Font: "字体",
    Ge_Alignment: "对齐方式",
    Ge_AddNewTable: "新增表格",
    Ge_TableTitle: "表格标题",
    Ge_TableField: "表格字段",
    Ge_PleaseInputTableTitle: "请输入表格标题",
    Ge_PleaseInputTableField: "请输入表格字段",
    Ge_AddTableColumn: "添加列表",
    Ge_DelTableColumn: "删除列表",
    Ge_HideTableTitle: "隐藏标题",
    Ge_ShowTableTitle: "显示标题",
    Ge_HideSum: "关闭合计",
    Ge_ShowSum: "开启合计",
    Ge_ChangeBoundField: "修改绑定",
    Ge_NoPrintData: "无打印数据",
    Ge_PrintTemplate: "打印模板",
    Ge_PrintPreView: "打印预览",
    Ge_AddNewTemplate: "新增模板",
    Ge_TemplateCannotBeEmpty: "模板名称不能为空",
    Ge_NewField: "新字段",
    Ge_ResourceType: "资源类别",
    Ge_UsageStatus: "使用状态",
    Ge_ChooseProcess: "选择工序",
    Ge_ChoosePart: "请选择零件",
    Ge_AddProcess: "请添加工序",
    Ge_TimeFormat: "时间段格式为：8:00-20:00,24:00-7:00",
    Ge_QuantityShouldBeGreaterThan: "数量不能小于0",
    Ge_Hide: "不展示",
    Ge_Show: "展示",
    Ge_ImportBOM: "导入BOM模板",
    Ge_ChooseAtLeastOneItem: "请选择明细",
    Ge_AuditingRemarks: "审批备注",
    Ge_PleaseInputEmailAddressWithCorrectFormat: "请填写正确的邮箱号",
    Ge_IsDuplicate: "明细",
    Ge_ToolingProgressDashboard: "模具进度看板",
    Ge_FileSizeCannotBeGreaterThan100MB: "文件大小不得超过100MB",
    Ge_CostDetails: "成本明细",
    Ge_Optional: "选项",
    Ge_WorkingHoursRecord: "工时记录",
    Ge_Standard: "标准",
    Ge_Tooling: "模具",
    Ge_Details1: "明细",
    Ge_SortType: "排序方式",
    Ge_SortByDeliveryDate: "按照模具交期排序",
    Ge_SortByCreationDate: "按照模具创建日期排序",
    Ge_IncludingCompleted: "是否包含已完成的项目任务？",
    Ge_ItemLabel: "标签",
    Ge_BelongTo: "所属项目",
    Ge_ShowInProdSchedule: "在生产调度页面是否显示",
    Ge_Terms: "账期",
    Ge_MaterialRequirementState: "物料需求状态",
    Ge_ResetPassword: "重置密码",
    Ge_PrTaskBillId: "加工单",
    Ge_AssociatedNo: "关联编号",
    Ge_NoData: "暂无数据",
    Ge_DeliveryCompleted: "已完成发货，是否继续进行操作？",
    Ge_StockInCompleted: "已完成入库，是否继续进行操作？",
    Ge_Message: "消息",
    Ge_Audit: "审核",
    Ge_Notice: "通知",
    Ge_Task: "任务",
    Ge_AllMsg: "全部消息",
    Ge_UnreadMsg: "未读消息",
    Ge_AllRemarkToRead: "全部标记为已读",
    Ge_HistoryMsg: "历史消息",
    Ge_Handle: "处理",
    Ge_RemarkToRead: "标记为已读",
    Ge_JustNow: "刚刚",
    Ge_MinutesAgo: "分钟前",
    Ge_HoursAgo: "小时前",
    Ge_1DayAgo: "1天前",
    Ge_MeasuringTool: "量具",
    Ge_Fixture: "夹具",
    Ge_ShowDetail: "查看详情",
    Ge_DateRange: "日期范围",
  },
  //生产
  production: {
    Pr_ReportedDate: "报工日期",
    Pr_DeletedData: "已删除数据",
    Pr_StaleWorkOrder: "陈旧工单",
    Pr_OverdueWorkOrder: "超期工单",
    Pr_PleaseEnterPartNumber: "请输入零件编号...",
    Pr_Unlabeled: "未标记",
    Pr_Tagged: "已标记",
    Pr_OldWorkOrderMark: "陈旧工单标记",
    Pr_DaysOverdue: "超交期天数",
    Pr_DaysNotReported: "未报工天数",
    Pr_LastReportedDate: "最后报工日期",
    Pr_ProcessInformation: "加工信息",
    Pr_WorkOrderNumber: "工单编号",
    Pr_LifeSetting: "寿命设定",
    Pr_IntervalDays: "间隔天数",
    Pr_CreationDate: "创建日期",
    Pr_CumulativeTime: "累计时间",
    Pr_AcquisitionDate: "购置日期",
    Pr_LastMaintenanceDate: "上次保养日期",
    Pr_MaintenanceMode: "保养方式",
    Pr_Manufacture: "设备厂商",
    Pr_DeviceNo: "设备编号",
    Pr_DeviceName: "设备名称",
    Pr_TimeSpan: "有效时间范围",
    Pr_CostRate: "标准费率",
    Pr_ProcessCode: "工序代号",
    Pr_SortOrder: "序号",
    Pr_StartScale: "开始比例",
    Pr_EndScale: "结束比例",
    Pr_ProcessType: "工序类别",
    Pr_Other: "其他",
    Pr_ProcessTemplate: "工序模板",
    Pr_TaskProcess: "任务工序",
    Pr_ActualDevice: "实际设备",
    Pr_SchedulingResults: "排程结果",
    Pr_PartOutsourcing: "零件委外",
    Pr_ProcessOutsourcing: "工序委外",
    Pr_Calculate: "计算",
    Pr_StartScheduleTime: "开始排程时间",
    Pr_PleaseSelectStartScheduleTime: "请选择开始排程时间",
    Pr_UpToMachine: "上机",
    Pr_DownFromMachine: "下机",
    Pr_EnterStation: "进站",
    Pr_AlreadyInStation: "已入站",
    Pr_OnMachine: "在机",
    Pr_GetOffTime: "下机时间",
    Pr_PleaseEnterEmployeeNoAndWorkSheetNo: "请输入工号和工单编号",
    Pr_DevicesList: "设备列表",
    Pr_Use: "使用",
    Pr_StopUse: "停用",
    Pr_RepeatWeekly: "按周重复",
    Pr_NoRepetition: "不重复",
    Pr_RepetitionType: "重复类型",
    Pr_Monday: "星期一",
    Pr_Tuesday: "星期二",
    Pr_Wednesday: "星期三",
    Pr_Thursday: "星期四",
    Pr_Friday: "星期五",
    Pr_Saturday: "星期六",
    Pr_Sunday: "星期日",
    Pr_Overload: "超负荷",
    Pr_OverDeliveryDate: "超交期",
    Pr_Automatic: "自动排程",
    Pr_ManualScheduling: "人工排程",
    Pr_Normal: "正常",
    Pr_Error: "错误",
    Pr_PleaseEnterEmployeeInfo: "请输入员工信息",
    Pr_PleaseSelectDevice: "请选择设备",
    Pr_PleaseEnterWorkSheetInfo: "请输入工单信息",
    Pr_WorkSheetNo: "加工单号",
    Pr_EditDeliveryDate: "编辑交期",
    Pr_PlanningDevices: "计划设备",
    Pr_MaximumNumberOfWorkSheet: "最大上机工单数",
    Pr_EquipmentLoad: "设备负荷",
    Pr_AvailableHours: "可用工时",
    Pr_PartDetail: "零件明细",
    Pr_Equipment: "设备",
    Pr_SelectPart: "选择零件",
    Pr_LoadOn: "加载",
    Pr_CheckLoad: "查看负荷",
    Pr_Release: "发布",
    Pr_CheckSchedule: "查看进度",
    Pr_ScheduledResources: "预定资源",
    Pr_PlanSource: "计划来源",
    Pr_DetailedLoad: "明细负荷",
    Pr_SelectDate: "选择日期",
    Pr_Processed: "已加工",
    Pr_ToBeProcessed: "待加工",
    Pr_Inside: "厂内",
    Pr_Outside: "厂外",
    Pr_Top: "置顶",
    Pr_SwitchDevice: "切换设备",
    Pr_PrintByTooling: "按模号打印",
    Pr_SimulatedCalculate: "模拟计算",
    Pr_SimulatedAPS: "模拟排程",
    Pr_SchedulingAlgorithmSelection: "排程算法选择",
    Pr_ClassicalAlgorithm: "经典算法",
    Pr_ClassicalAlgorithmDes: "经典算法：同等级下完成度高优先",
    Pr_CR: "CR值排程",
    Pr_CRDes: "CR值排程：CR(重要比率)=(交期-当前日期)/工期，同等级下CR值小优先",
    Pr_MinimumWorkingPeriod: "最短工期",
    Pr_MinimumWorkingPeriodDes: "最短工期：同等级下工期短优先",
    Pr_EarliestDeliveryDate: "最早交货期",
    Pr_EarliestDeliveryDateDes: "最早交货期：同等级下交货期早优先",
    Pr_DeliveryDate: "交货日期",
    Pr_ProofDate: "首样日期",
    Pr_DoAPS: "计算排程",
    Pr_APSLog: "排程日志",
    Pr_OneClickProcessing: "一键处理",
    Pr_Algorithms: "算法",
    Pr_MarkAsNormal: "标记为正常",
    Pr_MarkAsCompleted: "标记为已完成",
    Pr_Version: "版本",
    Pr_ModifyPlanEndTime: "修改计划结束时间",
    Pr_Total: "总计",
    Pr_WhetherToPublish: "生产排程完成，是否进行发布？",
    Pr_WorkSheetInfo: "工单信息",
    Pr_NormalWorkSheet: "正常工单",
    Pr_OverdueWorkSheet: "超交期工单",
    Pr_OverloadWorkSheet: "超负荷工单",
    Pr_ComputingTime: "计算时间",
    Pr_HoursSummary: "工时汇总",
    Pr_IsOverstep: "是否超出时间段",
    Pr_ConfirmToDelete: "确定删除此资源组?",
  },
  quality: {
    Qc_CheckResult: "检验结果",
    Qc_CheckDetailList: "检验明细",
    Qc_Operator: "检验人",
    Qc_CheckDate: "检验日期",
    Qc_EstimatedLoss: "预估损失",
    Qc_ProportionOfAbnormalQualityOfDepartment: "部门品质异常占比",
    Qc_ProcessReworkRatio: "工序返工占比",
    Qc_ReworkProcess: "返工工序",
    Qc_ReworkDetailList: "返工明细",
    Qc_Ge_QualityAbnormal: "品质异常",
    Qc_ThereAreNoManufacturedProcesses: "没有任何已加工的工序",
    Qc_PleaseSelectADocument: "请选择一条单据",
    Qc_CreatFromManufacturingTaskList: "从任务加工单创建",
    Qc_Qualified: "合格",
    Qc_Unqualified: "不合格",
    Qc_AbnormalCause: "不合格原因",
    Qc_AbnormalCauseAnalyst: "不合格原因分析人",
    Qc_ToBeTested: "待检验",
    Qc_PleaseChooseTheUnqualifiedProcess: "选择不合格工序",
    Qc_Rework: "返工",
    Qc_Scrapped: "报废",
    Qc_AcceptOnDeviation: "特采",
    Qc_NormalRework: "过程返工",
    Qc_SubmittedForInspectionQty: "送检数量",
    Qc_InspectionQty: "检验数量",
    Qc_UnqualifiedQty: "不合格数量",
    Qc_TheoreticalValue: "理论值",
    Qc_UpperTolerance: "上公差",
    Qc_LowerTolerance: "下公差",
    Qc_MeasuredValue: "实测值",
    Qc_SelfCheckProcess: "自检工序",
    Qc_ProcessCheckType: "检验类型",
    Qc_ProcessCheckChart: "检验图",
    Qc_SelfCheck: "自检",
    Qc_NormalCheck: "巡检",
    Qc_FirstInspection: "首检",
    Qc_InspectionExemption: "免检",
    Qc_UnReturn: "未归还",
    Qc_Return: "归还",
  },
  device: {
    De_Repair: "报修",
    De_Maintenance: "保养",
    De_MaintenanceInfo: "保养信息",
    De_MaintenanceDate: "保养日期",
    De_MaintenanceMode: "保养方式",
    De_LastMaintenanceDate: "上次保养日期",
    De_CumulativeTime: "累计时间",
    De_MaintenanceContent: "保养内容",
    De_MaintenanceResults: "保养结果",
    De_ScrapDate: "报废日期",
    De_ScrapDescription: "报废说明",
    De_Repairer: "修理厂商",
    De_RepairApplicant: "报修人",
    De_RepairDate: "报修日期",
    De_CompletionDate: "完成日期",
    De_AcquisitionDate: "购置日期",
    De_UserDepartment: "使用部门",
    De_LifeSetting: "寿命设定",
    De_MaintenanceTemplate: "维护模板",
    De_Manufacturer: "厂商",
    De_Interval: "间隔天数/累计小时/累计次数",
    De_StorageStatus: "出入库状态",
    De_Handlers: "操作者",
    De_ToBeMaintained: "待保养",
    De_DataToBeMaintained: "查看待保养的数据",
    De_RegularMaintenance: "定时保养",
    De_QuantitativeMaintenance: "定量保养",
    De_FaultRepair: "故障维修",
    De_PrecisionRepair: "精度调准",
    De_Type1: "类别一",
    De_Type2: "类别二",
    De_CheckScrap: "查看报废单",
    De_UsageRecord: "使用记录",
    De_StockOpsRecord: "出入库记录",
    De_AddUsageRecord: "添加使用记录",
    De_AddStockOpsRecord: "添加出入库记录",
    De_StockOpsInfo: "目的地/来源地",
  },
  // 后端提示
  backendMessage: {
    P10001: "自动排程出现错误!",
    P10002: "本站点不能上机此工序",
    P10003: "币种不能为空!",
    P10004: "币种名称不能为空!",
    P10005: "币种名称不能重复!",
    P10006: "编号已存在",
    P10007: "编号已同步,无法删除",
    P10008: "编号已重复",
    P10009: "部门名称不能为空!",
    P10010: "部门名称不能重复!",
    P10011: "仓库不能为空!",
    P10012: "仓库名称不能为空!",
    P10013: "仓库名称不能重复!",
    P10014: "查询设备不能为空!",
    P10015: "成本类型不对！",
    P10016: "出货日期不能为空!",
    P10017: "此工序不能再同一台设备上重复上机",
    P10018: "此工序代号已存在,请重新输入!",
    P10019: "此工序已存在,请重新输入!",
    P10020: "此序号已到底部,无法继续下移!",
    P10021: "此序号已到顶部,无法继续上移!",
    P10022: "单据不存在",
    P10023: "单据已审核,无法拒绝!",
    P10024: "单据有人正在编辑!",
    P10025: "单据状态异常,无法撤回!",
    P10026: "单位不能为空!",
    P10027: "单位名称不能为空!",
    P10028: "单位名称不能重复!",
    P10029: "当前工单状态不为已审核,无法完成!",
    P10030: "当前工序状态不允许进站",
    P10031: "当前页码不能为0",
    P10032: "当前状态不能撤销！",
    P10033: "当前状态不能作废！",
    P10034: "工序明细不能为空!",
    P10035: "工序设备资源组未包含此设备,请重新选择设备上机",
    P10036: "工序未下机,请先下机",
    P10037: "工序预计工时不能为0!",
    P10038: "工序状态不为待入站,无法删除",
    P10039: "工序状态不为待入站,无法委外",
    P10040: "工序状态为暂停中,请先完成",
    P10041: "工序资源组不能为空:",
    P10042: "公司简称不能重复!",
    P10043: "公司全称不能重复!",
    P10044: "供应商编号不能为空!",
    P10045: "供应商简称不能为空!",
    P10046: "计划交期不能为空!",
    P10047: "计划结束不能为空!",
    P10048: "计划开始不能为空!",
    P10049: "加工工序不存在!",
    P10050: "简称不能进行修改!",
    P10051: "简称不能为空!",
    P10052: "简称不能重复!",
    P10053: "角色已存在,请重新输入!",
    P10054: "结束日期不能为空!",
    P10055: "进度不能小于0或大于100！",
    P10056: "旧密码输入错误!",
    P10057: "开始日期不能大于结束日期!",
    P10058: "开始日期不能为空!",
    P10059: "客户编号不能为空!",
    P10060: "客户编号不能重复!",
    P10061: "客户简称不能进行修改!",
    P10062: "客户简称不能为空!",
    P10063: "客户简称不能重复!",
    P10064: "库存不能小于0",
    P10065: "零件编号不能为空!",
    P10066: "零件编号已存在",
    P10067: "零件名称不能为空!",
    P10068: "零件明细不能为空!",
    P10069: "领料类别不能为空!",
    P10070: "名称不能为空!",
    P10071: "明细计划结束不能为空!",
    P10072: "明细计划开始不能为空!",
    P10073: "模板工艺内容不能为空!",
    P10074: "模板名称不能为空!",
    P10075: "模号不正确！",
    P10076: "模具编号不能为空!",
    P10077: "您无撤回此单据的权限!",
    P10078: "您无撤审此单据的权限!",
    P10079: "您无拒绝此单据的权限!",
    P10080: "您无删除此单据的权限!",
    P10081: "您无审核此单据的权限!",
    P10082: "您无提交此单据的权限!",
    P10083: "您无作废此单据的权限!",
    P10084: "清单编号已被使用",
    P10085: "清单编号已被占用",
    P10086: "清单编号已重复",
    P10087: "请按加工顺序入站!",
    P10088: "请上传图片格式!",
    P10089: "请输入正确的实际结束时间!",
    P10090: "请选择待加工工序!",
    P10091: "请选择需要修改的信息",
    P10092: "权限不足!",
    P10093: "任务不存在",
    P10094: "任务工序不能为空!",
    P10095: "上机采集的单据编号不能为空!",
    P10096: "上机员工与下机员工不一致!",
    P10097: "审核数据不能为空",
    P10098: "生产任务单计划结束日期不能为空!",
    P10099: "生产任务单计划开始日期不能为空!",
    P10100: "实际结束时间不能小于实际开始时间!",
    P10101: "首样日期不能为空!",
    P10102: "提交人不能为空!",
    P10103: "调出仓库不能为空!",
    P10104: "调入仓库不能为空!",
    P10105: "退货日期不能为空!",
    P10106: "未入当前站点",
    P10107: "未找到采购供应商信息!",
    P10108: "未找到此工序的上机记录!",
    P10109: "未找到工序!",
    P10110: "未找到工序信息!",
    P10111: "未找到可下机的工序信息!",
    P10112: "未找到模具信息!",
    P10113: "未找到模具信息!",
    P10114: "未找到任务工序信息!",
    P10115: "未找到设备信息!",
    P10116: "未找到设备信息!",
    P10117: "未找到生产任务单信息!",
    P10118: "未找到物料信息!",
    P10119: "未找到项目信息!",
    P10120: "未找到销售客户信息!",
    P10121: "未找到已完成工序信息!",
    P10122: "未找到用户信息!",
    P10123: "未找到站点匹配工序!",
    P10124: "文件大小不能超过8M!",
    P10125: "无法删除新模任务",
    P10126: "无法新增新模任务",
    P10127: "物料编号不能为空!",
    P10128: "物料编号已存在,请重新输入!",
    P10129: "物料类别名称不能为空!",
    P10130: "物料类别名称不能重复!",
    P10131: "物料没有库存信息",
    P10132: "物料需求已处理无法删除",
    P10133: "物料需求状态错误",
    P10134: "物料需求状态错误,请选择待处理的物料需求!",
    P10135: "系统繁忙，请稍后再试！",
    P10136: "下机采集明细数据不能为空!",
    P10137: "项目编号不能为空!",
    P10138: "项目工序已存在,请重新输入!",
    P10139: "项目工序已存在,请重新输入!",
    P10140: "项目号和模号不能同时为空！",
    P10141: "项目名不能重复!",
    P10142: "新模任务未开单或未审核!",
    P10143: "页面大小不能为0",
    P10144: "已达到设备最大同时加工数,无法继续上机!",
    P10145: "已入站，请勿重复入站!",
    P10146: "用户编号不存在",
    P10147: "用户编号已存在,请重新输入!",
    P10148: "用户名不能为空!",
    P10149: "用户名称已存在,请重新输入!",
    P10150: "用户名称已存在,请重新输入!",
    P10151: "用户与密码不匹配, 请重新输入!",
    P10152: "只能选择同一套模具加工的零件",
    P10153: "重复下机或者工序状态不对或者下机设备不对",
    P10154: "资源组不能为空!",
    P10155: "资源组不能重复!",
    P10156: "总比例不能超过100%!",
    P10157: "发布成功!",
    P10158: "修改成功!",
    P10159: "新增成功!",
    P10160: "删除成功!",
    P10161: "保存成功!",
    P10162: "提交成功!",
    P10163: "审核成功!",
    P10164: "撤回成功!",
    P10165: "作废成功!",
    P10166: "拒绝成功!",
    P10167: "注销成功!",
    P10168: "入站成功!",
    P10169: "下机成功!",
    P10170: "上机成功!",
    P10171: "检验完成!",
    P10172: "报工成功!",
    P10173: "更新成功!",
    P10174: "已启用",
    P10175: "已停用",
    P10176: "上传成功!",
    P10177: "数量必须大于0",
    P10178: "同步成功!",
    P10179: "BOM已关联,无法删除",
    P10180: "此设备已存在,请重新输入!",
    P10181: "此设备名称已存在,请重新输入!",
    P10182: "单据状态异常,无法编辑!",
    P10183: "请不要重复提交！",
    P10184: "分享密钥不存在！",
    P10185: "分享密钥已过期！",
    P10186: "无法删除!",
    P10187: "单位不存在!",
    P10188: "当前工序禁止跳站!",
    P10189: "操作失败",
    P10190: "工单状态未完成",
    P10191: "关联编号不能为空!",
    P10192: "部分数据未删除",
    P10193: "模板名称已存在,请重新输入!",
    P10194: "可入库数量小于当前数量",
    P10195: "可发货数量小于当前数量",
    P10196: "可退货数量小于当前数量",
  },
  program: {
    Pr_ProcessPlanning: "工艺设计",
    Pr_CAMTaskRecord: "编程任务记录",
  },
  dashboard: {
    Da_ECNThisMonth: "本月设变",
    Da_NewMoldThisMonth: "本月新模",
    Da_MoldCorrectionThisMonth: "本月修模",
    Da_MoldTrialThisMonth: "本月试模",
    Da_WorkingLoadThisMonth: "本月产能",
    Da_WorkingLoadLastMonth: "上月负荷",
    Da_AbnormalOfTheDepartmentQualityLast90Days: "部门品质异常（最近90天）",
    Da_ProcessReworkLast90Days: "工序返工（最近90天）",
    Da_MonthlyQualityTrendChart: "月份品质趋势图",
    Da_Workbench: "工作台",
  },

  systemSetupData: {
    JV_APS: "自动排程",
    Basics: "基础",
    Design: "设计",
    Project: "项目",
    Production: "生产",
    Auto_create_pr_on_NSM_name: "是否可以自动创建非标准物料的采购申请",
    Auto_create_pr_on_NSM_desc: "是否可以自动创建非标准物料的采购申请",
    Auto_create_pr_on_SM_name: "是否可以自动创建标准物料的采购申请",
    Auto_create_pr_on_SM_desc: "是否可以自动创建标准物料的采购申请",
    Bom_default_unit_name: "导入BOM的默认单位",
    Default_display_level_of_BOM: "默认展示级别",
    Auto_Create_Trial_Tooling_Task: "自动创建试模任务",
    Bom_default_unit_desc: "导入BOM时的默认单位",
    Can_skip_station_name: "是否可以跳站",
    Can_skip_station_desc: "报工时是否可以跳站",
    Design_users_name: "设计用户",
    Design_users_desc: "设计任务展示的人员",
    Open_confirmation_of_production_quantity_name: "需要确认生产数量",
    Open_confirmation_of_production_quantity_desc:
      "在进站和上机时需要输入零件数量",
    Program_users_name: "编程用户",
    Program_users_desc: "编程任务展示的人员",
    Standard_employee_work_time_name: "员工标准工作时间",
    Standard_employee_work_time_desc: "员工每天的工作时间,单位为小时",
    User_station_name: "用户站点",
    User_station_desc: "用户站点配置",
    Ftp_file_management_admin_name: "项目文件管理员角色配置",
    Ftp_file_management_admin_desc: "该角色可以对项目文件的根目录具有读写权限 ",
    Ftp_file_management_backup_path_name: "项目文件备份路径",
    Ftp_file_management_backup_path_desc: "项目文件将备份到这个路径下",
    Ftp_file_management_path_name: "项目文件路径",
    Ftp_file_management_path_desc: "项目文件将保存到这个路径下",
    Prohibit_skip_station_processes: "禁止跳站工序",
    Create_purchase_request_below_safety_stock: "低于安全库存创建采购申请",
    User_web_socket: "用户消息推送配置",
    User_web_socket_desc: "用户是否接受消息",
    Aps_ordinary_bill_process_post_time_coefficient:
      "自动排程普通工单工序后置时间系数",
    Aps_urgent_bill_process_post_time_coefficient:
      "自动排程紧急工单工序后置时间系数 ",
    Aps_extra_urgent_bill_process_post_time_coefficient:
      "自动排程特急工单工序后置时间系数",
    Aps_ordinary_bill_process_lead_time_coefficient:
      "自动排程普通工单工序前置时间系数",
    Aps_urgent_bill_process_lead_time_coefficient:
      "自动排程紧急工单工序前置时间系数",
    Aps_extra_urgent_bill_process_lead_time_coefficient:
      "自动排程特急工单工序前置时间系数",
      Message_notification_configuration:"消息通知配置"
  },

  ...zhLocale,
};
export default cn;
