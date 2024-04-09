// 钳工收料表格配置
import { getAllUserData } from "@/api/basicApi/systemSettings/user";

// export const tableConfig = [
// 	// 单号
// 	{
// 		prop: "BillId",
// 		label: i18n.t("production.Pr_WorkSheetNo")
// 	},
// 	// 产品号
// 	{
// 		prop: "ToolingNo",
// 		label: i18n.t("production.Pr_ToolingNo")
// 	},
// 	// 零件编号
// 	{
// 		prop: "PartName",
// 		label: i18n.t("Generality.Ge_PartName"),
// 	},
// 	// 数量
// 	{
// 		prop: "Quantity",
// 		label: i18n.t("Generality.Ge_Quantity")
// 	},
// 	// 收料人
// 	{
// 		prop: "Worker",
// 		label: i18n.t("production.Pr_Worker")
// 	},
// 	// 备注
// 	{
// 		prop: "Remarks",
// 		label: i18n.t("Generality.Ge_Remarks")
// 	}
// ]
// 钳工收料记录表格
import { TableAPI, Table as BaseTable } from "~/class/table";
import { RCVRecordList } from "@/api/workApi/production/baseData"
class api extends TableAPI {
	// 获取列表
	getData = RCVRecordList;
}
export class Table extends BaseTable {
	constructor() {
		super({
			tableSchema: tableSchema,
			formSchema: formSchema,
			rowId: "Id",
			title: i18n.t("menu.As_ProductionFitterReceiveRecord"),
			api,
			printMod: "As_ProductionFitterReceiveRecord",
			operationWidth: 120,
			printBar: false,
		})
	}
}
const tableSchema = [
	// 加工单号
	{
		prop: "PrTaskBillId",
		label: i18n.t("production.Pr_WorkSheetNo"),
	},
	// 模具号
	{
		prop: "ToolingNo",
		label: i18n.t("Generality.Ge_ToolingNo"),
	},
	// 零件编号
	{
		prop: "PartNo",
		label: i18n.t("Generality.Ge_PartNo"),
	},
	// 数量
	{
		prop: "Quantity",
		label: i18n.t("Generality.Ge_Quantity"),
	},
	// 收料人
	{
		prop: "Worker",
		label: i18n.t("production.Pr_Worker"),
	},
	// 收料时间
	{
		prop: "CreationDate",
		label: i18n.t("production.Pr_CreationDate1"),
		filter: "time",
	},
]
const formSchema = [
	//产品号、零件编号模糊搜索
	{
		prop: "Keyword",
		label: i18n.t("Generality.Ge_KeyWords"),
		cpn: "FormInput",
	},
	// 收料人
	{
		prop: "Worker",
		label: i18n.t("production.Pr_Worker"),
		cpn: "SyncSelect",
		api: getAllUserData,
		apiOptions: {
			keyName: "UserName",
			valueName: "UserName",
		},
	},
	// 收料时间
	{
		prop: "CreationDate",
		label: i18n.t("production.Pr_CreationDate1"),
		cpn: "SingleTime"
	},
]
