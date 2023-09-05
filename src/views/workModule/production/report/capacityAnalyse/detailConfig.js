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
		prop: "ApsVersionNo",
		label: i18n.t("production.Pr_Version"),
		width: 150,
	},
	{
		prop: "ApsState",
		label: i18n.t("Generality.Ge_State"),
		custom: true
	},
	{
		prop: "BillId",
		label: i18n.t("Generality.Ge_BillId"),
		width: 115
	},
	{
		prop: "PartName",
		label: i18n.t("Generality.Ge_PartName"),
		width: 115
	},
	{
		prop: "PartNo",
		label: i18n.t("Generality.Ge_PartNo"),
		width: 115
	},
	{
		prop: "PlanDevice",
		label: i18n.t("production.Pr_PlanningDevices"),
	},
	{
		prop: "PlanStart",
		label: i18n.t("Generality.Ge_PlanStart"),
		filter: "date",
		width: 120
	},
	{
		prop: "PlanEnd",
		label: i18n.t("Generality.Ge_PlanEnd"),
		filter: "date",
		width: 120
	},
	{
		prop: "PlanTime",
		label: i18n.t("Generality.Ge_PlanTime"),
	},
	{
		prop: "ProcessName",
		label: i18n.t("Generality.Ge_ProcessName"),
		width: 120
	},
	{
		prop: "Quantity",
		label: i18n.t("Generality.Ge_Quantity"),
	},
	{
		prop: "ToolingNo",
		label: i18n.t("Generality.Ge_ToolingNo"),
		width: 120
	},
	{
		prop: "ResourceGroup",
		label: i18n.t("menu.Pr_Resources"),
		width: 120
	},
];
