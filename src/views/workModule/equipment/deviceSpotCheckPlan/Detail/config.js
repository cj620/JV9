import { enumFilter } from "~/utils/system/enumsPlugin";
import { afterTimeOutEnum, planTypeEnum, SpotCheckTypeEnum } from "@/enum/workModule";

export const itemTableConfig = [
    /*序号*/
    {
        prop: "SortOrder",
        label: i18n.t('production.Pr_SortOrder'),
        width: '80px',
    },
    /*点检内容*/
    {
        prop: "SpotCheckContent",
        label: i18n.t('device.De_SpotCheckContent')
    },
]

export const memberTableConfig = [
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

export const detailConfig = [
    /*计划名称*/
    {
        prop: "PlanName",
        label: i18n.t('device.De_PlanName1'),
    },
    /*角色*/
    {
        prop: "RoleName",
        label: i18n.t("menu.Se_Role"),
    },
    /*计划类型*/
    {
        prop: "PlanType",
        label: i18n.t("device.De_PlanType"),
        customFilter: (value, row) => enumFilter(value, planTypeEnum),
    },
    /*点检类型*/
    {
        prop: "SpotCheckType",
        label: i18n.t("device.De_SpotCheckType"),
        customFilter: (value, row) => enumFilter(value, SpotCheckTypeEnum),
    },
    /*执行时间*/
    {
        prop: "ExecutionTime",
        label: i18n.t("device.De_ExecutionTime"),
    },
    /*超时时间*/
    {
        prop: "TimeOut",
        label: i18n.t("device.De_TimeOut"),
    },
    /*超时处理*/
    {
        prop: "AfterTimeOut ",
        label: i18n.t("device.De_AfterTimeOut"),
        customFilter: (value, row) => enumFilter(value, afterTimeOutEnum),
    },
    /*制单人*/
    {
        prop: "Creator",
        label: i18n.t("Generality.Ge_Creator"),
    },
    /*制单日期*/
    {
        prop: "CreationDate",
        label: i18n.t("Generality.Ge_CreationDate"),
        filter: "time",
    },
]
