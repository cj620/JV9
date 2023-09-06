import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";

export class DetailTable extends BaseTable{
	constructor() {
		super({
			tableSchema,
			formSchema:[],
			rowId: "BillId",
			height: 400,
			printBar: false,
			searchBar: false,
			exportBar: false,
			colBar: false,
			densityBar: false,
			tableHeaderShow: false,
			pagination: false,
			chooseCol: false,
			operationCol: false,
		});
	}
}
export const tableSchema = [
	{
		prop: "BillId",
		label: i18n.t("Generality.Ge_BillId"),
		width: 115
	},
	{
		prop: "ToolingNo",
		label: i18n.t("Generality.Ge_ToolingNo"),
		
	},
	{
		prop: "PartNo",
		label: i18n.t("Generality.Ge_PartNo"),
		
	},
	{
		prop: "ProcessName",
		label: i18n.t("Generality.Ge_ProcessName"),
		width: 100
	},
	{
		prop: "PlanDevice",
		label: i18n.t("production.Pr_PlanningDevices"),
		width: 100
	},
	{
		prop: "PlanStart",
		label: i18n.t("Generality.Ge_PlanStart"),
		filter: "time",
		width: 140
	},
	{
		prop: "PlanEnd",
		label: i18n.t("Generality.Ge_PlanEnd"),
		filter: "time",
		width: 140
	},
	{
		prop: "PlanTime",
		label: i18n.t("Generality.Ge_PlanTime"),
		width: 100
	},

	{
		prop: "Quantity",
		label: i18n.t("Generality.Ge_Quantity"),
		width: 100
	},
	
];
