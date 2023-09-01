import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { production_device_list } from "@/api/workApi/production/baseData";
// import { getAllDevice } from "@/api/workApi/production/baseData";
export class api extends TableAPI {
	// 获取列表
	getData = production_device_list;
	// getData = getAllDevice;
}export class Table extends BaseTable {
	constructor() {
		super({
			tableSchema: tableConfig,
			formSchema:[],
			rowId: "DeviceNo",
			api,
			tableHeaderShow: false,
      height: 430,
      operationCol: false,
			// pagination: false,
			// 打印模块标识
			printMod: "Pr_BaseData_resources",
		});
	}
}
export const tableConfig = [
	{
		prop: "DeviceNo",
		label: i18n.t("production.Pr_DeviceNo"),
		align: "center"
	},
	{
		prop: "Device",
		label: i18n.t("production.Pr_DeviceName"),
		align: "center"
	},
]
