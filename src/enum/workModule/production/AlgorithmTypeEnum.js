import i18n from "@/i18n/i18n.js";
import { createEnumObject } from "@/jv_doc/utils/object/createEnumObject";

export const AlgorithmTypeEnum = createEnumObject([
  /// <summary>
  /// 经典算法
  /// </summary>
  {
    label: i18n.t("production.Pr_ClassicalAlgorithm"),
    name: "ClassicalAlgorithm",
    value: 0,
  },
  /// <summary>
  /// 最短工期
  /// </summary>
  {
    label: i18n.t("production.Pr_MinimumWorkingPeriod"),
    name: "MinimumWorkingPeriod",
    value: 1,
  },
  /// <summary>
  /// 最早发货期Pr_ClassicalAlgorithm
  /// </summary>
  {
    label: i18n.t("production.Pr_EarliestDeliveryDate"),
    name: "EarliestDeliveryDate",
    value: 2,
  },
  /// <summary>
  /// CR值排程
  /// </summary>
  {
    label: i18n.t("production.Pr_CR"),
    name: "CR",
    value: 3,
  },
]);
