import { tableConfig } from "@/views/workModule/production/report/employeesChart/config";
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
