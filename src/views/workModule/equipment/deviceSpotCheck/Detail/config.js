import { enumFilter } from "~/utils/system/enumsPlugin";
import { afterTimeOutEnum, planTypeEnum, SpotCheckTypeEnum, spotCheckListStateEnum } from "@/enum/workModule";

export const detailConfig = [
    {
        // 计划名称
        prop: "PlanName",
        label: i18n.t('device.De_PlanName1'),
    },
    {
        // 角色
        prop: "RoleName",
        label: i18n.t("menu.Se_Role"),
    },
    {
        // 计划类型
        prop: "PlanType",
        label: i18n.t("device.De_PlanType"),
        customFilter: (value, row) => enumFilter(value, planTypeEnum),
    },
    {
        // 点检类型
        prop: "SpotCheckType",
        label: i18n.t("device.De_SpotCheckType"),
        customFilter: (value, row) => enumFilter(value, SpotCheckTypeEnum),
    },
    {
        // 关联编号
        prop: "AssociatedNo",
        label: i18n.t('Generality.Ge_AssociatedNo'),
    },
    {
        // 超时时间
        prop: "TimeOut",
        label: i18n.t("device.De_TimeOut"),
    },
    {
        // 超时处理
        prop: "AfterTimeOut",
        label: i18n.t("device.De_AfterTimeOut"),
        customFilter: (value, row) => enumFilter(value, afterTimeOutEnum),
    },
    {
        // 检验开始时间
        prop: "CheckStartDate",
        label: i18n.t("device.De_CheckStartDate"),
        filter: "time",
    },
    {
        // 检验结束时间
        prop: "CheckEndDate",
        label: i18n.t('device.De_CheckEndDate'),
        filter: "time",
    },
    {
        // 应开始时间
        prop: "ShouldBeginTime",
        label: i18n.t('device.De_ShouldBeginTime'),
        filter: "time",
    },
]

export const tableConfig = [
    /*设备编号*/
    {
        prop: "DeviceNo",
        label: i18n.t("production.Pr_DeviceNo"),
    },
    /*设备名称*/
    {
        prop: "DeviceName",
        label: i18n.t("production.Pr_DeviceName"),
    },
    /*规格型号*/
    {
        prop: "SpecModel",
        label: i18n.t("device.De_SpecModel"),
    },
    /*状态*/
    {
        prop: "State",
        label: i18n.t("Generality.Ge_State"),
        customFilter: (value, row) => enumFilter(value, spotCheckListStateEnum),
    },
    /*点检时间*/
    {
        prop: "CheckedDate",
        label: i18n.t("device.De_CheckedDate"),
        filter:'time',
    },
    /*点检人*/
    {
        prop: "CheckedBy",
        label: i18n.t("device.De_Operator"),
    },
    /*备注*/
    {
        prop: "Remarks",
        label: i18n.t("Generality.Ge_Remarks"),
    },
]
