import i18n from "@/i18n/i18n";
import { enumFilter } from "~/utils/system/enumsPlugin";
import ProcessState from "@/enum/workModule/production/ProcessState.js";
export const tableConfig = [

	{
		//任务单号
		prop: "BillId",
		label: i18n.t("project.Pro_TaskSheetNo")
	},
	{
		//模具编号
		prop: "ToolingNo",
		label: i18n.t("Generality.Ge_ToolingNo"),
	},
	{
		//零件编号
		prop: "PartNo",
		label: i18n.t("Generality.Ge_PartNo")
	},
	{
		//状态
		prop: "State",
		label: i18n.t("Generality.Ge_State"),
		customFilter: (value) => enumFilter(value, ProcessState),
	},
	{
		//零件名称
		prop: "PartName",
		label: i18n.t("Generality.Ge_PartName"),
	},
	{
		//工序
		prop: "Process",
		label: i18n.t("Generality.Ge_Process"),
	},
	{
		//作业者
		prop: "Worker",
		label: i18n.t("Generality.Ge_Worker"),
	},
	{
		//计划设备
		prop: "PlanDevice",
		label: i18n.t("production.Pr_PlanningDevices"),
	},
	{
		//实际设备
		prop: "ActualDevice",
		label: i18n.t("production.Pr_ActualDevice"),
	},
	{
		//数量
		prop: "Quantity",
		label: i18n.t("Generality.Ge_Quantity"),
	},
	{
		//计划开始
		prop: "PlanStart",
		label: i18n.t("Generality.Ge_PlanStart"),
		filter: "time",
	},
	{
		//计划结束
		prop: "PlanEnd",
		label: i18n.t("Generality.Ge_PlanEnd"),
		filter: "time",
	},
]
