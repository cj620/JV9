import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";

export class DetailTable extends BaseTable{
	constructor() {
		super({
			tableSchema,
			formSchema:[],
			rowId: "BillId",
			height: 350,
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
	},
	{
		prop: "ApsState",
		label: i18n.t("Generality.Ge_State"),
	},
	{
		prop: "BillId",
		label: i18n.t("Generality.Ge_BillId"),
	},
	{
		prop: "PlanDevice",
		label: i18n.t("production.Pr_PlanningDevices"),
	},
	{
		prop: "PlanStart",
		label: i18n.t("Generality.Ge_PlanStart"),
		filter: "date",
	},
	{
		prop: "PlanEnd",
		label: i18n.t("Generality.Ge_PlanEnd"),
		filter: "date",
	},
	{
		prop: "PlanTime",
		label: i18n.t("Generality.Ge_PlanTime"),
	},
	{
		prop: "ProcessName",
		label: i18n.t("Generality.Ge_ProcessName"),
	},
	{
		prop: "Quantity",
		label: i18n.t("Generality.Ge_Quantity"),
	},
	{
		prop: "ToolingNo",
		label: i18n.t("Generality.Ge_ToolingNo"),
	},
	{
		prop: "ResourceGroup",
		label: i18n.t("menu.Pr_Resources"),
	},
];
