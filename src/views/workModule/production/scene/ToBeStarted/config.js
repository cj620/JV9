import i18n from "@/i18n/i18n";

export const tableConfig = [
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
	},
	{
		//计划结束
		prop: "PlanEnd",
		label: i18n.t("Generality.Ge_PlanEnd"),
	},
]
