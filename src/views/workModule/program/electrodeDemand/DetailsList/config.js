import { TableAPI, Table as BaseTable } from "@/jv_doc/class/table";
import { designMaterialRequirementItemList } from "@/api/workApi/design/materialRequirement";
import {
	demandStatusEnum,
	enumFilter,
} from "@/enum/workModule";
class api extends TableAPI {
	// 获取列表
	getData = designMaterialRequirementItemList;
}
export class Table extends BaseTable {
	constructor() {
		super({
			// 表格配置
			tableSchema: tableSchema,
			// 表单配置
			formSchema: formSchema,
			// 行标识
			rowId: "Id",
			// 表格标题
			title:
				i18n.t("menu.De_ItemsDemand") + "   " + i18n.t("Generality.Ge_Details1"),
			// 接口类
			api,
			// 打印模块标识
			printMod: "Pa_ElectrodeDemand_Details_list",
			operationCol: false,
			printBar: false,
		});
	}
}
//  表格配置
const tableSchema = [
	{
		prop: "BillId",
		label: i18n.t("Generality.Ge_BillId"),
		align: "center",
		cpn: "Link",
		innerSearch: {
			prop: "BillId",
			cpn: "FormInput",
			label: i18n.t("Generality.Ge_BillId"),
		},
		cpnProps: {
			// 路由名称
			routeName: "Pa_ElectrodeDemand_Details",
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
	/*状态*/
	{
		prop: "State",
		label: i18n.t("Generality.Ge_State"),
		custom: true,
		width: "115px",
	},
	/*模具编号*/
	{
		prop: "ToolingNo",
		label: i18n.t("Generality.Ge_ToolingNo"),
	},
	/*物料编号*/
	{
		prop: "ItemId",
		label: i18n.t("Generality.Ge_ItemId"),
	},
	/*物料名称*/
	{
		prop: "ItemName",
		label: i18n.t("Generality.Ge_ItemName"),
	},
	/*描述*/
	{
		prop: "Description",
		label: i18n.t("Generality.Ge_Describe"),
	},
	/*描述2*/
	{
		prop: "Description2",
		label:i18n.t("design.De_Description2"),
	},
	/*单位*/
	{
		prop: "Unit",
		label: i18n.t("Generality.Ge_Unit"),
		width: "70px",
	},
	/*数量*/
	{
		prop: "Quantity",
		label: i18n.t("Generality.Ge_Quantity"),
		width: "90px",
		align: "right",
		filter: "amount",
	},

	/*状态*/
	{
		prop: "ItemState",
		label: i18n.t("Generality.Ge_State"),
		width: "115px",
		customFilter: (value, row) => enumFilter(value, demandStatusEnum),
	},
	/*备注*/
	{
		prop: "ItemRemarks",
		label: i18n.t("Generality.Ge_Remarks"),
	},
];
//  搜索表单配置
const formSchema = [
	{
		prop: "Keyword",
		label: i18n.t("Generality.Ge_KeyWords"),
		cpn: "FormInput",
	},
	{
		prop: "Remarks",
		label: i18n.t("Generality.Ge_Remarks"),
		cpn: "FormInput",
	},
	{
		prop: "StartDate",
		label: i18n.t("Generality.Ge_StartDate"),
		cpn: "SingleTime",
	},
	{
		prop: "EndDate",
		label: i18n.t("Generality.Ge_EndDate"),
		cpn: "SingleTime",
	},
	{
		prop: "QueryAll",
		label: "",
		cpn: "FormInput",
		default: true,
		hidden: true,
	},
	{
		prop: "State",
		label: "",
		cpn: "FormInput",
		default: 'Approved',
		hidden: true,
	},
	// QueryAll
];
