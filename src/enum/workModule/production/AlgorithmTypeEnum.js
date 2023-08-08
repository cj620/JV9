import i18n from "@/i18n/i18n.js";
// 排程算法枚举
export default {
  /// <summary>
  /// 经典算法
  /// </summary>
  ClassicalAlgorithm: {
    label: i18n.t("production.Pr_ClassicalAlgorithm"),
    value: "ClassicalAlgorithm",
  },
  /// <summary>
  /// 最短工期
  /// </summary>
  MinimumWorkingPeriod: {
    label: i18n.t("production.Pr_MinimumWorkingPeriod"),
    value: "MinimumWorkingPeriod",
  },
  /// <summary>
  /// 最早发货期Pr_ClassicalAlgorithm
  /// </summary>
  EarliestDeliveryDate: {
    label: i18n.t("production.Pr_EarliestDeliveryDate"),
    value: "EarliestDeliveryDate",
  },
  /// <summary>
  /// CR值排程
  /// </summary>
  CR: {
    label: i18n.t("production.Pr_CR"),
    value: "CR",
  },
};
