import { maintenanceEnum, maintenancePlanEnum } from "@/enum/workModule";

export const tableConfig1 = [
    /*设备编号*/
    {
        prop: "DeviceNo",
        label: "设备编号",
    },
    /*设备名称*/
    {
        prop: "DeviceName",
        label: "设备名称",
    },
    /*规格型号*/
    {
        prop: "SpecModel",
        label: "规格型号",
    },
]
export const tableConfig2 = [
    /*排序*/
    {
        prop: "SortOrder",
        label: "排序",
    },
    /*保养内容*/
    {
        prop: "MaintenanceContent",
        label: "保养内容",
    },
]
export const detailConfig = [
    {
        prop: "PlanName",
        label: "方案名称",
    },
    {
        prop: "Description",
        label: "方案说明",
    },
    {
        prop: "MaintenanceMode",
        label: "保养方式",
        customFilter: (value) => {
            if (!value) return "";
            return maintenanceEnum[value].name;
        },
    },
    {
        prop: "IntervalDays",
        label: "间隔天数",
    },
    {
        prop: "State",
        label: "状态",
        customFilter: (value) => {
            if (!value) return "";
            return maintenancePlanEnum[value].name;
        },
    },
    {
        // 制单人
        prop: "Creator",
        label: i18n.t("Generality.Ge_Creator"),
    },
    {
        // 制单日期
        prop: "CreationDate",
        label: i18n.t("Generality.Ge_CreationDate"),
        filter: "date",
    },
]
