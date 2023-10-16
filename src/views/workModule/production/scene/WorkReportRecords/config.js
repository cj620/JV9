import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { getEmployeeWork } from "@/api/workApi/production/dataReport";
export class api extends TableAPI {
	getData = getEmployeeWork;
}
export class Table extends BaseTable {
	constructor() {
		super({
			tableSchema: tableConfig,
			formSchema: [],
			rowId: "Id",
			title: i18n.t("menu.Pr_WorkReportRecords"),
			api,
			sortCol: false,
			chooseCol: false,
			tableHeaderShow: false,
			operationCol: false,
		});
	}
}
export const tableConfig = [
	/*加工单号*/
	{
		prop: "BillId",
		label: i18n.t("production.Pr_WorkSheetNo")
	},
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
	// 任务工序
	{
		prop: "TaskProcess",
		label: i18n.t("production.Pr_TaskProcess"),
	},
	/*数量*/
	{
		prop: "Quantity",
		label: i18n.t("Generality.Ge_Quantity"),
	},
	/*实际开始*/
	{
		prop: "ActualStart",
		label: i18n.t("Generality.Ge_ActualStart"),
		filter: "time"
	},
	/*实际结束*/
	{
		prop: "ActualEnd",
		label: i18n.t("Generality.Ge_ActualEnd"),
		filter: "time"
	},
	/*实际用时*/
	{
		prop: "ActualTime",
		label: i18n.t("Generality.Ge_ActualTime"),
	},
	/*实际设备*/
	{
		prop: "ActualDevice",
		label: i18n.t("production.Pr_ActualDevice"),
	},
	/*作业员*/
	{
		prop: "Worker",
		label: i18n.t("Generality.Ge_Worker"),
	},
];
