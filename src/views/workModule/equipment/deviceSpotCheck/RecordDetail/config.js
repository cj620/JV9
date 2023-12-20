import { enumFilter } from "~/utils/system/enumsPlugin";
import {
  planTypeEnum,
  SpotCheckTypeEnum,
  spotCheckListStateEnum,
  spotCheckResultEnum,
} from "@/enum/workModule";

export const detailConfig = [
    {
        // 单据编号
        prop: "BillId",
        label: i18n.t("device.De_SpotCheckId"),
        custom: true,
    },
    {
        // 计划名称
        prop: "PlanName",
        label: i18n.t('device.De_PlanName1'),
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
        custom: true,
    },
    {
        // 应开始时间
        prop: "ShouldBeginTime",
        label: i18n.t('device.De_ShouldBeginTime'),
        filter: "time",
    },
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

export const msgTableConfig = [
    /*点检内容*/
    {
        prop: "SpotCheckContent",
        label: i18n.t("device.De_SpotCheckContent"),
    },
    /*点检结果*/
    {
        prop: "SpotCheckResult",
        label: i18n.t("device.De_SpotCheckResult"),
        customFilter: (value, row) => enumFilter(value, spotCheckResultEnum),
    },
    /*备注*/
    {
        prop: "Remarks",
        label: i18n.t('Generality.Ge_Remarks'),
    }
]
