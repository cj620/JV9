import { maintenanceEnum, maintenancePlanEnum } from "@/enum/workModule";

export const tableConfig1 = [
    /*设备编号*/
    {
        prop: "DeviceNo",
        label: i18n.t('production.Pr_DeviceNo'),
    },
    /*设备名称*/
    {
        prop: "DeviceName",
        label: i18n.t('production.Pr_DeviceName'),
    },
    /*规格型号*/
    {
        prop: "SpecModel",
        label: i18n.t('device.De_SpecModel'),
    },
]
export const tableConfig2 = [
    /*排序*/
    {
        prop: "SortOrder",
        label: i18n.t('production.Pr_SortOrder'),
    },
    /*保养内容*/
    {
        prop: "MaintenanceContent",
        label: i18n.t('device.De_MaintenanceContent'),
    },
]
export const detailConfig = [
    {
        prop: "PlanName",
        label: i18n.t('device.De_PlanName'),
    },
    {
        prop: "Description",
        label: i18n.t('device.De_Description'),
    },
    {
        prop: "MaintenanceMode",
        label: i18n.t("device.De_MaintenanceMode"),
        customFilter: (value) => {
            if (!value) return "";
            return maintenanceEnum[value].name;
        },
    },
    {
        prop: "IntervalDays",
        label: i18n.t('device.De_IntervalDays'),
    },
    {
        prop: "State",
        label: i18n.t("Generality.Ge_State"),
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
        filter: "time",
    },
]
